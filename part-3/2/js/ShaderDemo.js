ShaderDemo = {

  uniforms: {
    "uTex": { type: "t", value: [] },
    "uTime": { type: "1f", value: null }
  },

  vertexShader: [

    "varying vec2 vUv;",

    "varying float height;",

    "uniform float uTime;",

    "// Simplex 2D noise",
    
    "vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }",

    "float snoise(vec2 v){",
      "const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);",
      "vec2 i  = floor(v + dot(v, C.yy) );",
      "vec2 x0 = v -   i + dot(i, C.xx);",
      "vec2 i1;",
      "i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
      "vec4 x12 = x0.xyxy + C.xxzz;",
      "x12.xy -= i1;",
      "i = mod(i, 289.0);",
      "vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))",
      "+ i.x + vec3(0.0, i1.x, 1.0 ));",
      "vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),",
      "  dot(x12.zw,x12.zw)), 0.0);",
      "m = m*m ;",
      "m = m*m ;",
      "vec3 x = 2.0 * fract(p * C.www) - 1.0;",
      "vec3 h = abs(x) - 0.5;",
      "vec3 ox = floor(x + 0.5);",
      "vec3 a0 = x - ox;",
      "m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );",
      "vec3 g;",
      "g.x  = a0.x  * x0.x  + h.x  * x0.y;",
      "g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
      "return 130.0 * dot(m, g);",
    "}",

    "void main( void ) {",

      "vUv = uv;",

      "vec3 p = position;",

      "float offsetZ = 0.0;",

      "height = snoise(vec2(vUv.x * 10.0, (vUv.y * 10.0) + (uTime * 0.001)));",

      "offsetZ += height;",

      "offsetZ *= 0.5;",

      "p.z += offsetZ;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );",

    "}",

  ].join("\n"),

  fragmentShader: [

    "varying vec2 vUv;",

    "varying float height;",

    "uniform float uTime;",

    "uniform sampler2D uTex;",


    "// Simplex 2D noise",
    
    "vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }",

    "float snoise(vec2 v){",
      "const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);",
      "vec2 i  = floor(v + dot(v, C.yy) );",
      "vec2 x0 = v -   i + dot(i, C.xx);",
      "vec2 i1;",
      "i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
      "vec4 x12 = x0.xyxy + C.xxzz;",
      "x12.xy -= i1;",
      "i = mod(i, 289.0);",
      "vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))",
      "+ i.x + vec3(0.0, i1.x, 1.0 ));",
      "vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),",
      "  dot(x12.zw,x12.zw)), 0.0);",
      "m = m*m ;",
      "m = m*m ;",
      "vec3 x = 2.0 * fract(p * C.www) - 1.0;",
      "vec3 h = abs(x) - 0.5;",
      "vec3 ox = floor(x + 0.5);",
      "vec3 a0 = x - ox;",
      "m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );",
      "vec3 g;",
      "g.x  = a0.x  * x0.x  + h.x  * x0.y;",
      "g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
      "return 130.0 * dot(m, g);",
    "}",


    "void main() {",

      "float offsetX = vUv.x;",
      "float offsetY = vUv.y;",

      // "offsetX = ( offsetX * 2.0 );",
      // "offsetY = ( offsetY * 2.0 );",

      // "offsetX = abs( offsetX - 1.0 );",
      // "offsetY = abs( offsetY - 1.0 );",

      // "offsetX = cos( ( uTime * 0.001 ) + vUv.y ) + offsetX;",
      // "offsetY = sin( ( uTime * 0.001 ) + vUv.x ) + offsetY;",

      "float n = snoise(vec2(vUv.x + ( uTime * 0.001 ), vUv.y));",

      "offsetY += 0.1 * n;",
      "vec4 tr = texture2D( uTex, vec2( mod( offsetX, 1.0 ), mod( offsetY, 1.0 ) ) );",

      "offsetY += 0.2 * n;",
      "vec4 tg = texture2D( uTex, vec2( mod( offsetX, 1.0 ), mod( offsetY, 1.0 ) ) );",

      "offsetY += 0.5 * n;",
      "vec4 tb = texture2D( uTex, vec2( mod( offsetX, 1.0 ), mod( offsetY, 1.0 ) ) );",


      // "float v = offsetX + offsetY;",

      // "vec4 t = vec4( offsetX, offsetY, 1., 1.0 );",

      // "vec4 t = texture2D( uTex, vUv );",
      "vec4 t = vec4(tr.r * height, tg.g * height, tb.b * height, 1.0);",

      "gl_FragColor = t;",

    "}"

  ].join("\n")

};
