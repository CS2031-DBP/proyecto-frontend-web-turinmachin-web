'use client';

import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import type { PopupComponent } from '@/common/context/PopupProvider';
import { useState } from 'react';
import { LuTrash } from 'react-icons/lu';

export const ResetConversationAIPopup: PopupComponent<
  'resetConversationAI'
> = ({ onClose, resetConversation }) => {
  const [pending, setPending] = useState(false);

  const handleReset = async () => {
    try {
      setPending(true);
      await resetConversation();
      onClose();
    } finally {
      setPending(false);
    }
  };

  return (
    <Popup className="max-w-sm">
      <Popup.Title>¿Reiniciar conversación?</Popup.Title>
      <p>Esta acción no se puede deshacer.</p>

      <Button
        variant="error"
        onClick={handleReset}
        disabled={pending}
        className="mt-6 w-full"
      >
        <LuTrash className="mr-2 mb-1 inline" />
        Reiniciar conversación
      </Button>
    </Popup>
  );
};
