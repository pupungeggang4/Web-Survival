class Field {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = 1280
        this.canvas.height = 800
        this.ctx = this.canvas.getContext('2d')

        this.player = new Player()
        this.camera = new Vector2D()
        this.unitList = {}
        this.unitID = 0
        this.projectileList = {}
        this.projectID = 0

        this.spawnUnit(new Unit(), new Vector2D(1080, 1080))
        this.spawnUnit(new Unit(), new Vector2D(1480, 1480))
        this.spawnUnit(new Unit(), new Vector2D(1080, 1480))
        this.spawnUnit(new Unit(), new Vector2D(1480, 1080))
    }

    handleTick(game) {
        this.cameraAdjust()
        this.player.handleTick(game)
        for (let i in this.unitList) {
            this.unitList[i].handleTick(game)
        }
        this.unitCollideHandle()
        this.unitDeathHandle()
    }

    spawnUnit(unit, pos) {
        if (Object.keys(this.unitList).length < 50) {
            unit.rect.position = pos
            this.unitList[this.unitID] = unit
            this.unitID += 1
        }
    }

    unitCollideHandle() {
        for (let i in this.unitList) {
            for (let j in this.unitList) {
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

        for (let i in this.unitList) {
            let uMain = this.unitList[i]
            let uTarget = this.player

            let collision = Physics2D.getOverlapCircle(uMain.collisionCircle, uTarget.collisionCircle)
            if (collision.distance > 0) {
                collision.direction.scale(collision.distance)
                uMain.rect.position.translate(collision.direction)
                uMain.collisionCircle.position.x = uMain.rect.position.x
                uMain.collisionCircle.position.y = uMain.rect.position.y
                if (uTarget.invTime <= 0) {
                    uTarget.takeDamage(5)
                }
            }
        }
    }

    unitDeathHandle() {
        for (let i in this.unitList) {
            if (this.unitList[i].hp < 0) {
                delete this.unitList[i]
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
