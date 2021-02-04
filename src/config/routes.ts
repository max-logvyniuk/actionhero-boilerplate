export const DEFAULT = {
  routes: (config) => {
    return {
      get: [
        { path: '/status', action: 'status' },
        { path: '/swagger', action: 'swagger' },
        { path: '/users', action: 'usersList' },
        { path: '/md-users', action: 'usersListMd' },
        { path: '/md-user', action: 'getUserMd' },
        { path: '/comments/:userName/:title', action: 'commentsView' },
        { path: '/post/:userName/:title', action: 'postView' },
        { path: '/posts/:userName/', action: 'postsList' },
        { path: '/stream', action: 'getDataStream' },
      ],

      post: [
        { path: '/authenticate', action: 'authenticate' },
        { path: '/user', action: 'userAdd' },
        { path: '/md-user', action: 'createUserMd' },
        { path: '/comment/:userName/:title', action: 'commentAdd' },
        { path: '/post/:userName/', action: 'postAdd' },
        { path: '/stream', action: 'setDataWithStream' },
      ],

      put: [{ path: '/post/:userName/:title', action: 'postEdit' }],

      delete: [
        { path: '/user/:userName', action: 'userDelete' },
        { path: '/md-user', action: 'deleteUserMd' },
        {
          path: '/comment/:userName/:title/:commentId',
          action: 'commentDelete',
        },
        { path: '/post/:userName/:title', action: 'postDelete' },
      ],
    };
  },
};
