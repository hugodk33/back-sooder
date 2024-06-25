'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FamilySchema extends Schema {
  up () {
    this.create('families', (table) => {
      table.increments('family_id').notNullable()
      table.integer('address' , 80)
      table.integer('client_group' , 80)
    })
  }

  down () {
    this.drop('families')
  }
}

module.exports = FamilySchema
