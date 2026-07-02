precision mediump float;

varying vec2 vUv;

uniform float n;
uniform float m;

const float PI = 3.1415926;

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;

  // float n = 2.0;
  // float m = 5.0;

  float f =
    cos(n * PI * p.x) * cos(m * PI * p.y)
  - cos(m * PI * p.x) * cos(n * PI * p.y);

  float line = 1.0 - smoothstep(0.0, 0.02, abs(f));

  vec3 color = mix(vec3(0.05), vec3(1.0), line);

  gl_FragColor = vec4(color, 1.0);
}