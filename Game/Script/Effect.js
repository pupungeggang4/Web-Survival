class Effect {
    constructor() {
        this.time = 0
        this.cycle = 0.2
        this.direction = ''
        
        this.rect = new Rect2D(0, 0, 0, 0)
        this.canvas = document.createElement('canvas')
        this.canvas.width = 120
        this.canvas.height = 120
        this.ctx = this.canvas.getContext('2d')
    }

    setEffect(ID, rect, direction) {
        this.ID = ID
        this.rect = rect
        this.canvas.width = this.rect.size.x
        this.canvas.height = this.rect.size.y
        this.direction = direction
    }

    handleTick(game) {
        this.time += game.delta / 1000
    }

    render(ctx, camera) {
        this.ctx.imageSmoothingEnabled = false
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (this.ID === 1) {
            this.ctx.drawImage(img.effect.attack[this.direction], 0, 0, this.canvas.width, this.canvas.height)
        }
        Render.renderAtCenterCam(ctx, this.canvas, this.rect, camera)
    }
}
