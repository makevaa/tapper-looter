// main.js


const bottomTabs = document.querySelectorAll('#bottom-bar > .tab');
const invIcon = document.querySelector('#bottom-bar > .tab.inv > img');


const views = document.querySelectorAll('#view-container > .view');
const combatView = document.querySelector('#view-container > .combat.view');
const zoneTitle = document.getElementById('zone-title');


const lootItemContainer = document.getElementById('loot-container');
const lootItemImage = document.querySelector('.loot-item');
const lootItemNameContainer = document.getElementById('loot-name-container');
const lootItemName = document.getElementById('loot-name');
const lootItemLayers = document.querySelectorAll('#loot-container > .loot-item > .outer-wrap > .inner-wrap > .image');
const lootItemNormalGlow = document.querySelector('.item-normal-glow');

const enemyContainer = document.getElementById('enemy-container');
const enemyNameElem = document.getElementById('enemy-name');
const enemyTypeElem = document.getElementById('enemy-type');
const enemyTypeImage = document.getElementById('enemy-type-image');

const enemyImageContainer = document.getElementById('enemy-image-container');
const enemyDamageOverlay = enemyImageContainer.querySelector('.damage-overlay');
const enemyImageElem = document.getElementById('enemy-image');

const enemyHpBarContainer = document.getElementById('enemy-hp-bar-container');
const enemyHpBarMain = document.querySelector('#enemy-hp-bar-container > .bar.main');
const enemyHpBarBg = document.querySelector('#enemy-hp-bar-container > .bar.bg');

const enemyHpCurrent = document.querySelector('#enemy-hp-bar-container > .hp-container > .current');
const enemyHpMax = document.querySelector('#enemy-hp-bar-container > .hp-container > .max');


// Xp bar in combat view
const levelNumElem = document.querySelector('#xp-bar > .level-container > .level');
const xpBarElem = document.querySelector('#xp-bar > .bar');



const invGrid = document.getElementById('inv-grid');
let invSlots; // set in createInvSlots() function

const itemViewerName = document.querySelector('#item-viewer > .details > .name');

const itemViewerQualityTitle = document.querySelector('#item-viewer > .details > .type-container > .quality-title');

const itemViewerTypeTitle = document.querySelector('#item-viewer > .details > .type-container > .type');

const itemViewerSellValueContainer = document.querySelector('#item-viewer > .details > .type-container > .value-container');
const itemViewerSellValue = document.querySelector('#item-viewer > .details > .type-container > .value-container > .value');

const itemViewerEffectsContainer = document.querySelector('#item-viewer > .details > .effects-container');
const itemViewerFlavorContainer = document.querySelector('#item-viewer > .details > .flavor-container ');

//const viewerItemContainer = document.getElementById('loot-container');
//const viewerItemImage = document.querySelector('.loot-item');
const itemViewerContainer = document.querySelector('#item-viewer > .image-container');

const itemViewerImage = document.querySelector('#item-viewer > .image-container > .viewer-item');

const itemViewerBottomShadow = document.querySelector('#item-viewer > .image-container > .viewer-item > .item-bottom-shadow-container');

const viewerItemLayers = document.querySelectorAll('#item-viewer > .image-container > .viewer-item > .outer-wrap > .inner-wrap > .image');
const viewerItemNormalGlow = document.querySelector('#item-viewer > .image-container > .viewer-item > .outer-wrap > .inner-wrap > .item-normal-glow-container > .item-normal-glow');



const sellSelectedButton = document.getElementById('sell-selected');
const sellAllButtonButton = document.getElementById('sell-all');
const lockSelectedButton = document.getElementById('lock-selected');
const equipButton = document.getElementById('equip-selected');

const playerGoldElem = document.querySelector('#gold-container > .gold-amount-container > .gold-amount');
const goldAnimContainer = document.querySelector('#gold-container > .gold-anim-container');
const goldAnim = document.querySelector('#gold-container > .gold-anim-container > .gold-anim');

// Character view elems
const characterLevelElem = document.querySelector('.character.view > .level-xp-cont > .level-cont > .level');
const characterXpElem = document.querySelector('.character.view > .level-xp-cont > .xp-cont > .xp');
const characterNextLevelElem = document.querySelector('.character.view > .level-xp-cont > .next-cont > .next');

// Adventuire log stats in Character view
const enemiesKilledElem = document.querySelector('#adventure-log > .stats > .row > .num.enemies-killed');
const itemsLootedElem = document.querySelector('#adventure-log > .stats > .row > .num.items-looted');
const itemsSoldElem = document.querySelector('#adventure-log > .stats > .row > .num.items-sold');
const goldGainedElem = document.querySelector('#adventure-log > .stats > .row > .num.gold-gained');

const modal = document.getElementById('modal-container');


let enemy = {
    name: -1,
    title:'', //flavor name, generated
    type: -1,
    dead: false,
    xp: -1,
    hp: {
        max: settings.enemyMaxHp,
        current:settings.enemyMaxHp,
    },
    lootItem: {},
    image: -1,
}

class Player {
    constructor() {
        this.invSlots = 30;
        this.inv = [];
        this.gold = 0;
        this.goldFind = 0; 
        this.magicFind = 0;
        this.kills = 0;
        this.tab = 0;
        this.xp = 0;
        this.totalXp = 0;
        this.xpToLevel = -1;
        this.level = 1;

        this.attributes = {
            str:10,
            dex:10,
            int:10,
            unusedPoints:0,
            base:10,
        }
    
        this.damage = {
            base: 10,
            bonus: 0,
            typeBonus:0,
        }
    
        this.crit = {
            chance: 0,
            multiplier: 1.5,
            baseMultiplier: 1.5
        }
    
        this.equipment =  {
            weapon: -1,
            amulet: -1,
            artifact: -1
        }

        this.adventureLog = {
            enemiesKilled:0,
            itemsLooted:0,
            itemsSold:0,
            goldGained:0,
        
        }

        //unique log: every unique name is key, value is boolean, if found or not
        this.uniqueLog = {

        }
       
        this.addXp = amount => {
            this.xp = this.xp + amount;
            this.totalXp += amount;
            if (this.xp >= this.xpToLevel) {
                this.levelUp();
                msg(`<span class='level-up'>Level up</span>`);
            }
            setXpBar();
        }
        
        this.levelUp = () => {
            this.level += 1;
            this.attributes.unusedPoints += 1;
            setPlayerStats();
            // set xp for next level
            this.xp = 0;
            this.xpToLevel = getXpToLevel(this.level);
            setXpToLevel();
            setXpBar();
        }

        this.addAttribute = attr => {
            if (this.attributes.unusedPoints > 0) {
                this.attributes.unusedPoints -= 1;
                this.attributes[attr] += 1;
                setPlayerStats();
                save();
            } else {
                msg('No points available')
            }

     
        
        }
    }

    
   

}

let player = new Player();

const addGold = amount => {
    player.gold += amount;
    playerGoldElem.innerText = player.gold;
    runGoldAnim(amount, true);
}


// WoW style color coding: 
// gray, white, ,green, blue, purple, orange
/* 
const itemQuality = [
    {name:'Weak', color:'#9d9d9d'}, //grey
    {name:'Common', color:'#e6e6e6'}, //white
    {name:'Uncommon', color:'#1eff00'}, // green 1eff00
    {name:'Rare', color:'#0073e6'},  // wowBlue: 0070dd, other blue 0073e6
    {name:'Epic', color:'#a335ee'}, //purple
    {name:'Legendary', color:'#ff8000'}, //orange
] */

// Diablo 2 style color coding:  grey, white, blue, yellow, green (set), legendary
const itemQuality = [

    {name:'Weak', color:'#9d9d9d'}, 
    {name:'Normal', color:'#e6e6e6'}, 
    {name:'Magic', color:'#6969ff'}, // green 1eff00
    {name:'Rare', color:'#FFE400'},  // wowBlue: 0070dd, other blue 0073e6, d2 blue 6969ff
    {name:'Epic', color:'#1eff00'},  
    {name:'Legendary', color:'#ff8000'}, 
    {name:'Unique', color:'#a79a6d'}, 
] 



