// main.js

const enemy = {
    //name:'Enemy Name JS',
    dead: false,
    hp: {
        max: settings.enemyMaxHp,
        current:settings.enemyMaxHp,
    },
    lootItem:{},
}

const player = {
    invSlots: 30,
    inv:[],
    gold:0,

    baseDamage: 40,
    damage: 40,

    crit: {
        chance: 0,
        multiplier: 1.5,
        baseMultiplier: 1.5
    },


    equipment: {
        weapon: -1,
        amulet: -1,
        artifact: -1
    },

    addGold: amount => {
        player.gold += amount;
        playerGoldElem.innerText = player.gold;
        runGoldAnim(amount, true);
    },
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
    constructor(name, type, src, isWeapon) {
        this.name = name;
        this.imageSrc = src;
        this.looted = false;

        this.type = type;
        this.isWeapon = isWeapon;
        this.sellValue = 10;

        // Rarity: grey, white, green, blue, purple, orange, 
        this.qualityLevel = this.createQualityLevel();
        this.effects = [];
        this.createEffect();
    }

    // const nameKeywords = ['normal', 'normal', 'magic', 'rare', 'legendary', 'mythic'];
    // ranNum(0, itemQuality.length-1);
    createQualityLevel() {
        // 0-5
        let lvl = 0;

        if (chance(2)) {
            lvl = 5;
        } else if (chance(5)) {
            lvl = 4;
        } else if (chance(10)) {
            lvl = 3;
        } else if (chance(20)) {
            lvl = 2;
        } else if (chance(30)) {
            lvl = 1;
        }
                
        return lvl;
    }

    createEffect() {
        const type = this.type;



        if (this.isWeapon) {

            let min = 1;
            if (this.qualityLevel > 1) { min += 10;}
            let max = (this.qualityLevel+1)*10 ;
            const effect = new DamageBonus(ranNum(min, max));
            this.effects.push(effect);

        } else if (type === 'amulet') {

        } else if (type === 'artifact') {

        } else if (type === 'potion') {
            
        }

        if (chance(50) && this.qualityLevel > 2) {
            let min = 5;
            let max = 50;
            let percent = ranNum(min, max);
            const effect = new IncreasedValue(percent);
            this.effects.push(effect);
            this.sellValue = Math.floor( this.sellValue * (1+(percent/100)) );
            //log(this.sellValue)
        }
        
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
        this.text = `Damage +${dmg}`;

    }
}


class IncreasedValue extends Effect {
    constructor(percent) {
        super('IncreasedValue');
        this.value = percent;
        this.text = `Increased value: +${percent}%`;

    }
}


/*
WoW item quality: https://wowpedia.fandom.com/wiki/Quality
Poor	157	157	157	0.62	0.62	0.62	#9d9d9d	Gray
Common	255	255	255	1.00	1.00	1.00	#ffffff	White
Uncommon	30	255	0	0.12	1.00	0.00	#1eff00	Green
Rare	0	112	221	0.00	0.44	0.87	#0070dd	Blue
Epic	163	53	238	0.64	0.21	0.93	#a335ee	Purple
Legendary	255	128	0	1.00	0.50	0.00	#ff8000	Orange
Artifact	230	204	128	0.90	0.80	0.50	#e6cc80	Light Gold
Heirloom	0	204	255	0.00	0.8	1.0	#00ccff	Blizzard Blue
WoW Token	0	204	255	0.00	0.8	1.0	#00ccff	Blizzard Blue
*/

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





const createLootItem = () => {
    //const item = new Item('not set', 'img/item/axe.png');
    const types = ['amulet', 'artifact', 'axe', 'bow', 'hammer', 'mace', 'spear', 'staff', 'sword'];
    //removed 'potion' for now

    const type = selectFrom(types);

    const weapons = [ 'axe', 'bow', 'hammer', 'mace', 'spear', 'staff', 'sword'];

    let isWeapon = false;
    if (weapons.includes(type)) {
        isWeapon = true;
    }

    const qualityLevel = ranNum(0,5) // 6 quality levels
    // "Normal" is twice correctly, make simple names for 2 lowest tiers
    const nameKeywords = ['normal', 'normal', 'magic', 'rare', 'legendary', 'mythic'];
    const name = rpgItemGen.createItem(type, nameKeywords[qualityLevel]);


    const imageSrc = `img/item/${type}${ranNum(1, itemImageAmounts[type])}.png`
    //log(imageSrc)

    const item = new Item(name, type, imageSrc, isWeapon)
    return item;
}

const createEnemy = () => {
    enemy.dead = false;
    
    const name = heroGen.getName();
    enemy.name = name;
    enemyNameElem.innerText = name;

    enemyHpBarMain.style.width = `100%`;
    enemyHpBarBg.style.width = `100%`;

   

    const imageNum = ranNum(1, settings.enemyImageAmount);
    const imageSrc = `img/creature/creature (${imageNum}).jpg`;

    enemyImageElem.src = imageSrc;
    enemyImageElem.style.backgroundImage = `url('${imageSrc}')`;

    enemy.hp.max = settings.enemyMaxHp;
    enemy.hp.current = enemy.hp.max;

    enemyHpCurrent.innerText = enemy.hp.current;
    enemyHpMax.innerText = enemy.hp.max;

    enemy.lootItem = createLootItem();

    setLootItem();
}


