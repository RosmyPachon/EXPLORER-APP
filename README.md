# 🛸 Explorer App - Rick & Morty

¡Hola! Soy Rosmy, y esta es mi solución para el Code Challenge "Explorer App".

El objetivo era crear un explorador de personajes consumiendo la API de Rick and Morty. Quise ir un poco más allá de lo básico y crear una experiencia que se sintiera como usar una herramienta de la propia Ciudadela: oscura, neón y responsiva.

### 🔗 [Ver Demo (Netlify)](https://explorer-app-ross.netlify.app/characters)

---

## 💡 Sobre el Desarrollo

Tuve un límite de tiempo de 6 horas, por lo que tuve que tomar decisiones pragmáticas priorizando **experiencia de usuario (UX)**

### Lo que decidí usar y por qué:

* **React + TypeScript + Vite:** Mi stack de confianza. Vite por la velocidad de desarrollo y TypeScript porque ayuda a prevenir errores de tipado con la API desde el minuto uno.
* **Tailwind CSS:** Para moverme rápido con los estilos. Usé valores arbitrarios como `bg-[#3cbe54]` para el "Verde Portal" exacto de la serie sin perder tiempo.
* **Intersection Observer (Nativo):** Para el **Infinite Scroll**. refs de React para crear un scroll infinito eficiente.

---

## 🚀 Funcionalidades Clave

Más allá de mostrar una lista, me enfoqué en los detalles:

1.  **Scroll Infinito Real:**
2.  **Buscador:**
    * Se puede filtrar por nombre y estado.
    * Si se busca algo que no existe te muestra un mensaje amigable y un botón para resetear.
    * Los mensajes de error tienen temática de la serie.
3.  **Persistencia de URL (Redirección):** Solucioné el problema clásico de las SPAs en Netlify (Error 404 al recargar) configurando los redirects manualmente.

---

## Si tuviera más tiempo...

Si este fuera un proyecto a largo plazo, mi siguiente sprint incluiría:

* **Gestión de Favoritos:** Me faltó implementar el guardado en `localStorage` para marcar personajes favoritos.
* **Detalle de Episodios:** Actualmente la vista de detalle muestra la info del personaje, pero sería genial hacer el fetch cruzado para mostrar en qué episodios aparece.

---

## 🛠️ Cómo correrlo localmente

Si quieres ver el código en tu computador:

1.  Clona el repo:
    ```bash
    git clone [https://github.com/RosmyPachon/EXPLORER-APP.git](https://github.com/RosmyPachon/EXPLORER-APP.git)
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Corre el servidor:
    ```bash
    npm run dev
    ```

---

*👩‍💻 Autora*

**Rosmy Pachon**
*Frontend Developer*
