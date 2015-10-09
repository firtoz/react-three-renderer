varying vec2 vUV;

void main() {
  vUV = 0.75 * uv;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

  gl_Position = projectionMatrix * mvPosition;
}
