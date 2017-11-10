import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { pender } from 'redux-pender';
import {getCurrency} from 'lib/utils';

import * as ExchangeAPI from 'lib/api/exchange';
import * as ChartDataAPI from 'lib/api/chartData';
import * as PoloniexAPI from 'lib/api/poloniex';
import * as OrdersAPI from 'lib/api/orders';
import * as CommonAPI from 'lib/api/common';

import parseLink from 'parse-link-header';


// action types
const GET_INITIAL_RATE = 'trade/GET_INITIAL_RATE';
const SET_INDEX_OPTION = 'trade/SET_INDEX_OPTION';
const TOGGLE_SHOW_PINNED = 'trade/TOGGLE_SHOW_PINNED';
const UPDATE_TICKER = 'trade/UPDATE_TICKER';

const GET_CHART_DATA = 'trade/GET_CHART_DATA';
const SET_CHART_TYPE = 'trade/SET_CHART_TYPE';
const SET_CURRENCY_TYPE = 'trade/SET_CURRENCY_TYPE';
const UPDATE_LAST_CANDLE = 'trade/UPDATE_LAST_CANDLE';
const REGULAR_UPDATE = 'trade/REGULAR_UPDATE';

const GET_ORDER_BOOK = 'trade/GET_ORDER_BOOK';
const RESET_ORDER_BOOK = 'trade/RESET_ORDER_BOOK';

const GET_TRADE_HISTORY = 'trade/GET_TRADE_HISTORY';
const RESET_TRADE_HISTORY = 'trade/RESET_TRADE_HISTORY';

const INITIALIZE_TRADE_SECTION = 'trade/INITIALIZE_TRADE_SECTION';
const CHANGE_TRADE_BOX_INPUT = 'trade/CHANGE_TRADE_BOX_INPUT';

const CREATE_ORDER = 'trade/CREATE_ORDER';
const GET_ORDERS = 'trade/GET_ORDERS';
const ORDER_PROCESSED = 'trade/ORDER_PROCESSED';
const CANCEL_ORDER = 'trade/CANCEL_ORDER';
const GET_NEXT_ORDERS = 'trade/GET_NEXT_ORDERS';


// action creator
export const getInitialRate = createAction(GET_INITIAL_RATE, ExchangeAPI.getInitialRate);
export const setIndexOption = createAction(SET_INDEX_OPTION);
export const toggleShowPinned = createAction(TOGGLE_SHOW_PINNED);
export const updateTicker = createAction(UPDATE_TICKER);
export const getChartData = createAction(GET_CHART_DATA, ChartDataAPI.getChartData);
export const setChartType = createAction(SET_CHART_TYPE);
export const setCurrencyType = createAction(SET_CURRENCY_TYPE);
export const updateLastCandle = createAction(UPDATE_LAST_CANDLE);
export const regularUpdate = createAction(REGULAR_UPDATE, ChartDataAPI.getChartData);
export const getOrderBook = createAction(GET_ORDER_BOOK, PoloniexAPI.getOrderBook, meta => meta);
export const resetOrderBook = createAction(RESET_ORDER_BOOK);
export const getTradeHistory = createAction(GET_TRADE_HISTORY, PoloniexAPI.getTradeHistory, meta => meta);
export const resetTradeHistory = createAction(RESET_TRADE_HISTORY);
export const initializeTradeAction = createAction(INITIALIZE_TRADE_SECTION);
export const changeTradeBoxInput = createAction(CHANGE_TRADE_BOX_INPUT);
export const createOrder = createAction(CREATE_ORDER, OrdersAPI.createOrder, meta => meta);
export const getOrders = createAction(GET_ORDERS, OrdersAPI.getOrders);
export const orderProcessed = createAction(ORDER_PROCESSED);
export const cancelOrder = createAction(CANCEL_ORDER, OrdersAPI.cancelOrder, meta => meta);
export const getNextOrders = createAction(GET_NEXT_ORDERS, CommonAPI.getNext);

