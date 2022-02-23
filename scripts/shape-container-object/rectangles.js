class Rectangles{
    constructor() {
        this.rectangles = []
        this.start = []
        this.end = []
        this.move = []
        this.color = []
    }

    loadrectangles(data) {
        this.rectangles = data.rectangles
        this.start = data.rectangles_starts
        this.end = data.rectangles_ends
        this.move = data.rectangles_moves
        this.color = data.rectangles_colors
    }

    render() {
        // Render rectangle function
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
}