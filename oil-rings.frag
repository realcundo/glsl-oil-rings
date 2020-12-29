#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 lissajous(float a,float b,float delta,float t){
    return vec2(sin(a*t+delta),sin(b*t));
}

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
    
    float aspect_ratio=u_resolution.y/u_resolution.x;
    coords.y*=aspect_ratio;
    mouse_coords.y*=aspect_ratio;
    
    float d1=sin(u_time+coords.y*5.1)*.25;
    float d2=sin(u_time*1.1+coords.y*5.)*.25;
    float d3=sin(u_time*.9+coords.y*4.9)*.25;
    
    vec2 p1=lissajous(1.,2.,PI/2.,u_time*.5)*1.1;
    vec2 p2=lissajous(2.,2.,PI/3.,u_time*.45)*.9;
    vec2 p3=vec2(0.,0.);
    
    //d1=d2=d3=0.;
    
    float r=ring(coords,p1,50.,2.8,d1);
    float g=ring(coords,p2,50.,2.8,d2);
    float b=ring(coords,p3,50.,2.8,d3);
    
    gl_FragColor=vec4(r,g,b,1.);
}