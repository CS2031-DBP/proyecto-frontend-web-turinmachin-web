import { GoogleLogin, GoogleLoginProps } from '@react-oauth/google';
import { twJoin } from 'tailwind-merge';
import { useGoogleLogin } from '../hooks/use-google-login';

export type Props = Partial<GoogleLoginProps>;

export const GoogleAuthButton = (props: Props) => {
  const { handleSuccess, pending, error } = useGoogleLogin();

  return (
    <div className={twJoin(pending && 'pointer-events-none brightness-50')}>
      <GoogleLogin shape="circle" onSuccess={handleSuccess} {...props} />
      {error && <p className="text-error mt-3 text-center">{error}</p>}
    </div>
  );
};
