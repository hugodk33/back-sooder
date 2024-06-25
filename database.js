'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'mysql'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  // sqlite: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
  //   },
  //   useNullAsDefault: true,
  //   debug: Env.get('DB_DEBUG', false)
  // },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST'),
      port: Env.get('DB_PORT'),
      user: Env.get('DB_USER'),
      password: Env.get('DB_PASSWORD'),
      database: Env.get('DB_DATABASE')
    },
    debug: Env.get('DB_DEBUG', false)
  },

  // oldMysql: {
  //   client: 'mysql',
  //   connection: {
  //     host: Env.get('DB_HOST'),
  //     port: Env.get('DB_PORT'),
  //     user: Env.get('DB_USER'),
  //     password: Env.get('DB_PASSWORD'),
  //     database: Env.get('DB_DATABASE')
  //   },
  //   debug: Env.get('DB_DEBUG', false)
  // },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  // pg: {
  //   client: 'pg',
  //   connection: {
  //     host: Env.get('DB_HOST'),
  //     port: Env.get('DB_PORT'),
  //     user: Env.get('DB_USER'),
  //     password: Env.get('DB_PASSWORD' ),
  //     database: Env.get('DB_DATABASE' )
  //   },
  //   debug: Env.get('DB_DEBUG', false)
  // }
}


// PRODução

// HOST=localhost
// PORT=80
// NODE_ENV=development
// APP_NAME=AdonisJs
// APP_URL=http://${HOST}:${PORT}
// CACHE_VIEWS=false
// APP_KEY=sOI75pt7cUntoESBebYFMLeQrnBjH2AY
// DB_CONNECTION=mysql
// DB_HOST=localhost
// DB_PORT=3306
// DB_USER=root
// DB_PASSWORD=
// DB_DATABASE=gddsdr
// HASH_DRIVER=bcrypt

// HOST=localhost
// PORT=80
// NODE_ENV=development
// APP_NAME=AdonisJs
// APP_URL=http://${HOST}:${PORT}
// CACHE_VIEWS=false
// APP_KEY=sOI75pt7cUntoESBebYFMLeQrnBjH2AY
// DB_CONNECTION=mysql
// DB_HOST= dbgdd.ckmybjalsxpd.sa-east-1.rds.amazonaws.com
// DB_PORT=3306
// DB_USER=admin
// DB_PASSWORD=1w2q3r4e
// DB_DATABASE=gdddb
// HASH_DRIVER=bcrypt