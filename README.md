# 🎓 UniLife (frontend web)

**Curso:** CS2031 - Desarrollo Basado en Plataformas  
**Proyecto Final**

## 👥 Integrantes del grupo

- José Daniel Grayson Tejada
- Diego Alonso Figueroa Winkelried
- Martin Jesús Bonilla Sarmiento
- Matías Javier Anaya Manzo

---

## 🧠 Descripción

UniLife es una plataforma web universitaria construida con **Next.js**, que permite a los estudiantes explorar universidades y carreras, publicar contenido, y personalizar su perfil.  
El frontend incluye un “mini backend” para aprovechar funcionalidades de **SSR (Server Side Rendering)**.  
Se utiliza [`pnpm`](https://pnpm.io) como gestor de paquetes por su eficiencia y velocidad.

---

## 🚀 Uso

Crea un archivo `.env.local` basado en `.env.example`, y define las siguientes variables:

| Variable                     | Descripción                                                                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`        | URL pública del backend                                                                                                                                                                                                   |
| `NEXT_PUBLIC_DEPLOYMENT_URL` | URL del frontend desplegado                                                                                                                                                                                               |
| `API_URL_INTERNAL`           | URL del backend para uso interno del servidor. Se hace la distinción porque usamos Docker Compose en el deployment, así que esta variable se setea como http://backend:8080 para usar la red interna de los contenedores. |
| `AUTH_SECRET`                | Clave secreta para autenticación JWT                                                                                                                                                                                      |

### ▶️ Instalación y ejecución

```bash
pnpm install
pnpm run build
pnpm run start
```

---

## 🌐 Versión en línea

La aplicación está disponible en:
🔗 [https://unilife.lat](https://unilife.lat)

> [!WARNING]
> El servidor puede estar **temporalmente inactivo** por los límites gratuitos del servicio EC2 de AWS.

📌 Se recomienda el uso desde una **laptop o computadora de escritorio** para una mejor experiencia.

---

## 🛠️ Tecnologías usadas

### 🧩 Frontend

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Auth.js (NextAuth)](https://authjs.dev/)
- [SWR](https://swr.vercel.app/)
- [Zod](https://zod.dev/)
- [Zodios](https://zodios.dev/)
- [React Hook Form](https://react-hook-form.com/)
- Chrome DevTools

### ☁️ Infraestructura y DevOps

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS EC2](https://aws.amazon.com/ec2/)
- GitHub Actions (CI/CD)
- tmux

---

## 🗂️ Funcionalidades principales

- Registro e inicio de sesión con autenticación segura
- Exploración de universidades y carreras
- Publicación de posts y comentarios con sistema de votos
- Moderación automática de contenido tóxico (detección con IA)
- Edición de perfil y vista personalizada
- SSR con sesión activa usando Next.js App Router