class Item {
    constructor(name, type, isWeapon, imageSrc, qLevel, sellValue, effects, locked, flavor) {
        this.name = name;
        this.type = type;
        this.isWeapon = isWeapon;
        this.imageSrc = imageSrc;
        this.qualityLevel = qLevel;
        this.sellValue = sellValue;
        this.effects = effects;
        this.looted = false;
        this.locked = locked;
        this.flavor = flavor;
    }
}


class Effect {
    constructor(name) {
        this.name = name;
        this.text = '';
    }
}

class DamageBonus extends Effect {
    constructor(dmg) {
        super('DamageBonus');
        this.value = dmg;
        this.text = `+${dmg} damage`;

    }
}


class IncreasedValue extends Effect {
    constructor(percent) {
        super('IncreasedValue');
        this.value = percent;
        this.text = `+${percent}% gold value `;

    }
}


// Damage bonus if using specific weapon type
class TypeDamageBonus extends Effect {
    constructor(dmg, type) {
        super('TypeDamageBonus');
        this.value = dmg;
        this.type = type;
        //this.text = `${toTitleCase(type)} damage +${dmg}`;
        this.text = `+${dmg} ${type} damage `;
    }
}

class CritChance extends Effect {
    constructor(chance) {
        super('CritChance');
        this.value = chance;
        this.text = `Critical chance +${chance}%`;

    }
}

class CritDamage extends Effect {
    constructor(percent) {
        super('CritDamage');
        this.value = percent;
        this.text = `Critical damage +${percent}%`;

    }
}

class GoldFind extends Effect {
    constructor(percent) {
        super('GoldFind');
        this.value = percent;
        this.text = `Gain ${percent}%  more gold`;
    }
}

class MagicFind extends Effect {
    constructor(percent) {
        super('MagicFind');
        this.value = percent;
        this.text = `Find ${percent}%  more rare items`;
    }
}





const createItemEffects = (type, isWeapon, qLevel) => {
    const weaponTypes = [ 'axe', 'bow', 'hammer', 'mace', 'spear', 'staff', 'sword'];

    let effects = []

    // Damage bonus is added to all weapons
    if (isWeapon) {
        let min = 1;
        min += qLevel;
        if (qLevel > 1) { min += 10;}
        let max = (qLevel+1)*10 ;
        const eff = new DamageBonus(ranNum(min, max));
        effects.push(eff);


        if (chance(10) && qLevel > 3) {
            // crit chance or crit damage
        }

    } else if (type === 'amulet') {

    } else if (type === 'artifact') {

    } else if (type === 'potion') {
        
    }

    // Type damage bonus
    if ( chance(50 + qLevel*3) && !isWeapon ) {
        const min = 1;
        const max = (qLevel+1)*4 ;

        const forType = selectFrom(weaponTypes);
        const eff = new TypeDamageBonus(ranNum(min, max), forType);
        effects.push(eff);
    }


    // Critical chance
    if ( chance(50 + qLevel*3) ) {
        const min = 1;
        const max = (qLevel+1)*2 ;
        const eff = new CritChance(ranNum(min, max));
        effects.push(eff);
    }


    // Critical damage
    if ( chance(50 + qLevel*3) ) {
        const min = 5;
        const max = (qLevel+1)*5 ;
        const eff = new CritDamage(ranNum(min, max));
        effects.push(eff);
    }

    // Magic find
    if ( chance(10) ) {
        const min = 5;
        const max = (qLevel+1)*5 ;
        const eff = new MagicFind(ranNum(min, max));
        effects.push(eff);
    }

    // Gold find
    if ( chance(10) && !isWeapon ) {
        const min = 5;
        const max = (qLevel+1)*5 ;
        const eff = new GoldFind(ranNum(min, max));
        effects.push(eff);
    }

    //Increased sell value
    if ( chance(10) && qLevel > (2-3) || effects.length === 0 ) {
        let min = 5;
        let max = 50;
        let percent = ranNum(min, max);
        const effect = new IncreasedValue(percent);
        effects.push(effect);
    }

    return effects;
}



const getUniqueItem = name => {
    const data = uniques[name];

    // Item is locked if setting is on
    const autoLocked = settings.autoLockUniques;

    const item = createItem(data.type, 6, name, data.image, data.effects, data.flavor, autoLocked);
    return item;
}


const createItem = (type='random', qLevel='random', name='random', image='random', effects='random', flavor='', locked=false) => {
    const others = ['amulet', 'artifact'];
    const weapons = [ 'axe', 'bow', 'hammer', 'mace', 'spear', 'staff', 'sword'];
    const types = others.concat(weapons);

    if (type==='random') {
        type = selectFrom(types);
    }


    const isWeapon = weapons.includes(type);
    //log(`${type} isWeapon: ${isWeapon}`)

    const diff = mapData.currentNode.difficulty;
    // 8 map zones, 8 difficulty levels: 1-8

    if (qLevel === 'random') {
        qLevel = 0;
        if (chance(1) && diff >= 4) {
            qLevel = 5;
        } else if (chance(5) && diff >= 3) {
            qLevel = 4;
        } else if (chance(10)) {
            qLevel = 3;
        } else if (chance(20)) {
            qLevel = 2;
        } else if (chance(30)) {
            qLevel = 1;
        }      
    }

    let imageSrc;
    if (image === 'random') {
        imageSrc = `img/item/${type}${ranNum(1, itemImageAmounts[type])}.png`
    } else if (qLevel === 6){
        imageSrc = `img/item/unique/${image}.png`
    }



    if (name === 'random') {
        const nameGenTypes = ['normal', 'normal', 'magic', 'rare', 'legendary', 'mythic'];
        name = rpgItemGen.createItem(type, nameGenTypes[qLevel]);
    }

   

    const valueMin = qLevel * 5 + 1;
    const valueMax = valueMin + valueMin*2;
    let sellValue = ranNum(valueMin, valueMax);

    // Unique items are qLevel 6
    if (qLevel === 6) {
        sellValue *= 20;
    }
    
    // Create effects
    // if item is not unique, create random effects
    //let effects = [];
    if (effects === 'random') {
        effects = createItemEffects(type, isWeapon, qLevel);
    }
   
/*
    let effectAmount = ranNum(0, 2) 
    for (let i=0; i<effectAmount; i++) {
    }
*/

    // If item has IncreasedValue effect, apply it
    for (const eff of effects) {
        if (eff.name === 'IncreasedValue') {
            sellValue += Math.floor( sellValue * (eff.value/100) );
        }
    }

    let item = new Item(name, type, isWeapon, imageSrc, qLevel, sellValue, effects, locked, flavor);
    return item;
}






