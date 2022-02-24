let program
const canvas = document.querySelector('#glCanvas')
const gl = canvas.getContext('webgl')
const vertices = []
const color = []
const vertexBuffer = gl.createBuffer()
const colorBuffer = gl.createBuffer()

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
    
    createBuffer()
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

function createBuffer() {
    const abc = [
        0, 0,
        0, 0.5,
        0.7, 0
    ]

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, 8 * 200000, gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, 8 * 200000, gl.STATIC_DRAW)
    const color = gl.getAttribLocation(program, 'color')
    gl.enableVertexAttribArray(color)
    gl.vertexAttribPointer(color, 2, gl.FLOAT, false, 0, 0)
}

init()