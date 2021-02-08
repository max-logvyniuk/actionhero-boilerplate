import * as bcrypt from 'bcrypt';

import { AuthenticatedAction } from './../classes/authenticatedAction';
import * as Users from './../modules/users';
import { User } from '../models/User';
import { createUser, getUser, getUsersList, deleteUser } from './../modules/users';

const saltRounds = 10;

exports.userAdd = class UserAdd extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'userAdd';
    this.description = 'I add a user';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {
      userName: { required: true },
      password: { required: true },
    };
  }

  async run({ params }) {
    await Users.add(params.userName, params.password);
    return { success: true };
  }
};

exports.userDelete = class UserDelete extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'userDelete';
    this.description = 'I delete a user';
    this.outputExample = {};
    this.authenticated = true;
    this.inputs = {
      userName: { required: true },
      password: { required: true },
    };
  }

  async run({ params }) {
    await Users.del(params.userName);
  }
};

exports.usersList = class UsersList extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'usersList';
    this.description = 'I list all the users';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {};
  }

  async run() {
    const users = await Users.list();
    return {
      users: users.map((user) => {
        return user.userName;
      }),
    };
  }
};

exports.authenticate = class Authenticate extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'authenticate';
    this.description = 'I authenticate a user';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {
      userName: { required: true },
      password: { required: true },
    };
  }

  async run({ params }) {
    const authenticated = await Users.authenticate(params.userName, params.password);

    if (!authenticated) {
      throw new Error('unable to log in');
    }

    return { authenticated };
  }
};

exports.usersListMd = class UsersListMd extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'usersListMd';
    this.description = 'I list all the users';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {};
  }

  async run() {
    try {
      const users = await getUsersList();
      // console.info('Md users!!!', users);
      if (users?.length && users?.length > 0) {
        return {
          users,
        };
      }

      return {
        users: null,
      };
    } catch (error) {
      return { error };
    }
  }
};

exports.createUserMd = class CreateUserMd extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'createUserMd';
    this.description = 'Create new user in MariaDb';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {};
  }

  async run(actionProcessor) {
    const { connection } = actionProcessor;
    const params = connection.params;
    try {
      const checkIfUserExist = await getUser({
        email: params.email,
      });

      if (checkIfUserExist?.email) {
        return { error: `User with email ${params.email} already exist` };
      }

      if (!params?.password) {
        return {
          error: 'Password can`t be null',
        };
      }

      const newUser = await createUser(params);

      return {
        newUser: {
          guid: newUser.guid,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          updatedAt: newUser.updatedAt,
          createdAt: newUser.createdAt,
        },
      };
    } catch (error) {
      return { error };
    }
  }
};

exports.getUserMd = class getUserMd extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'getUserMd';
    this.description = 'Get user from MariaDb';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {};
  }

  async run(actionProcessor) {
    const { connection } = actionProcessor;
    const { params } = connection;

    try {
      const where = params?.email
        ? {
            email: params.email,
          }
        : {
            lastName: params?.lastName,
          };

      const user = await getUser(where);

      return {
        user,
      };
    } catch (error) {
      return { error };
    }
  }
};

exports.deleteUserMd = class DeleteUserMd extends AuthenticatedAction {
  constructor() {
    super();
    this.name = 'deleteUserMd';
    this.description = 'Delete user from MariaDb';
    this.outputExample = {};
    this.authenticated = false;
    this.inputs = {};
  }

  async run(actionProcessor) {
    const { connection } = actionProcessor;
    const { params } = connection;

    const options = params?.force
      ? {
          force: true,
        }
      : {};

    const where = params?.quid
      ? {
          quid: params.quid,
        }
      : {
          email: params.email,
        };

    const deleteResult = await deleteUser(where, options);

    return {
      deleteResult,
    };
  }
};
