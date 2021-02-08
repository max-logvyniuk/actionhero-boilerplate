import * as fs from 'fs';

import { AuthenticatedAction } from '../classes/authenticatedAction';
import * as StreamFiles from './../modules/stream';

export class GetDataStream extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'getDataStream';
    this.description = 'Get data stream';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {
      // userName: { required: true },
      // title: { required: true },
    };
  }

  async run(actionProcessor) {
    const { connection } = actionProcessor;
    const { params } = connection;

    const dataStream = await fs.createReadStream(`${process.cwd()}/files/${params.fileName}`);
    // const dataStream = await StreamFiles.readFile(params.fileName);

    return {
      dataStream,
    };
    // return dataStream;
  }
}

export class SetDataWithStream extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'setDataWithStream';
    this.description = 'Set data with stream';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {
      // file1: { required: true },
      // key1: { required: false },
    };
  }

  async run(actionProcessor) {
    /** In postman settings
     * form-data
     * enctype multipart/form-data
     * file "choose upload file"
     * **/
    const { connection } = actionProcessor;
    const { params } = connection;

    await fs.rename(params.file.path, `${process.cwd()}/files/${params.file.name}`, (err) => {
      if (err) throw err;
    });

    const newFile = await StreamFiles.readFile(`${process.cwd()}/files/${params.file.name}`);

    return newFile;
  }
}
