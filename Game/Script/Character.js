class Character {
    constructor() {
        
    }
}

class Unit extends Character {
    constructor() {
        super()
        this.rect = new Rect2D(200, 200, 40, 40)
    }

    render(ctx) {
        this.rect.render(ctx)
    }
}
