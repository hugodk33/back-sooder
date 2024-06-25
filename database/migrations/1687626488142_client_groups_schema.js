'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientGruopSchema extends Schema {
  up () {
    this.create('client_groups', (table) => {
      table.increments('client_group_id').notNullable()
      table.integer('group_id').notNullable()
      table.integer('client' , 80)
    })
  }

  down () {
    this.drop('client_groups')
  }
}

module.exports = ClientGruopSchema
