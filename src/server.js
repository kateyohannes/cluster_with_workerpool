'use strict';

import { createServer } from 'node:http'
import app from './app.js';

const server = createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, ()=>{
    console.log(`Server is on http://localhost:${port}`);
});
