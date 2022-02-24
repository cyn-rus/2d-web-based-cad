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

let radioButtonId = 0
let mouseclicked = false

for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function() {
        console.log(i)
        radioButtonId = i


        // switch (i) {
        //     case 0:
        //         // Line
        //         break
        //     case 1:
        //         // Square
        //         break
        //     case 2:
        //         // RECTANGLE
        //         // Saat mouse diklik
        //         canvas.addEventListener('mousedown', (e) => {
        //             mouseclicked = true
        //             x = -1 + 2*e.offsetX/canvas.width;
        //             y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;

        //             rectanglesArray.start = [x,y]
        //             rectanglesArray.end = [x,y]

        //             rectanglesArray.render()
        //         })
        //         // When mouse is clicked and dragged
        //         canvas.addEventListener('mousemove', (e) => {
        //             if (mouseclicked == true){
        //                 x = -1 + 2*e.offsetX/canvas.width;
        //                 y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;
        //                 rectanglesArray.end = [x,y]
        //             }
        //             rectanglesArray.render()
        //         })
        //         // Saat tombol mouse diangkat
        //         canvas.addEventListener('mouseup', (e) => {
        //             mouseclicked = false
        //             rectanglesArray.rectangles.push(rectanglesArray.create())
        //             for (var i = 0; i < 4; ++i){
        //                 rectanglesArray.cur_color.forEach(elmt => rectanglesArray.color.push(elmt))
        //             }
        //             rectanglesArray.start = []
        //             rectanglesArray.end = []
        //         })
        //         break
        //     case 3:
        //         // Polygon
        //         break
        //     case 4:
        //         // Move Shapes
        //         // Rectangle
        //         canvas.addEventListener('mousedown', (e) => {
        //             mouseclicked = true
        //             x = -1 + 2*e.offsetX/canvas.width;
        //             y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;

        //             rectanglesArray.moveId = [rectanglesArray.geClickedRectangleId(x, y)]
        //             if (rectanglesArray.moveId[0] != -1){
        //                 rectanglesArray.move(rectanglesArray.moveId[0], x, y)
        //             }
        //             rectanglesArray.render()
        //         })
        //         canvas.addEventListener('mousemove', (e) => {
        //             if (mouseclicked == true && rectanglesArray.moveId[0] != -1){
        //                 x = -1 + 2*e.offsetX/canvas.width;
        //                 y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;
        //                 rectanglesArray.move(rectanglesArray.moveId[0], x, y)
        //             }
        //             rectanglesArray.render()
        //         })
        //         canvas.addEventListener('mouseup', (e) => {
        //             mouseclicked = false
        //             rectanglesArray.moveId = [-1]
        //         })
        //         break
        //     case 5:
        //         // Resize Line or Square
        //         break
        //     case 6:
        //         // Change Polygon Color
        //         break
        //     default:
        //         // Change color ???
        // }
    })
}

canvas.addEventListener('mousedown', (e) => {
    mouseclicked = true
    x = -1 + 2*e.offsetX/canvas.width;
    y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;

    switch(radioButtonId){
        case 0:
            // Line
            break
        case 1:
            // Square
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
            // Move Rectangle
            rectanglesArray.getClickedRectangleId(x, y)
            console.log(rectanglesArray.moveId[0])
            if (rectanglesArray.moveId[0] != -1){
                rectanglesArray.move(rectanglesArray.moveId[0], x, y)
            }
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
    rectanglesArray.render()
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseclicked == true){
        x = -1 + 2*e.offsetX/canvas.width;
        y = -1 + 2*(canvas.height - e.offsetY)/canvas.height;
        
        switch(radioButtonId){
            case 0:
                // Line
                break
            case 1:
                // Square
                break
            case 2:
                // Rectangle
                rectanglesArray.end = [x,y]
                break
            case 3:
                // Polygon
                break
            case 4:
                // Move Rectangle
                if (rectanglesArray.moveId[0] != -1){
                    rectanglesArray.move(rectanglesArray.moveId[0], x, y)
                }
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
        rectanglesArray.render()
    }
})

canvas.addEventListener('mouseup', (e) => {
    mouseclicked = false
    switch(radioButtonId){
        case 0:
            // Line
            break
        case 1:
            // Square
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
            // Move Rectangle
            rectanglesArray.moveId = [-1]
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