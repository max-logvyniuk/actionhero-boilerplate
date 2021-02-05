import { action, Process, api, specHelper } from 'actionhero';
import { getUser, deleteUser } from '../../src/modules/users';
import * as usersModule from '../../src/modules/users';

const actionhero = new Process();

describe('actionhero users Tests', () => {
  beforeAll(async () => {
    await actionhero.start();
    await api.redis.clients.client.flushdb();
  });

  afterAll(async () => {
    await actionhero.stop();
  });

  test('can create a user', async () => {
    const response = await specHelper.runAction('userAdd', {
      userName: 'evan',
      password: 'password',
    });
    expect(response.error).toBeUndefined();
  });

  test('cannot create a user with an existing name', async () => {
    const response = await specHelper.runAction('userAdd', {
      userName: 'evan',
      password: 'password',
    });

    expect(response.error).toMatch(/userName already exists/);
  });

  // MariaDB tests

  test('create user in mariaDB', async () => {
    const addMockToCreateUserFunction = jest.spyOn(usersModule, 'createUser');
    // @ts-ignore
    addMockToCreateUserFunction.mockResolvedValue({
      guid: 'wsfwef',
      firstName: 'John',
      lastName: 'Smith',
      email: 'olaf.smith@gmail.com',
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    const { newUser, error } = await specHelper.runAction('createUserMd', {
      firstName: 'John',
      lastName: 'Smith',
      email: 'olaf.smith@gmail.com',
      password: 'root',
    });

    expect(error).toBeFalsy();
    expect(newUser).toMatchObject({
      guid: expect.any(String),
      firstName: 'John',
      lastName: 'Smith',
      email: 'olaf.smith@gmail.com',
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });

  test('can`t create user in mariaDB', async () => {
    const mockedGetUserFunction = jest.spyOn(usersModule, 'getUser');

    // @ts-ignore
    mockedGetUserFunction.mockResolvedValue({
      guid: 'wsfwef',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    const { error } = await specHelper.runAction('createUserMd', {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      password: 'root',
    });

    expect(error).toBe(`User with email john.smith@gmail.com already exist`);
  });

  test('can get user from mariaDB', async () => {
    const mockedGEtUsersListFunction = jest.spyOn(usersModule, 'getUsersList');

    mockedGEtUsersListFunction.mockResolvedValue([
      // @ts-ignore
      {
        guid: 'wsfwef',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@gmail.com',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      // @ts-ignore
      {
        guid: 'wsfwef',
        firstName: 'John',
        lastName: 'Smith',
        email: 'olaf.smith@gmail.com',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
    const { users, error } = await specHelper.runAction('usersListMd', {});

    // console.info('Test can get user from mariaDB!!!', users[0], users, error);
    expect(users[0]?.firstName).toStrictEqual(expect.any(String));
  });

  test('can`t get users list in MDB', async () => {
    const mockedGetUsersListFunction = jest.spyOn(usersModule, 'getUsersList');

    // @ts-ignore
    mockedGetUsersListFunction.mockResolvedValue(null);

    const { users, error } = await specHelper.runAction('usersListMd');

    console.info('Users list error!!!!', users, error);

    expect(users).toBeNull();
  });
});
