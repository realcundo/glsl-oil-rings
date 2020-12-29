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
float ring(vec2 coord,vec2 center,float radius,float edge){
    float l=length(coord-center);
    
    //return l<radius?1.:0.;
    return cos(l*radius)*edge;
}

void main(){
    vec2 coords=(gl_FragCoord.xy/u_resolution-.5)*2.;
    vec2 mouse_coords=(u_mouse/u_resolution-.5)*2.;
    
    float r=ring(+coords,+mouse_coords,50.,2.8);
    float g=ring(+coords,-mouse_coords,50.,2.8);
    float b=0.;
    
    gl_FragColor=vec4(r,g,b,1.);
}