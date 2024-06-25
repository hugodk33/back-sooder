'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItensSchema extends Schema {
  up () {
    this.create('itens', (table) => {
      table.increments('item_id').notNullable()
      table.string('name' , 80)
      table.string('type' , 80)
      table.string('observations' , 200)
      table.string('mesure_name' , 80)
      table.integer('quantity', 7)
    })
  }

  down () {
    this.drop('itens')
  }
}

module.exports = ItensSchema
