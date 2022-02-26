class Polygons {
    constructor() {
        this.polygons = []
        this.colors = []
        this.cur_polygon = []
        this.cur_vertex = 0
        this.cur_color = [0,0,0]
    }

    loadPolygons(data) {
        this.polygons = data.polygons
        this.colors = data.colors
        this.cur_polygon = []
        this.cur_vertex = 0
        this.cur_color = [0,0,0]
    }

    render() {
        var polygon_array = []
        var polygon_color_array = []

        if (this.cur_vertex > 2){
            for (var i = 0; i < this.cur_vertex; i++){
                this.cur_polygon[i].forEach(elmt => polygon_array.push(elmt))
                this.cur_color.forEach(elmt => polygon_color_array.push(elmt))
            }
        }

        for (var i = 0; i < this.polygons.length; i++){
            var jumlah_vertex = this.polygons[i].length
            this.polygons[i].forEach(elmt => {
                polygon_array.push(elmt[0])
                polygon_array.push(elmt[1])
            })
            for (var j = 0; j<jumlah_vertex; j++){
                this.colors[i].forEach(elmt => polygon_color_array.push(elmt))
            }
        }

        console.log(polygon_array)
        console.log(polygon_color_array)

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(polygon_array));
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(polygon_color_array));

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.cur_vertex)

        var j = 0
        if (this.cur_vertex>2){
            j = this.cur_vertex
        }
        for (var i = 0; i < this.polygons.length; i++){
            gl.drawArrays(gl.TRIANGLE_FAN, j, this.polygons[i].length)
            j = j+this.polygons[i].length
        }
    }

    create() {
        this.polygons.push(this.cur_polygon)
        this.colors.push(this.cur_color)

        console.log(this.polygons)
    }

    reset(){
        this.cur_polygon = []
        this.cur_vertex = 0
        this.cur_color = [0,0,0]
    }

    move() {
    }

    getClickedPolygonId(x, y) {
    }
}