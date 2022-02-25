class Squares {
    constructor() {
        this.squares = []
        this.start = []
        this.end = []
        this.moveId = -1
        this.resizeId = [-1, -1]
        this.moveSelisih = [0,0]
        this.color = []
        this.cur_color = [0, 0, 0]
    }

    loadsquares(data) {
        this.squares = data.squares
        this.start = data.squares_starts
        this.end = data.squares_ends
        this.move = data.squares_moves
        this.color = data.squares_colors
        this.cur_color = data.squares_color
    }

    render() {
        const square_array = []
        const square_color_array = []

        // Render square yang saat ini sedang dibuat
        if (this.start.length > 0) {
            this.create().forEach(elmt => square_array.push(elmt))
            for (let i = 0; i < 4; i++) {
                this.cur_color.forEach((elmt) => square_color_array.push(elmt))
            }
        }
        
        // Render square yang dibuat sebelumnya
        this.squares.forEach(elmt => elmt.forEach(elmt1 => square_array.push(elmt1)))
        this.color.forEach(elmt => square_color_array.push(elmt))
        
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(square_array))
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(square_color_array))

        for (let i = 0; i < square_array.length / 8; i++) {
            gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4)
        }
    }

    create() {
        const size = Math.min(Math.abs(this.start[0] - this.end[0]), Math.abs(this.start[1] - this.end[1]))
        const v3_x = this.start[0] + size * (this.start[0] > this.end[0] ? -1 : 1)
        const v3_y = this.start[1] + size * (this.start[1] > this.end[1] ? -1 : 1) 
        
        const v1 = this.start
        const v3 = [v3_x, v3_y]
        const v4 = [v1[0], v3[1]]
        const v2 = [v3[0], v1[1]]

        return [
            v1[0], v1[1],
            v2[0], v2[1],
            v3[0], v3[1],
            v4[0], v4[1],
        ]
    }

    move(x, y) {
        const startAwal = [this.squares[this.moveId][0], this.squares[this.moveId][1]]
        const endAwal = [this.squares[this.moveId][4], this.squares[this.moveId][5]]

        const startX1 = x + this.moveSelisih[0]
        const startY1 = y + this.moveSelisih[1]

        this.squares[this.moveId][0] = startX1
        this.squares[this.moveId][1] = startY1
        this.squares[this.moveId][4] = (startX1 - startAwal[0]) + endAwal[0]
        this.squares[this.moveId][5] = (startY1 - startAwal[1]) + endAwal[1]

        this.squares[this.moveId][2] = this.squares[this.moveId][4]
        this.squares[this.moveId][3] = this.squares[this.moveId][1]
        this.squares[this.moveId][6] = this.squares[this.moveId][0]
        this.squares[this.moveId][7] = this.squares[this.moveId][5]
    }

    resize(x, y) {
        const id = this.resizeId[0]
        const currIdx = this.resizeId[1]
        const oppositeIdx = (currIdx + 4) % 8
        
        const endAwal = [this.squares[id][oppositeIdx], this.squares[id][oppositeIdx+1]]
        
        const size = Math.min(Math.abs(endAwal[0] - x), Math.abs(endAwal[1] - y))
        const newX = endAwal[0] + size * (endAwal[0] > x ? -1 : 1)
        const newY = endAwal[1] + size * (endAwal[1] > y ? -1 : 1)

        this.squares[id][currIdx] = newX
        this.squares[id][currIdx+1] = newY
        this.squares[id][(oppositeIdx + 2) % 8] = newX
        this.squares[id][((oppositeIdx + 2) % 8) + 1] = this.squares[id][oppositeIdx+1]
        this.squares[id][(currIdx + 2) % 8] = this.squares[id][oppositeIdx]
        this.squares[id][((currIdx + 2) % 8) + 1] = newY
    }

    getClickedSquareId(x, y) {
        for (let i = 0; i < this.squares.length; i++) {
            if (x >= this.squares[i][0] && x <= this.squares[i][4]) {
                if (y <= this.squares[i][1] && y >= this.squares[i][5]) {
                    this.moveId = i
                    break
                }
            }
        }

        try {
            const startAwal = [this.squares[this.moveId][0], this.squares[this.moveId][1]]
            const startX1 = startAwal[0] - x
            const startY1 = startAwal[1] - y
            this.moveSelisih = [startX1, startY1]
        } catch {

        }
    }

    getPointSquareId(x, y) {
        let found = false
        loop:
            for (let i = 0; i < this.squares.length; i++) {
                for (let j = 0; j < 8; j+=2) {
                    if (euclidDistance(x, this.squares[i][j], y, this.squares[i][j+1]) <= 0.015) {
                        found = true
                        this.resizeId = [i, j]
                        break loop
                    }
                }
            }

        try {
            const startAwal = [this.squares[this.resizeId[0]], this.squares[this.resizeId[1] + 1]]
            const startX1 = startAwal[0] - x
            const startY1 = startAwal[1] - y
            this.moveSelisih = [startX1, startY1]
        } catch {

        }
    }
}