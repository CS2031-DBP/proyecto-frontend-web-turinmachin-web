# UniLife (frontend web)

**CS2031: Desarrollo Basado en Plataformas**

Integrantes de grupo:

- José Daniel Grayson Tejada
- Diego Alonso Figueroa Winkelried
- Martin Jesus Bonilla Sarmiento
- Matias Javier Anaya Manzo

Este frontend, hecho con Next.js, incluye un "mini backend" para permitir el uso de SSR (Server Side Rendering).

## Uso

Como se muestra en `.env.example`, se debe crear un archivo `.env.local` con las siguientes variables:

- `NEXT_PUBLIC_API_URL`: URL del backend.
- `NEXT_PUBLIC_DEPLOYMENT_URL`: URL del frontend (es decir, donde este mismo proyecto está siendo hosteado).
- `API_URL_INTERNAL`: URL del backend para uso interno del servidor del frontend.
  - Se hace la distinción porque usamos Docker Compose en el deployment, así que esta variable se setea como `http://backend:8080` para usar la red interna de los contenedores.
- `AUTH_SECRET`: Alguna clave secreta para los JWTs.

```bash
pnpm install
pnpm run build
pnpm run start
```
