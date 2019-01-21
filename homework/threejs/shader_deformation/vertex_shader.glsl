precision mediump float;

varying vec3 vPosition; 
varying vec3 vPosInCamera;
varying vec3 vNormal; 
varying vec2 vUv;
uniform float uDirX, uDirY, uShininess, uAngleRad, uPointX, uPointY, uPointZ;

void main(void) {
    float angle = 45.0;
    vec3 pointOnPlane = vec3(uPointX, uPointY, uPointZ);
    float cosAngle = cos(uAngleRad);
    float sinAngle = sin(uAngleRad);
    vec3 planeNormal = vec3(cosAngle, sinAngle, 0.0);

    vUv = uv;
    vNormal = normalMatrix * normal;

    float newX = position.x;
    float newY = position.y;
    float newZ = position.z;
    
    vec3 new_position = vec3(newX, newY, newZ); 
    if (dot(planeNormal,(pointOnPlane - position)) < 0.0) {
        float distanceToPlane = dot(position - pointOnPlane, planeNormal);
        new_position = position - planeNormal * distanceToPlane;
    } else 
    vPosition = new_position;
    vPosInCamera = (viewMatrix * modelMatrix * vec4(new_position, 1.0 )).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0 );         
}