'use strict';

const Model = use('Model');

class Dispatch extends Model {
  static get table() {
    return 'dispatches';
  }

  service() {
    return this.belongsTo('App/Models/Service');
  }
}

module.exports = Dispatch;
