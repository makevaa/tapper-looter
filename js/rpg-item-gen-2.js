/*************

    rpg-item-gen-2.js
    	
    This library creates fantasy RPG item names based on given parameters. 
	Method with parameters can be used to define the type of returned item name. Method wihtout parameters can be used to return name with random parameters. Parameters are strings, the returned name is a string.
    Independent, no dependencies.
		
        
	Methods & parameters:
	
		rpgItemGen.createItem(itemType, itemRarity) //return one random fantasy item name based on paremeters
		rpgItemGen.createRandomItem() // return item name with random parameters
        
        parameter itemType: amulet, artifact, axe, bow, hammer, mace, potion, spear, staff, sword
        parameter itemRarity: normal, magic, rare, legendary, set, mythic
      
      
	Usage examples:
		rpgItemGen.createItem("sword", "legendary") //example output: "Earth's Underworld Greatsword"
		rpgItemGen.createItem("hammer", "normal") //example output: "Chaos Battlehammer"
		rpgItemGen.createRandomItem() //example output: "Subjugator's Perfect Rapier of Hellfire"
	
	
	Example outputs:
		Scourge Greathammer
		Gift of Legions
		Ybari's Nethergold Splinterthirst
		Invoker Shard
		Fire Boon
		Greataxe of the Golem
		Guardian Ice Spine
		Duskblade Lightning Spirithunger
		Vi's Blood Edge
		Remedy of the Warlock	

		
	
	change log
	
		2018-10-15
			-initial release with createItem and createRandomItem methods.
************/

//console.log("rpg-item.gen-2.js loaded.");

