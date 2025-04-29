class SceneBattle {
    static loop(game) {
        this.render(game)
    }

    static render(game) {
        Render.init(game.ctx)
        Render.strokeRectUI(game.ctx, UI.battle.buttonMenu)

        if (game.state === 'start') {
            Render.renderStartWindow(game)
        }
    }

    static keyDown(game, key) {
        if (game.menu === false) {
            if (game.state === 'start') {
                if (key === 'Enter') {
                    game.state = ''
                }
            }
        }
    }

    static keyUp(game, key) {
    }

    static mouseUp(game, pos, button) {

    }
}
