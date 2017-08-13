import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

const CHANGE_NICKNAME = 'register/CHANGE_NICKNAME';
const SET_CURRENCY = 'register/SET_CURRENCY';
const SELECT_OPTION_INDEX = 'SELECT_OPTION_INDEX';
const CHECK_DISPLAY_NAME = 'CHECK_DISPLAY_NAME';
const SUBMIT = 'SUBMIT';
const SET_ERROR = 'SET_ERROR';



export const changeNickname = createAction(CHANGE_NICKNAME);
export const setCurrency = createAction(SET_CURRENCY);
export const selectOptionIndex = createAction(SELECT_OPTION_INDEX);
export const checkDisplayName = createAction(CHECK_DISPLAY_NAME, AuthAPI.checkDisplayName);
export const submit = createAction(SUBMIT, AuthAPI.localRegister);
export const setError = createAction(SET_ERROR);

// initial state
const initialState = Map({
  nickname: '',
  currency: 'KRW',
  optionIndex: 0,
  displayNameExists: false,
  error: null
});

// reducer
export default handleActions({
  [CHANGE_NICKNAME]: (state, action) => {
    const { payload: nickname } = action;
    return state.set('nickname', nickname);
  },
  [SET_CURRENCY]: (state, action) => { 
    const { payload: currency } = action;
    return state.set('currency', currency);
  },
  [SELECT_OPTION_INDEX]: (state, action) => {
    const { payload: index } = action;
    return state.set('optionIndex', index);
  },
  ...pender({
      type: CHECK_DISPLAY_NAME,
      onSuccess: (state, action) => {
        const { exists } = action.payload.data;
        return state.set('displayNameExists', exists);
      }
  }),
  ...pender({
    type: SUBMIT,
    onSuccess: (state, action) => {
      return state;
    }
  }),
  [SET_ERROR]: (state, action) => {
    const { payload: error } = action;
    return state.set('error', error);
  }
}, initialState);