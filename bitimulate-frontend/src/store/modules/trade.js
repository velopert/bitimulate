import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { pender } from 'redux-pender';

import * as ExchangeAPI from 'lib/api/exchange';

// action types
const GET_INITIAL_RATE = 'trade/GET_INITIAL_RATE';

// action creator
export const getInitialRate = createAction(GET_INITIAL_RATE, ExchangeAPI.getInitialRate);

// initial state
const initialState = Map({
  rate: List([])
});

// reducer
export default handleActions({
    ...pender({
      type: GET_INITIAL_RATE,
      onSuccess: (state, action) => {
        const { data: rate } = action.payload;
        return state.set('rate', fromJS(rate));
      }
    })
}, initialState);