'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments('service_id').notNullable()
      table.string('type' , 80)
      table.string('tag' , 80)
      table.string('order' , 180)
      table.string('title' , 180).notNullable()
      table.string('observations' , 400)
      table.integer('client' , 80)
      table.integer('user' , 80)
      table.integer('user_dispatch' , 80)
      table.string('begun', 35)
      table.string('end', 35)
      table.timestamp('date', { useTz: true })
      table.string('status' , 80)
      table.string('checkout', 60)
      table.string('dispatch_observations' , 400)
      table.string('dispatch_type' , 200)
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
