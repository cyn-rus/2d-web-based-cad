class Squares {
    constructor() {
        this.squares = []
        this.start = []
        this.end = []
        this.moveId = [-1]
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
        
        // Render line yang dibuat sebelumnya
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
}