const createEnemy = () => {
    const node = mapData.nodes[mapData.currentNode];
    const diff = node.difficulty;
    const nodeEnemies = node.enemies;
    const selectedEnemy = selectFrom(nodeEnemies)
    const data = enemies[selectedEnemy];
   

    enemy.dead = false;
    enemy.type = data.type;
    enemy.xp = Math.floor(diff * 5);
    //enemy.name = heroGen.getName();
    enemy.name = toTitleCase(selectedEnemy);
    enemy.title = heroGen.getName();
   
    //const imageNum = ranNum(1, settings.enemyImageAmount);
    //enemy.image = `img/creature/creature (${imageNum}).jpg`;
    const selectedImage = selectFrom(enemies[selectedEnemy].imgs);
    enemy.image = `img/creature/${selectedImage}.jpg`;
   
    //log(diff);

    enemy.hp.max = ranNum(settings.enemy.hp.min*diff, settings.enemy.hp.max*diff);
    
    
    enemy.lootItem = createItem();
  




 
    // Create boss enemy
    let boss = false;
    if (chance(5) && player.kills > 50 && diff >= 3) {
        boss=true; 
    }

    
    if (boss) {
        enemy.hp.max = enemy.hp.max*10;
        enemy.xp *= 10;
        //const createItem = (type='random', qLevel='random')
        enemy.lootItem = createItem('random', ranNum(4,5) );
        enemy.name = enemy.title;
        msg(`Elite: <span class='enemy'>${enemy.title}</span>`);
    }

    // Unique roll: 
    for (let i=0; i<node.uniques.length; i++) {
        const name = Object.keys(node.uniques[i])[0];
        let dropRate = node.uniques[i][name] * (1 + player.magicFind);
        if (boss) {
            dropRate *= 1.5;
        }
        //log(dropRate)
        //dropRate = 1; //unique log debug
        //dropRate = dropRate * 100;//unique log debug
        if (chanceFrac(dropRate)) {
            enemy.lootItem = getUniqueItem(name);
        }
    }


    //enemy.lootItem = getUniqueItem('Celestial Blade'); //debug

    enemy.hp.current = enemy.hp.max;
}

const setEnemyStyle = () => {
    enemyNameElem.innerText = enemy.name;


    enemyTypeImage.src = `img/${enemy.type}.png`;
    enemyTypeElem.innerText = toTitleCase(enemy.type);



    enemyImageElem.style.backgroundImage = `url('${enemy.image}')`;

    let hp = (enemy.hp.current / enemy.hp.max) * 100;
    enemyHpBarMain.style.width = `${hp}%`;
    enemyHpBarBg.style.width = `${hp}%`;

    enemyHpCurrent.innerText = enemy.hp.current;
    enemyHpMax.innerText = enemy.hp.max;
}


const createLootItemLayers = () => {
    const pxInc = 5;

    for (let i=0; i<lootItemLayers.length; i++) {
        const elem = lootItemLayers[i];
        elem.style.backgroundImage = `url('${enemy.lootItem.imageSrc}')`;
        const zPos =  -(Math.floor(lootItemLayers.length / 2)) + i*pxInc;  //pxInc: between layer elements
        elem.style.transform = "translateZ(" + zPos + "px";

    }
}



const setLootItemStyle = () => {
   
    const rarityColor = itemQuality[enemy.lootItem.qualityLevel].color;
    lootItemNormalGlow.style.boxShadow = `${rarityColor} 0px 0px 50px 20px`; 

    //const imageLayers = document.querySelectorAll('#loot-container > .loot-item > .outer-wrap > .inner-wrap > .image');
    const front = lootItemLayers[0];
    const back = lootItemLayers[1];

    front.style.backgroundImage = `url('${enemy.lootItem.imageSrc}')`;
    back.style.backgroundImage = `url('${enemy.lootItem.imageSrc}')`;

    // Don't put outline shadows to low quality items
    if (enemy.lootItem.qualityLevel > 1) {
        front.style.filter = `drop-shadow(${rarityColor} 0px 0px 5px)`;
        back.style.filter = `drop-shadow(${rarityColor} 0px 0px 5px)`;
    } else {
        front.style.filter = 'none';
        back.style.filter = 'none';
    }

    lootItemName.innerText = enemy.lootItem.name;
    lootItemName.style.color = rarityColor;
}


const setViewerImage = item => {
    for (let i=0; i<viewerItemLayers.length; i++) {
        const pxInc = 2; //pxInc: between layers 
        const elem = viewerItemLayers[i];
        elem.style.backgroundImage = `url('${item.imageSrc}')`;
        const zPos =  -(Math.floor(viewerItemLayers.length / 2)) + i*pxInc;  
        elem.style.transform = "translateZ(" + zPos + "px";
    }

    const rarityColor = itemQuality[item.qualityLevel].color;
    viewerItemNormalGlow.style.boxShadow = `${rarityColor} 0px 0px 15px 15px`; 

    let shadow = `inset 0px -40px 40px 0px ${hexToRgbaStr(rarityColor, 0.2)}`;
    //shadow +=  `inset 0px -30px 30px 0px ${hexToRgbaStr(rarityColor, 0.5)}`;

    itemViewerContainer.style.boxShadow = shadow;

    
    //const imageLayers = document.querySelectorAll('#loot-container > .loot-item > .outer-wrap > .inner-wrap > .image');
    const front = viewerItemLayers[0];
    const back = viewerItemLayers[1];
    //log(front)
    //front.setAttribute('src', item.imageSrc)
    //back.setAttribute('src', item.imageSrc)

    // Don't put outline shadows to low quality items
    if (item.qualityLevel > 1) {
        front.style.filter = `drop-shadow(${rarityColor} 0px 0px 5px)`;
        back.style.filter = `drop-shadow(${rarityColor} 0px 0px 5px)`;
    } else {
        front.style.filter = 'none';
        back.style.filter = 'none';
    }
}


const flashInvIcon = () => {
    invIcon.classList.add('full');
    
    setTimeout(() => {
        invIcon.classList.remove('full');
    }, 100);
}

const setInvIcon = () => {
    if (player.inv.length >= player.invSlots) {
        invIcon.setAttribute('src', 'img/chest_full.png');
    } else {
        invIcon.setAttribute('src', 'img/chest.png');
    }
}

const takeLoot = () => {
    const item = enemy.lootItem;
    if (item.looted) { return false }

    if (player.inv.length >= player.invSlots) {
        // Inv is full, cant loot
        msg(`Inventory is full`);
        flashInvIcon(); // Move inv tab icon
        return false;
    }

    item.looted = true;
    //log(`Looted item: ${item.name} `);

    //add item to player inv
    player.inv.push(item);
    //msg(`Looted ${item.name}`);
    msg(`Looted <span style="color:${itemQuality[item.qualityLevel].color};">${item.name}</span>`);


    setItemToSlot(item, invSlots[player.inv.length-1], player.inv.length-1);


    // Change inv tab icon to open chest (item "goes" to chest)
    invIcon.setAttribute('src', 'img/chest_open.png');

    // Move item to inventory tab icon
    const itemPos = lootItemImage.getBoundingClientRect();
    const itemCenter = {
        x: itemPos.x + itemPos.width/2,
        y: itemPos.y + itemPos.height/2,
    }
    
    const invPos = invIcon.getBoundingClientRect();
    const invCenter = {
        x: invPos.x + invPos.width/2,
        y: invPos.y + invPos.height/2,
    }


    let moveY = (invCenter.y - itemCenter.y) * 1;
    let moveX = (invCenter.x - itemCenter.x) * 1;

    lootItemImage.style.transform = `translateY(${moveY}px) translateX(${moveX}px)  scale(0.2)`;
    //lootItemNameContainer.style.transform = `translateY(${invPos.y - itemPos.y}px) scale(0)`;
    lootItemNameContainer.style.transform = `translateY(${moveY}px) translateX(${moveX}px) scale(0)`;
    
    let animDuration = 200; //ms

    player.adventureLog.itemsLooted++;

    if (item.qualityLevel === 6) {
        player.uniqueLog[item.name] = true;
        setUniqueLog();

    }


    setTimeout(() => {
        createEnemy();
        setLootItemStyle();
        setEnemyStyle();
        // Show enemy elem
        enemyContainer.classList.remove('hidden');

        // Hide loot elem
        lootItemContainer.classList.add('hidden');

        // Restore loot item style
        lootItemImage.style.transform = 'translateY(0%) translateX(0%) scale(1)';
        lootItemNameContainer.style.transform = 'translateY(0%) translateX(0%) scale(1)';

        // Restore inv tab icon to closed chest
        setInvIcon()
        save();
      }, animDuration);
}

