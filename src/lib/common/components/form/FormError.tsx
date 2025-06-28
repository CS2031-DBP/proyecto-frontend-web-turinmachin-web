import { Message, MultipleFieldErrors } from 'react-hook-form';
import { LuInfo } from 'react-icons/lu';

export interface Props {
  message: Message;
  messages?: MultipleFieldErrors;
}

export const FormError = ({ message }: Props) => (
  <div className="text-error flex">
    <LuInfo className="mr-2" size={20} />
    <p className="rounded text-sm">{message}</p>
  </div>
);
