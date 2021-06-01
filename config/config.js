module.exports = {
  development: {
    database: 'emily_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      require: true
    }
  }
}
