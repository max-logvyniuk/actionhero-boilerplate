import { Process, api, specHelper } from "actionhero";

import { getUser, deleteUser } from "../../src/modules/users";

const actionhero = new Process();

const whereAttribute = {
  email: "john.smith@gmail.com"
}

describe("actionhero users Tests", () => {
  beforeAll(async () => {
    await actionhero.start();
    await api.redis.clients.client.flushdb();

    const checkIfUserExist = await getUser(whereAttribute, {
      paranoid: true
    });

    console.info('checkIfUserExist!!!', checkIfUserExist);

    if (checkIfUserExist?.email) {
      const deleteRes = await deleteUser(whereAttribute, {
        force: true
      });
      console.info('deleteRes!!!', deleteRes)
    }
  });

  afterAll(async () => {
    await actionhero.stop();
  });

  test("can create a user", async () => {
    const response = await specHelper.runAction("userAdd", {
      userName: "evan",
      password: "password",
    });
    expect(response.error).toBeUndefined();
  });

  test("cannot create a user with an existing name", async () => {
    const response = await specHelper.runAction("userAdd", {
      userName: "evan",
      password: "password",
    });

    expect(response.error).toMatch(/userName already exists/);
  });

  test("create user in mariaDB", async () => {

    const response = await specHelper.runAction('createUserMd', {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@gmail.com",
      password: "root"
    });

    expect(response.newUser).toMatchObject({
            guid: expect.any(String),
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@gmail.com",
            updatedAt: expect.any(Date),
            createdAt: expect.any(Date)
        },)
  })
});
