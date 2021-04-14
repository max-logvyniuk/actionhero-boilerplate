import { URL } from 'url';
import { join } from 'path';

export const DEFAULT = {
  sequelize: (config) => {
    let dialect = 'mysql';
    let host = process.env.DB_HOST || '127.0.0.1';
    let port = process.env.DB_PORT || '3306';
    let database = process.env.DB_NAME || 'ubki';
    let username = process.env.DB_USER || process.env.CI ? process.env.DB_USER : 'root';
    let password = process.env.DB_PASS;

    // if your environment provides database information via a single JDBC-style URL like mysql://username:password@hostname:port/default_schema
    const connectionURL = process.env.DATABASE_URL ||
      process.env.MYSQL_URL ||
      process.env.PG_URL;

    if (connectionURL) {
      const parsed = new URL(connectionURL);
      if (parsed.protocol) dialect = parsed.protocol.slice(0, -1);
      if (parsed.username) username = parsed.username;
      if (parsed.password) password = parsed.password;
      if (parsed.hostname) host = parsed.hostname;
      if (parsed.port) port = parsed.port;
      if (parsed.pathname) database = parsed.pathname.substring(1);
    }

    if (dialect === 'mariadb') dialect = 'mariadb';

    return {
      autoMigrate: true,
      logging: false,
      dialect: dialect,
      port: parseInt(port, 10),
      database: database,
      host: host,
      username: username,
      password: password || 'root',
      models: [join(__dirname, '..', 'models')],
      migrations: [join(__dirname, '..', 'migrations')],
      dialectOptions: {
        // ssl: 'Amazon RDS'
        ssl: {
          require: true,
          rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
      }
      // you can also pass "dialectOptions", for example if you need `{ssl: true}` for Postgres
    };
  }
};

// for the sequelize CLI tool
// module.exports.development = DEFAULT.sequelize({
//   env: 'development',
//   process: { env: 'development' }
// });
//
// module.exports.sandbox = DEFAULT.sequelize({
//   env: 'sandbox',
//   process: { env: 'sandbox' },
//   database: '{DB_NAME}',
//   host: '{DB_HOST}',
//   port: '{DB_PORT}',
//   username: '{DB_USERNAME}',
//   password: '{DB_PASSWORD}',
//   dialectOptions: {
//     ssl: 'Amazon RDS'
//   }
// });
//
// module.exports.production = DEFAULT.sequelize({
//   env: 'production',
//   process: { env: 'production' },
//   database: '{DB_NAME_PROD}',
//   host: '{DB_HOST_PROD}',
//   port: '{DB_PORT_PROD}',
//   username: '{DB_USERNAME_PROD}',
//   password: '{DB_PASSWORD_PROD}',
//   dialectOptions: {
//     ssl: 'Amazon RDS'
//   }
// });

