
const save = () => {
    // For some reason sellValues and qualityLeves go "undefined" when loading the save
    // Some problems with saving/loading complex JS objects

    //log('Saved game...');
    const obj = {

        // Game settings
        "lowSpec": settings.lowSpec,
        "critMessages": settings.critMessages,
        "autoLockUniques": settings.autoLockUniques,


        "enemy": enemy,
        "player": player,
        "currentNode": mapData.currentNode,
        "enemyItemQuality": enemy.lootItem.qualityLevel,
        "enemyItemValue": enemy.lootItem.sellValue,
        "equippedItemValues": {},
    }

    obj.enemy.lootItem.qualityLevel = enemy.lootItem.qualityLevel;

    localStorage.setItem('LooterTapperSave', JSON.stringify(obj) );
}

// Set setting checkbox status based on "settings" object data
const setSettingsCheckboxes = () => {
    const lowSpec = document.getElementById('low-spec-setting');
    lowSpec.checked = settings.lowSpec;

    const critMessages = document.getElementById('crit-messages-setting');
    critMessages.checked = (settings.critMessages);
   

    const autoLockUniques = document.getElementById('lock-uniques-setting');
    autoLockUniques.checked = settings.autoLockUniques;
}


const loadSave = () => {
    const data = JSON.parse(localStorage.getItem('LooterTapperSave'));

    // Set game settings based on saved data
    // If setting is not found in save, dont try to set it
    const settingNames = ['lowSpec', 'critMessages', 'autoLockUniques']
    for (const name of settingNames) {
        if (data[name] !== undefined || data[name] !== null) 
            settings[name] = data[name]
    }

    /*
    settings.lowSpec = data.lowSpec;
    settings.critMessages = data.critMessages;
    settings.autoLockUniques = data.autoLockUniques;
    */

    // If save doesn't have data for current map node, set 1st node
    if (data.currentNode === undefined || data.currentNode === null) {
        data.currentNode = 0;
    }
    
    mapData.currentNode = Number(data.currentNode);
    
    enemy = data.enemy;

    // Create new player object to have class methods
    player = new Player();

    // Add saved player props to the new player object
    const props = Object.getOwnPropertyNames(data.player);
    for (const prop of props) {
        player[prop] = data.player[prop];
    }

    // If player level data is not found, set these defaults
    if (player.level === undefined || player.level === null) {
        player.level = 1;
        player.xp = 0;
        player.xpToLevel = 100;
    }

    // Create new objects for items, because class data is lost if we just copy the old data, so we can use 'instanceof' as normal


    // Create new loot item from data
    const lootItem = data.enemy.lootItem;

    //const enemyItem = new Item(lootItem.name, lootItem.type, lootItem.isWeapon, lootItem.imageSrc, lootItem.qLevel, lootItem.value, lootItem.effects);

    const enemyItem = new Item(lootItem.name, lootItem.type, lootItem.isWeapon, lootItem.imageSrc, data.enemyItemQuality, data.enemyItemValue, lootItem.effects, lootItem.locked, lootItem.flavor);


    enemy.lootItem = enemyItem;

    // Create new inv items from save data
    for (let i=0; i<data.player.inv.length; i++) {
        const item = data.player.inv[i];
        //const sellValue = data.invItemSellValues[i]
        const newItem = new Item(item.name, item.type, item.isWeapon, item.imageSrc, item.qualityLevel, item.sellValue, item.effects, item.locked, item.flavor);

        player.inv[i] = newItem;
    }

    // Create new equipped items from save data
    const slotNames = Object.getOwnPropertyNames(data.player.equipment);

    for (let i=0; i<slotNames.length; i++) {
        const slotName = slotNames[i];
        const item = data.player.equipment[slotName];

        if (item !== -1) {
            const newItem = new Item(item.name, item.type, item.isWeapon, item.imageSrc, item.qualityLevel, item.sellValue, item.effects, item.locked, item.flavor);
    
            data.player.equipment[slotName] = newItem;
        }
    }   

    log('Loaded save from localStorage | loadsave(), save.js')
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
        msg('Save reset');
    }
    save();
}
