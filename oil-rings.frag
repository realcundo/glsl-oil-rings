#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Input:
//  * coord: current pixel coord
//  * center: coord of the ring center
//  * radius: how large is the circle (in some units)
//  * edge (>=1.0): the larger the value the sharper the edge
float ring(vec2 coord,vec2 center,float radius,float edge,float displacement){
    coord.x-=displacement;
    float l=length(coord-center);
    
    //return l<radius?1.:0.;
    return cos(l*radius)*edge;
}

void main(){
    vec2 coords=(gl_FragCoord.xy/u_resolution-.5)*2.;
    vec2 mouse_coords=(u_mouse/u_resolution-.5)*2.;
    
    float d1=sin(u_time+coords.y*5.1)*.5;
    float d2=sin(.5+u_time+coords.y*5.)*.5;
    float d3=sin(1.+u_time+coords.y*4.9)*.5;
    
    float r=ring(+coords,+mouse_coords,50.,2.8,d1);
    float g=ring(+coords,-mouse_coords,50.,2.8,d2);
    float b=ring(+coords,vec2(0.,0.),50.,2.8,d3);
    
    gl_FragColor=vec4(r,g,b,1.);
}