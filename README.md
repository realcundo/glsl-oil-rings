# GLSL-Oil-Rings

A quick & dirty fragment shader implementation of my "Oil Rings" effect.

![Demo Animation](demo.gif)

## Running
Use your favourite GLSL shader runner, e.g. [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer):
```sh
glslviewer -w 1600 -h 1000 oil-rings.frag
```
## History
The idea comes from [Second Reality PC Demo](https://www.youtube.com/watch?v=iw17c70uJes) (around 2:50 mark). Once I saw the "rings" part I wanted to reproduce it back in mid-90s. I've used 320x200x16 mode, with one static and 2 moving bitplanes while moving the start of the screen to make it appear as if the static bitplane was moving as well. I've used basic RGB colours that gave me the "oily" effect (squint your eyes).

A decade later I reproduced the effect on Android phone as an exercise to learn ARM assembler.

Another decade (and a bit) later I thought it'd be good fun to try the effect again. I wanted to experiment with fragment shaders a bit and this looked like an obvious candidate.

## [License](LICENSE)
- MIT License