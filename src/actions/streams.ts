import * as fs from "fs";

import { AuthenticatedAction } from "../classes/authenticatedAction";
import { PWD } from "../server";
import * as StreamFiles from "./../modules/stream";

export class GetDataStream extends AuthenticatedAction {
  constructor() {
    super();
    this.name = "getDataStream";
    this.description = "Get data stream";
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

    const dataStream = await fs.createReadStream(
      `${PWD}/files/${params.fileName}`
    );
    // const dataStream = await StreamFiles.readFile(params.fileName);

    return {
       dataStream
    };
    // return dataStream;
  }
}

export class SetDataWithStream extends AuthenticatedAction {
  constructor() {
    super();
    this.name = "setDataWithStream";
    this.description = "Set data with stream";
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

    console.info("Stream query!!!!!!!!!!", actionProcessor);

    await fs.rename(
      params.file.path,
      `${PWD}/files/${params.file.name}`,
      (err) => {
        if (err) throw err;
        console.log("renamed complete!!!!!!!!!!!!!");
      }
    );

    const newFile = await StreamFiles.readFile(
      `${PWD}/files/${params.file.name}`
    );

    return newFile;
  }
}
