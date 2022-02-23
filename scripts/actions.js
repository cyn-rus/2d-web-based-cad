// 1. Line
// 2. Square
// 3. Rectangle
// 4. Polygon
// 5. Move Shapes
// 6. Resize Line or Square
// 7. Change Polygon Color
// 8. Hex Color

const radioButtons = document.getElementsByTagName('input')

gl.useProgram(program)
gl.drawArrays(gl.LINES, 0, 2)

// Array untuk menyimpan bentuk
var rectanglesArray = new Rectangles()

let mouseclicked = false

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
                // Saat mouse diklik
                canvas.addEventListener('mousedown', (e) => {
                    mouseclicked = true
                    x = -1 + 2*e.offsetX/canvas.width;
                    y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;

                    rectanglesArray.start = [x,y]
                    rectanglesArray.end = [x,y]

                    // Render
                })
                canvas.addEventListener('mousemove', (e) => {
                    // When mouse is clicked and dragged
                })
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