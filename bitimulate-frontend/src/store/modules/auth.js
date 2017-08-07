import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

// action types
const TOGGLE_LOGIN_MODAL = 'auth/TOGGLE_LOGIN_MODAL';
const SET_MODAL_MODE = 'auth/SET_MODAL_MODE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';
const CHECK_EMAIL = 'auth/CHECK_EMAIL';

// action creator
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL);
export const setModalMode = createAction(SET_MODAL_MODE); // (mode)
export const changeInput = createAction(CHANGE_INPUT); // ({name, value})
export const setError = createAction(SET_ERROR);  // ({ email, password }) [nullable]
export const checkEmail = createAction(CHECK_EMAIL, AuthAPI.checkEmail);


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
  error: null
});

// reducer
export default handleActions({
    [TOGGLE_LOGIN_MODAL]: (state, action) => {
        return state.updateIn(['modal', 'visible'], visible => !visible);
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
}, initialState);