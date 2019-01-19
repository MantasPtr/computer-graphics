precision mediump float;

varying vec3 vPosition; 
varying vec3 vPosInCamera;
varying vec3 vNormal; 
varying vec2 vUv;
uniform float uDirX, uDirY, uShininess, uAngleRad;

void main(void) {
    float angle = 45.0;
    vec3 pointOnPlane = vec3(0,10,0);
    vUv = uv;
    vNormal = normalMatrix * normal;
    
    float newX = position.x;
    float newY = position.y;
    float newZ = position.z;
    if (position.y > position.x){
        //vNormal.x = vNormal.x * tan(uAngleRad);
        newY = position.x*tan(uAngleRad);
    }
    vec3 new_position = vec3(newX, newY, newZ); 
    vPosition = new_position;
    vPosInCamera = (viewMatrix * modelMatrix * vec4(new_position, 1.0 )).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0 );         
}