// initial state
const initialState = Map({
  index: Map({
    options: Map({
      showPinned: false,
      sortBy: 'alphabet',
      asc: true
    })
  }),
  rate: List([]),
  detail: Map({
    chartData: List([]),
    chartType: 'year',
    currencyType: null,
    timebase: null,
    orderBook: Map({
      buy: List(),
      sell: List()
    }),
    tradeHistory: List(),
    privateOrders: List(),
    nextPrivateOrdersLink: null,
    tradeSection: Map({
      buy: Map({
        price: 0,
        amount: 0
      }),
      sell: Map({
        price: 0,
        amount: 0
      }),
      disableButton: Map({
        buy: false,
        sell: false
      })
    })
  })
});

// reducer
export default handleActions({
    ...pender({
      type: GET_INITIAL_RATE,
      onSuccess: (state, action) => {
        const { data: rate } = action.payload;

        const insertCurrencyName = (r) => {
          const currency = getCurrency(r.name);
          if(!currency) return r;


          return {
            ...r,
            currencyName: currency.get('name'),
            currencyKey: currency.get('key')
          }
        };

        return state.set('rate', fromJS(rate.map(insertCurrencyName)));
      }
    }),
    [SET_INDEX_OPTION]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['index', 'options', name], value);
    },
    [TOGGLE_SHOW_PINNED]: (state, action) => {
      return state.updateIn(['index', 'options', 'showPinned'], value => !value);
    },
    [UPDATE_TICKER]: (state, action) => {
      const { payload: data } = action;
      const index = state.get('rate').findIndex((ticker) => ticker.get('name') === data.name);
      return state.mergeIn(['rate', index], data);
    },
    ...pender({
      type: GET_CHART_DATA,
      onPending: (state, action) => {
        return state.setIn(['detail', 'chartData'], List([]))
                    .setIn(['detail', 'timebase'], null);
      },
      onSuccess: (state, action) => {
        const { data: chartData } = action.payload;
        const { 'x-timebase': timebase } = action.payload.headers;
        
        return state.setIn(['detail', 'chartData'], fromJS(chartData))
                    .setIn(['detail', 'timebase'], timebase)
      }
    }),
    ...pender({
      type: REGULAR_UPDATE,
      onSuccess: (state, action) => {
        const { data: chartData } = action.payload;
        const { 'x-timebase': timebase } = action.payload.headers;

        return state.setIn(['detail', 'chartData'], fromJS(chartData))
                    .setIn(['detail', 'timebase'], timebase)
      }
    }),
    [SET_CHART_TYPE]: (state, action) => {
      const { payload: chartType } = action;
      return state.setIn(['detail', 'chartType'], chartType);
    },
    [SET_CURRENCY_TYPE]: (state, action) => {
      const { payload: currencyType } = action;
      return state.setIn(['detail', 'currencyType'], currencyType);
    },
    [UPDATE_LAST_CANDLE]: (state, action) => {
      const { payload: value } = action;

      let chartData = state.getIn(['detail', 'chartData']);
      if(chartData.isEmpty()) return state;

      let lastCandle = chartData.get(chartData.size - 1);
      const { high, low, close } = lastCandle.toJS();

      // lower
      if(value > high) {
        lastCandle = lastCandle.set('high', value);
      }

      // higher
      if(value < low) {
        lastCandle = lastCandle.set('low', value);
      }

      // same
      if(value === close) return state;
      lastCandle = lastCandle.set('close', value);

      chartData = chartData.set(chartData.size - 1, lastCandle);
      return state.setIn(['detail', 'chartData'], chartData);
    },

    ...pender({
      type: GET_ORDER_BOOK,
      onSuccess: (state, action) => {
        const { meta } = action;

        // resolves flickering orderbook
        if(meta.indexOf(state.getIn(['detail', 'currencyType'])) === -1) {
          return state;
        }

        const { 
          bids: buy, 
          asks: sell 
        } = action.payload.data;

        return state.setIn(['detail', 'orderBook'], Map({
          buy: fromJS(buy),
          sell: fromJS(sell)
        }))
      }
    }),
    [RESET_ORDER_BOOK]: (state, action) => {
      return state.setIn(['detail', 'orderBook'], initialState.getIn(['detail', 'orderBook']));
    },
    ...pender({
      type: GET_TRADE_HISTORY,
      onSuccess: (state, action) => {
        const { meta } = action;
        const { data: tradeHistory } = action.payload;
        
        if(!meta.start) {
        // if there is no meta.start, it means... replace the whole data  
          return state.setIn(['detail', 'tradeHistory'], fromJS(tradeHistory));
        }
        
        const currentTradeHistory = state.getIn(['detail', 'tradeHistory']);
        const filtered = fromJS(tradeHistory)
                        .filter(h => currentTradeHistory
                        .find(h2 => h2.get('globalTradeID') !== h.get('globalTradeID')));

        return state.setIn(['detail', 'tradeHistory'], filtered.concat(currentTradeHistory).slice(0, 200));
      }
    }),
    [RESET_TRADE_HISTORY]: (state, action) => {
      return state.setIn(['detail', 'tradeHistory'], List());
    },
    [INITIALIZE_TRADE_SECTION]: (state, action) => {
      const { payload: initialPrice  = 0} = action;

      const boxState = Map({
        amount: 0,
        price: initialPrice
      })

      return state.setIn(['detail', 'tradeSection', 'buy'], boxState)
                  .setIn(['detail', 'tradeSection', 'sell'], boxState);
    },

    [CHANGE_TRADE_BOX_INPUT]: (state, action) => {
      const { type, name, value } = action.payload;
      return state.setIn(['detail', 'tradeSection', type, name], value);
    },

    ...pender({
      type: CREATE_ORDER,
      onPending: (state, action) => {
        const { sell } = action.meta;
        const type = sell ? 'sell' : 'buy';
        return state.setIn(['detail', 'tradeSection', 'disableButton', type], true);
      },
      onSuccess: (state, action) => {
        const { sell } = action.meta;
        const type = sell ? 'sell' : 'buy';
        return state.setIn(['detail', 'tradeSection', 'disableButton', type], false)
                    .updateIn(['detail', 'privateOrders'], orders => orders.unshift(fromJS(action.payload.data)));
      },
      onError: (state, action) => {
        const { sell } = action.meta;
        const type = sell ? 'sell' : 'buy';
        return state.setIn(['detail', 'tradeSection', 'disableButton', type], false);
      }
    }),

    ...pender({
      type: GET_ORDERS,
      onSuccess: (state, action) => {
        const { data: privateOrders, headers: { link } } = action.payload;
        const links = parseLink(link);
        let next = null;

        if(links && links.next) {
          next = links.next.url
        }

        return state.setIn(['detail', 'privateOrders'], fromJS(privateOrders))
                    .setIn(['detail', 'nextPrivateOrdersLink'], next);
      }
    }),
    ...pender({
      type: GET_NEXT_ORDERS,
      onSuccess: (state, action) => {
        const { data: privateOrders, headers: { link } } = action.payload;
        const links = parseLink(link);
        let next = null;

        if(links && links.next) {
          next = links.next.url
        }
        return state.updateIn(['detail', 'privateOrders'], po => po.concat(fromJS(privateOrders)))
                    .setIn(['detail', 'nextPrivateOrdersLink'], next);
      }
    }),
    [ORDER_PROCESSED]: (state, action) => {
      const { payload: order } = action;
      return state.updateIn(['detail', 'privateOrders'], privateOrders => {
        const index = privateOrders.findIndex(o => o.get('_id') === order._id);
        console.log(index);
        if(index === -1) return privateOrders;
        console.log(order);
        return privateOrders.set(index, fromJS(order));
      })
    },

    ...pender({
      type: CANCEL_ORDER,
      onSuccess: (state, action) => {
        const { data: order } = action.payload;
        return state.updateIn(['detail', 'privateOrders'], privateOrders => {
          const index = privateOrders.findIndex(o => o.get('_id') === action.meta);
          if(index === -1) return privateOrders;
          return privateOrders.set(index, fromJS(order));
        })
      }
    })
}, initialState);