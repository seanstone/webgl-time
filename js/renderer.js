function Renderer() {
	var shaderProgram;
	var startTime;

	var iResolutionUniform,
		iGlobalTimeUniform,
		iMouseUniform;
	var vertexPositionAttribute, vertexPositionBuffer;

	// Load shaders
	var vs_source, fs_source;
	var jvs = jQuery.get('glsl/seascape.vs', function(data){ vs_source = data; }),
		jfs = jQuery.get('glsl/seascape.fs', function(data){ fs_source = data; });
	$.when(jvs, jfs).done(function() {
			initProgram();
			initBuffers();
			start();
		});

	function initProgram()
	{
		// Compile program
		shaderProgram = compileProgram(vs_source, fs_source);
		if (shaderProgram) gl.useProgram(shaderProgram);
		else return null;

		// Init uniforms
		iResolutionUniform = gl.getUniformLocation(shaderProgram, "iResolution");
		iGlobalTimeUniform = gl.getUniformLocation(shaderProgram, "iGlobalTime");
		iMouseUniform =  gl.getUniformLocation(shaderProgram, "iMouse");

		// Init attributes
		vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
	}

	function initBuffers()
	{
		vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

		var vertices = [
	    	1.0,  1.0,  0.0,
	    	-1.0, 1.0,  0.0,
	    	1.0,  -1.0, 0.0,
	    	-1.0, -1.0, 0.0
	  	];
	  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	}

	function start()
	{
		startTime = new Date().getTime();
		setInterval(draw, 50);
	}

	function draw()
	{
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		seconds = (new Date().getTime() - startTime) / 1000;

		gl.uniform3f(iResolutionUniform, $("#glCanvas").width(), $("#glCanvas").height(), $("#glCanvas").width()*1.0/$("#glCanvas").height());
		gl.uniform1f(iGlobalTimeUniform, seconds);
		gl.uniform4f(iMouseUniform, 0, 0, 0, 0); // TODO

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

}
