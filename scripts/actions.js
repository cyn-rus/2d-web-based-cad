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