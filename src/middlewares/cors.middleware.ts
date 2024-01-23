export const corsOptions = {
    origin: `${process.env.VITE_PROTOCOL}://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`,
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH,HEAD',
    credentials: true,
    allowedHeaders: 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  };