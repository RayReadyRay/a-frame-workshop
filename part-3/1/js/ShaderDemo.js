ShaderDemo = {

  uniforms: {
    "uTex": { type: "t", value: [] },
    "uTime": { type: "1f", value: null }
  },

  vertexShader: [

    "varying vec2 vUv;",

    "uniform float uTime;",

    "void main( void ) {",

      "vUv = uv;",

      "vec3 p = position;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );",

    "}",

  ].join("\n"),

  fragmentShader: [

    "varying vec2 vUv;",

    "uniform float uTime;",

    "uniform sampler2D uTex;",

    "void main() {",

      // "vec4 c = texture2D( uTex, vUv );",

      "vec4 c = vec4(1.0, 0.0, 0.0, 1.0);",

      // "c.r = vUv.x;",
      //
      // "c.g = vUv.y;",

      // "c.r = c.r * 6.0;",

      // "c.r = mod(floor(c.r + (uTime * 0.001)), 2.0);",

      // "c.g = 1.0;",

      // "vec4 c = vec4(0.0, 0.5, 1.0, 1.0);",

      "gl_FragColor = c;",

    "}"

  ].join("\n")

};
