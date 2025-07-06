import { AIConversationScreen } from '@/lib/ai/components/AIConversationScreen';
import { Main } from '@/lib/common/components/layout/Main';

const AIConversation = () => {
  return (
    <Main className="flex grow flex-col items-center justify-center">
      <AIConversationScreen />
    </Main>
  );
};

export default AIConversation;
