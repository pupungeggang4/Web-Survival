window.onload = main
window.onerror = errorHandle
window.oncontextmenu = rightClick

function main() {
    game = new Game()
}

function errorHandle(err, url, line, col, obj) {
    if (obj != null) {
        cancelAnimationFrame(game.gameLoop)
    }
}

function rightClick() {
    return false
}
