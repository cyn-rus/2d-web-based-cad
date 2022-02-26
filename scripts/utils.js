function euclidDistance(x1, x2, y1, y2) {
    const deltaX = x1 - x2
    const deltaY = y1 - y2
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}