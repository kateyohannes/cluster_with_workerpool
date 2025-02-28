'use strict';

import os from 'node:os'
import cluster from 'node:cluster';
import process from 'node:process';
import { createServer } from 'node:http';

import app from './app.js'

const cpu_count = os.cpus().length
// const cpu_length = 2

if (cluster.isPrimary) {
    console.log(`cluster: total cpu_count ${cpu_count}`)
    for (let i = 0; i < cpu_count; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const port = process.env.PORT_WC || 3000;
    const server = createServer(app);

    server.listen(port, () => {
        console.log(`Server is on http://localhost:${port}`);
    });


    console.log(`Worker ${process.pid} started`);
}

