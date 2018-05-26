ShaderDemo = {

  uniforms: {
    "uTex": { type: "t", value: [] },
    "uTime": { type: "1f", value: null }
  },

  vertexShader: [

    "varying vec2 vUv;",

    "uniform float uTime;",

    "uniform sampler2D uTex;",

    "void main( void ) {",

      "vUv = uv;",

      "float offsetY = sin( ( uTime * 0.001 ) + vUv.x );",

      "vec4 texture = texture2D( uTex, vec2( vUv.x, mod( offsetY + vUv.y, 1.0 ) ) );",

      "vec3 p = position;",

      // "p.y += offsetY;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );",

    "}",

  ].join("\n"),

  fragmentShader: [

    "varying vec2 vUv;",

    "uniform float uTime;",

    "uniform sampler2D uTex;",

    "void main() {",

      "float offsetX = vUv.x;",
      "float offsetY = vUv.y;",

      // "offsetX = ( offsetX * 2.0 );",
      // "offsetY = ( offsetY * 2.0 );",

      // "offsetX = abs( offsetX - 1.0 );",
      // "offsetY = abs( offsetY - 1.0 );",

      // "offsetX = cos( ( uTime * 0.001 ) + vUv.y ) + offsetX;",
      // "offsetY = sin( ( uTime * 0.001 ) + vUv.x ) + offsetY;",

      "vec4 texture = texture2D( uTex, vec2( mod( offsetX, 1.0 ), mod( offsetY, 1.0 ) ) );",

      "gl_FragColor = texture;",

    "}"

  ].join("\n")

};
