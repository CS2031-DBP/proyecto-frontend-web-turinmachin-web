export const routes = {
  home: '/',
  verify: '/verify',
  resetPassword: '/reset-password',
  users: {
    root: '/users',
    byUsername: (username: string) => `/users/${username}`,
    editByUsername: (username: string) => `/users/${username}/edit`,
    changePasswordByUsername: (username: string) =>
      `/users/${username}/change-password`,
  },
  posts: {
    root: '/posts',
    byId: (id: string) => `/posts/${id}`,
    editById: (id: string) => `/posts/${id}/edit`,
  },
  universities: {
    root: '/universities',
    add: '/universities/add',
    byId: (id: string) => `/universities/${id}`,
    editById: (id: string) => `/universities/${id}/edit`,
  },
  degrees: {
    root: '/degrees',
    add: '/degrees/add',
    byId: (id: string) => `/degrees/${id}`,
    editById: (id: string) => `/degrees/${id}/edit`,
  },
  chat: {
    root: '/chat',
    niva: '/chat/niva',
    withUser: (username: string) => `/chat/${username}`,
  },
} as const;
