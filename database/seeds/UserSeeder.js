'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Database = use('Database')

class UserSeeder {
  async run () {
    await Database.table('users').insert(
      {
        name: 'Blergson G Andrade',
        username: 'abranx',
        email: 'casado@gmail.com',
        password: 'abcsda',
      },
    )
  }
}

module.exports = UserSeeder