const rpgItemGen = {

    getName: function(itemType, rarity) {
		return rpgItemGen.createItem(itemType, rarity);
	},
	
	ranNum: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	selectFrom: function(arr) {
		return arr[rpgItemGen.ranNum(0, arr.length-1)];
	},	
    
    selectFromArrs: function(arrayOfArrays) {
        var app = rpgItemGen;
        return app.selectFrom(app.selectFrom(arrayOfArrays))
    },
	
	reverseString: function(str) {
		return str.split("").reverse().join("");
	},	

	chance: function(chancePercent) {
		if (rpgItemGen.ranNum(1,100) <= chancePercent){
			return true;
		} else {
			return false;
		}
	},
    
    capitalize: function(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase())
	},
    
    toTitleCase: function(str) {
        //console.log("Using the 'toTitleCase' method.");
        var result = str.replace(/\b\w/g, function(l){ return l.toUpperCase() })
        // => 'Your String'       
        return result;
        //return str.replace(/\b\w/g, l => l.toUpperCase())
	},
        
    regex: {
        removeWhitespaces: function(str){
            return str.replace(/\s/g, "");
        },

        removeSpecialChars: function(str) {
            return str.replace(/[.]|[,]|[']|[-]/g, ""); 
        }

    },
    
    
	mmoClasses: ["acolyte","aegis","alchemist","annihilator","arcanist","archivist","archon","assassin","autarch","avenger","barbarian","baron","beast","berserker","betrayer","butcher","champion","conqueror","corruptor","crusader","crusher","custodian","deceiver","defender","defiler","desecrator","destroyer","duelist","duke","elementalist","emperor","enchanter","enforcer","exarch","executioner","fiend","flayer","giant","gladiator","golem","goliath","guard","guardian","harbinger","harvester","horror","hunter","illusionist","impaler","incarnate","inquisitor","invoker","judicator","juggernaut","king","knight","lancer","legate","legionnaire","lord","marauder", "mauler", "monolith","mutant","mutilator","oppressor","oracle","overlord","overseer","paragon","prince","protector","pulverizer","raider","ranger","reaper","reaver","redeemer","renegade","ripper","ruler","savior","seeker","sentinel","shapeshifter","smasher","soldier","sorcerer","strider","subjugator","templar","terror","titan","tormentor","tyrant","vanquisher","wanderer","warrior","zealot","brute","demon","angel", "chief","rider","rebel","general","commander","chieftain","count","imperator","vizier","aspect","breaker","bulwark","citadel","enslaver","incarnation","punisher","shatterer", "centurion", "slasher", "archer", "butcher", "prophet", "master", "slayer", "vanguard", "cavalier", "blackguard", "hexblade", "nightblade", "spellblade", "blademaster", "blade", "monk", "swordmaster", "warlord", "magi", "sage", "witch", "warlock", "conjurer","necromancer","druid","corsair","privateer","operative","cleric","rune knight", "spelldancer", "fighter", "mystic","priest","herald","animist","bladesinger","bard","beastlord","bounty hunter", "dragonslayer", "healer","scavenger", "shadowdancer","soulknife","spidermage","warmage","witchhunter","demonhunter","duskblade","swordsage","totemist","imperial","moonshadow","scourge","transmuter","warper","venomist","forger","ravager","whipmaster","legioner","bloodletter","valkyrie","runepriest","battlemind","seeker","seer","noble","ritualist","slavemaster","bloodlord","purifier","challenger"			
	],

	"materials": [
		"steel", "iron", "rock","adamant", "stone", "fire", "light", "blood", "bone", "flesh", "ice", "mercury", "metal", "venom", "aether", "thunder", "fire", "silver", "mithril", "lightning", "brass", "bronze", "crystal", "platinum", "titanium", "ivory", "trueglass", "nethergold", "hostrium", "granium", "magma", "armorite", "kyrite", "pyronite", "thormarite", "xanite"
	],
    
    getMaterial: function(){
        //console.log("Building custom material.");
        var app = rpgItemGen, str = "";
        if (app.chance(50)){ //we can tweak this chance
           str = app.selectFrom(app.prefixes)+app.selectFrom(app.materials);
        } else {
            str = app.selectFrom(app.materials);
        }
        return app.capitalize(str);
    },
   
    item: {
        amulet: {
            names: ["amulet", "necklace", "talisman", "shard", "charm", "heart", "medallion", "relic", "crystal", "stone", "eye", "boon", "token", "trinket"],
        },
        artifact: {
             names: ["talisman", "charm", "heart", "relic", "totem", "icon", "idol", "boon", "token", "tribute", "heirloom", "gift", "bond", "oath", "pledge", "soul", "memory", "hope", "incarnation", "legacy", "insignia", "seal", "vestige", "fable", "prayer", "song"],
        },
        axe: {
             names: ["axe", "edge", "war axe", "battle axe", "broadaxe", "warblade", "cleaver", "chopper", "crescent", "greataxe", "reaver", "ravager", "carver", ],
        },  
        bow: {
             names: ["bow", "chord", "string", "longbow", "warbow", "spine", "shortbow",],
        },
        hammer: {
             names: ["hammer", "pummeler", "pulverizer", "greathammer", "pounder", "battlehammer", "crusher", "mallet", "smasher", "ravager", "ferocity", "breaker", "fist", "destroyer", "judicator", "warhammer"],
        }, 
        mace: {
             names: ["mace", "pummeler", "pulverizer", "maul", "pounder", "crusher", "smasher", "bludgeon", "basher", "fist", "warmace", "pummel"],
        },
        potion: {
             names: ["potion", "elixir", "extract", "brew", "tonic", "flask", "vial", "philter", "draught", "drink", "mixture", "medicine", "liquid", "remedy", "stimulant", "juice", "essence", "blend", "liquor", ],
        },  
        spear: {
             names: ["spear", "spike", "sting", "stinger", "pike", "impaler", "piercer", "lance", "javelin", ],
        }, 
        staff: {
             names: ["staff", "cane", "branch", "scepter", "pole", "spire", ],
        }, 
        sword: {
             names: ["sword", "blade", "fang", "claw", "greatsword", "spellblade", "doomblade", "reaver", "ravager", "longsword", "cutlass", "saber", "scimitar", "broadsword", "rapier", "talon", "defender", "reaper", "claymore", "crusader", "mageblade", "deflector", "razor", "slicer", "longblade", "slasher", "protector", "warblade", "slayer", "steel", "edge"],
        }               
    },

		
	"adjectives": [
		"abyssal","ancient","armored","arcane","baleful","betrayed","blighted","boundless","burning","carnivorous","celestial","chameleon","chaos","colossal","condemned","cosmic","crescent","crimson","crystalline","cursed","dark","deathless","desecrated","divine","empyrean","eternal","ethereal","fallen","feral","final","forgotten","foul","gargantuan","golden","holy","immortal","imperial","invincible","lamented","last","mad","mystic","mythic","nether","primal","primordial","radiant","revered","righteous","runic","runite","sanctified","twilight","underworld","undying","unholy","unknown","unliving","venomous","wild","winged","phantom","explosive", "black", "red","brutish","brutal","mighty","immaculate","scorned","horned","masked","hidden","heartless","demonic","savage","proud","magnificent","exquisite","excessive","perfect","crownless","ageless","blessed","chained","corrupt","corrupted","refined","unchained","angelic","blind","brazen","flawless","graceful","majestic","serpentine","zealous","shining","skeletal","obsidian","astral","glacial","grand","onixian","royal","dimensional","temporal","heavenly","blessed","infinite","toxic","infused","tranquil","raw","bloody","painful","howling","corroded", "exiled"
	],

	"prefixes": [
		"blood","bone","chaos","doom","dragon","fire","flesh","iron","mind","night","poison","shock","skull","soul","spirit","steel","storm","thorn","venom","void","war","stone","sky","dusk","splinter","power","star","metal","gold","shadow","silver","frost","falcon","magic","moon","wind", "wither","fury","blaze", "dawn", "wraith", "sun", "ash", "nether","rain","thunder","death",
	],
		
	"suffixes": [
		"beast","blade","bloom","born","bound","brand","breaker","bringer","curse","eater","fist","flayer","force","head","heart","hunger","hunt","hunter","kin","metal","pact","seeker","shackle","shatter","shield","shroud","skin","soul","spark","spike","spirit","storm","stride","strider","talon","thirst","thorn","thunder","tooth","fang","claw","wing","terror","bleeder","caller","fury","gaze","gazer","rage","scream","walker","stealer","slayer","wind", "strike", "dancer", "song", "lord"
	],

	"epicNouns": [
		"skies","depths","dimensions","dreams","dynasties","empires","immortals","iron","legions","light","overworlds","realms","souls","underworlds","war","worlds","creation","empyrean","grace","immortality","infinity","invincibility","lies","madness","malady","maladies","malice","order","peace","secrets","shadows","solitude","stars","truths","war","wishes","warfare","void","spirit","shadow","serpent","titan","paragon","horizon","star","hope","fire","mercy","excess","glory","justice","sorrow","talons","wrath","horizons","forests","jade","magnetism","progress","blight","void","perseverance","moon","guardian","aether","malevolence","sky","sun","winter","seasons","ages","heaven","freedom","pain","torment","agony","triumph","glory","earth","valhalla","hyperborea","north","magick","fate","hellfire","grandeur","hatred","witchcraft","witchery","storm","snake","wind","annihilation", "devastation", "nightmare", "meteor", "solitude", "mirage", "ragnarok", "massacre", "dawn", "twilight", "magic", "deception", "eternity", "insanity", "torment", "despair", "extinction", "affliction",
	],
	
	
	createItem: function(itemType, rarity) {	
		var app = rpgItemGen;
        var mmoClasses = app.mmoClasses, materials = app.materials, adjectives = app.adjectives, prefixes = app.prefixes, suffixes = app.suffixes, epicNouns = app.epicNouns
	
		var ranNum = function(min,max){
			return app.ranNum(min,max);
		}
		
		var selectFrom = function(arr){
			return app.selectFrom(arr);
		}
        
        var selectFromArrs = function(arrs){
			return app.selectFromArrs(arrs);
		}
		
		var chance = function(percent){
			return app.chance(percent);
		}
        
        var capitalize = function(str){
			return app.capitalize(str);
		}
        
         var toTitleCase = function(str){
			return app.toTitleCase(str);
		}
	
		var item = "";
        var itemObj = app.item[itemType];       
        var itemBase = capitalize(selectFrom(itemObj.names));
		
		
		var createLowItem = function() {	
			//console.log("Building lowName.");
            var possible = [materials, adjectives];
            var part1 = capitalize(selectFromArrs(possible));
			return part1+" "+itemBase;	
		} 
		
		var createMedItem = function() {	
			//console.log("Building medName.");
			var mmoClass = capitalize(selectFrom(mmoClasses)), result;
			switch (ranNum(1,4)) {	
				case 1:
                    //console.log("medName case 1");
					if (chance(50)) {
						mmoClass = mmoClass + "'s";
					}
					if(chance(25)) {
						mmoClass = app.namepack.getName();
						if (mmoClass.charAt(mmoClass.length-1) == "s"){
                            //console.log("slicing.");
							mmoClass = mmoClass.slice(0, -1);
						}
						
						if (chance(50) && mmoClass.length <= 7) { //add suffix"
							switch (ranNum(1,3)) {
								case 1: mmoClass += "an"; break;
								case 2: mmoClass += "ic"; break;
								case 3: mmoClass += "te"; break;
							}	
						}
					}					
					result = mmoClass +" "+ itemBase;
					break;	
					
				case 2:
                    //console.log("medName case 2");
					result = itemBase +" of the "+ mmoClass;	
					break;
					
				case 3:
                    //console.log("medName case 3");
                    result = itemBase +" of ";
                    switch(ranNum(1,3)){
                        case 1: result += app.getMaterial(); break;
                        case 2: result += capitalize(selectFrom(epicNouns)); break;
                        case 3: result += app.namepack.getName(); break;
                    }
					break;
					
				case 4:
                    //console.log("medName case 4");
					result = toTitleCase(selectFrom(prefixes) + selectFrom(suffixes));
					break;	
			}
			return result;
		} 
		//console.log("medItem: "+medItem());
		
		
		var createHighItem = function(){
			//console.log("Building highName.");
            var capitalize = app.capitalize, part1Type;		
			var createPart1 = function() {		
				var str = "";
				switch(ranNum(1,3)){
					case 1: part1Type = "shortName"; str = app.namepack.getShortName(); break;
					case 2: part1Type = "mmoClass"; str = selectFrom(mmoClasses); break;
					case 3: part1Type = "epicNoun"; str = selectFrom(epicNouns); break;
				}
				return capitalize(str);
			}	
			
			

			var createPart2 = function() { 
				var str;
				switch (ranNum(1,2)) { //we can add more cases to part2 if needed
					case 1: str = selectFrom(app.materials); break;
					case 2: str = selectFrom(app.adjectives); break;
				}
				return capitalize(str);
			}  


			var part1sChecker = function(strType, param) {
				var incomingStr = param;
				if (strType == "shortName") {
						if (incomingStr.match(/s$/)) {//if name ends in s
							incomingStr = incomingStr + "'";
						} else {
							incomingStr = incomingStr + "'s";
						}				
					} else if (strType == "mmoClass" || strType == "epicNoun") {
						if (chance(50)) {
							if(incomingStr.match(/s$/)){
								incomingStr = incomingStr + "'";
							} else {
								incomingStr = incomingStr + "'s";
							}			
						}	
					} else { console.log("ERROR: part1sChecker failed to read parameter strType."); }
				return incomingStr;	
			}
		
            var part1 = createPart1(), part2 = createPart2(), result; 
            
			switch (ranNum(1,2)) {	
				case 1:
					part1 = part1sChecker(part1Type, part1);
					result = part1+" "+part2+" "+itemBase;
					if (chance(50)) {
						result = result +" of "+ capitalize(selectFrom(epicNouns));
					}
					break;		
					
				case 2:
					var combo = capitalize(selectFrom(prefixes)) + selectFrom(suffixes);
					part1 = part1sChecker(part1Type, part1);			
					switch(ranNum(1,3)){
						case 1: result = combo; break;
						case 2: result = part1 +" "+ combo; break;
						case 3: result = part1 +" "+ part2 +" "+ combo; break;
					}
					if (chance(25)) {
						result = result +" of "+ capitalize(selectFrom(epicNouns));
					} 
					break;		
			}
			//console.log("highItem result: "+result);
			return result;
		} 
        
        //console.log("highItem: "+highItem());
		  
        
		var itemName;
		
		if (rarity==="legendary" ||  rarity==="set" || rarity==="mythic"){ //high, med or low name
			var highNameChance = 90, medNameChance = 5;
			var num = ranNum(0,100)
			if (num < highNameChance) {
				itemName = createHighItem();
			} else if (num < (highNameChance+medNameChance)) {
				itemName = createMedItem();
			} else {
				itemName = createLowItem();
			}
		} else if (rarity==="rare" || rarity==="magic") { //med or low name		
			if (chance(80)) {
				itemName = createMedItem();
			} else {
				itemName = createLowItem();
			}		
		} else { //low name only
			itemName = createLowItem();
		}

		return itemName;
	}, 
	
	createRandomItem: function(){
		var app = rpgItemGen, itemName = "";
		var itemType = app.selectFrom(["amulet", "artifact", "axe", "bow", "hammer", "mace", "potion", "spear", "staff", "sword"]);
		var itemRarity = app.selectFrom(["normal", "magic", "rare", "legendary", "set", "mythic"]);	
		itemName = app.createItem(itemType, itemRarity)
		return itemName;	
	},


	
	"namepack": {
			
		"fantasyCombi1": [ // prefix 
			'Abad','Aci','Agr','Akri','Alc','Alk','Anv','Arm', 'Arma','Asta','Ast','Bae','Bal','Balth','Barba','Bar','Baar','Basi','Baur','Bhe','Bho','Brak','Bro','Buk','Chim','Cor','Corg','Cyc','Cyr','Dai','Daid','Dak','Dant','Dece','Decu','Dei','Dem','Dhag','Doom','Dram','Dus','Dy','Ep','Eth','Fen','Fer','Gali','Ghe','Gho','Gna','Gunn','Harr','Hek','Hel','Hes','Hor','Hur','Jao','Jaq','Jav','Jum','Kai','Kais','Kaos','Kav','Kerb','Khac','Kha','Khal','Khan','Khao','Khym','Kob','Kos','Kosm','Krae','Kron','Kro','Ky','Kyr','Lev','Magn','Mali','Mal','Medy','Mep','Mino','Min','Mont','Mord','Mox','Muta','Naix','Natu','Nov','Nox','Numi','Nyb','Nyd','Obs','Ocu','Ora','Phal','Phob','Phor','Plu','Poc','Pros','Pyr','Rab','Rein','Roa','Ror','Rub','Scal','Sky','Smul','Spir','Spi','Styx','Syba','Syr','Taif','Tal','Tar','Tem','Tempes','Terb','Tha','Thor','Thro','Tita','Trac','Trun','Tur','Tyb','Tybe','Tych','Typh','Typ','Ty','Vi','Vor','Vuk','Vyp','Vyx','Wor','Zahm','Zeg','Zuf','Bei','Carn','Cas','Ce','Che','Eil','Ele','Exa','Fos','Goi','Jei','Ko','Mont','Mos','Nou','Oab','Pro','Psych','Sak','Scau','Se','Strau','Sum','Ta','Taj','Tas','Trep','Vasc','Vio','Vir','Mega','Giga','Zargo','Ultra'	
		],
		
		"fantasyCombi2": [ // suffix
			'ano','abal','ago','aine','am','aos','aphon','aq','aren','aria','aros','arte','atan','atar','ator','bari','baro','ber','berio','bero','bius','bra','che','chos','cia','cus','da','dan','datar','deo','dine','don','dor','dos','dryl','dud','dysa','eas','el','ene','er','erus','esh','estus','fem','fire','fix','foon','fyr','gad','gath','ger','gnar','gnus','go','gon','hac','han','hez','hm','idus','iel','ilon','imos','ina','ion','ios','iros','iser','isk','ist','ite','iv','jak','kate','ko','kye','lanx','lder','ldris','lia','line','lis','los','loth','lxud','mar','mera','mine','mor','morth','munus','myre','mys','nazz','nides','noa','nos','nox','oark','obos','och','omm','one','ono','onos','or','orax','os','osh','ova','per','pero','phon','phos','rax','rbuk','rene','res','ress','ria','roc','rom','ron','ront','ros','roth','rott','rox','rrus','ruby','rus','ry','sive','sus','tan','taros','thus','tos','tov','tres','tress','tuc','tux','uano','uma','unn','utak','uter','vania','vil','vios','vohk','vuk','vyn','wadus','xadon','xos','yber','ydus','yne','yper','yros','yx','zuno','zoul','ooze'	
		],
		
		"folkNames": [ // list of common folklore names: 520 names
			'Acadine','Acheri','Adamastor','aetites','Agta','Ahes','Ahkiyyini','Aitvaras','Ajatar','Albasti', 'Alan','Alastyn','Alatyr','Alfar','Alp','Alrunes','Alves','Alvina','Alyosha Popovitch','Am','Amleth','Amphisbaena','angau','AnhangÃ¡','Anjanas','Ankou','Anthropophagi','arkan sonney','Arquetu','Asrai','Aswang','Auld Clootie','Azeman','Baba Dochia','Baba Yaga','Babe','Bagat','Banshee','Baobhan Sith','Barbegazi','Bardi','Barghest','Basilisk','Bawang','Bean Nighe','Bean Sidhe','Beast epic','Beast of Lettir Dallan','Befana La','Bendith Y Mamau','Beowulf','Bernardo del Caprio','Bertha','bhut','Bicho-PapÃ£o','Bicorn','Biersal','Bigfoot','Billy Blin','Bishop-fish','Black Annis','Black Dog','Black Donald','Black Peter','Black Shuck','Blarney Stone','Blemmyes','Bloody-bones','Bogeyman','Boggart','Bogie','Bolla','Boobrie','Booyan','Boto','Bozaloshtsh','Bran Galed','Bran','Brownie','Broxa','Bruin','Bubus','Bucca','Buggane','bunadh beag na farraige','bunadh na croc','Bunyan Paul','Burning Land-measurer','bwbach','Bwca','Caballucos del diablo','cabyll-ushtey','Cader Idris','Cadi','Caipora','Caladbolg','CaorÃ¡nach','Carlin','Cath Palug','Cathleen Ni Hoolihan','Catoblepas','Ceffyl-Dwr','Charcoal Crunchers','Chichevache','Chromandae','Cirein crÃ´in','Clootie','Colbronde','Colt-pixy','Corrigan','Cosanzeana Ileana','crion','Croquemitaine','cuachag','Cuca','Cuegle','Cuero','Culebre','Curupira','Cusith','Cythraul','Dana oShee','Dancing-Water','Daoine maite','Daoine Sidhe','Darrant','Davy Jones','Death Coach','Death-bell','Devils Dyke','Dhol','Djinnestan','Dobrynya Nikititch','Dolya','Dones daigua','DoppelgÃ¤nger','Dracs','Dragobete','Dragon','Draug','Durandal','Dwarf','Dwende','Dyeduska Vodyanoy','each uisge','Echeneis','El Dorado','Elena','Elf','Ellyon','Engkanto','Erlking','Erreka-Mari','Espumeros','FabiÃ¡n','Fachan','Fairy','FÃ¡lga','Fay','Fear Liath More','Feeorin','Fenoderee','Ferragus','Fetch','Feux follets','Fext','Fifinella','Fir Darrig','Firebird','Firedrake','Flabbaert','Flerus','Flying Dutchman','Foawr','Folklore','Fountain of Youth','Frau HÃ¼tt','Frau Welt','FreischÃ¼tz','Friar Tuck','Fuwch Frech','Gabbara','Gaborchend','Gagana','Gamayun','Gandreid','Garafena','Gardsvor','Gargouille','Gargoyle','Gedembai','Germakochi','Ghillie Dhu','Ghost','Giant','Glaistig','Glas Chairm','Glas Ghaibhneach','Glashtyn','Gnome','Goayr Heddagh','Goblin','Goborchend','Gorgoniy','Gorgonya','goric','Granny Wells','Grant','Greegrees','Green Man','Gremlin','Griffin','Grim Reaper','Gua Langsuir','Guadiana','Guarana','Guaxa','Gwrach y Rhibyn','Gwragedd Annwn','Gwyligi','Gwyllion','Gytrash','Haferbock','Hag','Hakenmann','Halloween','Hampelmann','Hans Hagen','Hans Heiling','Hantu Jarang Gigi','Harrowing Of Hell','Hatim Tai','Havelock the Dane','Hedley Kow','HeinzelmÃ¤nnchen','Herne','Hickathrift Tom','Hide','Hildesheim','Hipilik','Hippogriff','Hobgoblin','Holger Danske','Hombre del Saco','Horn Childe','Humber','HÃ¼velvÃ©ny','Iara','Igosha','Ijanas','Ilya Muromets','Imap Imassoursua','Imp','Incubus','Indrik the Beast','Island of the Seven Cities The','Itchetiky','Ivan Tsarevich','J','Jabberwock','Jack Frost','Jack In the Green','Jack o Lantern','Jack o the bowl','Jack-in-Irons','jalpari','Janggala','Jenny Greenteeth','Jimaninos','Jinn','John Barleycorn','junacke pesme','Kabouter','Kama-kama','Kapre','Karakoncolos','Karakura','Kaukis','Kekeko','Kelembai','Kelpie','Kenne','Kikimora','Killmoulis','King Horn','Kipriano','Kludde','Knocker','Kobold','Kornmutter','Kraken','Krasue','Kriksy','Kulshedra','La Chusa','La Llorona','Lair bÃ¡n','Lambton Worm','LamiÃ±as','Lampalugua','Lange Wapper','LantarÃ³n','Leanan Sidhe','Leprechaun','Leucrota','Liderc','LiekkiÃ¶','Little Dutch Boy The','Little Red Ridinghood','Lliannan-She','Lorelei','Luchtigern','Lucy St','Lunantishee','Lutin','Mab Queen','Mae Nak','Magnetic Mountain','Mahr','Maize','Makam Ajaib','Makara','Mamur','Manas','Mandrake','Manoa','Manticore','Mantyo','Mara','Marinka','Marmanhig','Marsk Stig','Masabakes','Mauleon','MÃ¡urari','Meigas','Melusine','Men Brayut','Mephistopheles','Mermaid','Merrow','Mhorag','Mimis','Mitmit','Moddey Dhoo','Monocoli','Monster of Loch Ness The','Morans Collar','Moshto','Motho and Mungo','Mu','Muirdris','Mula-sem-CabeÃ§a','Muryans','Naecken','Nahuelito','Nain Rouge','Nang Kwak','Nechistaia Sila','Nechistyi Dukh','Nejma','Nick','Niels Ebessen','Nippel','Nisse','Nixes','Nocnitsa','Noggle','Nuberu','Nuckelavee','Nunus','Ogier the Dane','Ogre','OilliphÃ©ist','Ojancanu','Old Harry','Olifant','Oliver','Orc','Orlando','Orm','Osschaart','Osschaert','Ouzelum Bird','Ox of Dil','Ozaena','Panotii','Panulay','Partridge in a Pear Tree','Paved ponds','Pecos Bill','Pedauque Queen','Peg Powler','Pere Noel','Pey','Phajanak','Phooka','Phra Upakud','Phynnodderee','Pigwidgin','Pillywiggins','Pixie','Plaksy','Plant Rhys Dwfen','Poj Ntxoog','Poki','Pop','Portunes','Prester John','Psezpolnica','Puck','puntianak','Red Cap','Revenant','River of the Princess','Robin Hood','RoblÃ³n','Roc','Roland','Rusalka','Safat','Sand-Man','Santa Claus', 'Sarut','Sasquatch','Satirmu','Scheherezade','Sciritae','Scratch','Sea Serpent','Sea Witches','Seelie Court','Selkie','Seua Saming','Shellycoat','Shivering Boy The','sianach','Sidhe','Sigbin','Skogsfru','Skrat','Sleeping Beauty The','sleih veggey yn','Sluag','Sluagh','Spriggan','Sprite','Squant','sthich','Stilzel','Stockwell Ghost','Stray Sod','Struthopodes','Su','Succubus','suileach','Swan May','Swiza','Sylph','Szepasszony','Table Mountain','Tai Hong','Tamawo','Tangie','tarbh uisge','tarroo ushtey','Tatzlwurm','Tavara','Tentirujo','ThayÃ¨','Thule','Tianak','Tiddy Ones','Tikbalang','Tomte','Trasgu','Trenti','Troll','Trow','tunnerez noz','Tutivillus','Tylwyth Teg','Uilepheist','Ukoy','Undine','Unicorn','Unseelie Court','Urisk','Vadleany','Vampire','VÃ¤ttar','Vegetable Lamb','Ventolines','Venusleute','Vitore','Vodnik','Vodyanoi','Vrykolakas','Waldmar King','Walpurgis Night','Wandering Jew','Water Leaper','Werewolf','Will-o-the-wisp','Witte Wieven','Wyvern','Xanas','Xindhi','Yali','Yeti','Zips','Zwarte Madam'	
		],
        
        spaceMarineNames: [
		  "Jago","Argel","Gal","Malithos","Cel","Sariel","Talos","Vandred","Eurydice","Ruven","Xarl","Cyrion","Raguel","Maruc","Cassian","Barek","Armanneus","Garlon","Garreon","Kaldemar","Sartak","Variel","Demetar","Darnath","Lexandro","Fafnir","Xeros","Franz","Phosis","Kheron","Tovac","Fal","Koor","Orrin","Anvrex","Ghilus","Phael","Amon","Ankhu","Mhotep","Revuel","Hedara","Azhtar","Herume","Mordant","Hakor","Hasophet","Julius","Solomon","Marius","Saul","Azael","Ravasch","Von","Callion","Jihar","Zarghan","Kadalus","Atesh","Pyriel","Sevatarion","Raldoron","Tal","Vorbak","Corswain","Kuln","Herec","Stronos","Ferron","Mercutian","Valcoran","Octavian","Anrathi","Malcharion","Mervallion","Montress","Adhemar","Vaughn","Zytos","Corgon","Valthex","Kursh","Kurskt","Prayd","Halbrecht","Polux","Tyr","Lycus","Loken","Hargrim","Boreas","Romuald","Thane","Gorr","Lysander","Taelos","Garadon","Octavius","Rann","Dantarian","Koorland","Carnak","Nereus","Mordelai","Nidon","Julan","Gauthard","Furan","Halasker","Naraka","Ophion","Hellath","Jakr","Jexad","Kergai","Kur","Maas","Skraivok","Silvadi","Tyridal","Berenon","Valzen","Thandos","Rushal","Decimus","Darjyr","Hemek","Vasylisk","Rarth","Venst","Arvida","Promalac","Daast","Manutec","Aphael","Hex","Khayon","Madox","Myrath","Naratt","Temekh","Tolbek","Kaesoron","Demetor","Vairosean","Tarvitz","Kleos","Ruen","Kalimos","Heliton","Daimon","Illios","Cario","Charmosion","Kalda","Zevan","Lorimarr","Lyras","Revellian","Orlantir","Leodrakk","Tarsa","Nemetor","Nubis","Ushorak","Volos","Toharan","Keryon","Urgaresh","Thorast","Skarh","Ghaan","Jerrak","Neroth"
	   ],	
        
        coolNames: [
		  "Abaddon","Acidos","Agrott","Ahriman","Akriloth","Alchos","Alkador","Amon","Anvil","Apollyon","Armaros","Astaroth","Astarte","Azazel","Baalberith","Bael","Balmor","Balthus","Baphomet","Barbaro","Bariel","Barkwhip","Bartuc","Basilisk","Baurus","Beast","Behemoth","Beherit","Bherda","Bhor","Blackheart","Blackleaf","Blacksoul","Bladefury","Bloodkeeper","Bloodstone","Bonesinger","Boulderfist","Brakkiz","Bront","Chemosh","Chimera","Corgo","Corgon","Crystal","Cyclos","Cyrene","Dagon","Dakko","Dantalion","Deathrock","Decessus","Decumar","Deimos","Demeas","Demogorgon","Dhagvohk","Doomsword","Dragonheart","Dram","Duskdancer","Dustblade","Dyress","Elfwolf","Epoch","Etherus","Fenix","Fenris","Ferrus","Fistgaze","Fistgazer","Fogshaper","Galine","Ghez","Ghomm","Gnazz","Goldscar","Goldshield","Goldskin","Gunn","Hades","Harrogath","Hekate","Helios","Hellblade","Hellcrest","Hesh","Horus","Huron","Ironfire","Ironheart","Jago","Jaq","Javyn","Juma","Kairos","Kaiser","Kaos","Kavios","Kerbero","Khac","Khaine","Khalxud","Khan","Khaos","Khymera","Kobra","Kosh","Kosmys","Kraedan","Krono","Kronos","Kyne","Kyros","Legion","Leviatan","Leviathan","Magnar","Malignus","Malis","Medysa","Mephos","Mercury","Midgard","Minoa","Minos","Moloch","Montress","Mordatar","Moxadon","Mutak","Naixos","Natux","Neruby","Nova","Nox","Numine","Nyber","Nydus","Obsidus","Ocus","Phalanx","Phobos","Phorax","Plutos","Pocus","Prospero","Pyros","Rabal","Reinhart","Roark","Rorbuk","Sabazios","Scaldris","Sharpshade","Silverdust","Skullsnarl","Skye","Smulder","Soulkeeper","Spite","Steelskin","Steelstride","Stoneheart","Stonesong","Stormtrapper","Styx","Sybari","Syrene","Taifoon","Talos","Tartaros","Tempero","Tempestus","Terbius","Tharos","Thorax","Throm","Titan","Trunox","Turoc","Tyber","Tyberio","Tyche","Typhon","Typhos","Tyrox","Viper","Vordud","Vuk","Vyper","Vyx","Warfare","Warheart","Warshaper","Whitetalon","Whoodoo","Worm","Zahm","Zegad","Zufem","Tharos","Artix","Assphyx","Efro","Zhimp","Solaria",
        ],
        


		buildFantasyName: function(arr) {
            var app = rpgItemGen;
			return app.selectFrom(app.namepack.fantasyCombi1) + app.selectFrom(app.namepack.fantasyCombi2); 
		},	

		
		buildFolkName: function() {
			//Pick two folk names, cut both and combine to form a new unique folk name 
			var app = rpgItemGen;
			var part1 = (app.selectFrom(app.namepack.folkNames)).toLowerCase();
			part1 = part1.charAt(0).toUpperCase() + part1.substr(1, app.ranNum(1,5));
			part1 = app.regex.removeWhitespaces(part1);
			part1 = app.regex.removeSpecialChars(part1);
			var part2 = (app.selectFrom(app.namepack.folkNames)).toLowerCase();
			part2 = app.regex.removeWhitespaces(part2);
			part2 = app.regex.removeSpecialChars(part2);
			part2 = part2.substring(part2.length - (app.ranNum(2, 6)), part2.length); // cut by the end of string
			return part1 + part2;	 
		},	

		getName: function() {
			var app = rpgItemGen, name;
            if (app.chance(50)){
                var names = [app.namepack.buildFantasyName(), app.namepack.buildFolkName()];
                name = app.selectFrom(names);
            } else {
                name = app.selectFromArrs([app.namepack.spaceMarineNames, app.namepack.coolNames]);
            }
            return name;
		},

        
		getShortName: function() {
			var app = rpgItemGen, str, chance = app.chance, selectFrom = app.selectFrom, selectFromArrs = app.selectFromArrs;
            
            //console.log("Getting shortName.");
			
			if (chance(50)) {
				if (chance(50)) {
					str = selectFrom(app.namepack.fantasyCombi1);
				} else {
					str = selectFrom(app.namepack.fantasyCombi2);
				}	
			} else {
                str = selectFromArrs([app.namepack.folkNames, app.namepack.spaceMarineNames, app.namepack.coolNames]);
                
				str = app.regex.removeWhitespaces(str);
				str = app.regex.removeSpecialChars(str);
										
				if (chance(50)) { //pick 3-5 letters from the start			
					str = str.substr(0, app.ranNum(3,5));	
				} else { //pick  3-5 letters from the end, chance to reverse
					str = str.substr( -(app.ranNum(3,5)) ); 
					if (chance(20)) {
						str = app.reverseString(str);
					}
				}
			}
			           
			str = app.capitalize(str.toLowerCase());
            //console.log("shortName: "+str);
			return str;			
		}//getShortName	
        
        
        
	}	
	
}	