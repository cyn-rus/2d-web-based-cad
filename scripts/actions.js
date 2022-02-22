// 1. Line
// 2. Square
// 3. Rectangle
// 4. Polygon
// 5. Move Shapes
// 6. Resize Line or Square
// 7. Change Polygon Color
// 8. Hex Color

const radioButtons = document.getElementsByTagName('input')

const vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, 8 * 200000, gl.STATIC_DRAW)
const position = gl.getAttribLocation(program, 'position')
gl.enableVertexAttribArray(position)
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

const colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER, 8 * 200000, gl.STATIC_DRAW)
const color = gl.getAttribLocation(program, 'color')
gl.enableVertexAttribArray(color)
gl.vertexAttribPointer(color, 2, gl.FLOAT, false, 0, 0)

for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function() {
        switch (i) {
            case 0:
                // Line
                break
            case 1:
                // Square
                break
            case 2:
                // Rectangle
                break
            case 3:
                // Polygon
                break
            case 4:
                // Move Shapes
                break
            case 5:
                // Resize Line or Square
                break
            case 6:
                // Change Polygon Color
                break
            default:
                // Change color ???
        }
    })
}