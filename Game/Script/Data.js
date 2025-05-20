const dataUnit = {
    1: {'ID': 1, 'attack': 10, 'hp': 60, 'speed': 80, 'attack_type': 1},
    2: {'ID': 2, 'attack': 10, 'hp': 100, 'speed': 80, 'attack_type': 1},
}

const dataCatd = {

}

const dataWeapon = {
    1: {'ID': 1, 'energy': 0, 'recharge': 1.0, 'action': ['attack', {'left': [-80, 0, 160, 160], 'right': [80, 0, 160, 160], 'up': [0, -80, 160, 160], 'down': [0, 80, 160, 160]}, 1, 5]}
}

const dataWave = {
    1: {'time': 15, 'unit': [[15, 1, 1], [10, 1, 2], [5, 1, 3]]},
    2: {'time': 15, 'unit': [[15, 1, 3], [10, 1, 4], [5, 1, 5]]},
    3: {'time': 15, 'unit': [[15, 1, 2], [15, 2, 2], [10, 1, 2], [10, 2, 2], [5, 1, 5]]},
    4: {'time': 15, 'unit': [[15, 1, 5], [15, 2, 5], [10, 1, 5], [10, 2, 5], [5, 1, 8]]},
}
