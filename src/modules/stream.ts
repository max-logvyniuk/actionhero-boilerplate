import { Writable, Readable } from 'stream';
import * as fs from 'fs';
import { PWD } from '../server';

// const outStream = new Writable({
//     write(chunk, encoding, callback) {
//         console.log(chunk.toString());
//         callback();
//     }
// });
//
// process.stdin.pipe(outStream);

// export class myReadableStream extends Readable {
//     constructor(opt) {
//         super(opt);
//     }
//
// }
//
// export class myWritableStream extends Writable {
//     constructor(opt) {
//         super(opt);
//     }
//
//     _write(chunk, encoding, callback) {}
// }
//
// const data = "rgrgergregegwrgwgwgwg";
//
// const myStream = new myWritableStream(data)
//
// process.stdin.pipe(myStream);

export async function fileWriteStreamHandler(...props) {
  console.info('Custom fileWriteStreamHandler!!!!!!!!!!!!!!', props);
}

export async function readFile(path: string) {
  const file = await fs.createReadStream(path);
  return file;
}

export async function writeDataToFile(fileName: string, encoding?: string) {
  const ed = encoding || 'utf-8';
  const writeFileStream = await fs.createWriteStream(`${PWD}/files/${fileName}`, ed);
  return writeFileStream;
}
