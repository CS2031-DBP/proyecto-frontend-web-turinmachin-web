'use client';
import { LuInfo } from 'react-icons/lu';
import { useUniversityEmailInfo } from '../hooks/use-email-university-info';

export interface Props {
  email: string;
}

export const EmailUniversityInfo = ({ email }: Props) => {
  const { emailDomain, pending, university } = useUniversityEmailInfo(email);

  if (!emailDomain) return null;

  return (
    <p className="text-foreground-muted">
      <LuInfo className="mr-2 mb-1 inline" />
      {pending ? (
        'Buscando...'
      ) : university ? (
        <>
          Este correo le pertenece a{' '}
          <span className="text-special font-semibold">
            {university.shortName ?? university.name}
          </span>
          .
        </>
      ) : (
        'Este correo no le pertenece a alguna universidad que conozcamos, pero igual te puedes registrar :)'
      )}
    </p>
  );
};
