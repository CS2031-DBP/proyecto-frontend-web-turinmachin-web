import { useState } from 'react';
import { LuMail, LuX } from 'react-icons/lu';

type Props = {
  onClose: () => void;
};

export const LoginPopup = ({ onClose }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  // Login states
  const [loginFields, setLoginFields] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Register states
  const [registerFields, setRegisterFields] = useState({
    email: '',
    username: '',
    displayName: '',
    password: '',
  });
  const [registerErrors, setRegisterErrors] = useState<{
    email?: string;
    username?: string;
    displayName?: string;
    password?: string;
  }>({});

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );

  // Validación login
  const handleLogin = () => {
    const errors: typeof loginErrors = {};

    if (loginFields.email.trim() === '')
      errors.email = 'Por favor completa este campo';
    if (loginFields.password.trim() === '')
      errors.password = 'Por favor completa este campo';

    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      // continuar con login
    }
  };

  // Validación registro con chequeo adicional de longitud
  const handleRegister = () => {
    const errors: typeof registerErrors = {};

    if (registerFields.email.trim() === '')
      errors.email = 'Por favor completa este campo';
    if (registerFields.username.trim() === '')
      errors.username = 'Por favor completa este campo';
    if (registerFields.displayName.trim() === '')
      errors.displayName = 'Por favor completa este campo';

    const password = registerFields.password.trim();
    if (password === '') {
      errors.password = 'Por favor completa este campo';
    } else if (password.length < 4) {
      errors.password = 'Tu contraseña debe tener al menos 4 caracteres';
    }

    setRegisterErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Simula envío de correo de verificación
      setIsVerifying(true);
    }
  };

  const handleVerification = () => {
    if (verificationCode.trim() === '') {
      setVerificationError('Por favor ingresa el código');
    } else {
      setVerificationError(null);
      // continuar con verificación (enviar al backend, etc)
    }
  };

  const resetLoginForm = () => {
    setLoginFields({ email: '', password: '' });
    setLoginErrors({});
  };

  const resetRegisterForm = () => {
    setRegisterFields({
      email: '',
      username: '',
      displayName: '',
      password: '',
    });
    setRegisterErrors({});
    setVerificationCode('');
    setVerificationError(null);
    setIsVerifying(false);
  };

  const inputClass = (hasError: boolean) =>
    `border ${
      hasError ? 'border-red-500' : 'border-background-alt'
    } focus:border-special mb-1.5 w-full rounded px-3 py-2 text-sm focus:outline-none`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border p-6 shadow-lg">
        <button
          className="text-muted hover:text-foreground absolute top-3 right-3 transition-colors ease-in-out"
          onClick={onClose}
        >
          <LuX className="h-6 w-6" />
        </button>

        {isLogin ? (
          <>
            <h2 className="mb-4 text-2xl font-bold">Inicia sesión</h2>

            <input
              type="email"
              placeholder="Correo institucional"
              value={loginFields.email}
              onChange={(e) => {
                setLoginFields({ ...loginFields, email: e.target.value });
                setLoginErrors({ ...loginErrors, email: undefined });
              }}
              className={inputClass(!!loginErrors.email)}
            />
            {loginErrors.email && (
              <p className="mb-2 text-sm text-red-500">{loginErrors.email}</p>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              value={loginFields.password}
              onChange={(e) => {
                setLoginFields({ ...loginFields, password: e.target.value });
                setLoginErrors({ ...loginErrors, password: undefined });
              }}
              className={inputClass(!!loginErrors.password)}
            />
            {loginErrors.password && (
              <p className="mb-2 text-sm text-red-500">
                {loginErrors.password}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="bg-special hover:bg-special-muted mb-3 w-full rounded py-2 font-bold text-white transition-colors ease-in-out"
            >
              Ingresar
            </button>

            <p className="text-muted text-center text-sm">
              ¿No tienes una cuenta?{' '}
              <button
                className="text-special font-bold hover:underline"
                onClick={() => {
                  resetLoginForm();
                  setIsLogin(false);
                }}
              >
                Registrarse
              </button>
            </p>
          </>
        ) : isVerifying ? (
          <>
            <div className="text-special mb-2 flex justify-center">
              <LuMail className="h-10 w-10" />
            </div>

            <h2 className="mb-2 text-center text-xl font-bold">
              Correo de verificación
            </h2>
            <p className="text-muted mb-4 text-center text-sm">
              Se ha enviado un correo de verificación a{' '}
              <strong>{registerFields.email}</strong>. Por favor introduce el
              código de seguridad.
            </p>

            <input
              type="text"
              placeholder="Código de seguridad"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value);
                setVerificationError(null);
              }}
              className={inputClass(!!verificationError)}
            />
            {verificationError && (
              <p className="mb-2 text-sm text-red-500">{verificationError}</p>
            )}

            <button
              onClick={handleVerification}
              className="mb-3 w-full rounded bg-green-600 py-2 font-bold text-white transition-colors ease-in-out hover:bg-green-700"
            >
              Confirmar
            </button>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-2xl font-bold">Registrarse</h2>

            <input
              type="email"
              placeholder="Correo institucional"
              value={registerFields.email}
              onChange={(e) => {
                setRegisterFields({ ...registerFields, email: e.target.value });
                setRegisterErrors({ ...registerErrors, email: undefined });
              }}
              className={inputClass(!!registerErrors.email)}
            />
            {registerErrors.email && (
              <p className="mb-2 text-sm text-red-500">
                {registerErrors.email}
              </p>
            )}

            <input
              type="text"
              placeholder="Nombre de usuario"
              value={registerFields.username}
              onChange={(e) => {
                setRegisterFields({
                  ...registerFields,
                  username: e.target.value,
                });
                setRegisterErrors({ ...registerErrors, username: undefined });
              }}
              className={inputClass(!!registerErrors.username)}
            />
            {registerErrors.username && (
              <p className="mb-2 text-sm text-red-500">
                {registerErrors.username}
              </p>
            )}

            <input
              type="text"
              placeholder="Nombre visible"
              value={registerFields.displayName}
              onChange={(e) => {
                setRegisterFields({
                  ...registerFields,
                  displayName: e.target.value,
                });
                setRegisterErrors({
                  ...registerErrors,
                  displayName: undefined,
                });
              }}
              className={inputClass(!!registerErrors.displayName)}
            />
            {registerErrors.displayName && (
              <p className="mb-2 text-sm text-red-500">
                {registerErrors.displayName}
              </p>
            )}

            <input
              type="password"
              placeholder="Contraseña"
              value={registerFields.password}
              onChange={(e) => {
                setRegisterFields({
                  ...registerFields,
                  password: e.target.value,
                });
                setRegisterErrors({ ...registerErrors, password: undefined });
              }}
              className={inputClass(!!registerErrors.password)}
            />
            {registerErrors.password && (
              <p className="mb-2 text-sm text-red-500">
                {registerErrors.password}
              </p>
            )}

            <button
              onClick={handleRegister}
              className="bg-special hover:bg-special-muted mb-3 w-full rounded py-2 font-bold text-white transition-colors ease-in-out"
            >
              Siguiente
            </button>

            <p className="text-muted text-center text-sm">
              ¿Ya tienes una cuenta?{' '}
              <button
                className="text-special font-bold hover:underline"
                onClick={() => {
                  resetRegisterForm();
                  setIsLogin(true);
                }}
              >
                Iniciar sesión
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
