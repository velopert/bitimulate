import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import * as AuthAPI from 'lib/api/auth';
import * as UserAPI from 'lib/api/user';
import * as OrdersAPI from 'lib/api/orders';

import { pender } from 'redux-pender';
import parseLink from 'parse-link-header';

// action types
const SET_USER = 'user/SET_USER';
const CHECK_LOGIN_STATUS = 'user/CHECK_LOGIN_STATUS';
const LOGOUT = 'user/LOGOUT';
const GET_META_INFO = 'user/GET_META_INFO';
const PATCH_META_INFO = 'user/PATCH_META_INFO';
const TOGGLE_PIN_KEY = 'user/TOGGLE_PIN_KEY';
const GET_WALLET = 'user/GET_WALLET';
const RESET_PIN = 'user/RESET_PIN';
const GET_ORDERS = 'user/GET_ORDERS';




// action creator
export const setUser = createAction(SET_USER);
export const checkLoginStatus = createAction(CHECK_LOGIN_STATUS, AuthAPI.checkLoginStatus);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const getMetaInfo = createAction(GET_META_INFO, UserAPI.getMetaInfo);
export const togglePinKey = createAction(TOGGLE_PIN_KEY);
export const patchMetaInfo = createAction(PATCH_META_INFO, UserAPI.patchMetaInfo);
export const getWallet = createAction(GET_WALLET, UserAPI.getWallet);
export const resetPin = createAction(RESET_PIN);
export const getOrders = createAction(GET_ORDERS, OrdersAPI.getOrders, meta => meta);

// initial state
const initialState = Map({
  processed: false,
  user: null, // Map({ _id, displayName })
  metaInfo: Map({
    pinned: List([])
  }),
  wallet: Map({

  }),
  walletOnOrder: Map({

  }),
  orders: Map({
    processed: List(),
    waiting: List(),
    next: Map({
      processed: null,
      waiting: null
    })
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
    }),
    [RESET_PIN]: (state, action) => {
      return state.setIn(['metaInfo', 'pinned'], List());
    },
    [TOGGLE_PIN_KEY]: (state, action) => {
      const { payload: key } = action;

      const pinned = state.getIn(['metaInfo', 'pinned']);
      const index = pinned.findIndex(k => k === key);
      
      // not found
      if(index === -1) {
        return state.setIn(['metaInfo', 'pinned'], pinned.push(key));
      }

      // found
      return state.deleteIn(['metaInfo', 'pinned', index]);
    },
    ...pender({
      type: GET_WALLET,
      onSuccess: (state, action) => {
        const { wallet, walletOnOrder } = action.payload.data;
        return state.set('wallet', fromJS(wallet))
                    .set('walletOnOrder', fromJS(walletOnOrder));
      }
    }),
    ...pender({
      type: GET_ORDERS,
      onSuccecss: (state, action) => {
        const { data: orders, header: { link } } = action.payload;
        const { meta: orderType } = action;

        const links = parseLink(link);
        let next = null;

        if(links && links.next) {
          next = links.next.url;
        }

        return state.setIn(['orders', orderType], fromJS(orders))
                    .setIn(['orders', 'next', orderType], next);
      }
    })
}, initialState);