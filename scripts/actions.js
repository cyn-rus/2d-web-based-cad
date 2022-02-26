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
const colorPicker = document.getElementById('colorPicker')

gl.useProgram(program)
gl.drawArrays(gl.LINES, 0, 2)
// Array untuk menyimpan bentuk
var rectanglesArray = new Rectangles()
var linesArray = new Lines()
var squaresArray = new Squares()
var polygonsArray = new Polygons()

let radioButtonId = 0
let mouseclicked = false
let hexvalue = [0,0,0]

for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function() {
        radioButtonId = i

        polygonsArray.create()
        polygonsArray.reset()
    })
}

colorPicker.addEventListener('change', function(){
    hexvalue = HEXToVBColor(colorPicker.value)
})

function HEXToVBColor(rrggbb) {
    // var bbggrr = rrggbb.substr(5, 2) + rrggbb.substr(3, 2) + rrggbb.substr(1, 2);
    var rr = rrggbb.substr(1, 2)
    var gg = rrggbb.substr(3, 2)
    var bb = rrggbb.substr(5, 2)
    return [parseInt(rr, 16)/255, parseInt(gg, 16)/255, parseInt(bb, 16)/255];
}

function render() {
    rectanglesArray.render()
    linesArray.render()
    squaresArray.render()
    polygonsArray.render()
}

const upload = document.getElementById('upload')
const download = document.getElementById('download')
const fileUploader = document.createElement('input')
fileUploader.setAttribute('type', 'file')

upload.addEventListener('click', () => {
    fileUploader.click()
})

fileUploader.addEventListener('change', (e) => {
    const fr = new FileReader()
    const file = e.target.files[0]
    
    fr.addEventListener('load', (e) => {
        try {
            const data = JSON.parse(e.target.result)
            linesArray.loadlines(data)
            squaresArray.loadsquares(data)
            rectanglesArray.loadrectangles(data)
            polygonsArray.loadPolygons(data)
            render()
        } catch (err) {
            alert('Something went wrong!')
        }
    })
    fr.readAsText(file)
})

download.addEventListener('click', () => {
    const element = document.createElement('a')
    const data = {...linesArray, ...squaresArray, ...rectanglesArray, ...polygonsArray}
    const strData = 'data:text/json;charset=utf-8, ' + encodeURIComponent(JSON.stringify(data))
    
    element.setAttribute('href', strData)
    element.setAttribute('download', 'data.json')
    document.body.appendChild(element)
    element.click()
})

canvas.addEventListener('mousedown', (e) => {
    mouseclicked = true
    x = -1 + 2*e.offsetX/canvas.width;
    y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;

    switch(radioButtonId){
        case 0:
            // Line
            linesArray.lines_starts = [x,y]
            linesArray.lines_ends = [x,y]
            break
        case 1:
            // Square
            squaresArray.squares_starts = [x,y]
            squaresArray.squares_ends = [x,y]
            break
        case 2:
            // Rectangle
            rectanglesArray.cur_color = hexvalue
            rectanglesArray.rectangles_starts = [x,y]
            rectanglesArray.rectangles_ends = [x,y]
            break
        case 3:
            // Polygon
            console.log("ayam")
            polygonsArray.cur_polygon.push([x,y])
            polygonsArray.cur_color = hexvalue
            polygonsArray.cur_vertex++
            break
        case 4:
            // Move Line
            linesArray.getMoveLineId(x, y)
            if (linesArray.moveId[0] !== -1) {
                linesArray.move(x, y)
            }
            break
        case 5:
            // Move Square
            squaresArray.getClickedSquareId(x, y)
            if (squaresArray.moveId[0] !== -1 && squaresArray.moveId !== -1) {
                squaresArray.move(x, y)
            }
            break
        case 6:
            // Move Rectangle
            rectanglesArray.getClickedRectangleId(x, y)
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
        case 8:
            // Resize Square
            squaresArray.getPointSquareId(x, y)
            if (squaresArray.resizeId[0] !== -1 && squaresArray.resizeId[1] !== -1) {
                squaresArray.resize(x, y)
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
                linesArray.lines_ends = [x,y]
                break
            case 1:
                // Square
                squaresArray.squares_ends = [x,y]
                break
            case 2:
                // Rectangle
                rectanglesArray.rectangles_ends = [x,y]
                break
            case 3:
                // Polygon todo?
                break
            case 4:
                // Move Line
                if (linesArray.moveId[0] !== -1) {
                    linesArray.move(x, y)
                }
                break
            case 5:
                // Move Square
                if (squaresArray.moveId[0] !== -1 && squaresArray.moveId !== -1) {
                    squaresArray.move(x, y)
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
            case 8:
                // Resize Square
                if (squaresArray.resizeId[0] !== -1 && squaresArray.resizeId[1] !== -1) {
                    squaresArray.resize(x, y)
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
                linesArray.cur_color.forEach(elmt => linesArray.lines_colors.push(elmt))
            }
            linesArray.lines_starts = []
            linesArray.lines_ends = []
            break
        case 1:
            // Square
            squaresArray.squares.push(squaresArray.create())
            for (var i = 0; i < 4; ++i) {
                squaresArray.cur_color.forEach(elmt => squaresArray.squares_colors.push(elmt))
            }
            squaresArray.squares_starts = []
            squaresArray.squares_ends = []
            break
        case 2:
            // Rectangle
            rectanglesArray.rectangles.push(rectanglesArray.create())
            for (var i = 0; i < 4; ++i){
                rectanglesArray.cur_color.forEach(elmt => rectanglesArray.rectangles_colors.push(elmt))
            }
            rectanglesArray.rectangles_starts = []
            rectanglesArray.rectangles_ends = []
            break
        case 3:
            // Polygon
            break
        case 5:
            // Move Square
            squaresArray.moveId = [-1, -1]
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
        case 8:
            squaresArray.resizeId = [-1, -1]
            break
        default:
            // Change color ???
    }
})