class Field {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = 1280
        this.canvas.height = 800
        this.ctx = this.canvas.getContext('2d')

        this.player = new Player()
        this.unitList = {}
        this.unitID = 0
        this.projectileList = {}
        this.projectID = 0

        this.spawnUnit(new Unit())
    }

    handleTick(game) {
        this.player.handleTick(game)
    }

    spawnUnit(unit) {
        this.unitList[this.unitID] = unit
        this.unitID += 1
    }

    render(game) {
        Render.init(this.ctx)
        this.ctx.setTransform(1, 0, 0, 1, this.canvas.width / 2 - this.player.rect.position.x, this.canvas.height / 2 - this.player.rect.position.y)
        for (let i in this.unitList) {
            this.unitList[i].render(this.ctx)
        }
        this.player.render(this.ctx)
        game.ctx.drawImage(this.canvas, 0, 0)
    }
}
