let img = {
    lifeBarFull40: new Image(),
    lifeBarEmpty40: new Image(),
    lifeBarFull80: new Image(),
    lifeBarEmpty80: new Image(),
    arrow: new Image(),

    button: {
        menu: new Image(),
    },

    icon: {
        energy: new Image(),
        attack: new Image(),
        life: new Image(),
        crit: new Image(),
    },

    weapon: {

    },

    sprite: {
        player: {
            'left': new Image(),
            'right': new Image(),
            'up': new Image(),
            'down': new Image(),
        },

        unit: {
            1: new Image(),
            2: new Image(),
        }
    },

    effect: {
        attack: {
            'left': new Image(),
            'right': new Image(),
            'up': new Image(),
            'down': new Image()
        },
    },
}

let audio = {
    bg: new Audio()
}

function audioLoad() {
    audio.bg.src = 'Audio/Test.wav'
}

function imageLoad() {
    img.lifeBarFull40.src = 'Image/LifeBarFull40.png'
    img.lifeBarEmpty40.src = 'Image/LifeBarEmpty40.png'
    img.lifeBarFull80.src = 'Image/LifeBarFull80.png'
    img.lifeBarEmpty80.src = 'Image/LifeBarEmpty80.png'
    img.arrow.src = 'Image/Arrow.png'
    img.button.menu.src = 'Image/Button/ButtonMenu.png'

    img.icon.energy.src = 'Image/Icon/IconEnergy.png'
    img.icon.life.src = 'Image/Icon/IconLife.png'
    img.icon.attack.src = 'Image/Icon/IconAttack.png'
    img.icon.crit.src = 'Image/Icon/IconCrit.png'

    for (let i = 0; i < 10; i++) {
        img.weapon[i] = new Image()
    }
    img.weapon[1].src = 'Image/Weapon/Weapon001.png'

    img.sprite.player['left'].src = 'Image/Sprite/SpritePlayerLeft.png'
    img.sprite.player['right'].src = 'Image/Sprite/SpritePlayerRight.png'
    img.sprite.player['up'].src = 'Image/Sprite/SpritePlayerUp.png'
    img.sprite.player['down'].src = 'Image/Sprite/SpritePlayerDown.png'

    img.sprite.unit[1].src = 'Image/Sprite/SpriteMonster001.png'
    img.sprite.unit[2].src = 'Image/Sprite/SpriteMonster002.png'

    img.effect.attack['left'].src = 'Image/Effect/EffectAttackLeft.png'
    img.effect.attack['right'].src = 'Image/Effect/EffectAttackRight.png'
    img.effect.attack['up'].src = 'Image/Effect/EffectAttackUp.png'
    img.effect.attack['down'].src = 'Image/Effect/EffectAttackDown.png'
}
