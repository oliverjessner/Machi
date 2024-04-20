import { serveStatic } from 'hono/bun';
import { Hono } from 'hono';

const app = new Hono();

app.use('/*', serveStatic({ root: './public/' }));

export default app;
