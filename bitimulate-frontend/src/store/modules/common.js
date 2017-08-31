import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as CommonAPI from 'lib/api/common';

// action types
const GET_CURRENCY_INFO = 'common/CURRENCY_INFO';

// action creator
export const getCurrencyInfo = createAction(GET_CURRENCY_INFO, CommonAPI.getCurrencyInfo);

// initial state
const initialState = Map({
  currencyInfo: List()
});

// reducer
export default handleActions({
  ...pender({
    type: GET_CURRENCY_INFO,
    onSuccess: (state, action) => {
      const { data: currencyInfo } = action.payload;
      return state.set('currencyInfo', fromJS(currencyInfo));
    }
  })
}, initialState);