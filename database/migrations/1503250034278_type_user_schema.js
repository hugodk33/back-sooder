'use strict'

const Schema = use('Schema')

class TypeUserSchema extends Schema {
  up () {
    this.create('type_users', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
    })
  }

  down () {
    this.drop('type_users')
  }
}

module.exports = TypeUserSchema
