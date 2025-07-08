'use client';
import { usePopup } from '@/common/hooks/use-popup';

export const LoginReminderButton = () => {
  const { openPopup } = usePopup();

  return (
    <button
      onClick={() => openPopup('login', {})}
      className="text-special font-semibold hover:underline"
    >
      iniciar sesión
    </button>
  );
};
