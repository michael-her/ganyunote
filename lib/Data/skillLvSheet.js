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
      elemental: false,
    },
    hit2: {
      multiplier:
        [56.94, 60.82, 64.7,  69.88, 73.76, 78.29, 84.11, 89.93, 95.76, 101.58, 107.4],
      count: 1,
      elemental: false,
    },
    hit3: {
      multiplier:
        [68.55, 73.23, 77.9,  84.13, 88.81, 94.26, 101.27, 108.28, 115.29, 122.3, 129.31],
      count: 1,
      elemental: false,
    },
    hit4: {
      multiplier:
        [37.66, 40.23, 42.8, 46.22, 48.79, 51.79, 55.64, 59.49, 63.34, 67.2, 71.05],
      count: 2,
      elemental: false,
    },
    hit5: {
      multiplier:
        [71.54, 76.42, 81.3, 87.8, 92.68, 98.37, 105.69, 113.01, 120.32, 127.64, 134.96],
      count: 1,
      elemental: false,
    },
    hit6: {
      multiplier:
        [95.83, 102.37, 108.9, 117.61, 124.15, 131.77, 141.57, 151.37, 161.17, 170.97, 180.77],
      count: 1,
      elemental: false,
    },
    chargedAttack: {
      multiplier:
        [121.09, 129.34, 137.6, 148.61, 156.86, 166.5, 178.88, 191.26, 203.65, 216.03, 228.42],
      elemental: false,
    },
    plungeAttack: {
      multiplier:
        [204.39, 221.02, 237.66, 261.42, 278.06, 297.07, 323.21, 349.36, 375.5, 404.02, 432.54],
      elemental: false,
    },
    elementalSkill: {
      multiplier:
        [252.8, 271.76, 290.72, 316, 334.96, 379.2, 404.48, 429.76, 455.04, 480.32, 505.6, 537.2, 568.8, 600.4],
      count: 2,
      cd: 10,
    },
    elementalBurstStance: {
      toggle: true,
      amount(char) { return this['normalAttacksDmg%'][char.leftStats.skillLv - 1] },
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
      elemental: true,
    },
    hit2: {
      multiplier:
        [48.68, 52.65, 56.61, 62.27, 66.23, 70.76, 76.99, 83.22, 89.44, 96.24, 103.03],
      count: 1,
      elemental: true,
    },
    hit3: {
      multiplier:
        [62.62, 67.72, 72.82, 80.1,  85.19, 91.02, 99.03, 107.04, 115.05, 123.79, 132.53],
      count: 1,
      elemental: true,
    },
    hit4: {
      multiplier:
        [22.65, 24.49, 26.33, 28.97, 30.81, 32.92, 35.81, 38.71, 41.61, 44.77, 47.93],
      count: 3,
      elemental: true,
    },
    hit5: {
      multiplier:
        [78.18, 84.55, 90.91, 100, 106.36, 113.64, 123.64, 133.64, 143.64, 154.55, 165.45],
      count: 1,
      elemental: true,
    },
    chargedAttack: {
      multiplier:
        [55.13, 59.61, 64.1,  70.51, 75,   80.13,  87.18,  94.23, 101.28, 108.97, 116.66],
      count: 3,
      elemental: true,
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
  }
}

export default skillLvSheet