import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { pender } from 'redux-pender';
import {getCurrency} from 'lib/utils';

import * as ExchangeAPI from 'lib/api/exchange';

// action types
const GET_INITIAL_RATE = 'trade/GET_INITIAL_RATE';
const SET_INDEX_OPTION = 'trade/SET_INDEX_OPTION';


// action creator
export const getInitialRate = createAction(GET_INITIAL_RATE, ExchangeAPI.getInitialRate);
export const setIndexOption = createAction(SET_INDEX_OPTION);

// initial state
const initialState = Map({
  index: Map({
    options: Map({
      sortBy: 'alphabet',
      asc: true
    })
  }),
  rate: List([])
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
    }
}, initialState);