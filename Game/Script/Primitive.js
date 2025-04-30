class Vector2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    translate(vec) {
        this.x += vec.x
        this.y += vec.y
    }

    mul(n) {
        this.x *= n
        this.y *= n
    }

    clone() {
        return new Vector2D(this.x, this.y)
    }
}

class Rect2D {
    constructor(x, y, w, h) {
        this.position = new Vector2D(x, y)
        this.size = new Vector2D(w, h)
    }

    render(ctx) {
        ctx.strokeRect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y)
    }
}

class Circle2D {
    constructor(x, y, r) {
        this.position = new Vector2D(x, y)
        this.radius = r
    }
}
