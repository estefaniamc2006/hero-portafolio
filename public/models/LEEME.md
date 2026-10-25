# Modelos 3D

Coloca aquí tus archivos `.fbx`. La ruta se configura en `src/data/profile.js` (`avatarConfig`).

## Cómo obtener el modelo y la animación en Mixamo

1. Entra a https://www.mixamo.com y elige un personaje (sección *Characters*).
2. Descárgalo con **Format: FBX Binary (.fbx)** y **Pose: T-pose**. Guárdalo como `tu-modelo.fbx`.
3. Elige una animación (por ejemplo *Idle* o *Waving*), pulsa **Download** con formato **FBX Binary** y, si quieres separar la animación, marca **Skin: Without Skin**.
4. Si usas la animación sin piel en un segundo archivo (`animacion.fbx`), cambia `animationUrl` en `profile.js` a `/models/animacion.fbx`. El `FBXLoader` tomará los clips de ese archivo y los aplicará al personaje.
5. Si la animación viene dentro del mismo archivo, deja `animationUrl` igual a `modelUrl`.

## Notas

- Mixamo exporta en centímetros: por eso `scale: 0.01`.
- Mientras el archivo no exista, la app muestra un avatar de respaldo (no se rompe) y el navegador mostrará un error 404 en la consola.
- Para usar el modelo en Blender: exporta como FBX con *Apply Scale* activado y *Bake Animation* si tienes keyframes.
