'use strict'

const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments('client_id')
      table.string('name', 200).notNullable()
      table.timestamp('birthday', { useTz: true })
      table.string('RG', 60).unique()
      table.string('CPF', 60).unique()
      table.string('genre', 19)
      table.string('phone', 60)
      table.string('email', 50)
      table.string('mother_name', 50)
      table.string('maritial_status', 50)
      table.integer('user', 50)
      table.string('family' , 400)
      table.string('welfare_state', 20)
      table.string('welfare_state_type', 50)
      table.string('already', 10)
      table.string('CEP' , 60)
      table.string('street' , 280)
      table.string('number' , 100)
      table.string('neighborhood' , 100)
      table.string('complement' , 150)
      table.string('reference' , 150)
      table.string('city' , 150)
      table.string('state' , 150)
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = AddressSchema
