class Lines {
    constructor() {
        this.lines = []
        this.start = []
        this.end = []
        this.move = []
        this.color = []
        this.cur_color = [0, 0, 0]
    }

    loadlines(data) {
        this.lines = data.lines
        this.start = data.lines_starts
        this.end = data.lines_ends
        this.move = data.lines_moves
        this.color = data.lines_colors
        this.cur_color = data.cur_color
    }

    render() {
        const line_array = []
        const line_color_array = []

        // Render line yang saat ini sedang dibuat
        if (this.start.length > 0) {
            this.create().forEach(elmt => line_array.push(elmt))
            for (let i = 0; i < 4; i++) {
                this.cur_color.forEach((elmt) => line_color_array.push(elmt))
            }
        }

        // Render line yang dibuat sebelumnya
        this.lines.forEach(elmt => elmt.forEach(elmt1 => line_array.push(elmt1)))
        this.color.forEach(elmt => line_color_array.push(elmt))

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(line_array))
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(line_color_array))

        for (let i = 0; i < line_array.length / 4; i++) {
            console.log(line_array)
            gl.drawArrays(gl.LINES, 2 * i, 2)
        }
    }

    create() {
        const v1 = this.start
        const v2 = this.end

        return v1.concat(v2)
    }
}