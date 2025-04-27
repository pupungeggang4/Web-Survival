class SceneTitle {
    static loop(game) {
        this.render(game)
    }

    static render(game) {
        Render.init(game.ctx)
        Render.fillTextUI(game.ctx, 'Survival', UI.title.textTitle)
        Render.strokeRectUI(game.ctx, UI.title.buttonStart)
        Render.fillTextUI(game.ctx, 'Start Game', UI.title.textStart)
        Render.strokeRectUI(game.ctx, UI.title.buttonErase)
        Render.fillTextUI(game.ctx, 'Erase Data', UI.title.textErase)
    }

    static keyDown(game, key) {

    }

    static keyUp(game, key) {

    }

    static mouseUp(game, pos, button) {
        if (button === 0) {
            if (game.menu === false) {
                if (game.state === '') {
                    if (pointInsideRectUI(pos, UI.title.buttonStart)) {
                        game.scene = 'battle'
                        game.state = 'start'
                    }
                }
            }
        }
    }
}
