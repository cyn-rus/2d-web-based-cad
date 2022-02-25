class Lines {
    constructor() {
        this.lines = []
        this.start = []
        this.end = []
        this.moveId = [-1, -1]
        this.moveSelisih = [0,0]
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
            gl.drawArrays(gl.LINES, 2 * i, 2)
        }
    }

    create() {
        const v1 = this.start
        const v2 = this.end

        return v1.concat(v2)
    }

    move(x, y) {
        const startAwal = [this.lines[this.moveId[0]][0], this.lines[this.moveId[0]][1]]
        const endAwal = [this.lines[this.moveId[0]][2], this.lines[this.moveId[0]][3]]

        const startX1 = x + this.moveSelisih[0]
        const startY1 = y + this.moveSelisih[1]

        this.lines[this.moveId[0]][0] = startX1
        this.lines[this.moveId[0]][1] = startY1
        this.lines[this.moveId[0]][2] = (startX1 - startAwal[0]) + endAwal[0]
        this.lines[this.moveId[0]][3] = (startY1 - startAwal[1]) + endAwal[1]
    }

    resize(x, y) {
        this.lines[this.moveId[0]][this.moveId[1]] = x
        this.lines[this.moveId[0]][this.moveId[1]+1] = y
    }

    getClickedLineId(x, y) {
        for (let i = 0; i < this.lines.length; i++) {
            if (euclidDistance(x, this.lines[i][0], y, this.lines[i][1]) <= 0.015) {
                this.moveId = [i, 0]
                break
            } else if (euclidDistance(x, this.lines[i][2], y, this.lines[i][3]) <= 0.015) {
                this.moveId = [i, 2]
                break
            }
        }

        try {
            const startAwal = [this.lines[this.moveId[0]][0], this.lines[this.moveId[0]][1]]
            const startX1 = startAwal[0] - x
            const startY1 = startAwal[1] - y
            this.moveSelisih = [startX1, startY1]
        } catch {

        }
        
        // this.moveId = n
        // console.log(this.moveId)
        // try {
        //     const startAwal = [this.lines[this.moveId][0], this.lines[this.moveId][1]]
        //     const startX1 = startAwal[0] - x
        //     const startY1 = startAwal[1] - y
        //     this.moveSelisih = [startX1, startY1]
        // } catch {

        // }
    }
}