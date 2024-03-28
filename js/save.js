
const save = () => {
    // For some reason sellValues and qualityLeves go "undefined" when loading the save
    // Some problems with saving/loading complex JS objects

    //log('Saved game...');
    const obj = {
        "enemy": enemy,
        "player": player,
        "enemyItemQuality": enemy.lootItem.qualityLevel,
        "enemyItemValue": enemy.lootItem.sellValue,
        "equippedItemValues": {},
    }

    //log(obj)

    
    const invItemSellValues = [];
    for (let i=0; i<player.inv.length; i++) {
        //log(`player.inv[${i}]: ${player.inv[i].name}`)
        //obj.player.inv[i].sellValue = player.inv[i].sellValue;
        invItemSellValues.push(player.inv[i].sellValue)
    }
    obj.invItemSellValues = invItemSellValues;
    obj.enemy.lootItem.qualityLevel = enemy.lootItem.qualityLevel;


    const slotNames = Object.getOwnPropertyNames(player.equipment);
    for (let i=0; i<slotNames.length; i++) {
        const slotName = slotNames[i];

        const item = player.equipment[slotName];

        if (item !== -1) {
            obj.equippedItemValues[slotName] = item.sellValue;
        }

       
    }   






    localStorage.setItem('LooterTapperSave', JSON.stringify(obj) );
}


const loadSave = () => {
    log('Loaded save from localStorage | loadsave(), save.js')

    const data = JSON.parse(localStorage.getItem('LooterTapperSave'));

    //log(data)
    //log(enemy)

    enemy = data.enemy;
    player = data.player;

    // Create new objects, because class data is lost if we just copy the old data, so we can use 'instanceof' as normal


    // Create new loot item from data
    const lootItem = data.enemy.lootItem;

    //const enemyItem = new Item(lootItem.name, lootItem.type, lootItem.isWeapon, lootItem.imageSrc, lootItem.qLevel, lootItem.value, lootItem.effects);
    const enemyItem = new Item(lootItem.name, lootItem.type, lootItem.isWeapon, lootItem.imageSrc, data.enemyItemQuality, data.enemyItemValue, lootItem.effects);

    //log(enemyItem)

    enemy.lootItem = enemyItem;

    // Create new items from save data
    for (let i=0; i<data.player.inv.length; i++) {
        const item = data.player.inv[i];
        const sellValue = data.invItemSellValues[i]

        const newItem = new Item(item.name, item.type, item.isWeapon, item.imageSrc, item.qualityLevel, sellValue, item.effects, item.locked);

        player.inv[i] = newItem;
    }

    // Create new item objects for equipped items
    const slotNames = Object.getOwnPropertyNames(data.player.equipment);
    for (let i=0; i<slotNames.length; i++) {
        const slotName = slotNames[i];

        const item = data.player.equipment[slotName];

        if (item !== -1) {
            //log(data.player.equipment[slotName])



            const newItem = new Item(item.name, item.type, item.isWeapon, item.imageSrc, item.qualityLevel, data.equippedItemValues[slotName], item.effects);
    
            data.player.equipment[slotName] = newItem;
            //log(data.player.equipment[slotName])
        }
    }   


   
}

const saveExists = () => {
    const save = localStorage.getItem('LooterTapperSave')
    if (save !== null && save !== undefined) {
        return true;
    } else {
        return false;
    }
}


const reset = () => {

    result = window.confirm("Reset game save? All progress will be lost.");	
    if (result === true) {
        //reset player stats and gold
        initNewGame();

    }
    save();
}


