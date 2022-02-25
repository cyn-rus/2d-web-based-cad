// 1. Line
// 2. Square
// 3. Rectangle
// 4. Polygon
// 5. Move Line
// 6. Move Square
// 7. Move Rectangle
// 8. Resize Line
// 9. Resize Square
// 10. Change Polygon Color
// 11. Hex Color



const radioButtons = document.getElementsByTagName('input')

gl.useProgram(program)
gl.drawArrays(gl.LINES, 0, 2)
// Array untuk menyimpan bentuk
var rectanglesArray = new Rectangles()
var linesArray = new Lines()
var squaresArray = new Squares()

let radioButtonId = 0
let mouseclicked = false

for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function() {
        radioButtonId = i
    })
}

function render() {
    rectanglesArray.render()
    linesArray.render()
    squaresArray.render()
}

canvas.addEventListener('mousedown', (e) => {
    mouseclicked = true
    x = -1 + 2*e.offsetX/canvas.width;
    y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;

    switch(radioButtonId){
        case 0:
            // Line
            linesArray.start = [x,y]
            linesArray.end = [x,y]
            break
        case 1:
            // Square
            squaresArray.start = [x,y]
            squaresArray.end = [x,y]
            break
        case 2:
            // Rectangle
            rectanglesArray.start = [x,y]
            rectanglesArray.end = [x,y]
            break
        case 3:
            // Polygon
            break
        case 4:
            // Move Line
            linesArray.getClickedLineId(x, y)
            if (linesArray.moveId[0] !== -1 && linesArray.moveId[1] !== -1) {
                linesArray.move(x, y)
            }
            break
        case 6:
            // Move Rectangle
            rectanglesArray.getClickedRectangleId(x, y)
            console.log(rectanglesArray.moveId[0])
            if (rectanglesArray.moveId[0] != -1){
                rectanglesArray.move(rectanglesArray.moveId[0], x, y)
            }
            break
        case 7:
            // Resize Line
            linesArray.getClickedLineId(x, y)
            if (linesArray.moveId[0] !== -1 && linesArray.moveId[1] !== -1) {
                linesArray.resize(x, y)
            }
            break
        default:
            // Change color ???
    }
    render()
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseclicked){
        x = -1 + 2*e.offsetX/canvas.width;
        y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;
        
        switch(radioButtonId){
            case 0:
                // Line
                linesArray.end = [x,y]
                break
            case 1:
                // Square
                squaresArray.end = [x,y]
                break
            case 2:
                // Rectangle
                rectanglesArray.end = [x,y]
                break
            case 3:
                // Polygon
                break
            case 4:
                // Move Line
                if (linesArray.moveId[0] !== -1 && linesArray.moveId[1] !== -1) {
                    linesArray.move(x, y)
                }
                break
            case 6:
                // Move Rectangle
                if (rectanglesArray.moveId[0] != -1){
                    rectanglesArray.move(rectanglesArray.moveId[0], x, y)
                }
                break
            case 7:
                // Resize Line
                if (linesArray.moveId[0] !== -1 && linesArray.moveId[1] !== -1) {
                    linesArray.resize(x, y)
                }
                break
            default:
                // Change color ???
        }
        render()
    }
})

canvas.addEventListener('mouseup', () => {
    mouseclicked = false
    switch(radioButtonId){
        case 0:
            // Line
            linesArray.lines.push(linesArray.create())
            for (var i = 0; i < 4; ++i) {
                linesArray.cur_color.forEach(elmt => linesArray.color.push(elmt))
            }
            linesArray.start = []
            linesArray.end = []
            break
        case 1:
            // Square
            squaresArray.squares.push(squaresArray.create())
            for (var i = 0; i < 4; ++i) {
                squaresArray.cur_color.forEach(elmt => squaresArray.color.push(elmt))
            }
            squaresArray.start = []
            break
        case 2:
            // Rectangle
            rectanglesArray.rectangles.push(rectanglesArray.create())
            for (var i = 0; i < 4; ++i){
                rectanglesArray.cur_color.forEach(elmt => rectanglesArray.color.push(elmt))
            }
            rectanglesArray.start = []
            rectanglesArray.end = []
            break
        case 3:
            // Polygon
            break
        case 4:
            // Move Line
            linesArray.moveId = [-1, -1]
            break
        case 6:
            // Move Rectangle
            rectanglesArray.moveId = [-1]
            break
        case 7:
            linesArray.moveId = [-1, -1]
            break
        default:
            // Change color ???
    }
})