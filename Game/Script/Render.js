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

    static renderRewardWindow(game) {
        game.ctx.fillStyle = 'white'
        Render.fillRectUI(game.ctx, UI.rewardWindow.rect)
        Render.strokeRectUI(game.ctx, UI.rewardWindow.rect)
        game.ctx.fillStyle = 'black'

        Render.fillTextUI(game.ctx, `Select Reward`, UI.rewardWindow.textTitle)
        for (let i = 0; i < 3; i++) {
            Render.strokeRectUI(game.ctx, UI.rewardWindow.selectRect[i])
        }

        Render.strokeRectUI(game.ctx, UI.rewardWindow.buttonConfirm)
        Render.fillTextUI(game.ctx, 'Confirm', UI.rewardWindow.textConfirm)
    }

    static renderLowerUI(ctx, player) {
        Render.drawImageUI(ctx, img.icon.energy, UI.battle.lower.iconEnergy)
        Render.fillTextUI(ctx, `${player.energy.toFixed(1)}/${player.energyMax}`, UI.battle.lower.textEnergy)
        
        ctx.fillStyle = 'Cyan'
        let energyWidth = UI.battle.lower.energyBarSize[0] * player.energy
        ctx.fillRect(UI.battle.lower.energyBarStart[0], UI.battle.lower.energyBarStart[1], energyWidth, UI.battle.lower.energyBarSize[1])
        for (let i = 0; i < player.energyMax; i++) {
            ctx.strokeRect(UI.battle.lower.energyBarStart[0] + UI.battle.lower.energyBarSize[0] * i, UI.battle.lower.energyBarStart[1], UI.battle.lower.energyBarSize[0], UI.battle.lower.energyBarSize[1])
        }
        
        ctx.fillStyle = 'Black'
        Render.drawImageUI(ctx, img.icon.life, UI.battle.lower.iconHP)
        Render.fillTextUI(ctx, `${Math.floor(player.hp)}/${player.hpMax}`, UI.battle.lower.textHP)

        ctx.fillStyle = 'Green'
        let hpWidth = UI.battle.lower.hpBar[2] * player.hp / player.hpMax
        ctx.fillRect(UI.battle.lower.hpBar[0], UI.battle.lower.hpBar[1], hpWidth, UI.battle.lower.hpBar[3])
        Render.strokeRectUI(ctx, UI.battle.lower.hpBar)

        ctx.fillStyle = 'white'
        Render.fillRectUI(ctx, UI.battle.lower.baseAttack)
        Render.fillRectUI(ctx, UI.battle.lower.hand)
        Render.fillRectUI(ctx, UI.battle.lower.cardBack)
        Render.strokeRectUI(ctx, UI.battle.lower.baseAttack)
        Render.strokeRectUI(ctx, UI.battle.lower.hand)
        Render.strokeRectUI(ctx, UI.battle.lower.cardBack)
        ctx.fillStyle = 'black'

        Render.drawImageUI(ctx, img.weapon[1], UI.battle.lower.baseAttack)
        ctx.fillStyle = 'gray'
        let rechargeWidth = UI.battle.lower.baseAttack[2] * player.weaponRecharge / player.weapon.recharge
        ctx.fillRect(UI.battle.lower.baseAttack[0], UI.battle.lower.baseAttack[1], rechargeWidth, UI.battle.lower.baseAttack[3])

        ctx.fillStyle = 'black'
        Render.drawImageUI(ctx, img.icon.attack, UI.battle.lower.iconAttack)
        Render.fillTextUI(ctx, `${player.attack}`, UI.battle.lower.textAttack)
        Render.drawImageUI(ctx, img.icon.crit, UI.battle.lower.iconCrit)
        Render.fillTextUI(ctx, `${Math.floor(player.crit)}%`, UI.battle.lower.textCrit)
    }

    static renderGameOverWindow(ctx) {
        ctx.fillStyle = 'white'
        Render.fillRectUI(ctx, UI.gameOverWindow.rect)
        Render.strokeRectUI(ctx, UI.gameOverWindow.rect)
        ctx.fillStyle = 'black'

        Render.fillTextUI(ctx, 'Game Over!', UI.gameOverWindow.textTitle)
        Render.strokeRectUI(ctx, UI.gameOverWindow.buttonOK)
        Render.fillTextUI(ctx, 'OK [E]', UI.gameOverWindow.textOK)
    }

    static renderMenu(ctx) {
        ctx.fillStyle = 'white'
        Render.fillRectUI(ctx, UI.menu.rect)
        Render.strokeRectUI(ctx, UI.menu.rect)
        ctx.fillStyle = 'black'

        Render.fillTextUI(ctx, 'Paused', UI.menu.textPaused)
        Render.strokeRectUI(ctx, UI.menu.buttonResume)
        Render.fillTextUI(ctx, 'Resume [R]', UI.menu.textResume)
        Render.strokeRectUI(ctx, UI.menu.buttonExit)
        Render.fillTextUI(ctx, 'Exit [E]', UI.menu.textExit)
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

    static drawImageUI(ctx, img, rect) {
        ctx.drawImage(img, rect[0], rect[1])
    }

    static fillTextUI(ctx, text, pos) {
        ctx.fillText(text, pos[0], pos[1])
    }
}
