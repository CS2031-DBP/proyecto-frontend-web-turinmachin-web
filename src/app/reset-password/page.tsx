import { ResetPasswordScreen } from '@/auth/components/ResetPasswordScreen';
import { Main } from '@/common/components/layout/Main';

const ResetPassword = () => {
  return (
    <Main className="flex grow flex-col items-center justify-center">
      <ResetPasswordScreen />
    </Main>
  );
};

export default ResetPassword;
