class Skill {
    constructor() {
        this.ID = 0
        this.energy = 0
        this.recharge = 0
        this.action = []
    }

    setSkill(ID) {
        this.ID = ID
        let data = JSON.parse(JSON.stringify(dataSkill[this.ID]))
        this.energy = data['energy']
        this.recharge = data['recharge']
        this.action = data['action']
    }
}
