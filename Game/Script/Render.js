class Render {
    static init(ctx) {
        ctx.font = '32px neodgm'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.lineWidth = 2
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'white'
        ctx.clearRect(0, 0, 1280, 800)
        ctx.fillRect(0, 0, 1280, 800)
        ctx.fillStyle = 'black'
    }

    static renderStartWindow(game) {
        game.ctx.fillStyle = 'white'
        Render.fillRectUI(game.ctx, UI.rewardWindow.rect)
        Render.strokeRectUI(game.ctx, UI.rewardWindow.rect)
        game.ctx.fillStyle = 'black'

        Render.strokeRectUI(game.ctx, UI.rewardWindow.buttonConfirm)
        Render.fillTextUI(game.ctx, 'Confirm', UI.rewardWindow.textConfirm)
    }

    static renderMenu(ctx) {
        ctx.fillStyle = 'white'
        Render.fillRectUI(ctx, UI.menu.rect)
        Render.strokeRectUI(ctx, UI.menu.rect)
        ctx.fillStyle = 'black'

        Render.fillTextUI(ctx, 'Paused', UI.menu.textPaused)
        Render.strokeRectUI(ctx, UI.menu.buttonResume)
        Render.fillTextUI(ctx, 'Resume', UI.menu.textResume)
        Render.strokeRectUI(ctx, UI.menu.buttonExit)
        Render.fillTextUI(ctx, 'Exit', UI.menu.textExit)
    }

    static renderAtCenter(ctx, img, rect) {
        ctx.drawImage(img, rect.position.x - rect.size.x / 2, rect.position.y - rect.size.y / 2, rect.size.x, rect.size.y)
    }

    static renderAtCenterCam(ctx, img, rect, cam) {
        ctx.drawImage(img, rect.position.x - cam.x - rect.size.x / 2, rect.position.y - cam.y - rect.size.y / 2, rect.size.x, rect.size.y)
    }

    static strokeRectUI(ctx, rect) {
        ctx.strokeRect(rect[0], rect[1], rect[2], rect[3])
    }

    static fillRectUI(ctx, rect) {
        ctx.fillRect(rect[0], rect[1], rect[2], rect[3])
    }

    static fillTextUI(ctx, text, pos) {
        ctx.fillText(text, pos[0], pos[1])
    }
}
