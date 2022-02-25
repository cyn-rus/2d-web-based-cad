class Rectangles{
    constructor() {
        this.rectangles = []
        this.start = []
        this.end = []
        this.moveId = [-1]
        this.moveSelisih = [0,0]
        this.color = []
        this.cur_color = [0, 0, 0]
    }

    loadrectangles(data) {
        this.rectangles = data.rectangles
        this.start = data.rectangles_starts
        this.end = data.rectangles_ends
        this.move = data.rectangles_moves
        this.color = data.rectangles_colors
        this.cur_color = data.cur_color
    }

    render() {
        var rect_array = []
        var rect_color_array = []

        // Render rectangle yang dibuat sebelumnya
        this.rectangles.forEach((elmt) => elmt.forEach((elmt1) => rect_array.push(elmt1)))
        this.color.forEach((elmt) => rect_color_array.push(elmt))

        // Render rectangle yang saat ini sedang dibuat
        if (this.start.length > 0){
            this.create().forEach((elmt) => rect_array.push(elmt))
            for(var i = 0; i < 4; i++){
                this.cur_color.forEach((elmt) => rect_color_array.push(elmt))
            }
        }
        console.log(rect_color_array)

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(rect_array));
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(rect_color_array));

        for (var i = 0; i < rect_array.length / 8; i++){
            gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4)
        }
    }

    create() {
        const v1 = this.start;
        const v3 = this.end;
        const v4 = [v1[0], v3[1]];
        const v2 = [v3[0], v1[1]];
    
        return [
            v1[0], v1[1],
            v2[0], v2[1],
            v3[0], v3[1],
            v4[0], v4[1],
        ];
    }

    move(startXId, startX, startY) {
        var startAwal = [this.rectangles[startXId][0], this.rectangles[startXId][1]]
        var endAwal = [this.rectangles[startXId][4], this.rectangles[startXId][5]]

        var startX1 = startX + this.moveSelisih[0]
        var startY1 = startY + this.moveSelisih[1]

        this.rectangles[startXId][0] = startX1
        this.rectangles[startXId][1] = startY1
        this.rectangles[startXId][4] = (startX1 - startAwal[0]) + endAwal[0]
        this.rectangles[startXId][5] = (startY1 - startAwal[1]) + endAwal[1]

        this.rectangles[startXId][2] = this.rectangles[startXId][4]
        this.rectangles[startXId][3] = this.rectangles[startXId][1]
        this.rectangles[startXId][6] = this.rectangles[startXId][0]
        this.rectangles[startXId][7] = this.rectangles[startXId][5]
    }

    getClickedRectangleId(x, y) {
        let n = [-1]
        for (let i = 0; i < this.rectangles.length; i++){
            if (x >= this.rectangles[i][0] && x <= this.rectangles[i][4]){
                if (y <= this.rectangles[i][1] && y >= this.rectangles[i][5]){
                    n[0] = i
                }
            }
        }
        this.moveId[0] = n[0]

        try {
            var startAwal = [this.rectangles[this.moveId[0]][0], this.rectangles[this.moveId[0]][1]]
            var startX1 = startAwal[0] - x
            var startY1 = startAwal[1] - y
            this.moveSelisih = [startX1, startY1]
        } catch {

        }
    }
}