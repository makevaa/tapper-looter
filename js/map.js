class MapNode {
    constructor(name, x, y, image, difficulty, enemies, unqiues) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.image = `img/map/${image}.png`;
        this.difficulty = difficulty;
        this.enemies = enemies; //array

        // Possible unique item drops in zone
        // Objects with item name and drop rate
        // eg. {"Warwyrd": 1/250}
        this.uniques =unqiues; 

        //if zone has no enemies, put in default enemy
        if (this.enemies === undefined || this.enemies.length < 1) {
            this.enemies = ['default']
        }

        //console.log(this.enemies)
    } 
}

const mapData = {
    bg: 'img/map/map_pergament_small_3.png',
    currentNode:0,
    selectedNode:-1,

    nodes: [
        new MapNode ('Wildwood', 100, 100, 'tree', 1,
            ['demon', 'treant', 'spriggan', 'orc barbarian', 'orc juggernaut', 'skeleton warrior', 'beastman', 'green order knight', 'evil spirit'],
            [ 
                { "Hirvijumal": 1/500 }, 
                { "Wildwood Avenger": 1/600 }, 
                { "Korpi Warblade": 1/500 }, 
            ]
        ),

        new MapNode ('Monastery', 340, 280, 'pand', 2,
            ['demon', 'sorcerer', 'phantom', 'cultist', 'djinn'],
            [
                { "Mysterium Xarxes": 1/400 }, 
                { "Groveheart": 1/500 }, 
            ]
        ), 
        new MapNode ('Memorial', 100, 330, 'statue2', 3,
            ['skeleton warrior', 'bone knight', 'wisp', 'cultist'],
            [ 
                { "Steel of the Lost Time": 1/400 }, 
                { "Crystal Empire Blade ": 1/500 }, 
            ]
        ),
        new MapNode ('Fallen City', 550, 180, 'baz', 4,
            [ 'sorcerer', 'black knight', 'death knight', 'cultist'],
            [
                { "Balhaut's Sorrow": 1/400 }, 
                { "Molokh": 1/400 }, 
                { "Lacronyf Moska": 1/450 }, 

            ]
        ),
        new MapNode ('Gehenna', 500, 350, 'depths', 5,
            ['demon', 'sorcerer', 'chaos spawn', 'khymera', 'shadow demon', 'evil spirit', 'horror', 'djinn', 'exarch', 'phantom', 'cultist', 'bolrog', 'hell sentinel'],
            [
                { "Akriloth Talon": 1/350 }, 
                { "Thousand Black Arrows": 1/400 }, 
            ]
        ),
        new MapNode ('Dead Halls', 210, 460, 'hell2', 6,
            ['skeleton warrior', 'bone knight', 'green order knight', 'wraith', 'spectre', 'lich',],
            [
                { "Star of Kirous": 1/450 }, 
                { "Lorencian Staff": 1/400 }, 
            ]
        ),
        new MapNode ('Kalmisto', 600, 500, 'statue', 7,
            ['skeleton warrior', 'bone knight', 'evil spirit', 'wisp', 'wraith', 'soul eater', 'poltergeist', 'vampyre lord', 'djinn', 'lich', 'phantom'],
            [
                { "Kalmakivi": 1/450 }, 
                { "Thormageddon": 1/450 }, 
            ]
        ),
        new MapNode ('Hellgate', 800, 150, 'hell', 8,
            ['demon', 'chaos spawn', 'pit lord', 'devil', 'khymera', 'tormentor', 'hell beast', 'hell knight', 'fallen angel', 'hell sentinel', 'horror', 'exarch', 'fiend'],
            [
                { "Abyssal Mato": 1/400 },
                { "Mace of Habadacus": 1/400 },  
                { "Eve of Destruction": 1/450 }, 

            ]
        ), 
    ],

    // routes/lines between map nodes
    // numbers are indices of map nodes (non-zero based!)
    routes: [
        [1, 2], // route from node 1 to node 2
        [2, 3],
        [2, 4],
        [2, 5],
        [5, 6],
        //[3, 6],
        [5, 7],
        [4, 8],
    ]
}


