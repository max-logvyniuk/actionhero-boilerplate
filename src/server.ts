#!/usr/bin/env node
import * as actionhero from 'actionhero';
import * as path from 'path';
import * as os from 'os';

// load any custom code, configure the env, as needed

export const PWD: string = path.join(process.cwd());

async function main() {
  // create a new actionhero process
  console.info('ACTION HERO!!!', actionhero);
  const app = new actionhero.Process();

  // handle unix signals and uncaught exceptions & rejections
  app.registerProcessSignals((exitCode) => {
    process.exit(exitCode);
  });

  // start the app!
  // you can pass custom configuration to the process as needed
  await app.start();
}

main();
