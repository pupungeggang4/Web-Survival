class Render {
    static init(ctx) {
        ctx.font = '32px neodgm'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.lineWidth = 2
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'white'
        ctx.clearRect(0, 0, 1280, 800)
        ctx.fillRect(0, 0, 1280, 800)
        ctx.fillStyle = 'black'
    }

    static strokeRectUI(ctx, rect) {
        ctx.strokeRect(rect[0], rect[1], rect[2], rect[3])
    }

    static fillTextUI(ctx, text, pos) {
        ctx.fillText(text, pos[0], pos[1])
    }
}
