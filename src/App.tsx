import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import { UserProvider } from './lib/auth/components/UserProvider';
import { Layout } from './lib/common/components/layout/Layout';
import { PostPopupProvider } from './lib/post/components/PostPopupProvider';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Register } from './pages/Register';
import { Post } from './pages/posts/Post';
import { Posts } from './pages/posts/Posts';

const queryClient = new QueryClient();

export const App = () => (
  <BrowserRouter>
    <form onSubmit={() => {}}></form>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PostPopupProvider>
          <Layout>
            <Routes>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:postId" element={<Post />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </PostPopupProvider>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
