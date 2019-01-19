precision mediump float;	

varying vec3 vPosition; 
varying vec3 vPosInCamera;	
varying vec3 vNormal; 
varying vec2 vUv;
uniform float uDirX, uDirY, uShininess;

void main() {

    vec3 nNormal = normalize(vNormal);        

    vec3 ambColor = vec3(0.1,0.1,0.1);
    vec3 diffColor = vec3(0.6,0.6,0.6);
    vec3 specColor = vec3(0.4,0.4,0.3);

    vec3 lightDir = normalize(vec3(uDirX,uDirY,1.0));    
    float diffLightWeight = max(dot(nNormal,lightDir),0.0);		
    vec3 eyeDir = normalize(-vPosInCamera);
    vec3 reflDir = -reflect(lightDir, nNormal);
    float specLightWeight = pow(max(dot(reflDir, eyeDir), 0.0), uShininess);
    vec3 lightWeight = ambColor + diffColor * diffLightWeight 
        + specColor * specLightWeight;                
    vec3 color = lightWeight;  
    gl_FragColor = vec4(color,1.0);   
}