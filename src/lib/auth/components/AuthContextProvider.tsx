import axios from 'axios';
import { useEffect, useState, type ReactNode } from 'react';
import { API_URL } from '../../api/config';
import { User } from '../../user/types/user';
import { AuthContext } from '../context/auth-context';

export interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken !== null) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_URL}/users/@self`);
      setUser(User.parse(response.data));
    })();
  }, [token]);

  return <AuthContext value={{ user, token }}>{children}</AuthContext>;
};
