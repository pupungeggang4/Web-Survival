class SceneBattle {
    static loop(game) {
        if (game.menu === false && game.state === '') {
            game.field.handleTick(game)
        }
        this.render(game)
    }

    static render(game) {
        Render.init(game.ctx)
        game.field.render(game)
        Render.strokeRectUI(game.ctx, UI.battle.buttonMenu)
        if (game.state === 'start') {
            Render.renderStartWindow(game)
        }
        Render.renderMenu(game.ctx)
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
