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
        console.log(i)
        switch (i) {
            case 0:
                // Line
                break
            case 1:
                // Square
                break
            case 2:
                // RECTANGLE
                // Saat mouse diklik
                canvas.addEventListener('mousedown', (e) => {
                    mouseclicked = true
                    x = -1 + 2*e.offsetX/canvas.width;
                    y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;

                    rectanglesArray.start = [x,y]
                    rectanglesArray.end = [x,y]

                    rectanglesArray.render()
                })
                // When mouse is clicked and dragged
                canvas.addEventListener('mousemove', (e) => {
                    if (mouseclicked == true){
                        x = -1 + 2*e.offsetX/canvas.width;
                        y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;
                        rectanglesArray.end = [x,y]
                    }
                    rectanglesArray.render()
                })
                // Saat tombol mouse diangkat
                canvas.addEventListener('mouseup', (e) => {
                    mouseclicked = false
                    rectanglesArray.rectangles.push(rectanglesArray.create())
                    for (var i = 0; i < 4; ++i){
                        rectanglesArray.cur_color.forEach(elmt => rectanglesArray.color.push(elmt))
                    }
                    rectanglesArray.start = []
                    rectanglesArray.end = []
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