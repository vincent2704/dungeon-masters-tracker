import {MonsterSource} from "./enums/monsterSource";

export class MonsterId {

  constructor(private readonly id: number, private readonly source: MonsterSource) {
  }

  static readonly ADULT_RED_DRAGON_ID = new MonsterId(1, MonsterSource.BASIC_RULES);
  static readonly AIR_ELEMENTAL_ID = new MonsterId(2, MonsterSource.BASIC_RULES);
  static readonly ALLOSAURUS_ID = new MonsterId(3, MonsterSource.BASIC_RULES);
  static readonly ANIMATED_ARMOR_ID = new MonsterId(4, MonsterSource.BASIC_RULES);
  static readonly ANKYLOSAURUS_ID = new MonsterId(5, MonsterSource.BASIC_RULES);
  static readonly APE_ID = new MonsterId(6, MonsterSource.BASIC_RULES);
  static readonly AWAKANED_SHRUB_ID = new MonsterId(7, MonsterSource.BASIC_RULES);
  static readonly AWAKENED_TREE_ID = new MonsterId(8, MonsterSource.BASIC_RULES);
  static readonly AXE_BEAK_ID = new MonsterId(9, MonsterSource.BASIC_RULES);
  static readonly BABOON_ID = new MonsterId(10, MonsterSource.BASIC_RULES);

  static readonly BADGER_ID = new MonsterId(11, MonsterSource.BASIC_RULES);
  static readonly BANSHEE_ID = new MonsterId(12, MonsterSource.BASIC_RULES);
  static readonly BAT_ID = new MonsterId(13, MonsterSource.BASIC_RULES);
  static readonly BASILISK_ID = new MonsterId(14, MonsterSource.BASIC_RULES);
  static readonly BLACK_BEAR_ID = new MonsterId(15, MonsterSource.BASIC_RULES);
  static readonly BLINK_DOG_ID = new MonsterId(16, MonsterSource.BASIC_RULES);
  static readonly BLOOD_HAWK_ID = new MonsterId(17, MonsterSource.BASIC_RULES);
  static readonly BOAR_ID = new MonsterId(18, MonsterSource.BASIC_RULES);
  static readonly BROWN_BEAR_ID = new MonsterId(19, MonsterSource.BASIC_RULES);
  static readonly BUGBEAR_ID = new MonsterId(20, MonsterSource.BASIC_RULES);

  static readonly DEATH_DOG_ID = new MonsterId(30, MonsterSource.BASIC_RULES);
  static readonly FIRE_GIANT_ID = new MonsterId(40, MonsterSource.BASIC_RULES);
  static readonly FLYING_SWORD_ID = new MonsterId(44, MonsterSource.BASIC_RULES);
  static readonly GARGOYLE_ID = new MonsterId(47, MonsterSource.BASIC_RULES);
  static readonly GHOST_ID = new MonsterId(48, MonsterSource.BASIC_RULES);
  static readonly GHOUL_ID = new MonsterId(49, MonsterSource.BASIC_RULES);
  static readonly GIANT_APE_ID = new MonsterId(50, MonsterSource.BASIC_RULES);

  static readonly GIANT_FIRE_BEETLE_ID = new MonsterId(60, MonsterSource.BASIC_RULES);

  static readonly GIANT_SEA_HORSE_ID = new MonsterId(70, MonsterSource.BASIC_RULES);

  static readonly GOBLIN_ID = new MonsterId(80, MonsterSource.BASIC_RULES);
  static readonly GRIFFON_ID = new MonsterId(82, MonsterSource.BASIC_RULES);
  static readonly HARPY_ID = new MonsterId(83, MonsterSource.BASIC_RULES);
  static readonly HELL_HOUND_ID = new MonsterId(85, MonsterSource.BASIC_RULES);

  static readonly AARAKOCRA_ID = new MonsterId(1, MonsterSource.MONSTER_MANUAL);
  static readonly ABOLETH_ID = new MonsterId(2, MonsterSource.MONSTER_MANUAL);
  static readonly DEVA_ID = new MonsterId(3, MonsterSource.MONSTER_MANUAL);
  static readonly PLANETAR_ID = new MonsterId(4, MonsterSource.MONSTER_MANUAL);
  static readonly SOLAR_ID = new MonsterId(5, MonsterSource.MONSTER_MANUAL);

