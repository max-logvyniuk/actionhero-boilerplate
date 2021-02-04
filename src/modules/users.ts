import * as bcrypt from 'bcrypt';
import { api } from 'actionhero';

import { User } from '../models/User';

const saltRounds = 10;
const usersHash = 'users';

export async function add(userName: string, password: string) {
  const savedUser = await redis().hget(usersHash, userName);
  if (savedUser) {
    throw new Error('userName already exists');
  }
  const hashedPassword = await cryptPassword(password);
  const data = {
    userName: userName,
    hashedPassword: hashedPassword,
    createdAt: new Date().getTime(),
  };

  await redis().hset(usersHash, userName, JSON.stringify(data));
}

export async function list() {
  const userData = await redis().hgetall(usersHash);
  return Object.keys(userData).map((k) => {
    const data = JSON.parse(userData[k]);
    delete data.hashedPassword;
    return data;
  });
}

export async function authenticate(userName: string, password: string): Promise<boolean> {
  try {
    const dataString = await redis().hget(usersHash, userName);
    const data = JSON.parse(dataString);
    if (!data.hashedPassword) throw new Error();
    return comparePassword(data?.hashedPassword, password);
  } catch (error) {
    throw new Error(`userName does not exist (${error})`);
  }
}

export async function del(userName: string) {
  await redis().del(usersHash, userName);
  const titles = await api.blog.postsList(userName);
  for (const i in titles) {
    await api.blog.deletePost(userName, titles[i]);
  }
}

async function cryptPassword(password: string) {
  return bcrypt.hash(password, saltRounds);
}

async function comparePassword(hashedPassword: string, userPassword: String) {
  return bcrypt.compare(userPassword, hashedPassword);
}

function redis() {
  return api.redis.clients.client;
}

// MariaDb services

async function createUser(data: any) {
  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    // passwordHash: passwordHash
  });

  await newUser.save();

  // console.info('newUser2!!!', newUser);
  await newUser.updatePassword(data.password);

  return newUser;
}

async function getUser(where: any, options?: {}) {
  const defaultOptions = { raw: true, attributes: { exclude: ['password'] } };
  options = { ...defaultOptions, ...options };
  const user = await User.findOne({
    where,
    ...options,
  });

  // console.info('getUser module!!!!!', where, user);

  return user;
}

async function deleteUser(where: any, options?: {}) {
  const defaultOptions = { force: false };
  options = { ...defaultOptions, ...options };
  return User.destroy({
    where,
    ...options,
  });
}

async function getUsersList() {
  const users = await User.findAll({ raw: true });
  return users;
}

export { getUser, getUsersList, createUser, deleteUser };
