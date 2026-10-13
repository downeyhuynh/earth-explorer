# Volcano Explorer: Ring of Fire

A browser game for 7th-grade science. Students classify 12 famous volcanoes, then drag them onto a world map.

The three volcano types are shield, composite, and cinder-cone. The three tectonic settings are convergent boundary, divergent boundary, and hotspot.

## Install and run

From the `volcano` folder:

```bash
npm install
npm run dev
```

Open the local address Vite prints, usually `http://127.0.0.1:5173/`.

Check the answer logic:

```bash
npm test
```

Build the static site:

```bash
npm run build
```

The build is written to `ring-of-fire/` in the parent folder, next to the other Earth Explorer games. Open `ring-of-fire/index.html` from that site.

## Deploy

**GitHub Pages.** This repository already serves the files at the project root. After `npm run build`, commit `ring-of-fire/` along with the source. The game is then at `https://downeyhuynh.github.io/earth-explorer/ring-of-fire/`.

**Vercel.** Set the project root to `volcano`, the build command to `npm run build`, and the output directory to `ring-of-fire`. If Vercel cannot see a folder outside the root, change `build.outDir` in `vite.config.ts` to `dist` and set the output directory to `dist`. `base` is `./`, so the built files also work in a subfolder.

There is no login, backend, or paid map API. Progress is saved in the browser with `localStorage`.

## How students play

1. Choose **Start Exploring**.
2. The game shows one volcano at a time. Choose its volcano type and its boundary type, then check that volcano. A wrong answer says which part to redo. It does not reveal the correct choice.
3. When every classification is correct, continue to the map.
4. The map is zoomed in on the Ring of Fire. Empty spots show where a volcano can go. Drag the volcano onto a spot. A wrong spot does not reveal the right one.
5. Mauna Loa and Kilauea can use either Hawaii box.
6. Each stage starts with 5 lives. A wrong answer costs a life. A correct answer gives 1 life. A correct answer on the first try for that volcano gives 2 lives. At zero lives, a popup says they lost and asks them to click Continue. That stage then starts over. The other stage stays saved.

Reset asks for confirmation before deleting saved work.

## Teacher mode

The gear icon asks for a code. The code is the constant `TEACHER_CODE` in `src/data/teacher.ts`. The default is `2026`. Do not post that code on the student screen.

Teacher mode can show the Stage 1 answer key, show a completed map, reset the game, skip to Stage 2, turn sounds on or off, change how generous the map targets are, and view both attempt counts.

## Answer key

| Volcano | Type | Tectonic setting |
| --- | --- | --- |
| Mauna Loa | Shield volcano | Hotspot |
| Kilauea | Shield volcano | Hotspot |
| Sierra Negra | Shield volcano | Hotspot |
| Erta Ale | Shield volcano | Divergent boundary |
| Mount St. Helens | Composite volcano | Convergent boundary |
| Mount Fuji | Composite volcano | Convergent boundary |
| Mount Vesuvius | Composite volcano | Convergent boundary |
| Mount Pinatubo | Composite volcano | Convergent boundary |
| Paricutin | Cinder-cone volcano | Convergent boundary |
| Cerro Negro | Cinder-cone volcano | Convergent boundary |
| Sunset Crater | Cinder-cone volcano | Divergent boundary |
| Capulin Volcano | Cinder-cone volcano | Divergent boundary |

Sunset Crater and Capulin are classified as divergent in this game because the classroom model treats that regional volcanism as crustal extension. Do not show that note to students. Hawaii’s two volcanoes share one target area, and either volcano may sit on either Hawaii space.

## Photo credits

Stage 1 uses photographs stored in `public/photos/`. They come from Wikimedia Commons and U.S. government sources.

| Volcano | Credit |
| --- | --- |
| Mauna Loa | J.D. Griggs, USGS. Public domain. |
| Kilauea | USGS / K. Lynn. Public domain. |
| Sierra Negra | NASA Earth Observatory / Jesse Allen. Public domain. |
| Erta Ale | filippo_jean, Wikimedia Commons. CC BY-SA 2.0. |
| Mount St. Helens | Vulturesong, Wikimedia Commons. CC0. |
| Mount Fuji | Suicasmo, Wikimedia Commons. CC BY-SA 4.0. |
| Mount Vesuvius | pietro scerrato, Wikimedia Commons. CC BY 3.0. |
| Mount Pinatubo | Sindre Helvik, Wikimedia Commons. CC BY 3.0. |
| Paricutin | Karla Yannín Alcázar Quintero, Wikimedia Commons. CC BY 2.0. |
| Cerro Negro | NicaPlease, Wikimedia Commons. CC BY-SA 3.0. |
| Sunset Crater | Mikesanchez1109, Wikimedia Commons. CC BY-SA 3.0. |
| Capulin Volcano | R.D. Miller, USGS. Public domain. |