const createLootItemLayers = () => {

    const pxInc = 5;

    //const target = document.querySelector('#loot-container > .loot-item > .outer-wrap > .inner-wrap');

    //3 layers, 2px: -2, 0, 2")
    //5 layers, 2px: -4, -2, 0, 2, 4")
    //7 layers, 2px: -6, -4, -2, 0, 2, 4, 6")

    for (let i=0; i<lootItemLayers.length; i++) {
        const elem = lootItemLayers[i];
        //elem.classList.add('image');
        elem.style.backgroundImage = `url('${enemy.lootItem.imageSrc}')`;

        //elem.id = "a"+(i+1); //first elem id is "a1", cant start with number

        const zPos =  -(Math.floor(lootItemLayers.length / 2)) + i*pxInc;  //pxInc: between layer elements
        //log(px)
        elem.style.transform = "translateZ(" + zPos + "px";
        //target.append(elem);
    }
}



const setLootItem = () => {
    createLootItemLayers();

    const rarityColor = itemQuality[enemy.lootItem.qualityLevel].color;
    lootItemNormalGlow.style.boxShadow = `${rarityColor} 0px 0px 50px 20px`; 

    //const imageLayers = document.querySelectorAll('#loot-container > .loot-item > .outer-wrap > .inner-wrap > .image');
    const front = lootItemLayers[0];
    const back = lootItemLayers[1];

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


const setViewerImage = (item) => {
    //createLootItemLayers();

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
        // inv is full, cant loot
        // Move inv tab icon
        flashInvIcon();
       
    

        return false;
    }

    item.looted = true;
    //log(`Looted item: ${item.name} `);

        //add item to player inv
    player.inv.push(item);

    setItemToSlot(item, invSlots[player.inv.length-1], player.inv.length-1);



    let animDuration = 300; //ms


    //transition: all 0.5s;

      
    // Change inv tab icon to open chest (item "goes" to chest)
    
    invIcon.setAttribute('src', 'img/chest_open.png');

    
    const itemPos = lootItemImage.getBoundingClientRect();
    const invPos = invIcon.getBoundingClientRect();


    let moveAmount = (invPos.y - itemPos.y) * 0.7;

    lootItemImage.style.transform = `translateY(${moveAmount}px) scale(0)`;
    lootItemNameContainer.style.transform = `translateY(${moveAmount}px) scale(0)`;
    


    setTimeout(() => {
        createEnemy();
        // Show enemy elem
        enemyContainer.classList.remove('hidden');

        // Hide loot elem
        lootItemContainer.classList.add('hidden');

        // Restore loot item style
        lootItemImage.style.transform = 'translateY(0%) scale(1)';
        lootItemNameContainer.style.transform = 'translateY(0%) scale(1)';

        // Restore inv tab icon to closed chest
        invIcon.setAttribute('src', 'img/chest.png');
        
      }, animDuration);
}


