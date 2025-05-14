class Field {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = 1280
        this.canvas.height = 720
        this.ctx = this.canvas.getContext('2d')

        this.player = new Player()
        this.camera = new Vector2D()
        this.unitList = []
        this.projectileList = []

        this.spawnUnit(1, new Vector2D(1080, 1080))
        this.spawnUnit(1, new Vector2D(1480, 1480))
        this.spawnUnit(1, new Vector2D(1080, 1480))
        this.spawnUnit(1, new Vector2D(1480, 1080))
    }

    handleTick(game) {
        this.player.handleTick(game)
        this.cameraAdjust()
        for (let i in this.unitList) {
            this.unitList[i].handleTick(game)
        }
        this.unitCollideHandle()
        this.unitDeathHandle()
    }

    spawnUnit(ID, pos) {
        if (Object.keys(this.unitList).length < 50) {
            let unit = new Unit()
            unit.setUnit(ID)
            unit.rect.position = pos
            this.unitList.push(unit)
        }
    }

    unitCollideHandle() {
        for (let i = 0; i < this.unitList.length; i++) {
            for (let j = 0; j < this.unitList.length; j++) {
                if (i != j) {
                    let uMain = this.unitList[i]
                    let uTarget = this.unitList[j]
                    let collision = Physics2D.getOverlapCircle(uMain.collisionCircle, uTarget.collisionCircle)
                    if (collision.distance > 0) {
                        collision.direction.scale(collision.distance)
                        uMain.rect.position.translate(collision.direction)
                        uMain.collisionCircle.position.x = uMain.rect.position.x
                        uMain.collisionCircle.position.y = uMain.rect.position.y
                    }
                }
            }
        }

        for (let i = 0; i < this.unitList.length; i++) {
            let uMain = this.unitList[i]
            let uTarget = this.player

            let collision = Physics2D.getOverlapCircle(uMain.collisionCircle, uTarget.collisionCircle)
            if (collision.distance > 0) {
                collision.direction.scale(collision.distance)
                uMain.rect.position.translate(collision.direction)
                uMain.collisionCircle.position.x = uMain.rect.position.x
                uMain.collisionCircle.position.y = uMain.rect.position.y
            }
        }
    }

    unitDeathHandle() {
        for (let i = this.unitList.length - 1; i >= 0; i--) {
            if (this.unitList[i].hp < 0) {
                this.unitList.splice(i, 1)
            }
        }
    }

    cameraAdjust() {
        this.camera.x = this.player.rect.position.x - this.canvas.width / 2
        this.camera.y = this.player.rect.position.y - this.canvas.height / 2
    }

    render(game) {
        Render.init(this.ctx)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i in this.unitList) {
            this.unitList[i].render(this.ctx, this.camera)
        }
        this.player.render(this.ctx, this.camera)
        game.ctx.drawImage(this.canvas, 0, 0)
    }
}