const setCombatView = () => {
    if (enemy.dead) {
        enemyContainer.classList.add('hidden');
        setTimeout(() => {
            // Show loot elem
            lootItemContainer.classList.remove('hidden');
        }, 300);
    } else {
        enemyContainer.classList.remove('hidden');
    }
}

const getXpToLevel = lvl => {
    let xp = lvl * 100;
    return xp;
}

const setXpToLevel = () => {
    characterNextLevelElem.innerText = (player.totalXp + player.xpToLevel).toLocaleString('EN');
    characterLevelElem.innerText = player.level;
}



const setXpBar = () => {
    let w = (player.xp/player.xpToLevel)*100;
    //w = w.toFixed(1);
    //log(player.xpToLevel)
    xpBarElem.style.width = `${w}%`;
    //log(`${w}%`)

    // Xp bar level number
    levelNumElem.innerText = player.level;  
    characterXpElem.innerText = player.totalXp.toLocaleString('EN'); 
}

const attackEnemy = (pos) => {
    // Return early to avoid possibly triggering death multiple times.
    if (enemy.dead) return false;

    let dmg = player.damage.base;
    dmg += player.damage.bonus;
    dmg += player.damage.typeBonus;
    
    // Multiply total damage with boost from STR points
    let dmgMultiFromStr = ((player.attributes.str-player.attributes.base) * 0.01) + 1;

    dmg *= dmgMultiFromStr;
    dmg = Math.floor(dmg);
    log(dmg)

    let attackAnim = animData.atk2;



    if ( chanceFrac(player.crit.chance/100) ) {
        dmg *= player.crit.multiplier;
        dmg = Math.floor(dmg);
        attackAnim = animData.atk2red;
        if (settings.critMessages) {
            msg(`Critical hit`);
        }
      
    }
    enemy.hp.current -= dmg;

   

    if (enemy.hp.current <= 0) {
        // Enemy is dead
        //log('Enemy is dead');
        //msg(`Defeated ${enemy.name}`);
        msg(`Defeated <span class='enemy'>${enemy.name}</span> <span class='xp'>${enemy.xp}xp</span>`);

        //msg(`Defeated <span class='enemy'>${enemy.name}</span>`);
        
        //msg(`<span class='xp'>${enemy.xp}xp</span>`);
        if (!settings.lowSpec) {
            playAnim(animData.explosion1, false, pos);
        }
  
        enemy.dead = true;
        player.kills++;
        player.addXp(enemy.xp)
        player.adventureLog.enemiesKilled++;

        // Hide enemy elem
      
        setCombatView();
        setAdventureLogElems();
     
    } else {
        //enemy is not dead yet
        if (!settings.lowSpec) {
            enemyImageContainer.classList.add('damaged');
            enemyDamageOverlay.classList.remove('hidden');
        }


        if (!settings.lowSpec) {
            playAnim(attackAnim, true, pos);
        }
        

        if (!settings.lowSpec) {
            setTimeout(() => {
                enemyImageContainer.classList.remove('damaged');
                enemyDamageOverlay.classList.add('hidden');
                //enemyHpBarContainer.classList.remove('damaged');
            }, 100);
        }
 
        
    }

    
    let hpLeftPercent = enemy.hp.current/enemy.hp.max*100;
    enemyHpBarMain.style.width = `${hpLeftPercent}%`;
    enemyHpBarBg.style.width = `${hpLeftPercent}%`;
    enemyHpCurrent.innerText = enemy.hp.current;


    save();
}



const showTabView = i => {
    for (const view of views) {
        view.classList.add('hidden');
    }
    views[i].classList.remove('hidden');

    // Set selected bottomTabs CSS
    for (const tab of bottomTabs) {
        tab.classList.remove('selected');
    }

    bottomTabs[i].classList.add('selected');
    player.tab = i;
    save();
}


const setListeners = () => {
    for (let i=0; i<bottomTabs.length; i++) {
        const tab = bottomTabs[i];
        tab.addEventListener('click', e => {
            showTabView(i);
        });
    }


    combatView.addEventListener('click', e => {
        //const x = e.clientX;
        //const y = e.clientY;
        //log(`x: ${x}, y: ${y}`);
    });

    // Disable long-tap context menu on mobile
    window.oncontextmenu = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
   };
    
    lootItemContainer.addEventListener('click', e => {
        //const x = e.clientX;
        //const y = e.clientY;
        takeLoot();
    });

    enemyContainer.addEventListener('click', e => {
        const x = e.clientX;
        const y = e.clientY;
        //log(`x: ${x}, y: ${y}`);
        const pos = {x:x, y:y}
        attackEnemy(pos);
    });


    invGrid.addEventListener('click', e => {
        if (e.target.getAttribute('data-empty') !== "true") {
            showInItemViewer(e.target);
         
        } else {
            clearInvSelection();
            clearItemViewer();
        }
    });


    sellSelectedButton.addEventListener('click', e => {
        const slot = document.querySelector('#inv-grid > .slot.selected');
        if (slot !== undefined && slot !== null && slot.getAttribute('data-empty') !== "true") {
            sellItem(slot.getAttribute('data-index'));
            setInvIcon();
            save();
        } else {
            msg('No item selected');
        }
    });

    

    sellAllButtonButton.addEventListener('click', e => {
        //msg(`Sold inventory items`);
        sellAll();
    });

    lockSelectedButton.addEventListener('click', e => {
        const slot = document.querySelector('#inv-grid > .slot.selected');
        if (slot !== undefined && slot !== null && slot.getAttribute('data-empty') !== "true") {
            //lock this elem
            lockItem(slot.getAttribute('data-index'));
        } else {
            msg('No item selected');
        } 
    });

    equipButton.addEventListener('click', e => {
        const slot = document.querySelector('#inv-grid > .slot.selected');
        if (slot !== undefined && slot !== null && slot.getAttribute('data-empty') !== "true") {
            equipItem(slot.getAttribute('data-index'), slot);
        } else {
            msg('No item selected');
        }
    });

    const equipmentSlotNames = Object.getOwnPropertyNames(player.equipment);

    for (let i=0; i<equipmentSlotNames.length; i++) {
        const slotImage = document.querySelector(`#equipment-container > .slot.${equipmentSlotNames[i]} .image-container `);

        //log(slotImage);

        slotImage.addEventListener('click', e => {
            unequipItem(equipmentSlotNames[i]);
        });

    }

    const menuButton = document.getElementById('menu-button');
    menuButton.addEventListener('click', e => {
        showMenu(true);
    });

    const settingsButton = document.querySelector('#menu > .button.settings');
    const helpButton = document.querySelector('#menu > .button.help');
    const aboutButton = document.querySelector('#menu > .button.about');

    settingsButton.addEventListener('click', e => {
        showModal('settings');
    });

    helpButton.addEventListener('click', e => {
        showModal('help');
    });

    aboutButton.addEventListener('click', e => {
        showModal('about');
    });


    /* Game settings */
    // Low-spec
    document.getElementById('low-spec-setting').addEventListener('click', e => {
        settings.lowSpec = e.target.checked; 
        save();      
    });
    // Crit messages
    document.getElementById('crit-messages-setting').addEventListener('click', e => {
        log (typeof e.target.checked)
        settings.critMessages = e.target.checked; 
        save();       
    });
    //Auto-lock uniques
    document.getElementById('lock-uniques-setting').addEventListener('click', e => {
        settings.autoLockUniques = e.target.checked; 
        save();       
    });

    /* Character view */
    // Attribute "+" buttons
    const plusStr = document.querySelector('#attributes > .item.str > .plus-cont > .plus');
    const plusDex = document.querySelector('#attributes > .item.dex > .plus-cont > .plus');
    const plusInt = document.querySelector('#attributes > .item.int > .plus-cont > .plus');

    plusStr.addEventListener('click', e => {
        player.addAttribute('str');
    });

    plusDex.addEventListener('click', e => {
        player.addAttribute('dex');
    });

    plusInt.addEventListener('click', e => {
        player.addAttribute('int');
    });

    // Attribute "Repsec" button
    const respecAttributesButton = document.querySelector('#available-points-cont > .respec-cont > .respec');
    respecAttributesButton.addEventListener('click', e => {
        respecAttributes();
    });

    const closeItemModalButton = document.querySelector('#item-modal > .content > .button-container > .button.close');
    closeItemModalButton.addEventListener('click', e => {
        closeItemModal();
    });

    const imageViewerImage = document.querySelector('#item-viewer > .image-container');
    imageViewerImage.addEventListener('click', e => {
        //if item is selected in inv, open it in item modal
        const selectedItem = document.querySelector('#inv-grid > .slot.selected');
        if (selectedItem !== null) {
            openItemModal();
        }
    });


}


