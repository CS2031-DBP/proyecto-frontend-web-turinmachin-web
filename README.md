# UniLife (frontend web)

**CS2031: Desarrollo Basado en Plataformas**

Integrantes de grupo:

- José Daniel Grayson Tejada
- Diego Alonso Figueroa Winkelried
- Martin Jesus Bonilla Sarmiento
- Matias Javier Anaya Manzo

Este frontend, hecho con Next.js, incluye un "mini backend" para permitir el uso de SSR (Server Side Rendering).  
Utilizamos [`pnpm`](https://pnpm.io) como gestor de paquetes por su eficiencia y velocidad en comparación con npm o yarn.

## Uso

Como se muestra en `.env.example`, se debe crear un archivo `.env.local` con las siguientes variables:

- `NEXT_PUBLIC_API_URL`: URL del backend.
- `NEXT_PUBLIC_DEPLOYMENT_URL`: URL del frontend (es decir, donde este mismo proyecto está siendo hosteado).
- `API_URL_INTERNAL`: URL del backend para uso interno del servidor del frontend.
  - Se hace la distinción porque usamos Docker Compose en el deployment, así que esta variable se setea como `http://backend:8080` para usar la red interna de los contenedores.
- `AUTH_SECRET`: Alguna clave secreta para los JWTs.

### Instalación y ejecución

```bash
pnpm install
pnpm run build
pnpm run start
```

## Versión en línea

Puedes encontrar la app desplegada en: [https://unilife.lat](https://unilife.lat)

> [!WARNING]
> Puede que el servidor se encuentre **temporalmente apagado** debido a los límites gratuitos del servidor EC2.

Para una mejor experiencia, se recomienda probar la aplicación desde una **laptop o computadora de escritorio**.

## Tecnologías usadas

### Backend

- Java (Spring Boot)
- Flyway
- PostgreSQL

### Frontend

- React Native
- Next.js
- Auth.js
- TailwindCSS
- SWR
- Zod
- Zodios
- React Hook Form
- Chrome DevTools

### Infraestructura y DevOps

- AWS
- GitHub Actions
- Docker
- Zoho
- tmux
