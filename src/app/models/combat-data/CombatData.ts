export class CombatData {

  private constructor() {}

  // source for XP Thresholds by Character Level table. key is character level, value is monster XP
  // for that level that matches given difficulty.
  // source - Dungeon Master's Guide, page 82.
  static readonly EASY_XP_THRESHOLDS = new Map<number, number>([
    [1, 25],
    [2, 50],
    [3, 75],
    [4, 125],
    [5, 250],
    [6, 300],
    [7, 350],
    [8, 450],
    [9, 550],
    [10, 600],

    [11, 800],
    [12, 1000],
    [13, 1100],
    [14, 1250],
    [15, 1400],
    [16, 1600],
    [17, 2000],
    [18, 2100],
    [19, 2400],
    [20, 2800],
  ]);

  static readonly MEDIUM_XP_THRESHOLDS = new Map<number, number>([
    [1, 50],
    [2, 100],
    [3, 150],
    [4, 250],
    [5, 500],
    [6, 600],
    [7, 750],
    [8, 900],
    [9, 1100],
    [10, 1200],

    [11, 1600],
    [12, 2000],
    [13, 2200],
    [14, 2500],
    [15, 2800],
    [16, 3200],
    [17, 3900],
    [18, 4200],
    [19, 4900],
    [20, 5700],
  ]);

  static readonly HARD_XP_THRESHOLDS = new Map<number, number>([
    [1, 75],
    [2, 150],
    [3, 225],
    [4, 375],
    [5, 750],
    [6, 900],
    [7, 1100],
    [8, 1400],
    [9, 1600],
    [10, 1900],

    [11, 2400],
    [12, 3000],
    [13, 3400],
    [14, 3800],
    [15, 4300],
    [16, 4800],
    [17, 5900],
    [18, 6300],
    [19, 7300],
    [20, 8500],
  ]);

  static readonly DEADLY_XP_THRESHOLDS = new Map<number, number>([
    [1, 100],
    [2, 200],
    [3, 400],
    [4, 500],
    [5, 1100],
    [6, 1400],
    [7, 1700],
    [8, 2100],
    [9, 2400],
    [10, 2800],

    [11, 3600],
    [12, 4500],
    [13, 5100],
    [14, 5700],
    [15, 6400],
    [16, 7200],
    [17, 8800],
    [18, 9500],
    [19, 10_900],
    [20, 12_700],
  ]);

}