const clearInvSelection = () => {

    const prevSelection = invGrid.querySelector('.slot > .item.selected');

    const prevSelectionSlot = invGrid.querySelector('.slot.selected');

    if (prevSelection !== null) {
        prevSelection.classList.remove('selected');
    }

    if (prevSelectionSlot !== null) {
        prevSelectionSlot.classList.remove('selected');
        
    itemViewerContainer.style.boxShadow = `inset  0px -30px 30px 0px rgba(0,0,0, 0.5)`;
    }
}

const showInItemViewer = (elem) => {
    const invI = elem.getAttribute('data-index');
    const itemI = elem.getAttribute('data-item-index');

    // Remove previous selection
    clearInvSelection();

    // Highlight selected inv slot
    const invElem = elem.querySelector('.item')
    invElem.classList.add('selected');
    elem.classList.add('selected');


    const item = player.inv[itemI];

    if (item === undefined) {
        // no items left in inv
        // likely because we equipped the only item in inv
        clearItemViewer();
        return false;
    }


    const name = item.name;
    itemViewerName.innerText = name;
    itemViewerName.style.color = itemQuality[item.qualityLevel].color;

    let type = item.type;
    if (type === 'artifact') { type = 'talisman'; }
    //log(item.type)
    itemViewerQualityTitle.innerText = itemQuality[item.qualityLevel].name;
    itemViewerTypeTitle.innerText = type;

    itemViewerSellValue.innerText = item.sellValue;

    // Clear previous effects
    itemViewerEffectsContainer.innerHTML = '';
    for (const effect of item.effects) {
        const effectElem = document.createElement('div');
        effectElem.classList.add('effect');
        let symbol = '◆'; // • ♦ ◆ ⟐
        effectElem.innerText = `${symbol} ${effect.text}`;
        itemViewerEffectsContainer.append(effectElem);
    }

    itemViewerFlavorContainer.innerText = item.flavor;


    setViewerImage(item);

    itemViewerSellValueContainer.classList.remove('hidden');
    itemViewerImage.classList.remove('hidden');
    itemViewerBottomShadow.classList.remove('hidden');
}

const clearItemViewer = () => {
    itemViewerName.innerText = '';
    itemViewerQualityTitle.innerText = '';
    itemViewerTypeTitle.innerText = '';
    itemViewerEffectsContainer.innerHTML = '';
    itemViewerFlavorContainer.innerHTML = '';
    itemViewerSellValueContainer.classList.add('hidden');
    itemViewerImage.classList.add('hidden');
    itemViewerBottomShadow.classList.add('hidden');
    
}

/*

>When attacking enemy:
-Create new canvas element with absolute positioning.
-Randomise canvas pos with a little offset (so all not stacked).
-Play sprisheet animation once.
-Remove canvas from DOM.


*/
const playAnim = (anim, offset=false, pos) => {
   


    // Create and insert new canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('anim-canvas');    
    canvas.width = anim.frameW;
    canvas.height = anim.frameH;

    const tres = 300;

    if (canvas.width < tres && canvas.height < tres) {
        canvas.width = tres;
        canvas.height = tres;
    }

    const enemyImg = enemyImageElem.getBoundingClientRect();
    //log(enemyImg)
 
    let x = enemyImg.x + enemyImg.width/2 - canvas.width/2;
    let y = enemyImg.y + enemyImg.height/2 - canvas.height/2;
    x = Math.floor(x);
    y = Math.floor(y);

    //x = Math.floor(pos.x)
    //y = Math.floor(pos.y)


    // Randomize animation position
    if (offset) {
        let amount = 50;
        x = ranNum(x-amount, x+amount);
        y = ranNum(y-amount, y+amount);
    }

    canvas.style.left = `${x}px`;
    canvas.style.top = `${y}px`;


    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    
    const animObj = {
        canvas: canvas,
        ctx: ctx,
        w: anim.frameW,
        h: anim.frameH,
        frames: anim.rows * anim.framesPerRow,
        frameDur: anim.frameDur,
        rows: anim.rows,
        framesPerRow: anim.framesPerRow,
        frame: 0,
        prevTime: 0,
        image: anim.image,
    }

    animate(animObj)
   
}


const animate =  (anim) => {
    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;
    let myReq;
    let finished = false;

    const canvas = anim.canvas;
    const ctx = anim.ctx
 
    let column = 0;


    const animationLoop = now => {

        //log('loop');

        if ( !finished ) {
            myReq = requestAnimationFrame(animationLoop);
        } else {
            //log('Finished animation.');
            cancelAnimationFrame(myReq);
            canvas.remove();
            return true;
        }
       
        const elapsed = now - anim.prevTime;

        //anim.prevTime = now;

  
        if (elapsed >= anim.frameDur) {
            anim.prevTime = now;
            anim.frame++;
            column++;

            //log(`anim.frame: <${anim.frame}>` );

            const row = Math.floor(anim.frame / anim.framesPerRow);
            if (anim.rows > 1 && anim.frame % anim.framesPerRow === 0) {
                column = 0;
            }

            //ctx.drawImage  (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
	        ctx.drawImage(anim.image, column*anim.w, row*anim.h, anim.w, anim.h, 0, 0, canvas.width, canvas.height);

            //log(`${column*anim.w}, ${row*anim.h}`)
            //log(`anim.frame: <${anim.frame}>, ${row*anim.h}`)
          
        }

        
        if (anim.frame >= anim.frames) {
            finished = true;
        }


       
    }

    // Request 1st frame to start animation loop
    myReq = animationLoop();
   



}



const createTestItems = (amount) => {
    for (let i=0; i<amount; i++) {
        let item = createItem();
        //item = createItem('artifact', 5);
        player.inv.push(item);
    }
}

// debug/cheat to give all unique items
const giveAllUniques = () => {
    const names = Object.getOwnPropertyNames(uniques);

    for (const name of names) {
        const item = getUniqueItem(name);
        if (player.inv.length < player.invSlots) {
            player.inv.push(item);
        }
    }
    setInvItems();
}


const createInvSlots = () => {
    for (let i=0; i<player.invSlots; i++) {
        const slotElem = document.createElement('div');
        slotElem.classList.add('slot');
        slotElem.setAttribute('data-empty', true);
        slotElem.setAttribute('data-index', i);

        const slotItem = document.createElement('div');
        slotItem.classList.add('item');

        const slotItemImage = document.createElement('img');
        slotItemImage.classList.add('image');
        slotItemImage.setAttribute('src', 'img/transp.png');
        slotItemImage.setAttribute('alt', 'inv slot');

        const statusIcon = document.createElement('div');
        statusIcon.classList.add('status-icon');
        statusIcon.classList.add('hidden');
      

        slotItem.append(slotItemImage);
        slotItem.append(statusIcon)
        slotElem.append(slotItem);
        invGrid.append(slotElem);
    }
    invSlots = document.querySelectorAll('#inv-grid > .slot');
}