const mapLine = (ctx, x1, y1, x2, y2) => {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.strokeStyle = 'rgba(93, 50, 19, 0.5)';

    // Move line start to middle of map node element
    const offset = 25; // hard-coded for now, half of elem 
    x1 += 50;
    y1 += 50;
    x2 += 50;
    y2 += 50;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

const createMapRouteLines = ctx => {
    for (let i=0; i<mapData.routes.length; i++) {
        const route = mapData.routes[i];
        const startNode = mapData.nodes[route[0]-1];
        const endNode = mapData.nodes[route[1]-1];
        mapLine(ctx, startNode.x, startNode.y, endNode.x, endNode.y);
    }
}


const createMapBg = () => {
    const canvas = document.createElement('canvas');

    canvas.width = settings.map.w;
    canvas.height = settings.map.h;

    const ctx = canvas.getContext("2d");

    // pergament paper bg image
    const paper = new Image();
    paper.src = `${mapData.bg}`;
    paper.style.width = canvas.width;
    paper.style.height = canvas.height;
    
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    //small 800 x 520, big 1249 x 823 
    //ctx.filter = "sepia(0.5) brightness(1.0)";
    ctx.drawImage(paper, 0, 0, 800, 520, 0, 0, canvas.width, canvas.height);

    createMapRouteLines(ctx);

    const imageUrl = canvas.toDataURL();
    return imageUrl;
}




const createMapNodes = () => {
    const target = document.getElementById('map');

    for (let i=mapData.nodes.length-1; i>=0; i--) {
        const node = mapData.nodes[i];

        const elem = document.createElement('div');
        elem.classList.add('map-node');
        elem.setAttribute('data-index', i);

        const imageCon = document.createElement('div');
        imageCon.classList.add('image-container');

        const image = document.createElement('img');
        image.classList.add('image');
        image.setAttribute('src', node.image)
        imageCon.append(image);


        const name = document.createElement('div');
        name.classList.add('name');
        name.innerText = node.name;

        const currentLabel = document.createElement('div');
        currentLabel.classList.add('current-label');
        currentLabel.innerText = 'You are here';
      

        elem.append(imageCon);
        elem.append(name);
        elem.append(currentLabel);

        elem.style.left = `${node.x}px`;
        elem.style.top = `${node.y}px`;

        target.prepend(elem);


        elem.addEventListener('click', e => {
            //clearSelectedNode();
            //elem.classList.add('selected');
            const nodeIndex = e.target.getAttribute('data-index');
            mapData.selectedNode = Number(nodeIndex);
            setMapNodeStyles();
        });
    }

    // Remove selected node highlight when clicking empty space on map
    const mapElem = document.getElementById('map-background');
    mapElem.addEventListener('click', e => {
        //clearSelectedNode();
        mapData.selectedNode = -1;
        setMapNodeStyles();
    });
}

const setMapListeners = () => {
    const travelButton = document.getElementById('travel');
    travelButton.addEventListener('click', e => {
        if (mapData.selectedNode > -1) {
            moveToNode(mapData.selectedNode);
        } else {
            msg(`No travel target selected`);
        }
    });
}

/*
// Highlight clicked node with circle
const selectNode = i => {
    i = Number(i);
    const elems =  document.querySelectorAll('#map > .map-node');
    elems[i].classList.add('selected');
}
*/


/*
const clearSelectedNode = () => {
    const prev = document.querySelector('#map > .map-node.selected');
    if (prev !== null) {
        prev.classList.remove('selected');
        mapData.selectedNode = -1;
    }
}
*/

/*
const clearCurrentNode = () => {
    const prev = document.querySelector('#map > .map-node.current');
    if (prev !== null) {
        prev.classList.remove('current');
        mapData.currentNode = -1;
    }
}
*/

// Check if route exists between map nodes
const routeExists = (current, target) => {
    //return true; //debug, travel anywhere

    for (const route of mapData.routes) {
        if (route[0] === current && route[1] === target ||
            route[1] === current && route[0] === target) {
                return true
            }
    }
    return false;
}

const setMapNodeStyles = () => {
    //clearCurrentNode();
    const nodes = document.querySelectorAll('#map > .map-node');
    //log(mapData.currentNode);

    for (let i=0; i<nodes.length; i++) {
        const node = nodes[i];
        node.classList.remove('current');
        node.classList.remove('selected');
    }

    if (mapData.currentNode > -1) {
        nodes[mapData.currentNode].classList.add('current');
        // Zone title in combat view
        zoneTitle.innerText = `${mapData.nodes[mapData.currentNode].name}`;
    }

    
    if (mapData.selectedNode > -1) {
        nodes[mapData.selectedNode].classList.add('selected');
    }
}

const moveToNode = targetNodeIndex => {
    // Note: routes are non-zero based in mapData
    if ( routeExists(mapData.currentNode+1, targetNodeIndex+1) ) {
        // route exists, move to new node
        mapData.currentNode = Number(targetNodeIndex);
        msg(`Traveled to <span style="color:red; font-weight:bold;">${mapData.nodes[mapData.currentNode].name}</span>`);
        createEnemy();
        setEnemyStyle();
        setLootItemStyle();
        save();
    } else if (targetNodeIndex === mapData.currentNode) {
        msg(`You are already there`);
    } else {
        // no route exists to target node
        msg(`Too far away from zone`);
    }

    setMapNodeStyles();
}

createMapNodes();
setMapListeners();
