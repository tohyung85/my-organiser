import * as Joi from 'joi';
import Model from '../../../objection-model';
const {compose} = require('objection');
import RestMixin from '../../../objection-rest-mixin';
import TimestampMixin from '../../../objection-timestamp-mixin';

const mixins = compose(
  RestMixin,
  TimestampMixin,
);

export default class Tasklist extends mixins(Model) {
  user_id: number;
  done: boolean;
  title: string;
  created_at: number;
  updated_at: number;

  static get tableName() {
    return 'tasklists';
  }

  static get schema() {
    return {
      user_id: Joi.number().integer(),
      title: Joi.string(),
      created_at: Joi.date().timestamp(),
      updated_at: Joi.date().timestamp(),
      done: Joi.boolean(),
    }
  }
}