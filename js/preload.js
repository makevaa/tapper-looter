const imagesToPreload = [
    'img/anim/explosion1.png',
    'img/anim/hit_ring.png',
    'img/anim/hit_ring_red.png',
    'img/border.png',
    'img/border_simple.png',
    'img/border_red.png',
    'img/button.png',
    'img/button_dark.png',
    'img/button_fat.png',
    'img/button_fat_dark.png',
    'img/chest.png',
    'img/chest_open.png',
    'img/chest_full.png',
    'img/empty_slot_amulet.png',
    'img/empty_slot_artifact.png',
    'img/empty_slot_weapon.png',
    'img/gold_coins.png',
    'img/helm.png',
    'img/swords_crossed.png',
    'img/transp.png',
    'img/gran.jpg',
    'img/stone.png',
    //'img/map/map_pergament_big.png',
    'img/map/map_pergament_small_3.png',
]

const preloadImages = srcs => {
    function loadImage(src) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                resolve(img);
            };
            img.onerror = img.onabort = function() {
                reject(src);
            };
            img.src = src;
        });
    }
    var promises = [];
    for (var i = 0; i < srcs.length; i++) {
        promises.push(loadImage(srcs[i]));
    }
    return Promise.all(promises);
}