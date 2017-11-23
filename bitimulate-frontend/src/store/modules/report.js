import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as ReportAPI from 'lib/api/report';
import * as CommonAPI from 'lib/api/common';
import { Map, List, fromJS } from 'immutable';
import parseLink from 'parse-link-header';

// action types
const INITIALIZE = 'report/INITIALIZE';
const GET_USER_WALLET = 'report/GET_USER_WALLET';
const GET_USER_ORDERS = 'report/GET_USER_ORDERS';
const GET_NEXT_ORDERS = 'report/GET_NEXT_ORDERS';

// action creator
export const initialize = createAction(INITIALIZE);
export const getUserWallet = createAction(GET_USER_WALLET, ReportAPI.getUserWallet);
export const getUserOrders = createAction(GET_USER_ORDERS, ReportAPI.getUserOrders);
export const getNextOrders = createAction(GET_NEXT_ORDERS, CommonAPI.getNext);

// initial state
const initialState = Map({
  walletData: null,
  orders: null,
  next: null
});

// reducer
export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  ...pender({
    type: GET_USER_WALLET,
    onSuccess: (state, action) => {
      const { data: walletData } = action.payload;
      return state.set('walletData', fromJS(walletData));
    }
  }),
  ...pender({
    type: GET_USER_ORDERS,
    onSuccess: (state, action) => {
      const { data: orders, headers: { link } } = action.payload;

      const links = parseLink(link);
      let next = null;
      if (links && links.next) {
        next = links.next.url
      }

      return state.set('orders', fromJS(orders))
        .set('next', next);
    }
  }),
  ...pender({
    type: GET_NEXT_ORDERS,
    onSuccess: (state, action) => {
      const { data: nextOrders, headers: { link }} = action.payload;
      const list = fromJS(nextOrders);

      const links = parseLink(link);
      let next = null;
      if (links && links.next) {
        next = links.next.url
      }

      return state.update('orders', orders => orders.concat(list))
        .set('next', next);
    }
  })
}, initialState);