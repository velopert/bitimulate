import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const SHOW = 'register/SHOW';
const CLOSE = 'register/CLOSE';

// action creator
export const show = createAction(SHOW);
export const close = createAction(CLOSE);

// initial state
const initialState = Map({
  visible: false
});

// reducer
export default handleActions({
    [SHOW]: (state, action) => {
      return state.set('visible', true);
    },
    [CLOSE]: (state, action) => {
      return state.set('visible', false);
    }
}, initialState);