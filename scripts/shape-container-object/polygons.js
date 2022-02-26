class Polygons {
    constructor() {
        this.polygons = []
        this.colors = []
        this.sudut = []
        this.jumlah_sudut = 0
        this.moveId = [-1]
        this.cur_color = [0, 0, 0]
    }

    loadPolygons(data) {
        this.polygons = data.polygons
        this.colors = data.colors
        this.sudut = data.sudut
        this.jumlah_sudut = data.jumlah_sudut
        this.move = data.polygon_moves
        this.cur_color = data.cur_color
    }

    render() {
        var polygon_array = []
        var polygon_color_array = []

        // Render polygon yang saat ini sedang dibuat
        if (this.jumlah_sudut > 2) {
            for (var i = 0; i < this.jumlah_sudut; i++) {
                this.cur_color.forEach((elmt) => this.cur_color.push(elmt))
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(this.sudut));
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(this.cur_color));
            
            gl.drawArrays(gl.TRIANGLE_FAN, 0, this.jumlah_sudut) // garis
        }
        // buffer overflow

        // Render polygon yang dibuat sebelumnya
        this.polygons.forEach((elmt) => elmt.forEach((elmt1) => polygon_array.push(elmt1)))
        this.colors.forEach((elmt) => polygon_color_array.push(elmt))

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(polygon_array));
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(polygon_color_array));
        
        var i = 0;
        var j = 0;
        while (i < polygon_array.length/2) { //
            gl.drawArrays(gl.TRIANGLE_FAN, i, this.sudut[j])
            i += this.sudut[j];
            j++;
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
        console.log(startXId)
        var startAwal = [this.polygon[startXId][0], this.polygon[startXId][1]]
        var endAwal = [this.polygon[startXId][4], this.polygon[startXId][5]]

        var startX1 = startX + (startAwal[0] - startX)
        var startY1 = startY + (startAwal[1] - startY)

        this.polygon[startXId][0] = startX1
        this.polygon[startXId][1] = startY1
        this.polygon[startXId][4] = (startX1 - startAwal[0]) + endAwal[0]
        this.polygon[startXId][5] = (startY1 - startAwal[1]) + endAwal[1]

        this.polygon[startXId][2] = this.polygon[startXId][4]
        this.polygon[startXId][3] = this.polygon[startXId][1]
        this.polygon[startXId][6] = this.polygon[startXId][0]
        this.polygon[startXId][7] = this.polygon[startXId][5]
    }

    getClickedPolygonId(x, y) {
        let n = [-1]
        for (var i = 0; i < this.polygon; i++){
            if (x >= this.polygon[i][0] && x <= this.polygon[i][4]){
                if (y <= this.polygon[i][1] && y >= this.polygon[i][5]){
                    n = [i]
                }
            }
        }
        console.log(n)
        this.moveId = n
    }
}