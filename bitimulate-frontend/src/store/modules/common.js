import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as CommonAPI from 'lib/api/common';

// action types
const GET_CURRENCY_INFO = 'common/CURRENCY_INFO';
const GET_KRW_RATE = 'common/GET_KRW_RATE';

// action creator
export const getCurrencyInfo = createAction(GET_CURRENCY_INFO, CommonAPI.getCurrencyInfo);
export const getKrwRate = createAction(GET_KRW_RATE, CommonAPI.getKrwRate);

// initial state
const initialState = Map({
  currencyInfo: List(),
  krwRate: null
});

// reducer
export default handleActions({
  ...pender({
    type: GET_CURRENCY_INFO,
    onSuccess: (state, action) => {
      const { data: currencyInfo } = action.payload;
      return state.set('currencyInfo', fromJS(currencyInfo));
    }
  }),
  ...pender({
    type: GET_KRW_RATE,
    onSuccess: (state, action) => {
      return state.set('krwRate', action.payload.data.KRW);
    }
  })
}, initialState);