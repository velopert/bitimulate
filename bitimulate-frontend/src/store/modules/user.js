import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import { pender } from 'redux-pender';


// action types
const SET_USER = 'user/SET_USER';
const CHECK_LOGIN_STATUS = 'user/CHECK_LOGIN_STATUS';
const LOGOUT = 'user/LOGOUT';
const GET_META_INFO = 'user/GET_META_INFO';


// action creator
export const setUser = createAction(SET_USER);
export const checkLoginStatus = createAction(CHECK_LOGIN_STATUS, AuthAPI.checkLoginStatus);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const getMetaInfo = createAction(GET_META_INFO, UserAPI.getMetaInfo);

// initial state
const initialState = Map({
  processed: false,
  user: null, // Map({ _id, displayName })
  metaInfo: Map({
    pinned: List([])
  })
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
    }),
    ...pender({
      type: GET_META_INFO,
      onSuccess: (state, action) => {
        const { data: metaInfo } = action.payload;
        return state.set('metaInfo', fromJS(metaInfo));
      }
    })
}, initialState);