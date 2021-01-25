#!/usr/bin/env node
import { Process } from "actionhero";

// load any custom code, configure the env, as needed

const arrayFromAppDir = `${__dirname}`.split("\\");
export const PWD: string = arrayFromAppDir
  .slice(0, arrayFromAppDir.length - 1)
  .join("\\");

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
