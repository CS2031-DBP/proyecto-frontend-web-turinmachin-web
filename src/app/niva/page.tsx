import { AIConversationScreen } from '@/ai/components/AIConversationScreen';
import { Main } from '@/common/components/layout/Main';

const AIConversation = () => {
  return (
    <Main className="flex grow flex-col items-center justify-center">
      <AIConversationScreen />
    </Main>
  );
};

export default AIConversation;
