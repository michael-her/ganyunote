import { calcSkillLv, calcBurstLv } from "../Models/formulars"

const skillLvSheet = {
  // lv  1      2      3      4      5      6      7      8      9      10     11
  ganyu: {
    hit1: {
      multiplier:
        [31.73, 34.32, 36.9,  40.59, 43.17, 46.13, 50.18, 54.24, 58.3,  62.73, 67.8],
      count: 1,
      elemental: false,
    },
    hit2: {
      multiplier:
        [35.6,  38.5,  41.4,  45.54, 48.44, 51.75, 56.3,  60.86, 65.41, 70.38, 76.07],
      count: 1,
      elemental: false,
    },
    hit3: {
      multiplier:
        [45.49, 49.2,  52.9,  58.19, 61.89, 66.13, 71.94, 77.76, 83.58, 89.93, 97.2],
      count: 1,
      elemental: false,
    },
    hit4: {
      multiplier:
        [45.49, 49.2,  52.9,  58.19, 61.89, 66.13, 71.94, 77.76, 83.58, 89.93, 97.2],
      count: 1,
      elemental: false,
    },
    hit5: {
      multiplier:
        [48.25, 52.17, 56.1,  61.71, 65.64, 70.13, 76.3,  82.47, 88.64, 95.37, 103.08],
      count: 1,
      elemental: false,
    },
    hit6: {
      multiplier:
        [57.62, 62.31, 67,    73.7,  78.39, 83.75, 91.12, 98.49, 105.86, 113.9, 123.11],
      count: 1,
      elemental: false,
    },
    plungeAttack: {
      multiplier:
        [56.83, 61.45, 66.08, 72.69, 77.31, 82.6,  89.87, 97.14, 104.41, 112.34, 120.27],
      elemental: false,
    },
    frostflakeArrow: {
      multiplier:
        [128,   137.6, 147.2, 160,   169.6, 179.2, 192,   204.8, 217.6, 230.4, 243.2],
    },
    frostflakeArrowBloom: {
      multiplier:
        [217.6, 233.92, 250.24, 272, 288.32, 304.64, 326.4, 348.16, 369.92, 391.68, 413.44],
    },
    elementalSkillSummon: {
      multiplier:
        [132,   141.9, 151.8, 165,   174.9, 184.8, 198,   211.2, 224.4, 237.6, 250.8, 264,   280.5, 297,   313.5],
      inheritedHp:
        [120,   129,   138,   150,   159,   168,   180,   192,   204,   216,   228,   240,   255,   270,   285],
      count: 2,
      duration: 6,
      cd: 10,
    },
    elementalBurst: {
      multiplier:
        [70.27, 75.54, 80.81, 87.84, 93.11, 98.38, 105.41, 112.44, 119.46, 126.49, 133.52, 140.54, 149.33, 158.11, 166.9],
      duration: 15,
      cd: 15,
      cost: 60,
    }
  },
  // lv  1      2      3      4      5      6      7      8      9      10     11
  xiao: {
    hit1: {
      multiplier:
        [27.54, 29.42, 31.3,  33.8,  35.68, 37.87, 40.69, 43.51, 46.32, 49.14, 51.96],
      count: 2,
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    hit2: {
      multiplier:
        [56.94, 60.82, 64.7,  69.88, 73.76, 78.29, 84.11, 89.93, 95.76, 101.58, 107.4],
      count: 1,
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    hit3: {
      multiplier:
        [68.55, 73.23, 77.9,  84.13, 88.81, 94.26, 101.27, 108.28, 115.29, 122.3, 129.31],
      count: 1,
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    hit4: {
      multiplier:
        [37.66, 40.23, 42.8, 46.22, 48.79, 51.79, 55.64, 59.49, 63.34, 67.2, 71.05],
      count: 2,
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    hit5: {
      multiplier:
        [71.54, 76.42, 81.3, 87.8, 92.68, 98.37, 105.69, 113.01, 120.32, 127.64, 134.96],
      count: 1,
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    hit6: {
      multiplier:
        [95.83, 102.37, 108.9, 117.61, 124.15, 131.77, 141.57, 151.37, 161.17, 170.97, 180.77],
      count: 1,
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    chargedAttack: {
      multiplier:
        [121.09, 129.34, 137.6, 148.61, 156.86, 166.5, 178.88, 191.26, 203.65, 216.03, 228.42],
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    plungeAttack: {
      multiplier:
        [204.39, 221.02, 237.66, 261.42, 278.06, 297.07, 323.21, 349.36, 375.5, 404.02, 432.54],
      elemental: char => char.talents.skills.elementalBurst.elementalBurstStance.toggle && 'anemo',
    },
    elementalSkill: {
      multiplier:
        [252.8, 271.76, 290.72, 316, 334.96, 379.2, 404.48, 429.76, 455.04, 480.32, 505.6, 537.2, 568.8, 600.4],
      count: 2,
      cd: 10,
    },
    elementalBurstStance: {
      toggle: true,
      amount(char) { return this['normalAttacksDmg%'][calcSkillLv(char) - 1] },
      'normalAttacksDmg%':
        [58.45, 61.95, 65.45, 70, 73.5, 77, 81.55, 86.1, 90.65, 95.2, 99.75, 104.3, 108.85, 113.4, 117.95],
      'lifeDrain%':
        [3, 3, 3, 2.5, 2.5, 2.5, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      duration: 15,
      cd: 18,
      cost: 70,
    }
  },
  ayaka: {
    hit1: {
      multiplier:
        [45.73, 49.45, 53.17, 58.49, 62.21, 66.46, 72.31, 78.16, 84.01, 90.39, 96.77],
      count: 1,
    },
    hit2: {
      multiplier:
        [48.68, 52.65, 56.61, 62.27, 66.23, 70.76, 76.99, 83.22, 89.44, 96.24, 103.03],
      count: 1,
    },
    hit3: {
      multiplier:
        [62.62, 67.72, 72.82, 80.1,  85.19, 91.02, 99.03, 107.04, 115.05, 123.79, 132.53],
      count: 1,
    },
    hit4: {
      multiplier:
        [22.65, 24.49, 26.33, 28.97, 30.81, 32.92, 35.81, 38.71, 41.61, 44.77, 47.93],
      count: 3,
    },
    hit5: {
      multiplier:
        [78.18, 84.55, 90.91, 100, 106.36, 113.64, 123.64, 133.64, 143.64, 154.55, 165.45],
      count: 1,
    },
    chargedAttack: {
      multiplier:
        [55.13, 59.61, 64.1,  70.51, 75,   80.13,  87.18,  94.23, 101.28, 108.97, 116.66],
      count: 3,
      cost: 20,
    },
    plungeAttack: {
      multiplier:
        [63.93, 69.14, 74.34, 81.77, 86.98, 92.93, 101.1, 109.28, 117.46, 126.38, 135.3],
      elemental: false,
    },
    elementalSkill: {
      multiplier:
        [239.2, 257.14, 275.08, 299, 316.94, 334.88, 358.8, 382.72, 406.64, 430.56, 454.48, 478.4, 508.3, 538.2, 568.1],
      count: 1,
      cd: 10,
    },
    elementalBurstSummon: {
      multiplier:
        [112.3, 120.72, 129.15, 140.38, 148.8, 157.22, 168.45, 179.68, 190.91, 202.14, 213.37, 224.6, 238.64, 252.68, 266.71],
      count: 19,
      duration: 5,
      cd: 20,
      cost: 80,
    },
    elementalBurstBloom: {
      multiplier:
        [168.45, 181.08, 193.72, 210.56, 223.2, 235.83, 252.68, 269.52, 286.36, 303.21, 320.05, 336.9, 357.96, 379.01, 400.07],
      count: 1,
      duration: 5,
      cd: 20,
      cost: 80,
    }
  },
  mcElectro: {
    hit1: {
      multiplier:
        [44.46, 48.08, 51.7, 56.87, 60.49, 64.63, 70.31, 76, 81.69, 87.89, 94.09],
      count: 1,
      elemental: false,
    },
    hit2: {
      multiplier:
        [43.43, 46.97, 50.5, 55.55, 59.09, 63.13, 68.68, 74.23, 79.79, 85.85, 91.91],
      count: 1,
      elemental: false,
    },
    hit3: {
      multiplier:
        [52.98, 57.29, 61.6, 67.76, 72.07, 77, 83.78, 90.55, 97.33, 104.72, 112.11],
      count: 1,
      elemental: false,
    },
    hit4: {
      multiplier:
        [58.31, 63.05, 67.8, 74.58, 79.33, 84.75, 92.21, 99.67, 107.12, 115.26, 123.4],
      count: 1,
      elemental: false,
    },
    hit5: {
      multiplier:
        [70.78, 76.54, 82.3, 90.53, 96.29, 102.88, 111.93, 120.98, 130.03, 139.91, 149.79],
      count: 1,
      elemental: false,
    },
    chargedAttack: {
      multiplier: [
        [55.9, 60.45, 65, 71.5, 76.05, 81.25, 88.4, 95.55, 102.7, 110.5, 118.3],
        [72.24, 78.12, 84, 92.4, 98.28, 105, 114.24, 123.48, 132.72, 142.8, 152.88],
      ],
      count: 2,
      cost: 20,
      elemental: false,
    },
    plungeAttack: {
      multiplier:
        [159.68, 172.67, 185.67, 204.24, 217.23, 232.09, 252.51, 272.93, 293.36, 315.64, 337.92],
      elemental: false,
    },
    elementalSkillSummon: {
      multiplier:
        [78.66, 84.56, 90.46, 98.33, 104.23, 110.13, 118, 125.86, 133.73, 141.6, 149.46],
      count: 1,
      'er': [3, 3, 3, 3.5, 3.5, 3.5, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      'er%': 20,
      duration: 6,
      auraDuration: 15,
      cd: 13.5,
    },
    elementalBurstHit: {
      multiplier:
        [114.4, 122.98, 131.56, 143, 141.58, 160.16, 171.6, 183.04, 194.48, 205.92, 217.36, 228.8, 243.1, 257.4, 271.7],
      count: 1,
      duration: 12,
      cd: 20,
      cost: 80,
    },
    elementalBurstAura: {
      multiplier:
        [32.8, 35.26, 37.72, 41, 43.46, 45.92, 49.2, 52.48, 55.76, 59.04, 62.32, 65.6, 69.7, 73.8, 77.9],
      er:
        [0.8, 0.8, 0.8, 0.9, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      count: 1,
      duration: 12,
      tick: 0.5,
      cd: 20,
      cost: 80,
    },
  },
  hutao: {
    hit1: {
      multiplier:
        [46.89, 50.08, 53.28, 57.54, 60.74, 64.47, 69.26, 74.06, 78.85, 83.65, 88.44, 93.24, 98.04, 102.83, 107.63],
      count: 1,
    },
    hit2: {
      multiplier:
        [48.25, 51.54, 54.83, 59.22, 62.51, 66.35, 71.28, 76.22, 81.15, 86.09, 91.02, 95.96, 100.89, 105.83, 110.76],
      count: 1,
    },
    hit3: {
      multiplier:
        [61.05, 65.21, 69.38, 74.93, 79.09, 83.94, 90.19, 96.43, 102.68, 108.92, 115.16, 121.41, 127.65, 133.89, 140.14],
      count: 1,
    },
    hit4: {
      multiplier:
        [65.64, 70.12, 74.59, 80.56, 85.03, 90.26, 96.97, 103.68, 110.4, 117.11, 123.82, 130.54, 137.25, 143.96, 150.68],
      count: 3,
    },
    hit5: {
      multiplier:
        [33.27, 35.54, 37.81, 40.84, 43.1,  45.75, 49.15, 52.56, 55.96, 59.36, 62.77, 66.17, 69.57, 72.98, 76.38],
      count: 2,
    },
    hit6: {
      multiplier:
        [85.96, 91.82, 97.68, 105.49, 111.36, 118.19, 126.98, 135.78, 144.57, 153.36, 162.15, 170.94, 179.73, 188.52, 197.31],
      count: 1,
    },
    chargedAttack: {
      multiplier:
        [135.96, 145.23, 154.5, 166.86, 176.13, 186.95, 200.85, 214.76, 228.66, 242.57, 256.47, 270.38, 284.28, 298.19, 312.09],
      count: 3,
      cost: 25,
    },
    plungeAttack: {
      multiplier:
        [65.42, 69.88, 74.34, 80.29, 84.75, 89.95, 96.64, 103.33, 110.02, 116.71, 123.4, 130.1, 136.79, 143.48, 150.17],
      elemental: false,
    },
    elementalSkillStance: {
      passive: true,
      amount(char) { return this['_maxHpToAtk%'][calcSkillLv(char) - 1] },
      '_maxHpToAtk%':
        [3.84, 4.07, 4.3, 4.6, 4.83, 5.06, 5.36, 5.66, 5.96, 6.26, 6.56, 6.85, 7.15, 7.45, 7.75],
      duration: 9,
      cd: 16,
    },
    elemetalSkillCurse: {
      muliplier:
        [64, 68.8, 73.6, 80, 84.8, 89.6, 96, 102.4, 108.8, 115.2, 121.6, 128, 136, 144, 152],
      duration: 8,
      count: 4,
    },
    elementalBurst: {
      multiplier:
        [303.27, 321.43, 339.59, 363.2, 381.36, 399.52, 423.13, 446.74, 470.34, 493.95, 517.56, 541.17, 564.78, 588.38, 611.99],
      cd: 15,
      cost: 60,
    },
    'elementalBurst$_burstMultiplier%': {
      toggle: true,
      amount: 25,
    }
  },
  yoimiya: {
    hit1: {
      multiplier:
        [35.64, 38.07, 40.5, 43.74, 46.17, 49.01, 52.65, 56.3, 59.94, 63.59, 67.23, 70.88, 74.52, 78.17, 81.81],
      count: 2,
    },
    hit2: {
      multiplier:
        [68.38, 73.04, 77.7, 83.92, 88.58, 94.02, 101.01, 108, 115, 121.99, 128.98, 135.98, 142.97, 149.96, 156.95],
      count: 1,
    },
    hit3: {
      multiplier:
        [88.89, 94.95, 101.01, 109.09, 115.15, 122.22, 131.31, 140.4, 149.49, 158.59, 167.68, 176.77, 185.86, 194.95, 204.04],
      count: 1,
    },
    hit4: {
      multiplier:
        [46.42, 49.59, 52.75, 56.97, 60.14, 63.83, 68.58, 73.32, 78.07, 82.82, 87.57, 92.31, 97.06, 101.81, 106.56],
      count: 2,
    },
    hit5: {
      multiplier:
        [105.86, 113.08, 120.3, 129.92, 137.14, 145.56, 156.39, 167.22, 178.04, 188.87, 199.7, 210.53, 221.35, 232.18, 243.01],
      count: 2,
    },
    c6KindlingArrow: {
      multiplier(char) {
        return char.mainTalent.parent === 'normalAttack'
          ? skillLvSheet.yoimiya[char.mainTalent.name].multiplier[calcSkillLv(char) - 1] * 0.6
          : 0
      }
    },
    chargedAttack: {
      multiplier:
        [124, 133.3, 142.6, 155, 164.3, 173.6, 186, 198.4, 210.8, 223.2, 235.6, 248, 263.5, 279, 294.5],
      count: 1,
    },
    kindlingArrow: {
      multiplier:
        [16.4, 17.63, 18.86, 20.5, 21.73, 22.96, 24.6, 26.24, 27.88, 29.52, 31.16, 32.8, 34.85, 36.9, 38.9],
      count: 3,
    },
    plungeAttack: {
      multiplier:
        [141.93, 153.49, 165.04, 181.54, 193.1, 206.3, 224.45, 242.61, 260.76, 280.57, 300.37, 320.18, 339.98, 359.79, 379.5],
      elemental: false,
    },
    elementalSkillStance: {
      passive: true,
      amount(char) { return this['normalAttackMultiplier%'][calcSkillLv(char) - 1] },
      'normalAttackMultiplier%':
      [37.91, 40.18, 42.45, 45.4, 47.67, 49.94, 52.89, 55.84, 58.79, 61.74, 64.7, 67.65, 70.6, 73.55, 76.5],
      duration: 10,
      cd: 18,
    },
    elementalBurst: {
      multiplier:
        [127.2, 136.74, 146.28, 159, 168.54, 178.08, 190.8, 203.52, 216.24, 228.96, 241.68, 254.4, 270.3, 286.2, 302.1],
      duration(char) { return 10 + (char.setting.constellation >= 1 ? char.talents.C1.incBurstDuration.amount : 0) },
      cd: 15,
      cost: 60,
    },
    elemetalBurstCurse: {
      muliplier:
        [122, 131.15, 140.3, 152.5, 161.65, 170.8, 183, 195.2, 207.4, 219.6, 231.8, 244, 259.25, 274.5, 289.75],
      duration: 10,
      count: 4,
      interval: 2,
      cost: 60,
    },
  },
  raiden: {
    hit1: {
      multiplier:
        [44.74, 47.79, 50.84, 54.91, 57.96, 61.51, 66.09, 70.66, 75.24, 79.82, 84.39, 88.97, 93.54, 98.12, 102.69],
      count: 1,
    },
    hit2: {
      multiplier:
        [43.96, 46.95, 49.95, 53.95, 56.94, 60.44, 64.94, 69.43, 73.93, 78.42, 82.92, 87.41, 91.91, 96.4, 100.9],
      count: 1,
    },
    hit3: {
      multiplier: [
        [53.82, 57.49, 61.16, 66.05, 69.72, 74, 79.51, 85.01, 90.52, 96.02, 101.53, 107.03, 112.54, 118.04, 123.55],
        [30.89, 32.99, 35.1, 37.91, 40.01, 42.47, 45.63, 48.79, 51.95, 55.11, 58.27, 61.43, 64.58, 67.74, 70.9],
      ],
      count: 2,
    },
    hit4: {
      multiplier:
        [30.98, 33.09, 35.2, 38.02, 40.13, 42.59, 45.76, 48.93, 52.1, 55.26, 58.43, 61.6, 64.77, 67.94, 71.1],
      count: 1,
    },
    hit5: {
      multiplier: [
        [73.94, 78.99, 84.03, 90.75, 95.79, 101.67, 109.24, 116.8, 124.36, 131.92, 139.48, 147.05, 154.61, 162.17, 169.73],
        [61.6,  65.8,  70,    75.6,  79.8,   84.7,   91,     97.3, 103.6,  109.9,  116.2,  122.5,  128.8,  135.1,  141.4],
      ],
      count: 2,
    },
    chargedAttack: {
      multiplier:
        [74.36, 79.43, 84.5, 91.26, 96.33, 102.25, 109.85, 117.46, 125.06, 132.67, 140.27, 147.88, 155.48, 163.09, 170.69],
      count: 1,
      stamina: 20,
    },
    plungeAttack: {
      multiplier:
        [127.84, 138.24, 148.65, 163.51, 173.92, 185.81, 202.16, 218.51, 234.86, 252.7, 270.54, 288.38, 306.22, 324.05, 341.89],
      elemental: false,
    },
    elementalSkillHit: {
      multiplier:
        [117.2, 125.99, 134.78, 146.5, 155.29, 164.08, 175.8, 187.52, 199.24, 210.96, 222.68, 234.4, 249.05, 263.7, 278.35],
      count: 1,
      duration: 25,
      cd: 10,
    },
    elementalSkillOnHit: {
      multiplier:
        [42, 45.15, 48.3, 52.5, 55.64, 58.8, 63, 67.2, 71.4, 75.6, 79.8, 84, 89.25, 94.5, 99.75],
      interval: 0.9,
      duration: 25,
      cd: 10,
    },
    elementalSkillAura: {
      passive: true,
      amount(char) { return this['burstDmg%'][calcSkillLv(char) - 1] },
      'burstDmg%':
        [22, 23, 24, 25, 26, 27, 28, 29, 30, 30, 30, 30, 30, 30, 30],
      duration: 25,
      cd: 10,
    },
    elementalBurstHit: {
      multiplier:
        [127.2, 136.74, 146.28, 159, 168.54, 178.08, 190.8, 203.52, 216.24, 228.96, 241.68, 254.4, 270.3, 286.2, 302.1],
      cd: 18,
      cost: 90,
    }
  }
}

export default skillLvSheet