#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897932384626433832795

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const vec3 halves = vec3(0.5, 0.5, 0.5);

vec2 lissajous(float a, float b, float delta, float t) {
    return vec2(sin(a * t+delta), sin(b * t));
}

// Input:
//  * coord: current pixel coord
//  * center: coord of the ring center
//  * radius: how large is the circle (in some units)
float ring(vec2 coord, vec2 center, float radius, float displacement) {
    coord.x -= displacement;
    float l = length(coord - center);
    
    return cos(l * radius) * 2.8;
}

void main() {
    
    vec2 coords = (gl_FragCoord.xy / u_resolution - 0.5) * 2.0;
    
    float aspect_ratio = u_resolution.y / u_resolution.x;
    coords.y *= aspect_ratio;
    
    float d1 = sin(u_time + coords.y * 5.1) * 0.125;
    float d2 = sin(u_time * 1.1 + coords.y * 5.0) * 0.125;
    float d3 = sin(u_time * 0.9 + coords.y * 4.9) * 0.125;
    
    vec2 p1 = lissajous(1.0, 2.0, PI / 2.0, u_time * 0.20) * 1.0;
    vec2 p2 = lissajous(1.0, 2.0, PI / 2.0, u_time * 0.15) * 1.1;
    vec2 p3 = lissajous(2.0, 1.0, PI / 2.0, u_time * 0.25) * 0.9;
    
    float radius = min(u_resolution.x, u_resolution.y) * 0.08;
    
    vec3 c = vec3(
        ring(coords, p1, radius, d1),
        ring(coords, p2, radius, d2),
        ring(coords, p3, radius, d3));
        
    // calculate the colour:
    // - if only R, G or B is on, use it
    // - if RG, RB, or BG are on, use the unused colour
    // - if RGB is all off or on, use black
    bvec3 b = greaterThan(c, halves);

    int index = int(b.r)*4 + int(b.g)*2 + int(b.b);
    if(index == 1) c = vec3(0, 0, 1);
    else if(index == 2) c = vec3(0, 1, 0);
    else if(index == 3) c = vec3(1, 0, 0);
    else if(index == 4) c = vec3(1, 0, 0);
    else if(index == 5) c = vec3(0, 1, 0);
    else if(index == 6) c = vec3(0, 0, 1);
    else c = vec3(0, 0, 0);
    
    gl_FragColor = vec4(c, 1.0);
}