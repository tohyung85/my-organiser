/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import Transformer from '@/transformers/AccountTransformer';
// import AccountProxy from '@/proxies/AccountProxy';
import * as types from './mutation-types';

export const find = ({ commit }) => {
  /*
   * Normally you would use a proxy to fetch the account:
   */
  // new AccountProxy()
  //   .all()
  //   .then((response) => {
  //     commit(types.FIND, Transformer.fetch(response));
  //   })
  //   .catch(() => {
  //     console.log('Request failed...');
  //   });
  const response = {
    first_name: 'User',
    last_name: 'Test',
    description: 'test description',
    email: 'testuser@email.com',
  };
  commit(types.FIND, Transformer.fetch(response));
};

export default {
  find,
};
