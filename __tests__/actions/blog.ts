import { Process, api, specHelper } from 'actionhero';
import { omit } from 'lodash';

const actionHero = new Process();

describe('postAdd test', () => {
  beforeAll(async () => {
    await actionHero.start();
    await api.redis.clients.client.flushdb();
  });

  afterAll(async () => {
    await actionHero.stop();
  });

  test('can add new post', async () => {
    const createUserForTest = await specHelper.runAction('userAdd', {
      userName: 'Poll',
      password: '1111',
    });
    const response = await specHelper.runAction('postAdd', {
      userName: 'Poll',
      password: '1111',
      title: 'task',
      content: 'Hello everyone!!!',
    });

    expect(JSON.stringify(omit(response.post, ['createdAt', 'updatedAt']))).toEqual(
      JSON.stringify({
        content: 'Hello everyone!!!',
        title: 'task',
        userName: 'Poll',
      }),
    );
  });

  test('can`t add new post', async () => {
    const response = await specHelper.runAction('postAdd', {
      userName: 'HHHH',
      password: '1111',
      title: 'task',
      content: 'Hello everyone!!!',
    });

    expect(response.error).toBe(
      "Error: userName does not exist (TypeError: Cannot read property 'hashedPassword' of null)",
    );
  });
});
