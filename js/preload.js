const imagesToPreload = [
    'img/border.png',
    'img/border_red.png',
    'img/chest.png',
    'img/chest_open.png',
    'img/helm.png',
    'img/button.png',
    'img/button_dark.png',
    'img/button_fat.png',
    'img/button_fat_dark.png',
    'img/swords_crossed.png',
    'img/anim/explosion1.png',
    'img/anim/hit_ring.png',






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