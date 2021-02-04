#!/usr/bin/env node
import { Process } from 'actionhero';
import * as path from 'path';
import * as os from 'os';

// load any custom code, configure the env, as needed

export const PWD: string = path.join(process.cwd());

async function main() {
  // create a new actionhero process
  const app = new Process();

  // handle unix signals and uncaught exceptions & rejections
  app.registerProcessSignals((exitCode) => {
    process.exit(exitCode);
  });

  // start the app!
  // you can pass custom configuration to the process as needed
  await app.start();
}

main();
