class Vector2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    translate(vec) {
        this.x += vec.x
        this.y += vec.y
    }

    scale(n) {
        this.x *= n
        this.y *= n
    }

    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    clone() {
        return new Vector2D(this.x, this.y)
    }

    static VecSub(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y)
    }

    static VecNormalize(v) {
        let n = Math.sqrt(v.x * v.x + v.y * v.y)
        return new Vector2D(v.x / n, v.y / n)
    }
    
    static Distance(v1, v2) {
        return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2)
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

    static RectTranslate(v) {
        return new Rect2D(this.position.x + v.x, this.position.y + v.y, this.size.x, this.size.y)
    }

    static VectorInsideRect(v, r) {
        return v.x > r.position.x - r.size.x / 2 && v.x < r.position.x + r.size.x / 2 && v.y > r.position.y - r.size.y / 2 && v.y + r.size.y / 2
    }
}

class Circle2D {
    constructor(x, y, r) {
        this.position = new Vector2D(x, y)
        this.radius = r
    }
}

class Physics2D {
    static getOverlapCircle(cMain, cTarget) {
        let vec = Vector2D.VecSub(cMain.position, cTarget.position)
        let vecN = Vector2D.VecNormalize(vec)
        return {
            distance: cMain.radius + cTarget.radius - vec.norm(), direction: vecN
        }
    }
}
