class Character {
    hp = 0
    constructor() {
    }

    draw(sprite) {
        this.spriteCurrent = Math.floor(performance.now() / this.spriteInterval) % this.spriteTotal
        let spriteRow = Math.floor(this.spriteCurrent / 4)
        let spriteColumn = this.spriteCurrent % 4
        let cut = [spriteColumn * this.canvas.width, spriteRow * this.canvas.height, this.canvas.width, this.canvas.height]
        this.ctx.drawImage(sprite, cut[0], cut[1], cut[2], cut[3], 0, 0, this.canvas.width, this.canvas.height)
    }

    clone() {
        let o = new this.constructor()
        o.ID = this.ID
        o.setUnit(o.ID)
        o.copyStat(this)
        return o
    }
}

class Unit extends Character {
    constructor() {
        super()
        
        this.ID = 0
        this.attack = 10
        this.hp = 60
        this.hpMax = 60
        this.attackType = 0
        this.speed = 100

        this.rect = new Rect2D(200, 200, 40, 40)
        this.collisionCircle = new Circle2D(0, 0, 20)
        
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.rect.size.x
        this.canvas.height = this.rect.size.y
        this.ctx = this.canvas.getContext('2d')
        this.ctx.lineWidth = 4
        this.spriteTotal = 4
        this.spriteCurrent = 0
        this.spriteInterval = 250
    }

    setUnit(ID) {
        this.ID = ID
        let data = JSON.parse(JSON.stringify(dataUnit[this.ID]))
        this.attack = data['attack']
        this.hp = data['hp']
        this.hpMax = data['hp']
        this.attackType = data['attack_type']
        this.speed = data['speed']
    }

    copyStat(target) {
        o.hp = target.hp
    }

    handleTick(game) {
        this.move(game)
        this.attackHandle(game, game.field.player)
    }

    move(game) {
        this.chase(game, game.field.player)
    }

    chase(game, character) {
        let diff = Vector2D.VecSub(character.rect.position, this.rect.position)
        if (diff.norm() > 10) {
            let diffN = Vector2D.VecNormalize(diff)
            diffN.scale(this.speed * game.delta / 1000)
            this.rect.position.translate(diffN)
            this.collisionCircle.position.x = this.rect.position.x
            this.collisionCircle.position.y = this.rect.position.y
        }
    }

    attackHandle(game, target) {
        if (this.attackType === 1) {
            if (Vector2D.Distance(this.rect.position, target.rect.position) < 41) {
                target.takeDamage(this.attack)
            }
        }
    }

    takeDamage(damage) {
        this.hp -= damage
    }

    render(ctx, camera) {
        let hpRatio = this.hp / this.hpMax
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw(img.sprite.unit[this.ID])
        this.ctx.drawImage(img.lifeBarEmpty40, 0, 0)
        this.ctx.drawImage(img.lifeBarFull40, 0, 0, 40 * hpRatio, 8, 0, 0, 40 * hpRatio, 8)
        Render.renderAtCenterCam(ctx, this.canvas, this.rect, camera)
    }
}