const createEquipmentSlots = () => {
    const slotNames = Object.getOwnPropertyNames(player.equipment);
    //log(slotNames);
    const target = document.getElementById('equipment-container');
    
    for (let i=0; i<slotNames.length; i++) {
        const slotElem = document.createElement('div');
        const slotName = slotNames[i];
        slotElem.classList.add('slot');
        slotElem.classList.add(slotName);
        //slotElem.setAttribute('data-empty', true);
        //slotElem.setAttribute('data-index', i);

        const topRow = document.createElement('div');
        topRow.classList.add('top-row');

        const slotLabel = document.createElement('div');
        slotLabel.classList.add('label');
        let labelText;
        if (slotName === 'weapon') { labelText = 'WEP'; }
        if (slotName === 'amulet') { labelText = 'AMU'; }
        if (slotName === 'artifact') { labelText = 'TAL'; }
        slotLabel.innerText = labelText;
        const itemName = document.createElement('div');
        itemName.classList.add('name');

       
        topRow.append(itemName);
        //topRow.append(slotLabel);

        const mid = document.createElement('div');
        mid.classList.add('mid');
        mid.append(slotLabel);

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const imageCon = document.createElement('div');
        imageCon.classList.add('image-container');

        const image = document.createElement('img');
        image.classList.add('image');
        //image.setAttribute('src', 'img/transp.png');
        image.setAttribute('src', `img/empty_slot_${slotName}.png`);
        image.setAttribute('alt', 'equipment slot');

        imageCon.append(image);
     
        imageWrapper.append(imageCon);

    

        mid.append(imageWrapper);

        const effects = document.createElement('div');
        effects.classList.add('effects');
        mid.append(effects);

  
        slotElem.append(topRow);
        slotElem.append(mid);

        target.append(slotElem)
    }
}




const setItemToSlot = (item, slotElem, itemIndex) => {
    //log(item);

    //const name = item.name;
    const imageSrc = item.imageSrc;
    //const type = item.type;
    const qLevel = item.qualityLevel

    const slotItem = slotElem.querySelector('.item');
    slotElem.setAttribute('data-empty', false)

    // itemIndex is the index in player.inv
    slotElem.setAttribute('data-item-index', itemIndex)

    const boxShadowStr = `0px 0px 0px 1px ${itemQuality[qLevel].color}, 0px 0px 0px 4px rgba(0, 0, 0, 1), inset 0px 0px 5px 5px rgba(0,0,0,0.5), /* vignette */ 0px 0px 3px 3px rgba(0, 0, 0, 0.5)`;

    slotItem.style.boxShadow = boxShadowStr;

    //0px 0px 0px 1px rgba(0, 150, 0, 1), 0px 0px 0px 4px rgba(0, 0, 0, 1), inset 0px 0px 5px 5px rgba(0,0,0,0.5), /* vignette */ 0px 0px 10px 10px rgba(0, 0, 0, 0.5)

    const slotImageElem = slotElem.querySelector('.item > .image');
    //slotImageElem.style.backgroundImage = `url('${imageSrc}')`;
    slotImageElem.setAttribute('src', imageSrc);

    if (qLevel > 1) {
        slotImageElem.style.filter = `drop-shadow(${itemQuality[qLevel].color} 0px 0px 4px)`;
    } else {
        slotImageElem.style.filter = 'none';
    }

    const statusIcon =  slotElem.querySelector(' .item > .status-icon');

    if (item.locked) {
        statusIcon.classList.remove('hidden');
    } else {
        statusIcon.classList.add('hidden');
    }
}

const setInvItems = () => {
    const items = player.inv;

    for (let i=0; i<invSlots.length; i++) {
        const slot = invSlots[i];
        //slot.setAttribute('data-empty', 'true');
        clearInvSlot(i);
    }

    main: for (let i=0; i<items.length; i++) {
    
        search: for (let j=0; j<invSlots.length; j++) {
            const slot = invSlots[j];
            let isEmpty = slot.getAttribute('data-empty');
            //log(isEmpty)
            //log(`finding empty slot: ${j}`)
            if (isEmpty === 'true') {
                //log('setting item to slot')
                setItemToSlot(items[i], slot, i);
               
                slot.setAttribute('data-empty', false);
                break search;
            }
        }

    }
}



const clearInvSlot = i => {
    const slot = invSlots[i];
    slot.setAttribute('data-empty', true);

    const slotItem = slot.querySelector('.item');

    const defaultBoxShadow = '0px 0px 0px 1px rgb(100, 100, 100), 0px 0px 0px 4px rgba(0, 0, 0, 1), inset 0px 0px 5px 5px rgba(0,0,0,0.5), /* vignette */ 0px 0px';

    slotItem.style.boxShadow = defaultBoxShadow;

    const slotImage = slot.querySelector('.item > .image')
    slotImage.setAttribute('src', 'img/transp.png');

    const statusIcon =  slotItem.querySelector('.status-icon');
    statusIcon.classList.add('hidden');
    
}


const sellItemAnimation = (i) => {
    const slot = invSlots[i].getBoundingClientRect();
    const start = {
        x: slot.x + slot.width/2,
        y: slot.y + slot.height/2,
    }

    const target = playerGoldElem.getBoundingClientRect();
    const end = {
        x: target.x + target.width/2,
        y: target.y + target.height/2,
    }

    const moveY = Math.floor((end.y - start.y) * 1);
    const moveX = Math.floor((end.x - start.x) * 1);

    const elem = document.createElement('div');
    elem.classList.add('animated-gold-icon');

    //elem.style.transitionDelay( `${500 * counter}ms`);
    //elem.style = `"transitionDelay${500 * counter}ms"`;

    invSlots[i].append(elem);
    // Short delaye before animation
    // to have element inside the document
    // and have style attributes
    setTimeout(() => {
        elem.style.transform = `translateY(${moveY}px) translateX(${moveX}px)`;
     }, 0);
 

    setTimeout(() => {
       elem.remove();
    }, 500);
}

const sellItem = i => {
    // i is index in player inv
    const item = player.inv[i];
    if (item.locked) {
        return false
    }
    //msg(`Sold ${item.name}`);

    const sellValue = Math.floor(item.sellValue * (1+player.goldFind));


    addGold(sellValue);

    player.inv.splice(i, 1);
    clearInvSlot(i);
    clearInvSelection();
    clearItemViewer();
    setInvItems();

    if (!settings.lowSpec) {
        sellItemAnimation(i);
    }
    player.adventureLog.goldGained += sellValue;
    player.adventureLog.itemsSold++;
    setAdventureLogElems();
}

const sellAll = () => {
    invGrid.scrollTop = 0;
    let totalValue = 0;
    const lockedItems = []

    for (let i=player.inv.length-1; i>=0; i--) {
        const item = player.inv[i];

        if (!item.locked) {
            // Item is not locked, sell it
            totalValue += item.sellValue;
            player.inv.splice(i, 1);
            if (!settings.lowSpec) {
                sellItemAnimation(i);
            }
            player.adventureLog.itemsSold++;
        } else {
            lockedItems.push(item);
        }
    }

    player.inv = []
    for (let i=0; i<lockedItems.length; i++) {
        player.inv.push(lockedItems[i])
    }
    //reverse, because items were added from the end
    player.inv.reverse(); 

    clearInvSelection();
    clearItemViewer();
    setInvItems();

    totalValue =  Math.floor( totalValue * (1+player.goldFind) );
    addGold(totalValue);
    setInvIcon();

    player.adventureLog.goldGained += totalValue;
    setAdventureLogElems();
}


const runGoldAnim = (amount, add) => {
    let str, color;
    if (add) {
        str='+' ;
        color = 'lime';
    } else {
        str='-';
        color = 'red';
    }
   
    goldAnim.style.color = color;
    goldAnim.innerHTML = `${str}${amount}`;
    goldAnimContainer.style.transition = 'opacity 0s';
    goldAnimContainer.style.opacity = 1;

    setTimeout(() => {
        goldAnimContainer.style.transition = 'opacity 1s';
        goldAnimContainer.style.opacity = 0;
    }, 1000);
}


