# Theta Board

Pizarra privada en la nube para organizar proyectos e ideas.

## Configuración inicial

1. En Supabase, abre **SQL Editor** y pulsa **New query**.
2. Copia todo el contenido de `supabase/migrations/202608080001_initial_schema.sql`, pégalo y pulsa **Run**.
3. Abre **Authentication → URL Configuration**.
   - En **Site URL**, escribe `http://localhost:3000` mientras trabajas en tu computadora.
   - En **Redirect URLs**, añade `http://localhost:3000/auth/callback`.
4. En **Authentication → Providers → Email**, confirma que Email está activado. El acceso se hace mediante un enlace enviado al correo autorizado.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Las variables necesarias están en `.env.local` y no se suben al repositorio. Usa `.env.example` como referencia al configurar Vercel.

## Despliegue en Vercel

1. Importa el repositorio en Vercel.
2. En **Settings → Environment Variables**, añade `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` con los mismos valores de `.env.local`.
3. Despliega el proyecto y copia la URL que Vercel te entregue.
4. Vuelve a Supabase, en **Authentication → URL Configuration**:
   - Cambia **Site URL** por la URL de Vercel.
   - Añade también `https://TU-DOMINIO/auth/callback` a **Redirect URLs**.

Nunca añadas una clave `service_role` al navegador ni a Vercel para esta aplicación.
