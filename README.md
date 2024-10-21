# Haunted House 3D Scene

**Live Preview:** [Haunted House 3D](https://haunted-hosue-git-main-199ozs-projects.vercel.app)  
**Repository:** [Haunted House Repo](https://vercel.com/199ozs-projects/haunted-hosue)

## Overview

This project is a 3D interactive haunted house scene created using [Three.js](https://threejs.org/) for rendering, including features like dynamic lighting, shadows, and texture mapping. It also includes animated ghostly effects and environmental elements like fog and a skybox.

## Features

- **3D Scene Rendering:** The scene features a haunted house, graveyard, and spooky lighting powered by Three.js.
- **Textured Materials:** Realistic textures are applied to various objects like the walls, floors, doors, and graves.
- **Interactive Lighting:** Dynamic lights, including flickering lights on the haunted house door and roaming ghost lights.
- **Shadows & Lighting:** Soft shadows cast from objects, creating a more immersive and eerie atmosphere.
- **Fog & Skybox:** A fog effect surrounds the scene for a misty atmosphere, and a dynamic sky simulates a night-time environment.
- **Animation:** The ghosts move around the house in circular orbits, creating a spooky effect.
- **Camera Controls:** Includes orbit controls that allow users to freely rotate and zoom the camera.
- **GUI for Adjustments:** The project includes a GUI panel that allows live adjustments of parameters like displacement scale for textures.

## Project Structure

The main JavaScript file handles the initialization of the scene, objects, textures, lights, and animations. Key parts of the code include:

1. **Textures:**
   - Loaded using `TextureLoader` for walls, floors, roofs, graves, and the house door.
   - Displacement, ambient occlusion, normal, roughness, and emissive maps are applied to create realistic effects.
  
2. **Objects:**
   - A haunted house constructed using `BoxGeometry` and `ConeGeometry` for the roof, along with various meshes for the door and chimney.
   - A graveyard with randomized grave positions.
  
3. **Lighting:**
   - Ambient, directional, and point lights are used. The door has a flickering light effect, and three point lights represent roaming ghosts.
  
4. **Fog & Skybox:**
   - Fog adds a dense, eerie atmosphere, while a skybox (using `Sky` from Three.js) mimics a cloudy, overcast sky.
  
5. **Ghost Animations:**
   - Three point lights simulate roaming ghosts that move around the house with periodic changes in position.
  
6. **Camera & Controls:**
   - The camera is positioned with a good view of the entire scene, and `OrbitControls` allows the user to interactively move the camera.
  
7. **Dynamic Scene Adjustments:**
   - The GUI allows changes in material displacement and bias for the floor and door, letting users experiment with the scene.

## Tech Stack

- **Three.js:** For creating the 3D scene, handling objects, lights, and camera.
- **Lil-GUI:** For GUI controls to adjust parameters dynamically.
- **Vercel:** For deploying the live preview.


## Future Improvements
- Adding more detailed haunted house props (e.g., furniture, windows, trees).
- Enhancing ghost animations and introducing sound effects.
- Adding user interactions like opening doors or triggering light changes.

# Enjoy the haunted house! 🎃