const lockItem = i => {
    // i is index in player inv
    const item = player.inv[i];
   
    if (!item.locked) {
        //lock item
        item.locked = true;
    } else {
        //item already locked, unlock it
        item.locked = false;
    }
    setInvItems();
    save();
}


const equipItem = (itemIndex, slotElem) => {
    const item = player.inv[itemIndex];

    let targetSlot;
    if (item.isWeapon) {
        targetSlot = 'weapon';
    } else if (item.type === 'amulet') {
        targetSlot = 'amulet';
    } else if (item.type === 'artifact') {
        targetSlot = 'artifact';
    }

    //log(item.type);

    // Check if slot has an item equipped already
    let prevItem = null;
    if (player.equipment[targetSlot] instanceof Item) {
        prevItem = player.equipment[targetSlot];

        // Put previously equipped item to equipped items place
        player.inv[itemIndex] = prevItem
    } else {
        // No previously equipped items, just remove form inv
        player.inv.splice(itemIndex, 1);
    }

    player.equipment[targetSlot] = item;
    //msg(`Equipped ${item.name}`);
    setInvItems();
    showInItemViewer(slotElem);
    setEquippedItemsStyle();
    setPlayerStats();
    save();
}


const unequipItem = slotName => {
    const item = player.equipment[slotName];
    if ( !(item instanceof Item)) {
        // Slot is empty, return early
        return false;
    }

    if (player.inv.length >= player.invSlots) {
        // Inv is full, cant unequip
        flashInvIcon();
        return false;
    }


    player.inv.push(item);
    player.equipment[slotName] = -1;

    setInvItems();
    setEquippedItemsStyle();
    setPlayerStats();
    save();
}


const setEquippedItemsStyle = () => {
    //const items = player.equipment;

    const slotNames = Object.getOwnPropertyNames(player.equipment);
    const slotCon = document.getElementById('equipment-container');


    for (let i=0; i<slotNames.length; i++) {

        const slot = slotCon.querySelector(`.slot.${slotNames[i]}`);
        clearEquipmentSlot(slot, slotNames[i]);
        const item = player.equipment[slotNames[i]];


        if (item instanceof Item) {
            const imageCon = slot.querySelector('.image-container');
            const image = imageCon.querySelector('img.image');
            image.setAttribute('src', item.imageSrc);

            const qLevel = item.qualityLevel;
            const color = itemQuality[qLevel].color;
            const boxShadowStr = `0px 0px 0px 1px ${color}, 0px 0px 0px 4px rgba(0, 0, 0, 1), inset 0px 0px 5px 5px rgba(0,0,0,0.5), /* vignette */ 0px 0px 3px 3px rgba(0, 0, 0, 0.5)`;
            imageCon.style.boxShadow = boxShadowStr;

            if (qLevel > 1) {
                image.style.filter = `drop-shadow(${color} 0px 0px 4px)`;
            } else {
                image.style.filter = 'none';
            }

            const nameElem = slot.querySelector('.name');
            nameElem.innerText = item.name;
            nameElem.style.color = color;

            const effectsCon = slot.querySelector('.effects');
            effectsCon.innerHTML = '';
            // Create effect list for item in equipment view
            for (const eff of item.effects) {
                const effElem = document.createElement('div');
                effElem.classList.add('effect');

                const symbol = '◆'; // •
                let text = `${symbol} ${eff.text}`;
                effElem.innerText = text;
                effectsCon.append(effElem);
            }


        } 
     
    }
    setPlayerStats();
}


const clearEquipmentSlot = (slot, slotName) => {
    slot.setAttribute('data-empty', true);
    const slotImageCon = slot.querySelector('.image-container');
    const slotItemName = slot.querySelector('.name');
    const slotItemEffects = slot.querySelector('.effects');

    const defaultBoxShadow = '0px 0px 0px 1px rgb(100, 100, 100), 0px 0px 0px 4px rgba(0, 0, 0, 1), inset 0px 0px 5px 5px rgba(0,0,0,0.5), /* vignette */ 0px 0px';
    slotImageCon.style.boxShadow = defaultBoxShadow;
    const slotImage = slotImageCon.querySelector('img.image');
    //slotImage.setAttribute("src", './img/transp.png');
    slotImage.setAttribute('src', `img/empty_slot_${slotName}.png`);
    slotImage.style.filter = 'none';

    slotItemName.innerText = '';
    slotItemEffects.innerHTML = '';
}


const respecAttributes = () => {
    const cost = 1000;

    let ptsUsed = 0;
    ptsUsed += player.attributes.str - player.attributes.base; 
    ptsUsed += player.attributes.dex - player.attributes.base; 
    ptsUsed += player.attributes.int - player.attributes.base; 

    if (ptsUsed === 0) {
        msg('No points used');
        return false;
    } else if (player.gold < cost) {
        msg('Not enough gold, need 1000');
        return false;
    } else {
        msg(`Attribute respec (-${cost} gold)`);
        addGold( Math.floor(-cost) );
        let ptsUnused = player.attributes.unusedPoints;
        player.attributes.str = player.attributes.base;
        player.attributes.dex = player.attributes.base;
        player.attributes.int = player.attributes.base;

        player.attributes.unusedPoints = ptsUnused + ptsUsed;
        setPlayerStats();
    }

}


const setAdventureLogElems = () => {
    enemiesKilledElem.innerText = player.adventureLog.enemiesKilled;
    itemsLootedElem.innerText = player.adventureLog.itemsLooted;
    itemsSoldElem.innerText = player.adventureLog.itemsSold;
    goldGainedElem.innerText = player.adventureLog.goldGained;
}

