import { Process, api, specHelper, action } from 'actionhero';
import * as fs from 'fs';
import * as assert from 'assert';
import { ReadStream } from 'fs';
import * as _ from 'lodash';

import { PWD } from '../../src/server';

const actionHero = new Process();

describe('actionHero Stream Test', () => {
  beforeAll(async () => {
    await actionHero.start();
    await api.redis.clients.client.flushdb();
  });

  afterAll(async () => {
    await actionHero.stop();
  });

  test('create read stream from file that stored in backend', async () => {
    // @ts-ignore
    fs.createReadStream = jest.fn();

    // @ts-ignore
    const readStream = await fs.createReadStream.mockResolvedValue({});

    const { dataStream, error } = await action.run('getDataStream', null, {
      fileName: 'new.txt',
    });

    // const dataStream: ReadableStream = response.dataStream;

    // console.info('Stream test!!!', dataStream, readStream);

    expect(fs.createReadStream).toHaveBeenCalledWith(`${PWD}/files/new.txt`);
    expect(dataStream).toMatchObject({});
  });

  describe('create read stream from file that stored in backend (assert)', () => {
    it('return file stream', async () => {
      const readStream = await fs.createReadStream(`${PWD}/files/new.txt`);

      const { dataStream, error } = await action.run('getDataStream', null, {
        fileName: 'new.txt',
      });
      assert.strictEqual(readStream, dataStream);
    });
  });
});
