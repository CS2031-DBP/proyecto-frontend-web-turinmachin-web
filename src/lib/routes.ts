import { SessionUserSchema } from './auth/schemas/session-user';
import { DegreeSchema } from './degree/schemas/degree';
import { PostSchema } from './post/schemas/post';
import { UniversitySchema } from './university/schemas/university';

export const routes = {
  home: '/',
  verify: '/verify',
  users: {
    root: '/users',
    byUsername: (user: SessionUserSchema) => `/users/${user.username}`,
    editByUsername: (user: SessionUserSchema) => `/users/${user.username}/edit`,
  },
  posts: {
    root: '/posts',
    byId: (post: PostSchema) => `/posts/${post.id}`,
    editById: (post: PostSchema) => `/posts/${post.id}/edit`,
  },
  universities: {
    root: '/universities',
    byId: (university: UniversitySchema) => `/universities/${university.id}`,
  },
  degrees: {
    root: '/degrees',
    byId: (degree: DegreeSchema) => `/degrees/${degree.id}`,
  },
} as const;
