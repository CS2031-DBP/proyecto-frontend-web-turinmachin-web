'use client';

import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { FormTextArea } from '@/common/components/form/FormTextArea';
import { ResetButton } from '@/common/components/form/ResetButton';
import { DegreeSelector } from '@/degree/components/DegreeSelector';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { LuInfo } from 'react-icons/lu';
import { useProfileEditor } from '../hooks/use-profile-editor';
import { useProfilePictureEditor } from '../hooks/use-profile-picture-editor';
import { SelfUserSchema } from '../schemas/self-user';
import { DeleteAccountButton } from './DeleteAccountButton';
import { EmailUniversityInfo } from './EmailUniversityInfo';

export interface Props {
  session: Session;
  user: SelfUserSchema;
}

export const ProfileEditor = ({ session, user }: Props) => {
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const { form, pending, handleSubmit } = useProfileEditor({ user });
  const {
    pending: picturePending,
    handleChange: handlePictureChange,
    deletePicture,
    pictureUrl,
  } = useProfilePictureEditor({ user });

  const email = form.watch('email');
  const degreeId = form.watch('degreeId');

  const emailChanged = email !== user.email;
  const degreesDisabled =
    emailChanged || !session.user.verified || !session.user.hasUniversity;

  return (
    <>
      <input
        ref={pictureInputRef}
        className="hidden"
        type="file"
        accept="image/png,image/jpeg"
        onChange={handlePictureChange}
      />
      <button
        onClick={() => pictureInputRef.current?.click()}
        disabled={picturePending}
        className="bg-background-alt relative mx-auto my-4 flex size-32 min-h-32 items-center justify-center rounded-full p-5 transition-all enabled:hover:brightness-75 disabled:brightness-25"
      >
        {pictureUrl ? (
          <Image
            src={pictureUrl}
            alt=""
            fill
            sizes="50vw"
            className="rounded-full object-cover"
          />
        ) : (
          <p className="text-foreground-muted">¡No tienes foto!</p>
        )}
      </button>
      {pictureUrl && (
        <Button
          onClick={deletePicture}
          variant="outline"
          disabled={picturePending}
          className="mx-auto"
        >
          Borrar foto
        </Button>
      )}

      <Form form={form} onSubmit={handleSubmit}>
        <FormInput
          form={form}
          name="email"
          type="email"
          label="Correo electrónico"
          disabled={user.authProvider !== 'CREDENTIALS'}
        >
          <div className="mt-3 flex items-center justify-between gap-x-6 gap-y-3 not-md:flex-col not-md:items-start">
            <EmailUniversityInfo email={email} />
            {user.authProvider === 'GOOGLE' && (
              <div className="text-success-foreground flex items-center gap-x-2">
                <FcGoogle className="text-foreground size-6" />
                <p className="text-nowrap">Correo gestionado por Google</p>
              </div>
            )}
          </div>
        </FormInput>
        <FormInput form={form} name="username" label="Nombre de usuario" />
        <FormInput
          form={form}
          name="displayName"
          label="Nombre real"
          required={false}
        />
        <label className="my-2">
          <div className="mb-2">Carrera</div>
          <DegreeSelector
            value={degreeId}
            nullLabelPlaceholder
            onChange={(id) => form.setValue('degreeId', id ?? undefined)}
            queries={{ universityId: user.university?.id }}
          />
        </label>
        {degreesDisabled && (
          <p className="text-foreground-muted my-1">
            <LuInfo className="mr-2 inline" />
            {emailChanged
              ? 'Debes verificar tu nuevo correo antes de establecer tu carrera.'
              : !session.user.hasUniversity
                ? 'Tu correo no es de alguna universidad que conozcamos.'
                : 'Debes verificar tu correo antes de establecer tu carrera.'}
          </p>
        )}
        <FormTextArea
          form={form}
          name="bio"
          label="Bio"
          autoComplete="off"
          placeholder="Algo interesante sobre tí..."
          rows={6}
          required={false}
        />
        <div className="flex justify-between">
          <DeleteAccountButton />
          <div>
            <ResetButton form={form}>Restablecer</ResetButton>
            <Button variant="special" disabled={pending}>
              Guardar
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};
