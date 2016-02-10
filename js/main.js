var gl; // A global variable for the WebGL context

function main()
{
	// Initialize the GL context
	var canvas = document.getElementById("glCanvas");
	gl = initWebGL(canvas);
	if(!gl) return null;

    //gl.enable(gl.DEPTH_TEST);
    //gl.depthFunc(gl.LEQUAL);

	var renderer = new Renderer();
}

function initWebGL(canvas)
{
	gl = null;

	try {
		// Try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
 	} catch(e) {}


	if (!gl) alert("Unable to initialize WebGL. Your browser may not support it.");
  	return gl;
}
