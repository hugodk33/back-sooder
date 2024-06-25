'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Kinship extends Model {
    // Especifica a tabela associada ao model
    static get table () {
      return 'kinships';
    }

    static get createdAtColumn() {
      return null; // Desabilita o campo createdAt
    }

    static get updatedAtColumn() {
        return null;
    }
  
    // Relação com a tabela clients (cliente)
    client() {
      return this.belongsTo('App/Models/Client', 'client', 'client_id');
    }
  
    // Relação com a tabela clients (parente)
    kin() {
      return this.belongsTo('App/Models/Client', 'kin', 'client_id');
    }
  }

module.exports = Kinship
