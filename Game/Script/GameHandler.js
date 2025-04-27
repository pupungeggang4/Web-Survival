let game

class Game {
    constructor() {
        this.scene = 'title'
        this.state = ''
        this.menu = false
        this.player = new Player()

        this.canvas = document.getElementById('screen')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.addEventListener('mouseup', (event) => this.mouseUp(event), false)
        window.addEventListener('keydown', (event) => this.keyDown(event), false)
        window.addEventListener('keyup', (event) => this.keyUp(event), false)
        
        this.frameCurrent = performance.now()
        this.framePrevious = performance.now()
        this.delta = 16
        this.gameLoop = requestAnimationFrame(() => this.loop())
    }

    loop() {
        this.framePrevious = this.frameCurrent
        this.frameCurrent = performance.now()
        this.delta = this.frameCurrent - this.framePrevious

        if (this.scene === 'title') {
            SceneTitle.loop(this)
        }
        
        this.gameLoop = requestAnimationFrame(() => this.loop())
    }

    keyDown(event) {
        let key = event.key

        if (this.scene === 'title') {

        } else if (this.scene === 'battle') {

        }
    }

    keyUp(event) {

    }

    mouseUp(event) {

    }
}
