class SceneBattle {
    static loop(game) {
        if (game.menu === false && game.state === '') {
            game.field.handleTick(game)
            if (game.field.player.hp <= 0) {
                game.state = 'game_over'
            }
        }
        this.render(game)
    }

    static render(game) {
        Render.init(game.ctx)
        game.field.render(game)
        Render.drawImageUI(game.ctx, img.button.menu, UI.battle.buttonMenu)
        Render.renderLowerUI(game.ctx, game.field.player)

        if (game.state === 'start') {
            Render.renderStartWindow(game)
        }

        if (game.state === 'game_over') {
            Render.renderGameOverWindow(game.ctx)
        }

        if (game.menu === true) {
            Render.renderMenu(game.ctx)
        }
    }

    static keyDown(game, key) {
        
    }

    static keyUp(game, key) {
        if (game.menu === false) {
            if (key === 'Escape') {
                game.menu = true
            }

            if (game.state === 'start') {
                if (key === 'Enter') {
                    game.state = ''
                }
            } else if (game.state === '') {
                if (key === '1') {
                    game.field.player.useWeapon(game.field)
                }
            } else if (game.state === 'game_over') {
                if (key === 'e') {
                    game.scene = 'title'
                    game.state = ''
                    game.cursor.title = 0
                }
            }
        } else if (game.menu === true) {
            if (key === 'Escape' || key === 'r') {
                game.menu = false
            } else if (key === 'e') {
                game.menu = false
                game.scene = 'title'
                game.state = ''
                game.cursor.title = 0
            }
        }
    }

    static mouseUp(game, pos, button) {
        if (button === 0) {
            this.handleMouseLeft(game, pos)
        }
    }

    static handleMouseLeft(game, pos) {
        if (game.menu === false) {
            if (pointInsideRectUI(pos, UI.battle.buttonMenu)) {
                game.menu = true
            }
            if (game.state === 'start') {
                if (pointInsideRectUI(pos, UI.rewardWindow.buttonConfirm)) {
                    game.state = ''
                }
            }
            if (game.state === 'game_over') {
                if (pointInsideRectUI(pos, UI.gameOverWindow.buttonOK)) {
                    game.scene = 'title'
                    game.state = ''
                    game.cursor.title = 0
                }
            }
        } else if (game.menu === true) {
            if (pointInsideRectUI(pos, UI.menu.buttonResume)) {
                game.menu = false
            } else if (pointInsideRectUI(pos, UI.menu.buttonExit)) {
                game.menu = false
                game.scene = 'title'
                game.state = ''
                game.cursor.title = 0
            }
        }
    }
}
