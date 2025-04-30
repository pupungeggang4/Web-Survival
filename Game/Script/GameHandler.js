let game

class Game {
    constructor() {
        this.scene = 'title'
        this.state = ''
        this.menu = false
        this.field = new Field()

        this.keyMap = {
            'left': 'ArrowLeft', 'right': 'ArrowRight', 'up': 'ArrowUp', 'down': 'ArrowDown', 'dash': ' ',
            '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', 'upgrade': 'r', 'confirm': 'Enter'
        }
        this.keyPressed = {
            'left': false, 'right': false, 'up': false, 'down': false,
        }

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
        } else if (this.scene === 'battle') {
            SceneBattle.loop(this)
        }
        
        this.gameLoop = requestAnimationFrame(() => this.loop())
    }

    keyDown(event) {
        let key = event.key

        for (let k in this.keyPressed) {
            if (key === this.keyMap[k]) {
                this.keyPressed[k] = true
            }
        }

        if (this.scene === 'title') {
            SceneTitle.keyDown(this, key)
        } else if (this.scene === 'battle') {
            SceneBattle.keyDown(this, key)
        }
    }

    keyUp(event) {
        let key = event.key

        for (let k in this.keyPressed) {
            if (key === this.keyMap[k]) {
                this.keyPressed[k] = false
            }
        }

        if (this.scene === 'title') {
            SceneTitle.keyUp(this, key)
        } else if (this.scene === 'battle') {
            SceneBattle.keyUp(this, key)
        }
    }

    mouseUp(event) {
        let targetRect = this.canvas.getBoundingClientRect()
        let pos = {
            x: (event.clientX - targetRect.left) / targetRect.width * this.canvas.width,
            y: (event.clientY - targetRect.top) / targetRect.height * this.canvas.height
        }
        let button = event.button

        if (this.scene === 'title') {
            SceneTitle.mouseUp(this, pos, button)
        } else if (this.scene === 'battle') {
            SceneBattle.mouseUp(this, pos, button)
        }
    }
}
