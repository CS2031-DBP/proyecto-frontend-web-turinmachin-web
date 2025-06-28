'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { FormTextArea } from '@/lib/common/components/form/FormTextArea';
import { ResetButton } from '@/lib/common/components/form/ResetButton';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { pick } from '@/lib/common/util/object';
import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuInfo } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import { useUser } from '../hooks/use-user';
import { UpdateUserSchema } from '../schemas/update-user';
import { UserSchema } from '../schemas/user';
import { EmailUniversityInfo } from './EmailUniversityInfo';

export interface Props {
  session: Session;
  user: UserSchema;
  availableDegrees: DegreeSchema[] | null;
}

export const FormSchema = UpdateUserSchema;

export type FormSchema = z.infer<typeof FormSchema>;

export const ProfileEditor = ({ session, user, availableDegrees }: Props) => {
  const { mutate: mutateUser } = useUser();
  const { update: updateSession } = useSession();
  const pictureInputRef = useRef<HTMLInputElement>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(
    user.profilePicture?.url ?? null,
  );

  const { apiClient } = useApiClient();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...pick(user, 'email', 'username', 'displayName', 'bio'),
      degreeId: user.degree?.id,
    },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const newUser = await apiClient.updateSelf(data);
      await updateSession(newUser);
      await mutateUser(newUser);
      router.push(routes.users.byUsername(newUser.username));
    },
    [],
  );

  const [picturePending, handlePictureChange] = usePendingCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const picture = e.currentTarget.files?.[0];
      if (!picture) return;

      const newUser = await apiClient.updateSelfPicture({ picture });
      await mutateUser(newUser);
      setPictureUrl(newUser.profilePicture!.url);
    },
    [],
  );

  const [pictureDeletePending, deletePicture] = usePendingCallback(async () => {
    await apiClient.deleteSelfPicture(undefined);
    await mutateUser((prevUser) =>
      prevUser ? { ...prevUser, profilePicture: undefined } : null,
    );
    setPictureUrl(null);
  }, []);

  const email = form.watch('email');
  const degreeId = form.watch('degreeId');

  const emailChanged = email !== user.email;
  const degreesDisabled = emailChanged || !session.user.verified;

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
          disabled={pictureDeletePending}
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
        >
          <EmailUniversityInfo email={email} />
        </FormInput>
        <FormInput form={form} name="username" label="Nombre de usuario" />
        <FormInput
          form={form}
          name="displayName"
          label="Nombre real"
          required={false}
        />
        <label>
          Carrera
          <select
            {...form.register('degreeId', { disabled: degreesDisabled })}
            value={degreesDisabled ? '' : degreeId}
            className={twJoin(
              'form-input block w-full',
              (degreesDisabled || !degreeId) && 'text-foreground-muted',
            )}
          >
            <option value="">(Ninguna)</option>
            {availableDegrees &&
              availableDegrees.map((degree) => (
                <option key={degree.id} value={degree.id}>
                  {degree.name}
                </option>
              ))}
          </select>
        </label>
        {degreesDisabled && (
          <p className="text-foreground-muted my-1">
            <LuInfo className="mr-2 inline" />
            {emailChanged
              ? 'Podrás establecer tu carrera cuando verifiques tu nuevo correo.'
              : 'Podrás establecer tu carrera cuando verifiques tu correo.'}
          </p>
        )}
        <FormTextArea
          form={form}
          name="bio"
          label="Bio"
          placeholder="Algo interesante sobre tí..."
          rows={6}
          required={false}
        />
        <div className="flex justify-end">
          <ResetButton form={form}>Restablecer</ResetButton>
          <Button variant="special" disabled={pending}>
            Guardar
          </Button>
        </div>
      </Form>
    </>
  );
};
