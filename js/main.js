// main.js


const bottomTabs = document.querySelectorAll('#bottom-bar > .tab');
const invIcon = document.querySelector('#bottom-bar > .tab.inv > img');

const views = document.querySelectorAll('#view-container > .view');
const combatView = document.querySelector('#view-container > .combat.view');


const lootItemContainer = document.getElementById('loot-container');
const lootItemImage = document.querySelector('.loot-item');
const lootItemNameContainer = document.getElementById('loot-name-container');
const lootItemName = document.getElementById('loot-name');
const lootItemLayers = document.querySelectorAll('#loot-container > .loot-item > .outer-wrap > .inner-wrap > .image');
const lootItemNormalGlow = document.querySelector('.item-normal-glow');

const enemyContainer = document.getElementById('enemy-container');
const enemyNameElem = document.getElementById('enemy-name');
const enemyImageContainer = document.getElementById('enemy-image-container');
const enemyImageElem = document.getElementById('enemy-image');

const enemyHpBarContainer = document.getElementById('enemy-hp-bar-container');
const enemyHpBarMain = document.querySelector('#enemy-hp-bar-container > .bar.main');
const enemyHpBarBg = document.querySelector('#enemy-hp-bar-container > .bar.bg');

const enemyHpCurrent = document.querySelector('#enemy-hp-bar-container > .hp-container > .current');
const enemyHpMax = document.querySelector('#enemy-hp-bar-container > .hp-container > .max');


const invGrid = document.getElementById('inv-grid');
let invSlots; // set in createInvSlots() function

const itemViewerName = document.querySelector('#item-viewer > .name-container > .name');

const itemViewerQualityTitle = document.querySelector('#item-viewer > .name-container > .type-container > .quality-title');

const itemViewerTypeTitle = document.querySelector('#item-viewer > .name-container > .type-container > .type');

const itemViewerSellValueContainer = document.querySelector('#item-viewer > .name-container > .type-container > .value-container');
const itemViewerSellValue = document.querySelector('#item-viewer > .name-container > .type-container > .value-container > .value');

const itemViewerEffectsContainer = document.querySelector('#item-viewer > .name-container > .effects-container');

//const viewerItemContainer = document.getElementById('loot-container');
//const viewerItemImage = document.querySelector('.loot-item');
const itemViewerImage = document.querySelector('#item-viewer > .image-container > .viewer-item');

const itemViewerBottomShadow = document.querySelector('#item-viewer > .image-container > .viewer-item > .item-bottom-shadow-container');

const viewerItemLayers = document.querySelectorAll('#item-viewer > .image-container > .viewer-item > .outer-wrap > .inner-wrap > .image');
const viewerItemNormalGlow = document.querySelector('#item-viewer > .image-container > .viewer-item > .outer-wrap > .inner-wrap > .item-normal-glow-container > .item-normal-glow');


const playerGoldElem = document.querySelector('#gold-container > .gold-amount-container > .gold-amount');
const goldAnimContainer = document.querySelector('#gold-container > .gold-anim-container');
const goldAnim = document.querySelector('#gold-container > .gold-anim-container > .gold-anim');

const modal = document.getElementById('modal-container');


let enemy = {
    name:-1,
    dead: false,
    hp: {
        max: settings.enemyMaxHp,
        current:settings.enemyMaxHp,
    },
    lootItem:{},
    image:-1,
}

class Player {
    constructor() {
        this.invSlots = 30,
        this.inv = [],
        this.gold = 0,
        this.goldFind = 0; 
        this.kills = 0,
        this.tab = 0,
    
        this.damage = {
            base: 10,
            bonus: 0,
            typeBonus:0,
        },
    
        this.crit = {
            chance: 0,
            multiplier: 1.5,
            baseMultiplier: 1.5
        },
    
        this.equipment =  {
            weapon: -1,
            amulet: -1,
            artifact: -1
        }
    

    }


}

let player = new Player();

