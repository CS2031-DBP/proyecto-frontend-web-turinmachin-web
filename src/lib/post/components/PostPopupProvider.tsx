import { useState, type ReactNode } from 'react';
import { CreatePostPopup } from '../../common/components/layout/CreatePostPopup';
import { PostPopupContext } from '../context/post-popup-context';

export interface Props {
  children?: ReactNode;
}

export const PostPopupProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <PostPopupContext
      value={{
        openPopup: () => setVisible(true),
        closePopup: () => setVisible(false),
      }}
    >
      {visible && <CreatePostPopup />}
      {children}
    </PostPopupContext>
  );
};
