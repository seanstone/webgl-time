function compileProgram(vs_source, fs_source)
{
	var vs = compileShader(vs_source, gl.VERTEX_SHADER),
		fs = compileShader(fs_source, gl.FRAGMENT_SHADER);

	program = gl.createProgram();
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    	alert("Failed to compile shader program: " + gl.getProgramInfoLog(shader));

	console.log("Shader program compiled");
	return program;
}

function compileShader(source, type) {

    var	shader = gl.createShader(type); // VERTEX_SHADER or FRAGMENT_SHADER
  	gl.shaderSource(shader, source);
  	gl.compileShader(shader);

  	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    	alert("Failed to compile shader: " + gl.getShaderInfoLog(shader));

	console.log("Shader compiled: " + type);
  	return shader;
}
