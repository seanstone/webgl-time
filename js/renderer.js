function Renderer() {
	var shaderProgram;
	var startTime;

	var iResolutionUniform,
		iGlobalTimeUniform,
		iMouseUniform;
	var vertexPositionAttribute, vertexPositionBuffer;

	loadShaders('glsl/seascape.vs', 'glsl/seascape.fs').done(function() {
		shaderProgram = program;
		initShaderVars();
		initAttribBuffers();
		start();
	});

	function initShaderVars()
	{
		// Init uniforms
		iResolutionUniform = gl.getUniformLocation(shaderProgram, "iResolution");
		iGlobalTimeUniform = gl.getUniformLocation(shaderProgram, "iGlobalTime");
		iMouseUniform =  gl.getUniformLocation(shaderProgram, "iMouse");

		// Init attributes
		vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
	}

	function initAttribBuffers()
	{
		vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

		var vertices = new Float32Array ([
	    	1.0,  1.0,  0.0,
	    	-1.0, 1.0,  0.0,
	    	1.0,  -1.0, 0.0,
	    	-1.0, -1.0, 0.0
	  	]);
	  	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
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
