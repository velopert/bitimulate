import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const SET_SCREEN_MASK_VISIBILITY = 'base/SET_SCREEN_MASK_VISIBILITY';
const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';

// action creator
export const setScreenMaskVisibility = createAction(SET_SCREEN_MASK_VISIBILITY); // (visible)
export const showUserMenu = createAction(SHOW_USER_MENU);
export const hideUserMenu = createAction(HIDE_USER_MENU);

// initial state
const initialState = Map({
    screenMask: Map({
      visible: false
    }),
    header: Map({
      userMenu: false
    })
});

// reducer
export default handleActions({
    [SET_SCREEN_MASK_VISIBILITY]: (state, action) => {
        return state.setIn(['screenMask', 'visible'], action.payload);
    },
    [SHOW_USER_MENU]: (state, action) => state.setIn(['header', 'userMenu'], true),
    [HIDE_USER_MENU]: (state, action) => state.setIn(['header', 'userMenu'], false),
}, initialState);