class Player extends Character {
    constructor() {
        super()
        this.rect = new Rect2D(1280, 1280, 80, 80)
        this.collisionCircle = new Circle2D(0, 0, 0)
        this.collisionCircle.position = this.rect.position
        this.collisionCircle.radius = 40
        this.speed = 200.0
        this.moveSet = {
            'left': new Vector2D(-1, 0), 'right': new Vector2D(1, 0), 'up': new Vector2D(0, -1), 'down': new Vector2D(0, 1)
        }
        this.hp = 60
        this.hpMax = 60
        this.invTime = 0.5

        this.canvas = document.createElement('canvas')
        this.canvas.width = this.rect.size.x
        this.canvas.height = this.rect.size.y
        this.ctx = this.canvas.getContext('2d')
        this.ctx.lineWidth = 4
    }

    handleTick(game) {
        this.invTime -= game.delta / 1000
        if (this.invTime <= 0) {
            this.invTime = 0
        }
        this.move(game)
    }

    move(game) {
        for (let k in game.keyPressed) {
            if (game.keyPressed[k] === true) {
                this.rect.position.x += this.moveSet[k].x * this.speed * game.delta / 1000
                this.rect.position.y += this.moveSet[k].y * this.speed * game.delta / 1000
            }
        }
    }

    takeDamage(damage) {
        this.hp -= damage
        this.invTime = 0.5
    }

    render(ctx, camera) {
        let hpRatio = this.hp / this.hpMax
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(img.lifeBarEmpty80, 0, 0)
        this.ctx.drawImage(img.lifeBarFull80, 0, 0, 80 * hpRatio, 12, 0, 0, 80 * hpRatio, 12)
        Render.renderAtCenterCam(ctx, this.canvas, this.rect, camera)
    }
}
