var gl; // A global variable for the WebGL context

function main()
{
	// Initialize the GL context
	var canvas = document.getElementById("glCanvas");
	gl = initWebGL(canvas);
	if(!gl) return null;

	var renderer = new Renderer();
	renderer.init().done(function(){renderer.start();})
}

function initWebGL(canvas)
{
	gl = null;

	try {
		// Try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
 	} catch(e) {}


	if (!gl) document.write("</br>Unable to initialize WebGL.</br>");
  	return gl;
}
