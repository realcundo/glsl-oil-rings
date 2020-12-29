#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float ring(vec2 coord,vec2 center,float radius){
    float l=length(coord-center);
    
    return l<radius?1.:0.;
}

void main(){
    vec2 coords=(gl_FragCoord.xy/u_resolution-.5)*2.;
    vec2 mouse_coords=(u_mouse/u_resolution-.5)*2.;
    
    float c=ring(coords,mouse_coords,.5);
    
    gl_FragColor=vec4(c,c,c,1.);
}