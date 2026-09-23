# Earth Explorer: Journey to the Core

A browser game for seventh-grade students. Players travel from Earth’s surface to its center, learn about each layer, identify elements, solve puzzles, and pass trainer tests.

Everything needed to play is in `index.html`. Art, dialogue, questions, and sound effects are original and built into that file.

## What the game teaches

- The four layers of Earth, in order: crust, mantle, outer core, and inner core
- Approximate depth and temperature of each layer
- Whether each layer is solid or liquid
- Elements common in each layer (such as oxygen, silicon, iron, and nickel)
- Why the mantle’s slow flow helps move tectonic plates
- How moving liquid iron and nickel in the outer core help create Earth’s magnetic field
- Why enormous pressure keeps the inner core solid

## How students play

1. Open `index.html` in a browser.
2. Type a name and choose **Start Mission**.
3. Talk to the guide at the surface.
4. Ride the escalator down into the crust.
5. In each layer:
   - Talk to the guide and read the fun fact.
   - Walk near an element creature and answer the question.
   - Solve the puzzle.
   - Pass the four-question trainer test.
   - Ride the unlocked escalator downward.
6. At Earth’s center, answer 10 questions from the Core Guardian.
7. The victory screen shows **10 Dojo Points**. Show that screen to the teacher.

A wrong answer in a normal layer restarts that layer only. A wrong answer against the Core Guardian sends the student back to the surface and restarts the journey. The student’s name is kept.

There are no timers.

## How to open the game

- **On this computer:** double-click `index.html`, or drag it into Chrome.
- **In a browser already open:** File → Open, then choose `index.html`.
- **For a class set of Chromebooks:** publish with GitHub Pages (steps below) and share the link.

Use a current version of Chrome. The game saves progress in the browser with `localStorage`.

## Keyboard controls

| Key | Action |
| --- | --- |
| Arrow keys or W A S D | Move |
| E or Space | Talk, inspect, and interact |
| 1 2 3 4 | Choose an answer in a battle or trainer test |
| Esc | Pause |
| T three times quickly | Open the Teacher Menu |

On-screen buttons are always available: a direction pad, **Interact**, **Pause**, **Sound**, **Read**, **Restart**, and **Fullscreen**.

**Read Aloud** speaks dialogue and questions. Students can also press **Read Aloud** on a single message.

**Restart** asks for confirmation, then resets the current layer.

## Teacher Menu

Press **T** three times quickly during play.

The menu can:

- Show the student name, current layer, completed layers, and defeated elements
- Unlock all layers
- Restart the current room
- Move the student to any layer
- Open the final boss
- Reset all progress (asks for confirmation; the name is kept)
- Mute or unmute sound
- Turn read-aloud on or off
- Print the completion certificate
- Show the correct solution for each puzzle

## Certificate and Dojo Points

After the Core Guardian is defeated, the victory screen includes:

- The student’s name
- All four layers
- Final-boss score: 10/10
- Total element creatures identified
- A **10 Dojo Points** badge
- **Print Certificate**, **Play Again**, and **Return to Surface**

The certificate is black and white and includes a teacher signature line. Use **Print Certificate**, then choose **Print**.

## Publish with GitHub Pages

1. Push this folder to a GitHub repository if it is not there already.
2. On GitHub, open the repository.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the default branch (`main` or `master`) and the folder **`/ (root)`**.
6. Save.
7. After the site finishes building, open the Pages address GitHub shows. It ends with `.github.io`.

The game loads from `index.html` at that address. Share the link with students. Each student’s progress stays on that Chromebook’s browser.

## Puzzles

- **Crust:** Thin rock slabs over soil. Step on every slab once. The soil path in the middle is safe, so you can walk back and do the other slab path. On each path, take the outer bend. A creature stands on each path and on each outer bend. Identify it, then step on that slab. A second step cracks the crust and returns you to the start of the room.
- Ride the upward escalator to the previous room. Ride the downward escalator back in to reset the room you enter.
- **Mantle:** Hot rock. Push three rocks onto the glowing spots. Creatures guard the gap and the spots. Identify a creature before a rock can move onto its tile. Move the right rock onto its spot before you push the middle rock through the gap. Rocks cannot be pulled. Use **Reset Puzzle** if a rock gets stuck.
- **Outer Core:** Liquid iron and nickel. One glowing line runs from the energy source to the generator. Stand on each numbered arrow and press **E** until every arrow points forward along that line. Creatures wait beside the path.
- **Inner Core:** Solid iron crystals. Watch the pattern, then walk the plates in that order. Circle, Square, and Star have creatures. Identify the creature, then step on that plate. The first pattern has 4 steps and leaves one plate out. The second has 6 steps and repeats one plate.
