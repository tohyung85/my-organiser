/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import store from '@/store';
import AuthProxy from '@/proxies/AuthProxy';
import * as types from './mutation-types';


export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const register = ({ commit }) => {
  /*
   * Normally you would use a proxy to register the user:
   *
   * new Proxy()
   *  .register(payload)
   *  .then((response) => {
   *    commit(types.REGISTER, response);
   *  })
   *  .catch(() => {
   *    console.log('Request failed...');
   *  });
   */
  commit(types.LOGIN, 'RandomGeneratedToken');
  Vue.router.push({
    name: 'home.index',
  });
};

export const login = ({ commit, state }, payload) => {
  /*
   * Normally you would use a proxy to log the user in:
   */
  new AuthProxy()
    .login(payload)
    .then((response) => {
      const { token } = response;
      commit(types.LOGIN, token);
      store.dispatch('account/find');
      Vue.router.push({
        name: 'home.index',
      });
    })
    .catch(() => {
      console.log('Request failed...');
    });
  // console.log('payload', payload);
  // commit(types.LOGIN, 'SomeToken');
  // store.dispatch('account/find');
  // Vue.router.push({
  //   name: 'home.index',
  // });
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  Vue.router.push({
    name: 'login.index',
  });
};

export default {
  check,
  register,
  login,
  logout,
};
