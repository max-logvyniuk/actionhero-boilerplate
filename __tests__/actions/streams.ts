import { Process, api, specHelper, action } from "actionhero";
import * as fs from "fs";
import { ReadStream } from "fs";
import * as _ from "lodash";

import { PWD } from "../../src/server";

const actionHero = new Process();

describe("actionHero Stream Test", () => {
  beforeAll(async () => {
    await actionHero.start();
    await api.redis.clients.client.flushdb();
  });

  afterAll(async () => {
    await actionHero.stop();
  });

  test("create read stream from file that stored in server", async () => {
      jest.mock('actionhero');

      const readStream = await fs.createReadStream(
          `${PWD}/files/new.txt`
      );

      const response = await specHelper.runAction("getDataStream", {
        fileName: "new.txt",
      });

      const dataStream: ReadableStream = response.dataStream;

      console.info('Stream test!!!', response.dataStream, readStream);


      expect(response.dataStream).toMatchObject(readStream);

  });
});
