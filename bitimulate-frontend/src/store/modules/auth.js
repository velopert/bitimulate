import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';
import social from 'lib/social';

// action types
const TOGGLE_LOGIN_MODAL = 'auth/TOGGLE_LOGIN_MODAL';
const SET_MODAL_MODE = 'auth/SET_MODAL_MODE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';
const CHECK_EMAIL = 'auth/CHECK_EMAIL';
const LOCAL_LOGIN  = 'auth/LOCAL_LOGIN';
const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN';
const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
const LOGOUT = 'auth/LOGOUT';


// action creator
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL);
export const setModalMode = createAction(SET_MODAL_MODE); // (mode)
export const changeInput = createAction(CHANGE_INPUT); // ({name, value})
export const setError = createAction(SET_ERROR);  // ({ email, password }) [nullable]
export const checkEmail = createAction(CHECK_EMAIL, AuthAPI.checkEmail); // (email)
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // ({email, password})
export const providerLogin = createAction(PROVIDER_LOGIN, (provider) => social[provider](), provider => provider);
export const socialLogin = createAction(SOCIAL_LOGIN, AuthAPI.socialLogin);
export const logout = createAction(LOGOUT, AuthAPI.logout);

// initial state
const initialState = Map({
  modal: Map({
    visible: false,
    mode: 'login'
  }),
  form: Map({
    email: '',
    password: ''
  }),
  error: null,
  loginResult: null,
  socialInfo: null,
  redirectToRegister: false
});

// reducer
export default handleActions({
    [TOGGLE_LOGIN_MODAL]: (state, action) => {
      const visible = state.getIn(['modal', 'visible']);
      if(visible) {
        return state.setIn(['modal', 'visible'], false);
      }
      return initialState.setIn(['modal', 'visible'], true);
    },
    [SET_MODAL_MODE]: (state, action) => {
      return state.setIn(['modal', 'mode'], action.payload)
                  .set('form', initialState.get('form'))
                  .set('error', null);
    },
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['form', name], value);
    },
    [SET_ERROR]: (state, action) => {
      return state.set('error', fromJS(action.payload));
    },
    ...pender({
        type: CHECK_EMAIL,
        onSuccess: (state, action) => {
            const { exists } = action.payload.data;
            return exists
                    ? state.set('error', Map({email: '이미 존재하는 이메일입니다.'}))
                    : state;
        }
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => {
        const { data: loginResult } = action.payload;
        return state.set('loginResult', loginResult);
      },
      onFailure: (state, action) => {
        return state.set('error', fromJS({
          localLogin: ['잘못된 계정 정보입니다.']
        }))
      }
    }),
    ...pender({
        type: PROVIDER_LOGIN,
        onSuccess: (state, action) => {
          const {
            payload: accessToken,
            meta: provider
          } = action;

          return state.set('socialInfo', Map({
            accessToken,
            provider
          }));
        }
    }),
    ...pender({
      type: SOCIAL_LOGIN,
      onSuccess: (state, action) => {
        const { data: loginResult } = action.payload;
        if(action.payload.status === 204) {
          return state.set('redirectToRegister', true);
        }
        return state.set('loginResult', loginResult);
      }
    })
}, initialState);