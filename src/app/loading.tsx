import { Spinner } from '@/common/components/Spinner';

const LoadingScreen = () => (
  <div className="flex grow items-center justify-center text-center">
    <Spinner />
  </div>
);

export default LoadingScreen;
