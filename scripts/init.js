let program
const canvas = document.querySelector('#glCanvas')
const gl = canvas.getContext('webgl')

function init() {
    if (!gl) throw new Error("This web browser doesn't support WebGL!") 

    // Config WebGL
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Vertex Shader
    const vertexS = `
        attribute vec4 position;
        attribute vec4 color;
        varying vec4 fColor;
    
        void main() {
            gl_Position = position;
            fColor = color;
        }
    `

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexS)
   
    // Fragment Shader
    const fragS = `
        precision mediump float;
        varying vec4 fColor;

        void main() {
            gl_FragColor = fColor;
        }
    `

    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragS)

    // Program
    program = createProgram(vertexShader, fragmentShader)
}

function createShader(type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) return shader

    gl.deleteShader(shader)
}

function createProgram(vertexShader, fragmentShader) {
    const prog = gl.createProgram()
    gl.attachShader(prog, vertexShader)
    gl.attachShader(prog, fragmentShader)
    gl.linkProgram(prog)
    const success = gl.getProgramParameter(prog, gl.LINK_STATUS)
    if (success) return prog

    gl.deleteProgram(prog)
}

init()