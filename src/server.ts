#!/usr/bin/env node
import { Process } from "actionhero";
import * as os from 'os';

// load any custom code, configure the env, as needed

const currentOS = os.platform();

let separator;

switch (currentOS) {
  case "linux":
    separator = '/';
    break;
  case "win32":
    separator = "\\";
    break;
  default:
    separator = "/";
}

const arrayFromAppDir = `${__dirname}`.split(`${separator}`);
export const PWD: string = arrayFromAppDir
  .slice(0, arrayFromAppDir.length - 1)
  .join(`${separator}`);

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
