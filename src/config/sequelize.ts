import { URL } from "url";
import { join } from "path";


export const DEFAULT = {
    sequelize: (config) => {
        let dialect = "mariadb";
        let host = process.env.DB_HOST || "127.0.0.1";
        let port = process.env.DB_PORT || "3306";
        let database = process.env.DB_NAME || 'mariadb_actionhero';
        let username =
            process.env.DB_USER || process.env.CI ? process.env.DB_USER : 'root';
        let password = process.env.DB_PASS || 'root';

        // if your environment provides database information via a single JDBC-style URL like mysql://username:password@hostname:port/default_schema
        const connectionURL =
            process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.PG_URL;

        if (connectionURL) {
            const parsed = new URL(connectionURL);
            if (parsed.protocol) dialect = parsed.protocol.slice(0, -1);
            if (parsed.username) username = parsed.username;
            if (parsed.password) password = parsed.password;
            if (parsed.hostname) host = parsed.hostname;
            if (parsed.port) port = parsed.port;
            if (parsed.pathname) database = parsed.pathname.substring(1);
        }

        if (dialect === "mariadb") dialect = "mariadb";

        return {
            autoMigrate: true,
            logging: false,
            dialect: dialect,
            port: parseInt(port),
            database: database,
            host: host,
            username: username,
            password: password || 'root',
            models: [join(__dirname, "..", "models")],
            migrations: [join(__dirname, "..", "migrations")],
            // you can also pass "dialectOptions", for example if you need `{ssl: true}` for Postgres
        };
    },
};

// for the sequelize CLI tool
module.exports.development = DEFAULT.sequelize({
    env: "development",
    process: { env: "development" },
});

module.exports.staging = DEFAULT.sequelize({
    env: "staging",
    process: { env: "staging" },
});

module.exports.production = DEFAULT.sequelize({
    env: "production",
    process: { env: "production" },
});