import type z from 'zod/v4';
import { createPageSchema } from '../../api/schemas/page';
import { PostSchema } from './post';

export const PostPageSchema = createPageSchema(PostSchema);

export type PostPageSchema = z.infer<typeof PostPageSchema>;
