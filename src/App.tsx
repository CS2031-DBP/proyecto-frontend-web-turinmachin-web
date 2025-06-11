import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './lib/auth/components/AuthContextProvider';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route index element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);
export default App;
