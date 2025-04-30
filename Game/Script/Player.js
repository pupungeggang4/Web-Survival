class Player extends Character {
    constructor() {
        super()
        this.rect = new Rect2D(0, 0, 80, 80)
        this.speed = 200.0
        this.moveSet = {
            'left': new Vector2D(-1, 0), 'right': new Vector2D(1, 0), 'up': new Vector2D(0, -1), 'down': new Vector2D(0, 1)
        }
    }

    handleTick(game) {
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

    render(ctx) {
        this.rect.render(ctx)
    }
}
