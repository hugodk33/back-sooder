'use strict'

const Model = use('Model')

class Service extends Model {
  static get table() {
    return 'services';
  }

  static get primaryKey() {
    return 'service_id';
  }

  client() {
    return this.belongsTo('App/Models/Client', 'client', 'client_id');
  }

  static get createdAtColumn() {
    return null; 
  }
  
  static get updatedAtColumn() {
      return null;
  }
}

module.exports = Service;
