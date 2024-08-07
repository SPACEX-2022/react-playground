
void mainImage (out vec4 fragColor, in vec2 fragCoord) {
    // vec3 color1 = vec3(1., 0., 1.);
    // vec3 color2 = vec3(1., 1., 0.);
    // vec3 color3 = vec3(0., 0., 0.);
    // vec3 color4 = vec3(0., 0., 1.);
    // // fragColor = vec4(color, 1.);
    // if (fragCoord.x < iResolution.x*.25) {
    //     fragColor = vec4(color1, 1.);
    // } else if (fragCoord.x >= iResolution.x*.25 && fragCoord.x < iResolution.x*.5) {
    //     fragColor = vec4(color2, 1.);
    // } else if (fragCoord.x >= iResolution.x*.5 && fragCoord.x < iResolution.x*.75) {
    //     fragColor = vec4(color3, 1.);
    // } else {
    //     fragColor = vec4(color4, 1.);
    // }

    vec2 uv = fragCoord / iResolution.xy;
    uv = (uv - 0.5) * 2.;
    uv.x *= iResolution.x / iResolution.y;
    float d = length(uv);
    d -= 0.5;
    // float c = step(0., d);
    float c = 1. - smoothstep(0., 0.02, d);
    float paddingColor = step(1., c);
    // fragColor = vec4(vec3(c), 1.);
    fragColor = vec4(c, paddingColor, paddingColor, 1.);
    // fragColor = vec4(uv, 0., 1.);

}