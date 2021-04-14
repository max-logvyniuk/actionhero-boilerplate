#!/usr/bin/env node
const cluster = require('cluster');

import { Process } from 'actionhero';
import { cpus } from 'os';

// const numberOfWorkers = cpus().length;
const numberOfWorkers = process.env.NUMBER_OF_WORKERS || 2;

// load any custom code, configure the env, as needed

async function main() {
  // create a new actionhero process
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numberOfWorkers; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    const app = new Process();

    console.info('sever app1 -----', app);

    // handle unix signals and uncaught exceptions & rejections
    app.registerProcessSignals((exitCode) => {
      process.exit(exitCode);
    });

    console.log(`Worker ${process.pid} started`);

    // start the app!
    // you can pass custom configuration to the process as needed
    try {
      await app.start();
    } catch (error) {
      console.info('server app.start ----', error);
    }

    console.info('sever app2 -----', app);
  }
}

main();
