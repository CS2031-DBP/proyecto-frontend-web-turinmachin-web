# 🎓 UniLife (frontend web)

**Curso:** CS2031 - Desarrollo Basado en Plataformas

**Integrantes de grupo:**

- José Daniel Grayson Tejada
- Diego Alonso Figueroa Winkelried
- Martin Jesús Bonilla Sarmiento
- Matías Javier Anaya Manzo

UniLife es una red social universitaria que permite a estudiantes universitarios compartir sus experiencias y conectar con otras universidades.

## Uso

Crear un archivo `.env.local` siguiendo el [formato de ejemplo](https://github.com/CS2031-DBP/proyecto-frontend-web-turinmachin-web/blob/main/.env.example).

Este proyecto usa [pnpm](https://pnpm.io). Tras clonar el repositorio, puedes instalar las dependencias y ejecutar el proyecto en modo de desarrollo con estos comandos:

```bash
pnpm install
pnpm run dev
```

## Lecciones aprendidas

Para quienes están llevando el curso luego de nosotros, aquí les dejamos algunas fijas para sus proyectos.

- **[Next.js](https://nextjs.org):** Porque React + Vite no es suficiente. Next.js te da routing, server-side rendering (SSR) y mucho más.
- **[Auth.js](https://authjs.dev/):** Hacer SSR sería algo inútil si Next.js no pudiese obtener la autenticación del usuario del lado del servidor (`localStorage` es del navegador, ¿recuerdas?). Next.js debe, de alguna forma, ser un intermediario entre el frontend y el backend principal de tu aplicación; Auth.js ayuda con eso, aunque sirve para mucho más.
  - Alternativas: **[Better Auth](https://www.better-auth.com) (mucho más recomendado)**.
- **[SWR](https://swr.vercel.app):** ¿Todavía gestionas manualmente tus estados de carga y error para hacer API requests?
  - Alternativas: **[TanStack Query](https://tanstack.com/query/latest) (recomendado)**.
- **[Zod](https://zod.dev):** ¿Sigues cruzando los dedos para que tus API requests retornen lo que esperas? Para este y otros problemas parecidos, Zod te permite definir "esquemas" y validar objetos según ellos.
  - Alternativas: [Yup](https://github.com/jquense/yup), [Valibot](https://valibot.dev/), [Arktype](https://arktype.io).
- **[ts-rest](https://ts-rest.com):** Define los endpoints de tu backend en un "contrato" usando esquemas de Zod (o alternativos), y ts-rest te generará _automáticamente_ funciones para hacer cada uno de esos API requests; todo fuertemente tipado y 100% seguro.
  - Si tu backend soporta [Swagger](https://swagger.io) (y debería), te recomendamos usar **[Orval](https://orval.dev)** para auto-generar tus endpoints en el frontend.
- **[React Hook Form](https://react-hook-form.com):** Junto a [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) y [@hookform/error-message](https://www.npmjs.com/package/@hookform/error-message), te permite gestionar formularios validados con Zod increíblemente fácil.
- **[Supabase](https://supabase.com):** Una plataforma de desarrollo con muchas capacidades. En este proyecto la usamos para mensajería en tiempo real. ¡Es fácil!
- **[React OAuth2 | Google](https://github.com/MomenSherif/react-oauth):** Un componente de botón de "Iniciar sesión con Google". Se encarga de toda la lógica de mostrar el pop-up Google y obtener un "ID token". Revisa [nuestro backend](https://github.com/CS2031-DBP/proyecto-backend-turinmachin) para ver cómo se maneja de ese lado.
- **[T3 Env](https://env.t3.gg):** Usa Zod para validar tus variables de entorno.

Éxitos, nos tienen que superar. 😉
