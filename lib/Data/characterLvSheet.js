import _ from 'lodash'

export const characterLevels =    '1, 20,  20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90'
.split(',').map(lv => lv.trim()) // 14 EA

export const charLvIndex = level => characterLevels.indexOf(level)

const CHARACTER_LV_TEMPLATE = {
  'pyroRes%': _.fill(new Array(14), 15),
  'hydroRes%': _.fill(new Array(14), 15),
  'dendroRes%': _.fill(new Array(14), 15),
  'anemoRes%': _.fill(new Array(14), 15),
  'cryoRes%': _.fill(new Array(14), 15),
  'geoRes%': _.fill(new Array(14), 15),
  'physRes%': _.fill(new Array(14), 15),
}

let characterLvSheet = {
  // levels        1,  20, 20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90
  ganyu: {
    maxHp:      [763, 1978, 2632, 3939, 4403, 5066, 5686, 6355, 6820, 7495, 7960, 8643, 9108, 9797],
    atk:        [ 26,  68,  90, 135, 151, 173, 194, 217, 233, 256, 272, 295, 311, 335],
    def:        [ 49, 127, 169, 253, 283, 326, 366, 409, 439, 482, 512, 556, 586, 630],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50, 50, 50, 50, 59.6, 59.6, 69.2, 69.2, 69.2, 69.2, 78.8, 78.8, 88.4, 88.4],
  },
  xiao: {
    maxHp:      [991, 2572, 3422, 5120, 5724, 6586, 7391, 8262, 8866, 9744, 10348, 11236, 11840, 12736],
    atk:        [ 27,  71,  94, 140, 157, 181, 203, 227, 243, 267, 284, 308, 325, 349],
    def:        [ 62, 161, 215, 321, 359, 413, 464, 519, 556, 612, 649, 705, 743, 799],
    "critRate%":[5, 5, 5, 5, 9.8, 9.8, 14.6, 14.6, 14.6, 14.6, 19.4, 19.4, 24.2, 24.2],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  zhongli: {
    maxHp:      [1144, 2967, 3948, 5908, 6605, 7599, 8528, 9533, 10230, 11243, 11940, 12965, 13662, 14695],
    atk:        [ 20,  51,  67, 101, 113, 130, 146, 163, 175, 192, 204, 222, 233, 251],
    def:        [ 57, 149, 198, 297, 332, 382, 428, 479, 514, 564, 599, 651, 686, 738],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
    "geoDmg%":  [0, 0, 0, 0, 7.2, 7.2, 14.4, 14.4, 14.4, 14.4, 21.6, 21.6, 28.8, 28.8],
  },
  hutao: {
    maxHp:      [1211, 3141, 4179, 6253, 6990, 8042, 9026, 10089, 10826, 11899, 12637, 13721, 14459, 15552],
    atk:        [  8,  21,  29,  43,  48,  55,  62,  69,  74,  81,  86,  94,  99, 106],
    def:        [ 68, 177, 235, 352, 394, 453, 508, 568, 610, 670, 712, 773, 815, 876],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50, 50, 50, 50, 59.6, 59.6, 69.2, 69.2, 69.2, 69.2, 78.8, 78.8, 88.4, 88.4],
  },
  mona: {
    maxHp:      [810, 2102, 2797, 4185, 4678, 5383, 6041, 6752, 7246, 7964, 8458, 9184, 9677, 10409],
    atk:        [ 22,  58,  77, 115, 129, 148, 167, 186, 200, 220, 233, 253, 267, 287],
    def:        [ 51, 132, 176, 263, 294, 338, 379, 424, 455, 500, 531, 576, 607, 653],
    "er%":      [100, 100, 100, 100, 108, 108, 116, 116, 116, 116, 124, 124, 132, 132],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  eula: {
    maxHp:      [1030, 2671, 3554, 5317, 5944, 6839, 7675, 8579, 9207, 10119, 10746, 11669, 12296, 13226],
    atk:        [ 27,  69,  92, 138, 154, 177, 198, 222, 238, 262, 278, 302, 318, 342],
    def:        [ 58, 152, 202, 302, 337, 388, 436, 487, 523, 574, 610, 662, 698, 751],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50, 50, 50, 50, 59.6, 59.6, 69.2, 69.2, 69.2, 69.2, 78.8, 78.8, 88.4, 88.4],
  },
  kazuha: {
    maxHp:      [1039, 2695, 3586, 5366, 5999, 6902, 7747, 8659, 9292, 10213, 10846, 11777, 12410, 13348],
    atk:        [ 23,  60,  80, 119, 133, 153, 172, 192, 206, 227, 241, 262, 276, 297],
    def:        [ 63, 163, 217, 324, 363, 417, 468, 523, 562, 617, 656, 712, 750, 807],
    em:         [0, 0, 0, 0, 28.8, 28.8, 57.6, 57.6, 57.6, 57.6, 86.4, 86.4, 115.2, 115.2],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  xingqiu: {
    maxHp:      [ 857, 2202, 2842, 4257, 4712, 5420, 6027, 6735, 7190, 7897, 8352, 9060, 9514, 10222],
    atk:        [ 17,  43,  56,  84,  93, 107, 119, 133, 142, 156, 165, 179, 188, 202],
    def:        [ 64, 163, 211, 316, 349, 402, 447, 499, 533, 585, 619, 671, 705, 758],
    "atk%":     [  0,   0,   0,   0,   6,   6,  12,  12,  12,  12,  18,  18,  24,  24],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  bennett: {
    maxHp:      [1039, 2670, 3447, 5163, 5715, 6573, 7309, 8168, 8719, 9577, 10129, 10987, 11539, 12397],
    atk:        [ 16,  41,  53,  80,  88, 101, 113, 126, 134, 148, 156, 169, 178, 191],
    def:        [ 65, 166, 214, 321, 356, 409, 455, 508, 542, 596, 630, 684, 718, 771],
    "er%":      [ 0,  0,  0,  0, 6.7, 6.7, 13.3, 13.3, 13.3, 13.3, 20, 20, 26.7, 26.7],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  diona: {
    maxHp:      [ 802, 2061, 2661, 3985, 4411, 5074, 5642, 6305, 6731, 7393, 7818, 8481, 8907, 9570],
    atk:        [ 18,  46,  59,  88,  98, 113, 125, 140, 149, 164, 174, 188, 198, 212],
    def:        [ 50, 129, 167, 250, 277, 318, 354, 396, 422, 464, 491, 532, 559, 601],
    "cryoDmg%": [  0,   0,   0,   0,   6,   6,  12,  12,  12,  12,  18,  18,  24,  24],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  sucrose: {
    maxHp:      [ 775, 1991, 2570, 3850, 4261, 4901, 5450, 6090, 6501, 7141, 7552, 8192, 8604, 9244],
    atk:        [ 14,  37,  47,  71,  78,  90, 100, 112, 120, 131, 139, 151, 158, 170],
    def:        [ 59, 151, 195, 293, 324, 373, 414, 463, 494, 543, 574, 623, 654, 703],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
    "anemoDmg%":  [0, 0, 0, 0, 7.2, 7.2, 14.4, 14.4, 14.4, 14.4, 21.6, 21.6, 28.8, 28.8],
  },
  jean: {
    maxHp:      [1144, 2967, 3948, 5908, 6605, 7599, 8528, 9533, 10230, 11243, 11940, 12965, 13662, 14695],
    atk:        [ 19,  48,  64,  96, 108, 124, 139, 155, 166, 183, 194, 211, 222, 239],
    def:        [ 60, 155, 206, 309, 345, 397, 446, 499, 535, 588, 624, 678, 715, 769],
    "healBonus%":[0, 0, 0, 0, 5.5, 5.5, 11.1, 11.1, 11.1, 11.1, 16.6, 16.6, 22.2, 22.2],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  albedo: {
    maxHp:      [1030, 2671, 3554, 5317, 5944, 6839, 7675, 8579, 9207, 10119, 10746, 11669, 12296, 13226],
    atk:        [ 20,  51,  67, 101, 113, 130, 146, 163, 175, 192, 204, 222, 233, 251],
    def:        [ 68, 177, 235, 352, 394, 453, 508, 568, 610, 670, 712, 773, 815, 876],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
    "geoDmg%":  [0, 0, 0, 0, 7.2, 7.2, 14.4, 14.4, 14.4, 14.4, 21.6, 21.6, 28.8, 28.8],
  },
  chongyun: {
    maxHp:      [ 921, 2366, 3054, 4574, 5063, 5824, 6475, 7236, 7725, 8485, 8974, 9734, 10223, 10984],
    atk:        [ 19,  48,  62,  93, 103, 118, 131, 147, 157, 172, 182, 198, 208, 223],
    def:        [ 54, 140, 180, 270, 299, 344, 382, 427, 456, 501, 530, 575, 603, 648],
    "atk%":     [  0,   0,   0,   0,   6,   6,  12,  12,  12,  12,  18,  18,  24,  24],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  xiangling: {
    maxHp:      [ 912, 2342, 3024, 4529, 5013, 5766, 6411, 7164, 7648, 8401, 8885, 9638, 10122, 10875],
    atk:        [ 19,  48,  63,  94, 104, 119, 133, 148, 158, 174, 184, 200, 210, 225],
    def:        [ 56, 144, 186, 279, 308, 355, 394, 441, 470, 517, 546, 593, 623, 669],
    em:         [  0,   0,   0,   0,  24,  24,  48,  48,  48,  48,  72,  72,  96,  96],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  klee: {
    maxHp:      [ 801, 2077, 2764, 4136, 4623, 5319, 5970, 6673, 7161, 7870, 8358, 9076, 9563, 10287],
    atk:        [ 24,  63,  84, 125, 140, 161, 180, 202, 216, 238, 253, 274, 289, 311],
    def:        [ 48, 124, 165, 247, 276, 318, 357, 399, 428, 470, 500, 542, 572, 615],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
    "pyroDmg%": [0, 0, 0, 0, 7.2, 7.2, 14.4, 14.4, 14.4, 14.4, 21.6, 21.6, 28.8, 28.8],
  },
  diluc: {
    maxHp:      [1011, 2621, 3488, 5219, 5834, 6712, 7533, 8421, 9036, 9932, 10547, 11453, 12068, 12981],
    atk:        [ 26,  68,  90, 135, 151, 173, 194, 217, 233, 256, 272, 295, 311, 335],
    def:        [ 61, 158, 211, 315, 352, 405, 455, 509, 546, 600, 637, 692, 729, 784],
    "critRate%":[5, 5, 5, 5, 9.8, 9.8, 14.6, 14.6, 14.6, 14.6, 19.4, 19.4, 24.2, 24.2],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  venti: {
    maxHp:      [ 820, 2127, 2830, 4234, 4734, 5446, 6112, 6832, 7331, 8058, 8557, 9292, 9791, 10431],
    atk:        [ 20,  53,  71, 106, 118, 136, 153, 171, 183, 201, 214, 232, 245, 263],
    def:        [ 52, 135, 180, 269, 301, 346, 388, 434, 465, 512, 543, 590, 622, 669],
    "er%":      [100, 100, 100, 100, 108, 108, 116, 116, 116, 116, 124, 124, 132, 132],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  fischl: {
    maxHp:      [ 770, 1979, 2555, 3827, 4236, 4872, 5418, 6054, 6463, 7099, 7508, 8144, 8553, 9189],
    atk:        [ 20,  53,  68, 102, 113, 130, 144, 161, 172, 189, 200, 216, 227, 244],
    def:        [ 50, 128, 165, 247, 274, 315, 350, 391, 418, 459, 485, 526, 553, 594],
    "atk%":     [  0,   0,   0,   0,   6,   6,  12,  12,  12,  12,  18,  18,  24,  24],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  xinyan: {
    maxHp:      [ 939, 2413, 3114, 4665, 5163, 5939, 6604, 7379, 7878, 8653, 9151, 9927, 10425, 11201],
    atk:        [ 21,  54,  69, 103, 115, 132, 147, 164, 175, 192, 203, 220, 231, 249],
    def:        [ 67, 172, 222, 333, 368, 423, 471, 526, 562, 617, 652, 708, 743, 799],
    "atk%":     [  0,   0,   0,   0,   6,   6,  12,  12,  12,  12,  18,  18,  24,  24],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  beidou: {
    maxHp:      [1094, 2811, 3628, 5435, 6015, 6919, 7694, 8597, 9178, 10081, 10662, 11565, 12146, 13050],
    atk:        [ 19,  48,  63,  94, 104, 119, 133, 148, 158, 174, 184, 200, 210, 225],
    def:        [ 54, 140, 180, 270, 299, 344, 382, 427, 456, 501, 530, 575, 603, 648],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
    "electroDmg%": [0, 0, 0, 0, 7.2, 7.2, 14.4, 14.4, 14.4, 14.4, 21.6, 21.6, 28.8, 28.8],
  },
  keqing: {
    maxHp:      [1020, 2646, 3521, 5268, 5889, 6776, 7604, 8500, 9121, 10025, 10647, 11561, 12182, 13103],
    atk:        [ 25,  65,  87, 130, 145, 167, 187, 209, 225, 247, 262, 285, 300, 323],
    def:        [ 62, 161, 215, 321, 359, 413, 464, 519, 556, 612, 649, 705, 743, 799],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50, 50, 50, 50, 59.6, 59.6, 69.2, 69.2, 69.2, 69.2, 78.8, 78.8, 88.4, 88.4],
  },
  rosaria: {
    maxHp:      [1030, 2647, 3417, 5118, 5665, 6516, 7245, 8096, 8643, 9493, 10040, 10891, 11438, 12289],
    atk:        [ 20,  52,  67, 100, 111, 127, 141, 158, 169, 185, 196, 213, 223, 240],
    def:        [ 60, 153, 197, 296, 327, 376, 418, 468, 499, 548, 580, 629, 661, 710],
    "atk%":     [  0,   0,   0,   0,   6,   6,  12,  12,  12,  12,  18,  18,  24,  24],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50,  50],
  },
  ayaka: {
    maxHp:      [1001, 2597, 3455, 5170, 5779, 6649, 7462, 8341, 8951, 9838, 10448, 11345, 11954, 12858],
    atk:        [ 27,  69,  92, 138, 154, 177, 198, 222, 238, 262, 278, 302, 318, 342],
    def:        [ 61, 158, 211, 315, 352, 405, 455, 509, 546, 600, 637, 692, 729, 784],
    "critRate%":[  5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5,   5],
    "critDmg%": [ 50, 50, 50, 50, 59.6, 59.6, 69.2, 69.2, 69.2, 69.2, 78.8, 78.8, 88.4, 88.4],
  },
}
characterLvSheet = Object.keys(characterLvSheet).reduce((ret, name) => ({
  ...ret,
  [name]: {
    ...characterLvSheet[name],
    ...CHARACTER_LV_TEMPLATE,
  }
}), {})

console.log('[characterLvSheet.characterLv', characterLvSheet)

export default characterLvSheet