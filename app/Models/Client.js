'use strict'

const Model = use('Model')
const Address = use('App/Models/Address');

class Client extends Model {
    static get primaryKey() {
        return 'client_id';
    }
    static get createdAtColumn() {
        return null; 
    }
    static get updatedAtColumn() {
        return null;
    }

    // address() {
    //     return this.belongsTo('App/Models/Address', 'address_id', 'address');
    // }
}

module.exports = Client
