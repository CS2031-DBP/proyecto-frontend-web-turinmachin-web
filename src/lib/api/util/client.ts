import { LoginRequestSchema } from '@/lib/auth/schemas/login-request';
import { LoginResponseSchema } from '@/lib/auth/schemas/login-response';
import { RegisterRequestSchema } from '@/lib/auth/schemas/register-request';
import { CommentSchema } from '@/lib/comment/schemas/comment';
import { CreateCommentSchema } from '@/lib/comment/schemas/create-comment';
import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { PostPageSchema, PostSchema } from '@/lib/post/schemas/post';
import { UpdatePostSchema } from '@/lib/post/schemas/update-post';
import { CreateUniversitySchema } from '@/lib/university/schemas/create-university';
import { UniversitySchema } from '@/lib/university/schemas/university';
import { RoleSchema } from '@/lib/user/schemas/role';
import { UpdateUserSchema } from '@/lib/user/schemas/update-user';
import { UserSchema } from '@/lib/user/schemas/user';
import { makeApi, Zodios } from '@zodios/core';
import { Session } from 'next-auth';
import { z } from 'zod';
import { DetailResponseSchema } from '../schemas/detail-response';

export const api = makeApi([
  {
    alias: 'register',
    method: 'post',
    path: '/auth/register',
    parameters: [{ name: 'body', type: 'Body', schema: RegisterRequestSchema }],
    response: LoginResponseSchema,
    errors: [{ status: 401, schema: DetailResponseSchema }],
  },
  {
    alias: 'login',
    method: 'post',
    path: '/auth/login',
    parameters: [{ name: 'body', type: 'Body', schema: LoginRequestSchema }],
    response: LoginResponseSchema,
    errors: [{ status: 401, schema: DetailResponseSchema }],
  },
  {
    alias: 'resendVerificationEmail',
    method: 'post',
    path: '/auth/verify-resend',
    response: z.void(),
  },
  {
    alias: 'verify',
    method: 'post',
    path: '/auth/verify',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ verificationId: z.string() }),
      },
    ],
    response: UserSchema,
  },
  {
    alias: 'getSelf',
    method: 'get',
    path: '/users/@self',
    response: UserSchema,
  },
  {
    alias: 'updateSelf',
    method: 'put',
    path: '/users/@self',
    parameters: [{ type: 'Body', name: 'body', schema: UpdateUserSchema }],
    response: UserSchema,
  },
  {
    alias: 'updateSelfPicture',
    method: 'patch',
    path: '/users/@self/picture',
    requestFormat: 'form-data',
    parameters: [
      {
        type: 'Body',
        name: 'body',
        schema: z.object({ picture: z.instanceof(File) }),
      },
    ],
    response: UserSchema,
  },
  {
    alias: 'deleteSelfPicture',
    method: 'delete',
    path: '/users/@self/picture',
    response: z.void(),
  },
  {
    alias: 'getUserById',
    method: 'get',
    path: '/users/:id',
    errors: [
      { status: 404, schema: DetailResponseSchema },
      { status: 400, schema: DetailResponseSchema },
    ],
    response: UserSchema,
  },
  {
    alias: 'getUserByUsername',
    method: 'get',
    path: '/users/username/:username',
    errors: [{ status: 404, schema: DetailResponseSchema }],
    response: UserSchema,
  },
  {
    alias: 'updateUserRole',
    method: 'patch',
    path: '/users/:id/role',
    parameters: [
      { type: 'Body', name: 'body', schema: z.object({ role: RoleSchema }) },
    ],
    response: UserSchema,
  },
  {
    alias: 'getPosts',
    method: 'get',
    path: '/posts',
    parameters: [
      { name: 'query', type: 'Query', schema: z.string().optional() },
      { name: 'authorId', type: 'Query', schema: z.string().optional() },
      { name: 'universityId', type: 'Query', schema: z.string().optional() },
      { name: 'degreeId', type: 'Query', schema: z.string().optional() },
      { name: 'tags', type: 'Query', schema: z.string().array().optional() },
      { name: 'page', type: 'Query', schema: z.number().optional() },
      { name: 'size', type: 'Query', schema: z.number().optional() },
    ],
    response: PostPageSchema,
  },
  {
    alias: 'getPost',
    method: 'get',
    path: '/posts/:id',
    response: PostSchema,
    errors: [
      { status: 404, schema: DetailResponseSchema },
      { status: 400, schema: DetailResponseSchema },
    ],
  },
  {
    alias: 'createPost',
    method: 'post',
    path: '/posts',
    parameters: [
      { type: 'Body', name: 'body', schema: z.instanceof(FormData) },
    ],
    response: PostSchema,
  },
  {
    alias: 'updatePost',
    method: 'put',
    path: '/posts/:id',
    parameters: [{ type: 'Body', name: 'body', schema: UpdatePostSchema }],
    response: PostSchema,
  },
  {
    alias: 'getPostComments',
    method: 'get',
    path: '/posts/:id/comments',
    response: CommentSchema.array(),
  },
  {
    alias: 'createPostComment',
    method: 'post',
    path: '/posts/:id/comments',
    parameters: [{ type: 'Body', name: 'body', schema: CreateCommentSchema }],
    response: CommentSchema,
  },
  {
    alias: 'createPostCommentReply',
    method: 'post',
    path: '/posts/:id/comments/:parentId/replies',
    parameters: [{ type: 'Body', name: 'body', schema: CreateCommentSchema }],
    response: CommentSchema,
  },
  {
    alias: 'deletePostComment',
    method: 'delete',
    path: '/posts/:id/comments/:commentId',
    response: z.void(),
  },
  {
    alias: 'upvotePost',
    method: 'put',
    path: '/posts/:id/upvotes',
    response: z.void(),
  },
  {
    alias: 'downvotePost',
    method: 'put',
    path: '/posts/:id/downvotes',
    response: z.void(),
  },
  {
    alias: 'removePostVote',
    method: 'delete',
    path: '/posts/:id/votes',
    response: z.void(),
  },
  {
    alias: 'deletePost',
    method: 'delete',
    path: '/posts/:id',
    response: z.void(),
  },
  {
    alias: 'getUniversities',
    method: 'get',
    path: '/universities',
    response: UniversitySchema.array(),
  },
  {
    alias: 'getUniversityById',
    method: 'get',
    path: '/universities/:id',
    response: UniversitySchema,
    errors: [
      { status: 404, schema: DetailResponseSchema },
      { status: 400, schema: DetailResponseSchema },
    ],
  },
  {
    alias: 'getUniversityByEmailDomain',
    method: 'get',
    path: '/universities/domain/:emailDomain',
    response: UniversitySchema,
    errors: [{ status: 404, schema: DetailResponseSchema }],
  },
  {
    alias: 'createUniversity',
    method: 'post',
    path: '/universities',
    parameters: [
      { type: 'Body', name: 'body', schema: CreateUniversitySchema },
    ],
    response: UniversitySchema,
  },
  {
    alias: 'getDegrees',
    method: 'get',
    path: '/degrees',
    parameters: [
      {
        name: 'universityId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: DegreeSchema.array(),
  },
  {
    alias: 'getDegree',
    method: 'get',
    path: '/degrees/:id',
    response: DegreeSchema,
    errors: [
      { status: 404, schema: DetailResponseSchema },
      { status: 400, schema: DetailResponseSchema },
    ],
  },
]);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is missing');
}

export const apiClient = new Zodios(apiUrl, api);

export const sessionApiClient = (session: Session | null) =>
  new Zodios(apiUrl, api, {
    axiosConfig: {
      headers: {
        Authorization: session?.accessToken
          ? `Bearer ${session.accessToken}`
          : undefined,
      },
    },
  });
