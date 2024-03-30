import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "test",
  synchronize: true, // Use migrations in production instead
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
};

export default config;
