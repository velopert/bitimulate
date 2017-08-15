import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import * as AuthAPI from 'lib/api/auth';
import { pender } from 'redux-pender';


// action types
const SET_USER = 'user/SET_USER';
const CHECK_LOGIN_STATUS = 'user/CHECK_LOGIN_STATUS';
const LOGOUT = 'user/LOGOUT';

// action creator
export const setUser = createAction(SET_USER);
export const checkLoginStatus = createAction(CHECK_LOGIN_STATUS, AuthAPI.checkLoginStatus);
export const logout = createAction(LOGOUT, AuthAPI.logout);

// initial state
const initialState = Map({
  processed: false,
  user: null // Map({ _id, displayName })
});

// reducer
export default handleActions({
    [SET_USER]: (state, action) => {
      const { payload: user } = action;
      return state.set('user', Map(user))
                  .set('logged', true);
    },
    ...pender({
        type: CHECK_LOGIN_STATUS,
        onSuccess: (state, action) => {
          const { user } = action.payload.data;
          return state.set('user', Map(user))
                      .set('processed', true);
        },
        onFailure: (state, action) => {
          return state.set('user', null)
                      .set('processed', true);
        }
    })
}, initialState);