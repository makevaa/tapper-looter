
const uniques = {
    "Eve of Destruction": {
        type: 'artifact',
        image: 'pentagram',
        effects: [
            new TypeDamageBonus(50, 'hammer'),
            new MagicFind(25),
            new GoldFind(100),
        ],
        flavor:"A malevolent entity is bound within this vile relic by infernal spells."
    },
    "Molokh": {
        type: 'mace',
        image: 'molten_mace',
        effects: [
            new DamageBonus(150)
        ],
        flavor:"A fiery sacrificial mace from depths unknown."
    },
    "Hirvijumal": {
        type: 'sword',
        image: 'blood_sword',
        effects: [
            new DamageBonus(150)
        ],
        flavor:"The mystic might of holy forests is bound within by magic runes."
    },
    "Mysterium Xarxes": {
        type: 'artifact',
        image: 'skull_book',
        effects: [
            new TypeDamageBonus(100, 'staff'),
            new MagicFind(25),
        ],
        flavor:"Reading too much can drive one to madness, yet it holds untold secrets."
    },
    "Star of Kirous": {
        type: 'artifact',
        image: 'rune_vaults',
        effects: [
            new MagicFind(50),

        ],
        flavor:"The brightest star in the night sky is trapped within this occult relic."
    },
    "Wildwood Avenger": {
        type: 'axe',
        image: 'warlord_axe',
        effects: [
            new DamageBonus(100),
            new CritChance(20),
        ],
        flavor:"This mythic axe was used to drive out the invaders from the realm."
    },
    "Warwyrd": {
        type: 'artifact',
        image: 'scroll_cyan',
        effects: [
            new DamageBonus(25),
            new TypeDamageBonus(100, 'axe'),
            new TypeDamageBonus(100, 'sword'),
        ],
        flavor:"This potent war blessing has survived through the times."
    },
    "Crystal Empire Blade": {
        type: 'sword',
        image: 'kris',
        effects: [
            new DamageBonus(200),
            new CritChance(10),
            new CritDamage(25),
        ],
        flavor:"Only a bitter memory remains of the empire's past glories."
    },
    "Korpi Warblade": {
        type: 'axe',
        image: 'knight_axe',
        effects: [
            new DamageBonus(100),
            new GoldFind(50),
        ],
        flavor:"Warrior hero's weapon from a mystic realm far away from here."
    },
    "Howling Stone": {
        type: 'amulet',
        image: 'brooch_shield',
        effects: [
            new DamageBonus(25),
            new MagicFind(25),
            new GoldFind(25),
        ],
        flavor:"The cursed pendant screams with the voice of the spirit bound within."
    },
    "Abyssal Mato": {
        type: 'sword',
        image: 'bullwhip',
        effects: [
            new DamageBonus(200),
            new GoldFind(25),
        ],
        flavor:"The last known weapon of the ancient warrior king Mato."
    },
    "Steel of the Lost Time": {
        type: 'sword',
        image: 'doom_sword',
        effects: [
            new DamageBonus(100),
            new CritDamage(50),
        ],
        flavor:"To this day the lords of bygone eras dream of great revenge."
    },
    "Akriloth Talon": {
        type: 'sword',
        image: 'red_sword',
        effects: [
            new DamageBonus(150),
            new CritDamage(20),
        ],
        flavor:"Akriloth may be dead, but some of his might was bound in this weapon."
    },
    "Thousand Black Arrows": {
        type: 'bow',
        image: 'arbalest',
        effects: [
            new DamageBonus(150),
            new CritChance(25),
            new CritDamage(50)
        ],
        flavor:"May these bolts of black venom pierce your enemy's heart."
    },
    "Lorencian Staff": {
        type: 'staff',
        image: 'green_staff',
        effects: [
            new DamageBonus(150),
            new CritChance(25),
            new MagicFind(25),
        ],
        flavor:"An ancient relic from the realm of Lorencia."
    },
    "Kalmakivi": {
        type: 'artifact',
        image: 'rune_abyss',
        effects: [
            new TypeDamageBonus(100, 'sword'),
            new TypeDamageBonus(100, 'axe'),
            new TypeDamageBonus(100, 'spear'),

        ],
        flavor:"The stone speaks of vile deeds in a venomous tongue."
    },    
    "Balhaut's Sorrow": {
        type: 'amulet',
        image: 'amulet_cylinder',
        effects: [
            new CritChance(30)
        ],
        flavor:"After all the wars were won, Balhaut wept in silence."
    },
    "Mace of Habadacus": {
        type: 'mace',
        image: 'spiked_club',
        effects: [
            new DamageBonus(250)
        ],
        flavor: "Crude mace imbued with immense forces from the dark ages past."
    },
    "Groveheart": {
        type: 'amulet',
        image: 'uhri',
        effects: [
            new DamageBonus(50),
            new TypeDamageBonus(50, 'axe'),
            new TypeDamageBonus(25, 'spear'),
        ],
        flavor: "The chiseled stone remembers the old times with clarity."
    },
    "Thormageddon": {
        type: 'axe',
        image: 'brutal_axe',
        effects: [
            new DamageBonus(150),
            new CritDamage(100)
        ],
        flavor: "Seething with malevolent intent, it longs for atrocity."
    },
    "Lacronyf Moska": {
        type: 'hammer',
        image: 'gold_hammer',
        effects: [
            new DamageBonus(100),
            new CritChance(10),
            new CritDamage(50),
        ],
        flavor: "Battlehammer anointed with an alchemical sacrament."
    },



}