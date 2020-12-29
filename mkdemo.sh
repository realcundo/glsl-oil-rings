#!/bin/bash
set -eux

glslviewer -w 1600 -h 1000 oil-rings.frag -e "sequence, 0, 15" -e "q"
ffmpeg -framerate 60 -r 25 -i %05d.png -vf scale="320:-1" demo.gif
rm *.png