// Set player stats after equipping/unequipping items
const setPlayerStats = () => {

    // Set player attributes
    const unusedPoints = document.querySelector('#available-points-cont >  .points');
    unusedPoints.innerText = player.attributes.unusedPoints;

    const strElem = document.querySelector('#attributes > .item.str > .current');
    const dexElem = document.querySelector('#attributes > .item.dex > .current');
    const intElem = document.querySelector('#attributes > .item.int > .current');
    strElem.innerText = player.attributes.str;
    dexElem.innerText = player.attributes.dex;
    intElem.innerText = player.attributes.int;




    let bonusDamage = 0;
    let typeBonusDamage = 0;
    let critChanceBonus = 0;
    let critMultiplierBonus = 0;
    let magicFind = 0;
    let goldFind = 0;

    const slotNames = Object.getOwnPropertyNames(player.equipment);

    for (const name of slotNames) {
        const item = player.equipment[name];

        if (item instanceof Item) {
            // slot has an item equipped


            for (const eff of item.effects) {

                if (eff.name === 'DamageBonus') {
                    bonusDamage += eff.value;
                }

                if (eff.name === 'TypeDamageBonus') {
                    if (eff.type === player.equipment.weapon.type) {
                        typeBonusDamage += eff.value;
                    }
                }

                if (eff.name === 'CritChance') {
                    critChanceBonus += eff.value;
                }

                if (eff.name === 'CritDamage') {
                    // incoming value is percent, eg +5% crit damage
                    critMultiplierBonus += eff.value / 100;
                }

                if (eff.name === 'MagicFind') {
                    // incoming value is percent
                    magicFind += eff.value / 100;
                }

                if (eff.name === 'GoldFind') {
                    // incoming value is percent
                    goldFind += eff.value / 100;
                }

            }
                
        
            
        }
    
    }


    const dmgMultiFromStr = ((player.attributes.str-player.attributes.base) * 0.01) + 1;

    const critChanceFromDex = ((player.attributes.dex-player.attributes.base) * 0.25) + 0;
  
    const critDamageFromDex = ((player.attributes.dex-player.attributes.base) * 1.00) + 0;

    const magicFindFromInt = ((player.attributes.int-player.attributes.base) * 0.50) + 0;

    const goldFindFromInt = ((player.attributes.int-player.attributes.base) * 1.00) + 0;

    player.damage.bonus = bonusDamage;
    player.damage.typeBonus = typeBonusDamage;

    player.crit.chance = critChanceBonus + critChanceFromDex;
   
    player.crit.multiplier = critMultiplierBonus + player.crit.baseMultiplier + critDamageFromDex/100;

    player.magicFind = magicFind + magicFindFromInt/100;
    player.goldFind = goldFind + goldFindFromInt/100;


    const damageElem = document.querySelector('#player-stats .damage');
    const critChanceElem = document.querySelector('#player-stats .crit-chance');
    const critDamageElem = document.querySelector('#player-stats .crit-damage');
    const magicFindElem = document.querySelector('#player-stats .magic-find');
    const goldFindElem = document.querySelector('#player-stats .gold-find');

    // Total damage: base + item damage bonus + weapon type bonus
    let totalDamage = player.damage.base+player.damage.bonus+player.damage.typeBonus;
    // Multiply total damage with boost from STR points
    // This is also calculated when attacking enemy
    totalDamage *= dmgMultiFromStr;
    totalDamage = Math.floor(totalDamage);
    damageElem.innerText = totalDamage;

    critChanceElem.innerText = `${Math.floor(player.crit.chance)}%`;
    critDamageElem.innerText = `${Math.floor(player.crit.multiplier*100)}%` ;

    magicFindElem.innerText = `+${Math.floor(player.magicFind*100)}%` ;
    goldFindElem.innerText = `+${Math.floor(player.goldFind*100)}%` ;

    
    // Set damage boost percent from STR in attributes
    const charViewBonusDmg = document.querySelector('#attributes > .item.str > .details > .row > .dmg-bonus');
    charViewBonusDmg.innerText = `+${(player.attributes.str-player.attributes.base)}%` ;
    

    // Set total damage in attributes (STR section)
    const charViewTotalDamage = document.querySelector('#attributes > .item.str > .details > .row > .dmg');
    charViewTotalDamage.innerText = totalDamage ;

    // Set crit chance boost from DEX in attributes
    const charViewCritChance = document.querySelector('#attributes > .item.dex > .details > .row > .crit-chance-bonus');
    charViewCritChance.innerText = `+${critChanceFromDex.toFixed(2)}%` ;

    // Set crit damage boost from DEX in attributes
    const charViewCritDamage = document.querySelector('#attributes > .item.dex > .details > .row > .crit-dmg-bonus');
    charViewCritDamage.innerText = `+${critDamageFromDex}%` ;

    // Set magic find boost from INT in attributes
    const charViewMagicFind = document.querySelector('#attributes > .item.int > .details > .row > .magic-find-bonus');
    charViewMagicFind.innerText = `+${magicFindFromInt.toFixed(0)}%`;

    // Set gold find boost from INT in attributes
    const charViewGoldFind = document.querySelector('#attributes > .item.int > .details > .row > .gold-find-bonus');
    charViewGoldFind.innerText = `+${goldFindFromInt.toFixed()}%`;

    setAdventureLogElems();
}



const setAnimImages = () => {
    const animNames = Object.getOwnPropertyNames(animData);
    for (const animName of animNames) {
        const anim = animData[animName];
        const img = new Image();
        img.src = anim.imageSrc;
        anim.image = img;
    }
}

const setMap = () => {
    const w = settings.map.w;
    const h = settings.map.h;

    const mapBg = document.getElementById('map-background');
    //mapBg.setAttribute('src', mapData.bg);
    mapBg.setAttribute( 'src', `${ createMapBg() } `);

    

    const mapElem = document.getElementById('map');
    mapElem.style.width = `${w}px`;
    mapElem.style.height = `${h}px`;

    //log(mapElem)
    //map.style.background-image
}

const createUniqueLog = () => {
    const target = document.querySelector('#unique-log > .list');
    //log(target)

    let items = Object.getOwnPropertyNames(uniques);
    items.sort();

    //log(items)

    const foundUniquesElem = document.querySelector('#unique-log > .info > .found-amount');
    foundUniquesElem.innerText = player.adventureLog.uniquesFound;

    const totalUniquesElem = document.querySelector('#unique-log > .info > .total-amount');
    totalUniquesElem.innerText = items.length;

 
    

    for (let i=0; i<items.length; i++) {
        const item = items[i];
        //log(item)

        if (player.uniqueLog && player.uniqueLog[item]) {
            player.uniqueLog[item] = true;

        } else {
            player.uniqueLog[item] = false;
        }
      

        //check if player has uniques in inv or equips

        const elem = document.createElement('div');
        elem.classList.add('item');
        elem.setAttribute('data-name', item);

        elem.innerText = '???';

        target.append(elem);

    }

    //log(player.uniqueLog)
    setUniqueLog();

    const uniqueLogItems = document.querySelectorAll('#unique-log > .list > .item');
    for (const item of uniqueLogItems) {
        item.addEventListener('click', e => {
            if (e.target.classList.contains('found')) {
                openItemModal();
            }
      
        });
    }

}

//set found items visible in the DOM
const setUniqueLog = () => {
    const elems = document.querySelectorAll('#unique-log > .list > .item')
   //log(elems);

   let uniquesFound = 0;

    for (let i=0; i<elems.length; i++) {
        const elem = elems[i];
        const itemName = elem.getAttribute('data-name');
        //log(itemName)
        if (player.uniqueLog[itemName] === true) {
            elem.innerText = itemName;
            elem.classList.add('found');
            uniquesFound++;
        }
    }

    const foundUniquesElem = document.querySelector('#unique-log > .info > .found-amount');
    foundUniquesElem.innerText = uniquesFound;
}


const openItemModal = () => {
    const elem = document.getElementById('item-modal');
    elem.classList.remove('hidden');

}

const closeItemModal = () => {
    const elem = document.getElementById('item-modal');
    elem.classList.add('hidden');
}

// Set item modal content
const setItemModal = () => {
    
}


const initNewGame = () => {
    showMenu(false);

    mapData.currentNode = 0;
    mapData.selectedNode = -1;
    setMapNodeStyles()
    //moveToNode(0);

    createEnemy();
    setEnemyStyle();
    setLootItemStyle();
  
    player = new Player();
    player.xpToLevel = getXpToLevel(player.level);
    levelNumElem.innerText = player.level;
    setXpBar();
    setXpToLevel();

    //createTestItems(20); 

    setInvItems();
    setPlayerStats();
    setEquippedItemsStyle();



    showTabView(0);
    save();
}

preloadImages(imagesToPreload).then(function(imgs) {
    setAnimImages();
    createInvSlots();
    createEquipmentSlots();
  
    if ( saveExists() ) {
        // load save
        loadSave();
        setLootItemStyle();
        setCombatView();
        playerGoldElem.innerText = player.gold;

    } else {
        //start new game
        initNewGame()
        //createTestItems(10);  //debug
    }

    setEnemyStyle()
    setInvItems();
    setEquippedItemsStyle();
    setPlayerStats();
    setInvIcon()
    setListeners();

    setMap();
    setMapNodeStyles()

    //const enemyW = enemyImageElem.clientWidth;
    //enemyHpBarContainer.style.width = `${enemyW+50}px`

    showTabView(player.tab);

    player.xpToLevel = getXpToLevel(player.level);
    levelNumElem.innerText = player.level;
    setXpBar();
    setXpToLevel();
    setSettingsCheckboxes()
    createUniqueLog();

    //save();

    //setUniqueListInMenu();

    //showMenu(); //debug
    //showModal('settings'); //debug
   

}, function(errImg) {
    // at least one image failed to load
    log("ERROR: failed to preload image: " + errImg);
});