import { useEffect, useState, type ReactNode } from 'react';
import { getAxiosInstance } from '../../api/util/axios-instance';
import { UserSchema } from '../../user/schemas/user';
import { UserContext } from '../context/user-context';

export interface Props {
  children?: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [loading, setLoadingUser] = useState(true);
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getAxiosInstance()
      .get('/users/@self', { signal: controller.signal })
      .then((response) => UserSchema.parseAsync(response.data))
      .then((data) => setUser(data))
      .catch((error: unknown) => {
        if (!isMounted) return;
        console.error(error);
        setLoadingUser(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <UserContext value={[loading, user]}>{children}</UserContext>;
};
