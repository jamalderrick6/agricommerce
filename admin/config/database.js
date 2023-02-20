module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'agricommerce'),
      user: env('DATABASE_USERNAME', 'wmonk'),
      password: env('DATABASE_PASSWORD', 'w.monk21!'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
