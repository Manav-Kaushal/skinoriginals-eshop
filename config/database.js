module.exports = ({ env }) => ({
  defaultConnection: "default",
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 1997),
      database: env("DATABASE_NAME", "skinoriginals_db"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "Manav@260597"),
      schema: env("DATABASE_SCHEMA", "public"),
    },
  },
});
