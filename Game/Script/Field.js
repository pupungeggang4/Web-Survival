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
        this.effectList = []

        this.waveNum = 1
        this.waveTime = 1
        this.wave = JSON.parse(JSON.stringify(dataWave[1]))
        this.spawnRect = [
            [-640, -440, 1280, 80], [640, 360, 1280, 80], [-720, -360, 80, 720], [640, -360, 80, 720]
        ]
    }

    handleTick(game) {
        this.player.handleTick(game)
        this.cameraAdjust()
        for (let i = 0; i < this.unitList.length; i++) {
            this.unitList[i].handleTick(game)
        }
        for (let i = 0; i < this.effectList.length; i++) {
            this.effectList[i].handleTick(game)
        }
        this.unitCollideHandle()
        this.unitDeathHandle()
        this.effectHandle()

        this.waveHandle(game)
    }

    waveHandle(game) {
        this.waveTime -= game.delta / 1000
        let w = this.wave['unit']
        for (let i = w.length - 1; i >= 0; i--) {
            let wave = w[i]
            if (this.waveTime < wave[0]) {
                for (let j = 0; j < wave[2]; j++) {
                    let rectIndex = Math.floor(Math.random() * 4)
                    let tempRect = this.spawnRect[rectIndex]
                    let tempPos = new Vector2D(Math.random() * tempRect[2] + tempRect[0] + this.player.rect.position.x, Math.random() * tempRect[3] + tempRect[1] + this.player.rect.position.y)
                    console.log(tempPos)
                    this.spawnUnit(wave[1], tempPos)
                }
                w.splice(i, 1)
            }
        }
        if (this.waveTime <= 0) {
            this.waveNum += 1
            if (this.waveNum in dataWave) {
                this.wave = JSON.parse(JSON.stringify(dataWave[this.waveNum]))
                this.waveTime = this.wave['time']
                game.state = 'reward'
                game.rewardSelected = -1
            }
        }
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
            if (this.unitList[i].hp <= 0) {
                this.unitList.splice(i, 1)
            }
        }
    }

    effectHandle() {
        for (let i = this.effectList.length - 1; i >= 0; i--) {
            if (this.effectList[i].time >=  this.effectList[i].cycle) {
                this.effectList.splice(i, 1)
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
        for (let i in this.effectList) {
            this.effectList[i].render(this.ctx, this.camera)
        }
        this.player.render(this.ctx, this.camera)
        game.ctx.drawImage(this.canvas, 0, 0)
    }
}
