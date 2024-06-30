precision highp float;

varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float scale;
uniform float horzIntensity;
uniform float vertIntensity;

void main() {
    vec2 newTextureCoordinate = vec2((scale - 1.0) * 0.5 + vTextureCoord.x / scale,
    (scale - 1.0) * 0.5 + vTextureCoord.y / scale);
    vec4 textureColor = texture2D(uSampler, newTextureCoordinate);

    // shift color
    vec4 shiftColor1 = texture2D(uSampler, newTextureCoordinate + vec2(-0.05 * (scale - 1.0) * horzIntensity * 2., -0.05 * (scale - 1.0) * vertIntensity * 2.));
    vec4 shiftColor2 = texture2D(uSampler, newTextureCoordinate + vec2(-0.1 * (scale - 1.0) * horzIntensity * 2., -0.1 * (scale - 1.0) * vertIntensity * 2.));

    // 3d blend color
    vec3 blendFirstColor = vec3(textureColor.r, textureColor.g, shiftColor1.b);
    vec3 blend3DColor = vec3(shiftColor2.r, blendFirstColor.g, blendFirstColor.b);
    gl_FragColor = vec4(blend3DColor, textureColor.a);
}