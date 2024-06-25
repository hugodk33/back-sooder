'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Address extends Model {
    static get primaryKey() {
        return 'address_id';
    }
    static get updatedAtColumn() {
        return null;
    }
    // client() {
    //     return this.belongsTo('App/Models/Client', 'address', 'address_id');
    // }
}


module.exports = Address
