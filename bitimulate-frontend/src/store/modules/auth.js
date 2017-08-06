import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const TOGGLE_LOGIN_MODAL = 'auth/TOGGLE_LOGIN_MODAL';
const SET_MODAL_MODE = 'auth/SET_MODAL_MODE';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';

// action creator
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL);
export const setModalMode = createAction(SET_MODAL_MODE); // (mode)
export const changeInput = createAction(CHANGE_INPUT); // ({form, name, value})

// initial state
const initialState = Map({
  modal: Map({
    visible: false,
    mode: 'login'
  }),
  forms: Map({
    login: Map({
      email: '',
      password: ''
    }),
    register: Map({
      email: '',
      password: '',
      displayName: ''
    })
  })
});

// reducer
export default handleActions({
    [TOGGLE_LOGIN_MODAL]: (state, action) => {
        return state.updateIn(['modal', 'visible'], visible => !visible);
    },
    [SET_MODAL_MODE]: (state, action) => {
      return state.setIn(['modal', 'mode'], action.payload)
                  .set('forms', initialState.get('forms'));
    },
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;
      return state.setIn(['forms', form, name], value);
    }
}, initialState);