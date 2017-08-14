import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';

// action types
const SET_USER = 'user/SET_USER';

// action creator
export const setUser = createAction(SET_USER);

// initial state
const initialState = Map({
  logged: false,
  user: null // Map({ _id, displayName })
});

// reducer
export default handleActions({
    [SET_USER]: (state, action) => {
      const { payload: user } = action;
      return state.set('user', Map(user))
                  .set('logged', true);
    }
}, initialState);