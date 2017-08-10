import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

const CHANGE_NICKNAME = 'register/CHANGE_NICKNAME';
const SET_CURRENCY = 'register/SET_CURRENCY';
const SELECT_OPTION_INDEX = 'SELECT_OPTION_INDEX';


export const changeNickname = createAction(CHANGE_NICKNAME);
export const setCurrency = createAction(SET_CURRENCY);
export const selectOptionIndex = createAction(SELECT_OPTION_INDEX);

// initial state
const initialState = Map({
  nickname: '',
  currency: 'KRW',
  optionIndex: 0
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
  }
}, initialState);