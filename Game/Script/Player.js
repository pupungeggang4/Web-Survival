class Player extends Character {
    constructor() {
        super()
        this.rect = new Rect2D(1280, 1280, 40, 40)
        this.collisionCircle = new Circle2D(0, 0, 0)
        this.collisionCircle.position = this.rect.position
        this.collisionCircle.radius = 20
        this.speed = 200.0
        this.moveSet = {
            'left': new Vector2D(-1, 0), 'right': new Vector2D(1, 0), 'up': new Vector2D(0, -1), 'down': new Vector2D(0, 1)
        }

        this.hp = 60
        this.hpMax = 60
        this.energy = 6.0
        this.energyMax = 6
        this.energyGen = 1
        this.attack = 10
        this.invTime = 0.5
        this.invTimeMax = 0.5
        this.skill = new Skill()
        this.skill.setSkill(1)
        this.skillRecharge = 0
        this.facing = 'down'

        this.canvas = document.createElement('canvas')
        this.canvas.width = this.rect.size.x
        this.canvas.height = this.rect.size.y
        this.ctx = this.canvas.getContext('2d')
        this.spriteTotal = 4
        this.spriteCurrent = 0
        this.spriteInterval = 250
    }

    handleTick(game) {
        this.invTime -= game.delta / 1000
        if (this.invTime <= 0) {
            this.invTime = 0
        }
        this.skillRecharge -= game.delta / 1000
        if (this.skillRecharge <= 0) {
            this.skillRecharge = 0
        }
        this.energyGenerate(game)
        this.move(game)
    }

    move(game) {
        for (let k in game.keyPressed) {
            if (game.keyPressed[k] === true) {
                this.rect.position.x += this.moveSet[k].x * this.speed * game.delta / 1000
                this.rect.position.y += this.moveSet[k].y * this.speed * game.delta / 1000
                this.facing = k
                break
            }
        }
    }

    energyGenerate(game) {
        this.energy += this.energyGen * game.delta / 1000
        if (this.energy > this.energyMax) {
            this.energy = this.energyMax
        }
    }

    takeDamage(damage) {
        if (this.invTime <= 0) {
            this.hp -= damage
            this.invTime = this.invTimeMax
        }
    }

    useSkill(field) {
        if (this.energy >= this.skill.energy && this.skillRecharge <= 0) {
            this.energy -= this.skill.energy
            this.skillRecharge = this.skill.recharge
            if (this.skill.action[0] === 'attack') {
                let attackRect = new Rect2D(this.rect.position.x + this.skill.action[1][this.facing][0], this.rect.position.y + this.skill.action[1][this.facing][1], this.skill.action[1][this.facing][2], this.skill.action[1][this.facing][3])
                for (let i = 0; i < field.unitList.length; i++) {
                    let unit = field.unitList[i]
                    if (Rect2D.VectorInsideRect(unit.rect.position, attackRect)) {
                        unit.takeDamage(this.attack * this.skill.action[2] + this.skill.action[3])
                    }
                }
            }
        }
    }

    render(ctx, camera) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw(img.sprite.player[this.facing])
        Render.renderAtCenterCam(ctx, this.canvas, this.rect, camera)
    }
}
