# Portafolio de Xiomara Melguizo Martínez

Sitio profesional construido con Next.js y exportado como archivos estáticos
para GitHub Pages.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Publicación

El workflow `.github/workflows/deploy.yml` construye y publica el sitio
automáticamente en GitHub Pages al actualizar la rama `main`. También puede
ejecutarse manualmente desde la pestaña **Actions** del repositorio.
El workflow solicita habilitar GitHub Pages automáticamente en el primer
despliegue.

La exportación estática se genera en `out/`. El sitio usa la ruta de proyecto:

`https://kiriku22.github.io/XiomaraMelguizo/`

Si la organización o el repositorio no permiten la habilitación automática,
selecciona **GitHub Actions** como origen en **Settings → Pages**.
