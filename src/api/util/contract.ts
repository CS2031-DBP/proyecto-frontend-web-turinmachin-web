import { AIMessageResponseSchema } from '@/ai/schemas/ai-message-response';
import { LoginRequestSchema } from '@/auth/schemas/login-request';
import { LoginResponseSchema } from '@/auth/schemas/login-response';
import { GoogleLoginRequestSchema } from '@/auth/schemas/oauth2-credentials';
import { RegisterRequestSchema } from '@/auth/schemas/register-request';
import { ResetPasswordSchema } from '@/auth/schemas/reset-password';
import { CommentSchema } from '@/comment/schemas/comment';
import { CreateCommentSchema } from '@/comment/schemas/create-comment';
import { CreateDegreeSchema } from '@/degree/schemas/create-degree';
import { DegreePageSchema, DegreeSchema } from '@/degree/schemas/degree';
import { DegreeWithStatsSchema } from '@/degree/schemas/degree-with-stats';
import { UpdateDegreeSchema } from '@/degree/schemas/update-degree';
import { PostPageSchema, PostSchema } from '@/post/schemas/post';
import { UpdatePostSchema } from '@/post/schemas/update-post';
import { CreateUniversitySchema } from '@/university/schemas/create-university';
import {
  UniversityPageSchema,
  UniversitySchema,
} from '@/university/schemas/university';
import { UniversityWithStatsSchema } from '@/university/schemas/university-with-stats';
import { UpdateUniversitySchema } from '@/university/schemas/update-university';
import { RoleSchema } from '@/user/schemas/role';
import { UpdatePasswordSchema } from '@/user/schemas/update-password';
import { UpdateUserSchema } from '@/user/schemas/update-user';
import { UserPageSchema, UserSchema } from '@/user/schemas/user';
import { z } from 'zod/v4';
import { DetailResponseSchema } from '../schemas/detail-response';