  static readonly RUG_OF_SMOTHERING_ID = new MonsterId(8, MonsterSource.MONSTER_MANUAL);
  static readonly ANKHEG_ID = new MonsterId(9, MonsterSource.MONSTER_MANUAL);
  static readonly AZER_ID = new MonsterId(10, MonsterSource.MONSTER_MANUAL);
  static readonly BEHIR_ID = new MonsterId(13, MonsterSource.MONSTER_MANUAL);
  static readonly BEHOLDER_ID = new MonsterId(14, MonsterSource.MONSTER_MANUAL);
  static readonly DEATH_TYRANT_ID = new MonsterId(15, MonsterSource.MONSTER_MANUAL);
  static readonly SPECTATOR_ID = new MonsterId(16, MonsterSource.MONSTER_MANUAL);
  static readonly NEEDLE_BLIGHT_ID = new MonsterId(17, MonsterSource.MONSTER_MANUAL);
  static readonly TWIG_BLIGHT_ID = new MonsterId(18, MonsterSource.MONSTER_MANUAL);
  static readonly VINE_BLIGHT_ID = new MonsterId(19, MonsterSource.MONSTER_MANUAL);

  static readonly BUGBEAR_CHIEF_ID = new MonsterId(21, MonsterSource.MONSTER_MANUAL);
  static readonly BULETTE_ID = new MonsterId(22, MonsterSource.MONSTER_MANUAL);
  static readonly BULLYWUG_ID = new MonsterId(23, MonsterSource.MONSTER_MANUAL);
  static readonly CAMBION_ID = new MonsterId(24, MonsterSource.MONSTER_MANUAL);
  static readonly CARRION_CRAWLER_ID = new MonsterId(25, MonsterSource.MONSTER_MANUAL);
  static readonly CENTAUR_ID = new MonsterId(26, MonsterSource.MONSTER_MANUAL);
  static readonly CHIMERA_ID = new MonsterId(27, MonsterSource.MONSTER_MANUAL);
  static readonly CHUUL_ID = new MonsterId(28, MonsterSource.MONSTER_MANUAL);
  static readonly CLOAKER_ID = new MonsterId(29, MonsterSource.MONSTER_MANUAL);
  static readonly COCKATRICE_ID = new MonsterId(30, MonsterSource.MONSTER_MANUAL);

  static readonly DRETCH_ID = new MonsterId(40, MonsterSource.MONSTER_MANUAL);
  static readonly YOCHLOL_ID = new MonsterId(50, MonsterSource.MONSTER_MANUAL);
  static readonly PIT_FIEND_ID = new MonsterId(60, MonsterSource.MONSTER_MANUAL);
  static readonly ADULT_BLUE_DRACOLICH_ID = new MonsterId(70, MonsterSource.MONSTER_MANUAL);
  static readonly ANCIENT_GREEN_DRAGON_ID = new MonsterId(80, MonsterSource.MONSTER_MANUAL);
  static readonly YOUNG_WHITE_DRAGON_ID = new MonsterId(90, MonsterSource.MONSTER_MANUAL);
  static readonly ANCIENT_COPPER_DRAGON_ID = new MonsterId(100, MonsterSource.MONSTER_MANUAL);
  static readonly YOUNG_SILVER_DRAGON_ID = new MonsterId(110, MonsterSource.MONSTER_MANUAL);
  static readonly DRYAD_ID = new MonsterId(114, MonsterSource.MONSTER_MANUAL);
  static readonly DROW_ID = new MonsterId(120, MonsterSource.MONSTER_MANUAL);
  static readonly FOMORIAN_ID = new MonsterId(130, MonsterSource.MONSTER_MANUAL);
  static readonly GITHYANKI_ID = new MonsterId(150, MonsterSource.MONSTER_MANUAL);
  static readonly CLAY_GOLEM_ID = new MonsterId(160, MonsterSource.MONSTER_MANUAL);

  static readonly WEREWOLF_ID = new MonsterId(203, MonsterSource.MONSTER_MANUAL);

  static readonly MUD_MEPHIT_ID = new MonsterId(210, MonsterSource.MONSTER_MANUAL);
  static readonly TRIDRONE_ID = new MonsterId(220, MonsterSource.MONSTER_MANUAL);
  static readonly SPIRIT_NAGA_ID = new MonsterId(230, MonsterSource.MONSTER_MANUAL);
  static readonly NIGHTMARE_ID = new MonsterId(232, MonsterSource.MONSTER_MANUAL);


  getId(): number {
    return this.id
  }

  getSource(): string {
    return this.source;
  }

}