const attackEnemy = () => {
    
     // Return early to avoid possibly triggering death multiple times.
    if (enemy.dead) return false;

    let dmg = player.damage;

    if (chance(player.crit.chance)) {
        dmg *= player.crit.multiplier;
    }
    enemy.hp.current -= dmg;

    let hpLeftPercent = enemy.hp.current/enemy.hp.max*100;
    enemyHpBarMain.style.width = `${hpLeftPercent}%`;
    enemyHpBarBg.style.width = `${hpLeftPercent}%`;

    enemyHpCurrent.innerText = enemy.hp.current;


    if (enemy.hp.current <= 0) {
        // Enemy is dead
        //log('Enemy is dead');
        playAnim(animData.explosion1, false);
        enemy.dead = true;

        // Hide enemy elem
        enemyContainer.classList.add('hidden');


        setTimeout(() => {
            // Show loot elem
            lootItemContainer.classList.remove('hidden');
            
        }, 300);




    } else {
        // Set hp bar or something here, enemy is not dead yet
        enemyImageElem.classList.add('damaged');
        enemyHpBarContainer.classList.add('damaged');

        let attackAnim = animData.impact1;
        attackAnim = animData.atk2;
        playAnim(attackAnim, true);

        setTimeout(() => {
            enemyImageElem.classList.remove('damaged');
            enemyHpBarContainer.classList.remove('damaged');
        }, 100);
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
}


const setListeners = () => {
    for (let i=0; i<bottomTabs.length; i++) {
        const tab = bottomTabs[i];
        tab.addEventListener('click', e => {
    
            showTabView(i);
        });
    }


    combatView.addEventListener('click', e => {
        const x = e.clientX;
        const y = e.clientY;

        //log(`x: ${x}, y: ${y}`);
      
    });

    // Disable long-tap context menu on mobile
    window.oncontextmenu = e => {
        e.preventDefault();
        e.stopPropagation();
        return false;
   };
    
   /*
    // Debug buttons
    const createEnemyDebug = document.querySelector('.debug > .create-monster');
    createEnemyDebug.addEventListener('click', e => {
        createEnemy();
    }); */

    lootItemContainer.addEventListener('click', e => {
        const x = e.clientX;
        const y = e.clientY;
        //log(`x: ${x}, y: ${y}`);

        takeLoot();
      
    });

    enemyContainer.addEventListener('click', e => {
        log(`Clicked enemy`);
        attackEnemy();
    });

    /*
    const atk1 = new Image();
    atk1.src = animData.atk1.imageSrc;
    //atk1.addEventListener("load", () => 'asd', false);
    animData.atk1.img = atk1;
    */


    invGrid.addEventListener('click', e => {
        if (e.target.getAttribute('data-empty') !== "true") {
            showInItemViewer(e.target)
        } else {
            clearInvSelection();
            clearItemViewer();
        }
        //log(e.target);
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

        log(slotImage);

        slotImage.addEventListener('click', e => {
            unequipItem(equipmentSlotNames[i]);
        });

    }
    

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
        effectElem.innerText = `• ${effect.text}`;
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
const playAnim = (anim, offset=false) => {
   


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
    }
    const img = new Image();
    img.src = anim.imageSrc;
    animObj.image = img;

    animate(animObj);
}


const animate = anim => {
    const canvas = anim.canvas;
    const ctx = anim.ctx

    let column;

    const animationLoop = now => {
        const elapsed = now - anim.prevTime;

        if (anim.frame >= anim.frames) {
            // Animation has ended
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.remove();
            return true;
        }

        if (elapsed >= anim.frameDur) {
            //log('next frame')
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //ctx.drawImage  (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            const row = Math.floor(anim.frame / anim.framesPerRow);

            if ( anim.frame % anim.framesPerRow === 0) {
                column = 0;
            }
            //log(column)

	        ctx.drawImage(anim.image, column*anim.w, row*anim.h, anim.w, anim.h, 0, 0, canvas.width, canvas.height);
            anim.prevTime = now;
            anim.frame++;
            column++;
        }



        window.requestAnimationFrame(animationLoop);
    }

    // Request 1st frame to start animation loop
    animationLoop();
}



const createTestItems = (amount) => {
    for (let i=0; i<amount; i++) {
        const item = createLootItem();
        player.inv.push(item);
        setItemToSlot(item, invSlots[i], i);
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
    log(slotNames);
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

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const imageCon = document.createElement('div');
        imageCon.classList.add('image-container');

        const image = document.createElement('img');
        image.classList.add('image');
        image.setAttribute('src', 'img/transp.png');
        image.setAttribute('alt', 'equipment slot');

        imageCon.append(image);
        imageWrapper.append(imageCon);

        imageWrapper.append(slotLabel);

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
    const sellValue = item.sellValue;
    player.addGold(sellValue);
    player.inv.splice(i, 1);
    clearInvSlot(i);
    clearInvSelection();
    clearItemViewer();
    setInvItems();
}

const sellAll = () => {
    //log('trying to sell all items')
    for(let i=player.inv.length-1; i>=0; i--) {

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
    setEquippedItems();
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

    setEquippedItems();

    //log(item);
  



    return false;

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
    setEquippedItems();
}


const setEquippedItems = () => {
    const items = player.equipment;

    const slotNames = Object.getOwnPropertyNames(player.equipment);
    const slotCon = document.getElementById('equipment-container');


    for (let i=0; i<slotNames.length; i++) {

        const slot = slotCon.querySelector(`.slot.${slotNames[i]}`);
        clearEquipmentSlot(slot);
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
                let text = `• ${eff.text}`;
                effElem.innerText = text;
                effectsCon.append(effElem);
            }


        } 
     
    }
}


const clearEquipmentSlot = slot => {
    slot.setAttribute('data-empty', true);
    const slotImageCon = slot.querySelector('.image-container');
    const slotItemName = slot.querySelector('.name');
    const slotItemEffects = slot.querySelector('.effects');

    const defaultBoxShadow = '0px 0px 0px 1px rgb(100, 100, 100), 0px 0px 0px 4px rgba(0, 0, 0, 1), inset 0px 0px 5px 5px rgba(0,0,0,0.5), /* vignette */ 0px 0px';
    slotImageCon.style.boxShadow = defaultBoxShadow;
    const slotImage = slotImageCon.querySelector('img.image');
    slotImage.setAttribute("src", './img/transp.png');

    slotItemName.innerText = '';
    slotItemEffects.innerHTML = '';
}


// Set player stats after equipping/unequipping items
const setPlayerStats = () => {

}



preloadImages(imagesToPreload).then(function(imgs) {
    createInvSlots();
    createEquipmentSlots();
    createEnemy();


    setListeners();

    showTabView(2);

    createTestItems(20);  //debug
    //setInvItems()

    const enemyW = enemyImageElem.clientWidth;
    //log(enemyW)
    enemyHpBarContainer.style.width = `${enemyW+50}px`

}, function(errImg) {
    // at least one image failed to load
    log("ERROR: failed to preload image: " + errImg);
});