import { ChatSubscriptionSchema } from '@/chat/schemas/chat-subscription';
import { CreatePostSchema } from '@/post/schemas/create-post';
import { SelfUserSchema } from '@/user/schemas/self-user';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const appContract = c.router(
  {
    register: {
      method: 'POST',
      path: '/auth/register',
      body: RegisterRequestSchema,
      responses: {
        200: LoginResponseSchema,
        409: DetailResponseSchema,
      },
    },
    login: {
      method: 'POST',
      path: '/auth/login',
      body: LoginRequestSchema,
      responses: {
        200: LoginResponseSchema,
        401: DetailResponseSchema,
        403: DetailResponseSchema,
      },
    },
    googleLogin: {
      method: 'POST',
      path: '/auth/oauth/google/login',
      body: GoogleLoginRequestSchema,
      responses: {
        200: LoginResponseSchema,
        403: DetailResponseSchema,
        404: DetailResponseSchema,
      },
    },
    googleRegister: {
      method: 'POST',
      path: '/auth/oauth/google/register',
      body: GoogleLoginRequestSchema,
      responses: {
        200: LoginResponseSchema,
        409: DetailResponseSchema,
      },
    },
    googleLoginUpgrade: {
      method: 'POST',
      path: '/auth/oauth/google/upgrade',
      body: GoogleLoginRequestSchema,
      responses: {
        200: LoginResponseSchema,
      },
    },
    resendVerificationEmail: {
      method: 'POST',
      path: '/auth/verify-resend',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
        429: DetailResponseSchema,
      },
    },
    verify: {
      method: 'POST',
      path: '/auth/verify',
      body: z.object({ verificationId: z.string() }),
      responses: {
        200: UserSchema,
      },
    },
    requestPasswordReset: {
      method: 'POST',
      path: '/auth/request-password-reset',
      body: z.object({ email: z.string() }),
      responses: {
        204: c.noBody(),
        404: DetailResponseSchema,
        409: DetailResponseSchema,
      },
    },
    verifyResetToken: {
      method: 'POST',
      path: '/auth/verify-reset-token',
      body: z.object({ token: z.string() }),
      responses: {
        200: z.object({ valid: z.boolean() }),
      },
    },
    resetPassword: {
      method: 'POST',
      path: '/auth/reset-password',
      body: ResetPasswordSchema,
      responses: {
        204: c.noBody(),
        404: DetailResponseSchema,
      },
    },
    getSelf: {
      method: 'GET',
      path: '/users/@self',
      responses: {
        200: SelfUserSchema,
      },
    },
    updateSelf: {
      method: 'PUT',
      path: '/users/@self',
      body: UpdateUserSchema,
      responses: {
        200: SelfUserSchema,
        409: DetailResponseSchema,
      },
    },
    updateSelfPicture: {
      method: 'PATCH',
      path: '/users/@self/picture',
      contentType: 'multipart/form-data',
      body: z.object({ picture: z.instanceof(File) }),
      responses: {
        200: SelfUserSchema,
      },
    },
    deleteSelfPicture: {
      method: 'DELETE',
      path: '/users/@self/picture',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    updateSelfPassword: {
      method: 'PATCH',
      path: '/users/@self/password',
      body: UpdatePasswordSchema,
      responses: {
        204: c.noBody(),
        401: DetailResponseSchema,
      },
    },
    deleteSelf: {
      method: 'DELETE',
      path: '/users/@self',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    getUsers: {
      method: 'GET',
      path: '/users',
      query: z.object({
        page: z.number().optional(),
        size: z.number().optional(),
        query: z.string().optional(),
      }),
      responses: {
        200: UserPageSchema,
      },
    },
    getUserById: {
      method: 'GET',
      path: '/users/:id',
      responses: {
        200: UserSchema,
        404: DetailResponseSchema,
        400: DetailResponseSchema,
      },
    },
    getUserByUsername: {
      method: 'GET',
      path: '/users/username/:username',
      responses: {
        200: UserSchema,
        404: DetailResponseSchema,
      },
    },
    updateUserRole: {
      method: 'PATCH',
      path: '/users/:id/role',
      body: z.object({ role: RoleSchema }),
      responses: {
        200: UserSchema,
      },
    },
    deleteUser: {
      method: 'DELETE',
      path: '/users/:id',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    getPosts: {
      method: 'GET',
      path: '/posts',
      query: z.object({
        query: z.string().optional(),
        authorId: z.string().optional(),
        universityId: z.string().optional(),
        degreeId: z.string().optional(),
        upvotedBy: z.string().optional(),
        tags: z.array(z.string()).optional(),
        page: z.number().optional(),
        size: z.number().optional(),
      }),
      responses: {
        200: PostPageSchema,
      },
    },
    getPost: {
      method: 'GET',
      path: '/posts/:id',
      responses: {
        200: PostSchema,
        404: DetailResponseSchema,
        400: DetailResponseSchema,
      },
    },
    createPost: {
      method: 'POST',
      path: '/posts',
      contentType: 'multipart/form-data',
      body: CreatePostSchema,
      responses: {
        201: PostSchema,
        403: DetailResponseSchema,
      },
    },
    suggestTags: {
      method: 'GET',
      path: '/posts/suggest-tags',
      query: z.object({
        content: z.string(),
      }),
      responses: {
        200: z.array(z.string()),
        403: DetailResponseSchema,
      },
    },
    updatePost: {
      method: 'PUT',
      path: '/posts/:id',
      body: UpdatePostSchema,
      responses: {
        200: PostSchema,
      },
    },
    getPostComments: {
      method: 'GET',
      path: '/posts/:id/comments',
      responses: {
        200: z.array(CommentSchema),
      },
    },
    createPostComment: {
      method: 'POST',
      path: '/posts/:id/comments',
      body: CreateCommentSchema,
      responses: {
        201: CommentSchema,
        403: DetailResponseSchema,
      },
    },
    createPostCommentReply: {
      method: 'POST',
      path: '/posts/:id/comments/:parentId/replies',
      body: CreateCommentSchema,
      responses: {
        201: CommentSchema,
        403: DetailResponseSchema,
      },
    },
    deletePostComment: {
      method: 'DELETE',
      path: '/posts/:id/comments/:commentId',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    upvotePost: {
      method: 'PUT',
      path: '/posts/:id/upvotes',
      body: c.noBody(),
      responses: { 204: c.noBody() },
    },
    downvotePost: {
      method: 'PUT',
      path: '/posts/:id/downvotes',
      body: c.noBody(),
      responses: { 204: c.noBody() },
    },
    removePostVote: {
      method: 'DELETE',
      path: '/posts/:id/votes',
      body: c.noBody(),
      responses: { 204: c.noBody() },
    },
    deletePost: {
      method: 'DELETE',
      path: '/posts/:id',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    getUniversities: {
      method: 'GET',
      path: '/universities',
      query: z.object({
        page: z.number().optional(),
        size: z.number().optional(),
        query: z.string().optional(),
      }),
      responses: {
        200: UniversityPageSchema,
      },
    },
    getUniversityById: {
      method: 'GET',
      path: '/universities/:id',
      responses: {
        200: UniversitySchema,
        404: DetailResponseSchema,
        400: DetailResponseSchema,
      },
    },
    getUniversityWithStatsById: {
      method: 'GET',
      path: '/universities/with-stats/:id',
      responses: {
        200: UniversityWithStatsSchema,
        404: DetailResponseSchema,
        400: DetailResponseSchema,
      },
    },
    getUniversityByEmailDomain: {
      method: 'GET',
      path: '/universities/domain/:emailDomain',
      responses: {
        200: UniversitySchema,
        404: DetailResponseSchema,
      },
    },
    createUniversity: {
      method: 'POST',
      path: '/universities',
      body: CreateUniversitySchema,
      responses: {
        201: UniversitySchema,
      },
    },
    updateUniversity: {
      method: 'PUT',
      path: '/universities/:id',
      body: UpdateUniversitySchema,
      responses: {
        200: UniversitySchema,
      },
    },
    removeUniversity: {
      method: 'DELETE',
      path: '/universities/:id',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    getDegrees: {
      method: 'GET',
      path: '/degrees',
      query: z.object({
        page: z.number().optional(),
        size: z.number().optional(),
        universityId: z.string().optional(),
        query: z.string().optional(),
      }),
      responses: {
        200: DegreePageSchema,
      },
    },
    getAllDegrees: {
      method: 'GET',
      path: '/degrees/all',
      query: z.object({
        universityId: z.string().optional(),
      }),
      responses: {
        200: z.array(DegreeSchema),
      },
    },
    getDegreeById: {
      method: 'GET',
      path: '/degrees/:id',
      responses: {
        200: DegreeWithStatsSchema,
        404: DetailResponseSchema,
        400: DetailResponseSchema,
      },
    },
    createDegree: {
      method: 'POST',
      path: '/degrees',
      body: CreateDegreeSchema,
      responses: {
        201: DegreeSchema,
      },
    },
    updateDegree: {
      method: 'PUT',
      path: '/degrees/:id',
      body: UpdateDegreeSchema,
      responses: {
        200: DegreeSchema,
      },
    },
    removeDegree: {
      method: 'DELETE',
      path: '/degrees/:id',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    getConversation: {
      method: 'GET',
      path: '/ai/conversation',
      responses: {
        200: z.array(AIMessageResponseSchema),
      },
    },
    sendMessage: {
      method: 'POST',
      path: '/ai/message',
      body: z.object({ content: z.string() }),
      responses: {
        201: AIMessageResponseSchema,
      },
    },
    resetConversation: {
      method: 'DELETE',
      path: '/ai/conversation',
      body: c.noBody(),
      responses: {
        204: c.noBody(),
      },
    },
    saveSubscription: {
      method: 'POST',
      path: '/chat/subscribe',
      body: ChatSubscriptionSchema,
      responses: {
        204: c.noBody(),
        409: DetailResponseSchema,
      },
    },
  },
  { strictStatusCodes: true },
);