const addGold = amount => {
    player.gold += amount;
    playerGoldElem.innerText = player.gold;
    runGoldAnim(amount, true);
}


const itemQuality = [
    // gray, white, green, blue, purple, orange
    {name:'Weak', color:'#9d9d9d'}, 
    {name:'Common', color:'#e6e6e6'}, 
    {name:'Uncommon', color:'#1eff00'}, 
    {name:'Rare', color:'#0073e6'},  // wowBlue: 0070dd
    {name:'Epic', color:'#a335ee'}, 
    {name:'Legendary', color:'#ff8000'}, 
]



class Item {
    constructor(name, type, isWeapon, imageSrc, qLevel, sellValue, effects) {
        this.name = name;
        this.type = type;
        this.isWeapon = isWeapon;
        this.imageSrc = imageSrc;
        this.qualityLevel = qLevel;
        this.sellValue = sellValue;
        this.effects = effects;
        this.looted = false;
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




const createItemEffects = (type, isWeapon, qLevel) => {
    const weaponTypes = [ 'axe', 'bow', 'hammer', 'mace', 'spear', 'staff', 'sword'];

    let effects = []

    if (isWeapon) {
        let min = 1;
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

    if (chance(50 + qLevel*3) && !isWeapon) {
        const min = 1;
        const max = (qLevel+1)*4 ;

        const forType = selectFrom(weaponTypes);
        const eff = new TypeDamageBonus(ranNum(min, max), forType);
        effects.push(eff);
    }


    if (chance(50 + qLevel*3)) {
        const min = 1;
        const max = (qLevel+1)*2 ;

        const forType = selectFrom(weaponTypes);
        const eff = new CritChance(ranNum(min, max));
        effects.push(eff);
    }



    if (chance(50 + qLevel*3)) {
        const min = 5;
        const max = (qLevel+1)*5 ;
        const eff = new CritDamage(ranNum(min, max));
        effects.push(eff);
    }

    if (chance(50) && !isWeapon) {
        const min = 5;
        const max = (qLevel+1)*5 ;
        const eff = new GoldFind(ranNum(min, max));
        effects.push(eff);
    }

    if (chance(50) && qLevel > 2) {
        let min = 5;
        let max = 50;
        let percent = ranNum(min, max);
        const effect = new IncreasedValue(percent);
        effects.push(effect);
    }
    return effects;
}


const createItem = () => {
    const others = ['amulet', 'artifact'];
    const weapons = [ 'axe', 'bow', 'hammer', 'mace', 'spear', 'staff', 'sword'];
    const types = others.concat(weapons);
    let type = selectFrom(types);
    //type = 'artifact'; //testing names

    const isWeapon = weapons.includes(type);
    //log(`${type} isWeapon: ${isWeapon}`)

    

    const imageSrc = `img/item/${type}${ranNum(1, itemImageAmounts[type])}.png`

    let qLevel = 0;
    if (chance(2)) {
        qLevel = 5;
    } else if (chance(5)) {
        qLevel = 4;
    } else if (chance(10)) {
        qLevel = 3;
    } else if (chance(20)) {
        qLevel = 2;
    } else if (chance(30)) {
        qLevel = 1;
    }      



    const nameGenTypes = ['normal', 'normal', 'magic', 'rare', 'legendary', 'mythic'];
    const name = rpgItemGen.createItem(type, nameGenTypes[qLevel]);
    
    
    const valueMin = qLevel * 5 + 1;
    const valueMax = valueMin + valueMin*2;
    let sellValue = ranNum(valueMin, valueMax);
    
    // Create effects
    const effects = createItemEffects(type, isWeapon, qLevel);
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

    const item = new Item(name, type, isWeapon, imageSrc, qLevel, sellValue, effects)
    return item;
}





const createEnemy = () => {
    enemy.dead = false;
    enemy.name = heroGen.getName();;
   
    const imageNum = ranNum(1, settings.enemyImageAmount);
    enemy.image = `img/creature/creature (${imageNum}).jpg`;
 

    enemy.hp.max = settings.enemyMaxHp;

    // Create boss enemy
    if (chance(5) && player.kills > 50) {
        enemy.hp.max = settings.enemyMaxHp*10
    }
    enemy.hp.current = enemy.hp.max;
    enemy.lootItem = createItem();
}

const setEnemyStyle = () => {
    enemyNameElem.innerText = enemy.name;
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
    //createLootItemLayers();

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


const takeLoot = () => {
    const item = enemy.lootItem;
    if (item.looted) { return false }
    if (player.inv.length >= player.invSlots) {
        // Inv is full, cant loot
        flashInvIcon(); // Move inv tab icon
        return false;
    }

    item.looted = true;
    //log(`Looted item: ${item.name} `);

        //add item to player inv
    player.inv.push(item);

    setItemToSlot(item, invSlots[player.inv.length-1], player.inv.length-1);





    // Change inv tab icon to open chest (item "goes" to chest)
    invIcon.setAttribute('src', 'img/chest_open.png');

    
    const itemPos = lootItemImage.getBoundingClientRect();
    const invPos = invIcon.getBoundingClientRect();


    let moveAmount = (invPos.y - itemPos.y) * 0.7;

    lootItemImage.style.transform = `translateY(${moveAmount}px) scale(0)`;
    lootItemNameContainer.style.transform = `translateY(${moveAmount}px) scale(0)`;
    
    let animDuration = 200; //ms

    setTimeout(() => {
        createEnemy();
        setLootItemStyle();
        setEnemyStyle();
        // Show enemy elem
        enemyContainer.classList.remove('hidden');

        // Hide loot elem
        lootItemContainer.classList.add('hidden');

        // Restore loot item style
        lootItemImage.style.transform = 'translateY(0%) scale(1)';
        lootItemNameContainer.style.transform = 'translateY(0%) scale(1)';

        // Restore inv tab icon to closed chest
        invIcon.setAttribute('src', 'img/chest.png');
        save();
      }, animDuration);
}


const attackEnemy = (pos) => {
    // Return early to avoid possibly triggering death multiple times.
    if (enemy.dead) return false;

    let dmg = player.damage.base;
    dmg += player.damage.bonus;
    dmg += player.damage.typeBonus;

    let attackAnim = animData.atk2;


    if ( chance(player.crit.chance) ) {
        dmg *= player.crit.multiplier;
        dmg = Math.floor(dmg);
        attackAnim = animData.atk2red;
    }
    enemy.hp.current -= dmg;

    let hpLeftPercent = enemy.hp.current/enemy.hp.max*100;
    enemyHpBarMain.style.width = `${hpLeftPercent}%`;
    enemyHpBarBg.style.width = `${hpLeftPercent}%`;

    enemyHpCurrent.innerText = enemy.hp.current;


    if (enemy.hp.current <= 0) {
        // Enemy is dead
        //log('Enemy is dead');
        playAnim(animData.explosion1, false, pos);
        enemy.dead = true;
        player.kills++;

        // Hide enemy elem
        enemyContainer.classList.add('hidden');


        setTimeout(() => {
            // Show loot elem
            lootItemContainer.classList.remove('hidden');
            
        }, 300);



    } else {
        // Set hp bar or something here, enemy is not dead yet
        enemyImageContainer.classList.add('damaged');
        enemyHpBarContainer.classList.add('damaged');

        //let attackAnim = animData.impact1;
        //attackAnim = animData.atk2;
        playAnim(attackAnim, true, pos);

        
        setTimeout(() => {
            enemyImageContainer.classList.remove('damaged');
            enemyHpBarContainer.classList.remove('damaged');
        }, 200);
        
    }

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
        log(`x: ${x}, y: ${y}`);
        const pos = {x:x, y:y}
        attackEnemy(pos);
    });


    invGrid.addEventListener('click', e => {
        if (e.target.getAttribute('data-empty') !== "true") {
            showInItemViewer(e.target)
        } else {
            clearInvSelection();
            clearItemViewer();
        }
    });

    const sellSelected = document.getElementById('sell-selected');
    sellSelected.addEventListener('click', e => {
        const slot = document.querySelector('#inv-grid > .slot.selected');
        if (slot !== undefined && slot !== null && slot.getAttribute('data-empty') !== "true") {
            sellItem(slot.getAttribute('data-index'));
        }
    });

    const sellAllButton = document.getElementById('sell-all');
    sellAllButton.addEventListener('click', e => {
        sellAll();
    });

    
    const equipButton = document.getElementById('equip-selected');
    equipButton.addEventListener('click', e => {
        const slot = document.querySelector('#inv-grid > .slot.selected');
        if (slot !== undefined && slot !== null && slot.getAttribute('data-empty') !== "true") {
            equipItem(slot.getAttribute('data-index'), slot);
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
    
    const help = document.querySelector('#menu > .button.help')
    const about = document.querySelector('#menu > .button.about')

    help.addEventListener('click', e => {
        showModal('help');
    });

    about.addEventListener('click', e => {
        showModal('about');
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

    if(item === undefined) {
        // not items left in inv
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
        const item = createItem();
        player.inv.push(item);
    }
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

        slotItem.append(slotItemImage);
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
}


const sellItem = i => {
    // i is index in player inv
    const item = player.inv[i];
    let sellValue = item.sellValue;
    sellValue += sellValue * player.goldFind;
    log(sellValue)

    addGold( Math.floor(sellValue) );
    player.inv.splice(i, 1);
    clearInvSlot(i);
    clearInvSelection();
    clearItemViewer();
    setInvItems();
}

const sellAll = () => {
    //log('trying to sell all items')
    invGrid.scrollTop = 0;
    for (let i=player.inv.length-1; i>=0; i--) {
       
        let time = Math.abs(i - player.inv.length) * 1;
   
        setTimeout(() => {
            sellItem(i);
          }, time);
   
    }
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
    }, 100);
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




// Set player stats after equipping/unequipping items
const setPlayerStats = () => {
    let bonusDamage = 0;
    let typeBonusDamage = 0;
    let critChanceBonus = 0;
    let critMultiplierBonus = 0;
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

                if (eff.name === 'GoldFind') {
                    // incoming value is percent
                    goldFind += eff.value / 100;
                }

            }
                
         



            
        }
    
    }

    player.damage.bonus = bonusDamage;
    player.damage.typeBonus = typeBonusDamage;

    player.crit.chance = critChanceBonus;
    player.crit.multiplier = critMultiplierBonus + player.crit.baseMultiplier;

    player.goldFind = goldFind;


    const damageElem = document.querySelector('#player-stats-container .damage');
    const critChanceElem = document.querySelector('#player-stats-container .crit-chance');
    const critDamageElem = document.querySelector('#player-stats-container .crit-damage');
    const goldFindElem = document.querySelector('#player-stats-container .gold-find');

    const totalDamage = player.damage.base+player.damage.bonus+player.damage.typeBonus;
    damageElem.innerText = totalDamage;

    critChanceElem.innerText = `${player.crit.chance}%`;
    critDamageElem.innerText = `${player.crit.multiplier*100}%` ;

    goldFindElem.innerText = `${Math.floor(player.goldFind*100)}%` ;

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

const initNewGame = () => {
    showMenu(false);
    createEnemy();
    setEnemyStyle();
    setLootItemStyle();

    player = new Player();

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
    } else {
        //start new game
        initNewGame()
        createTestItems(20);  //debug
    }

    setEnemyStyle()

  

    setInvItems();
    setEquippedItemsStyle();
    setPlayerStats();
    setListeners();

    //const enemyW = enemyImageElem.clientWidth;
    //enemyHpBarContainer.style.width = `${enemyW+50}px`

    showTabView(player.tab);

    save();

}, function(errImg) {
    // at least one image failed to load
    log("ERROR: failed to preload image: " + errImg);
});