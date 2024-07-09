/***************
	hero-gen.js
	this hero-gen version has been customized for TapperLooter

	This library generates cool sounding hero/warrior names.
	
	Methods:	
		heroGen.getName() //return one random hero name
***************/

var heroGen = {

	fantasyCombi1: [ // Prefix 
		'Abad','Aci','Agr','Akri','Alc','Alk','Anv','Arm', 'Arma','Asta','Ast','Bae','Bal','Balth','Barba','Bar','Baar','Basi','Baur','Bhe','Bho','Brak','Bro','Buk','Chim','Cor','Corg','Cyc','Cyr','Dai','Daid','Dak','Dant','Dece','Decu','Dei','Dem','Dhag','Doom','Dram','Dus','Dy','Ep','Eth','Fen','Fer','Gali','Ghe','Gho','Gna','Gunn','Harr','Hek','Hel','Hes','Hor','Hur','Jao','Jaq','Jav','Jum','Kai','Kais','Kaos','Kav','Kerb','Khac','Kha','Khal','Khan','Khao','Khym','Kob','Kos','Kosm','Krae','Kron','Kro','Ky','Kyr','Lev','Magn','Mali','Mal','Medy','Mep','Mino','Min','Mont','Mord','Mox','Muta','Naix','Natu','Nov','Nox','Numi','Nyb','Nyd','Obs','Ocu','Ora','Phal','Phob','Phor','Plu','Poc','Pros','Pyr','Rab','Rein','Roa','Ror','Rub','Scal','Sky','Smul','Spir','Spi','Styx','Syba','Syr','Taif','Tal','Tar','Tem','Tempes','Terb','Tha','Thor','Thro','Tita','Trac','Trun','Tur','Tyb','Tybe','Tych','Typh','Typ','Ty','Vi','Vor','Vuk','Vyp','Vyx','Wor','Zahm','Zeg','Zuf','Bei','Carn','Cas','Ce','Che','Eil','Ele','Exa','Fos','Goi','Jei','Ko','Mont','Mos','Nou','Oab','Pro','Psych','Sak','Scau','Se','Strau','Sum','Ta','Taj','Tas','Trep','Vasc','Vio','Vir','Mega','Giga','Zargo','Ultra'	
	],
	
	fantasyCombi2: [ // Suffix
		'ano','abal','ago','aine','am','aos','aphon','aq','aren','aria','aros','arte','atan','atar','ator','bari','baro','ber','berio','bero','bius','bra','che','chos','cia','cus','da','dan','datar','deo','dine','don','dor','dos','dryl','dud','dysa','eas','el','ene','er','erus','esh','estus','fem','fire','fix','foon','fyr','gad','gath','ger','gnar','gnus','go','gon','hac','han','hez','hm','idus','iel','ilon','imos','ina','ion','ios','iros','iser','isk','ist','ite','iv','jak','kate','ko','kye','lanx','lder','ldris','lia','line','lis','los','loth','lxud','mar','mera','mine','mor','morth','munus','myre','mys','nazz','nides','noa','nos','nox','oark','obos','och','omm','one','ono','onos','or','orax','os','osh','ova','per','pero','phon','phos','rax','rbuk','rene','res','ress','ria','roc','rom','ron','ront','ros','roth','rott','rox','rrus','ruby','rus','ry','sive','sus','tan','taros','thus','tos','tov','tres','tress','tuc','tux','uano','uma','unn','utak','uter','vania','vil','vios','vohk','vuk','vyn','wadus','xadon','xos','yber','ydus','yne','yper','yros','yx','zuno','zoul','ooze'	
	],
	
	folkNames: [ // list of common folklore names: 520 names
		'Acadine','Acheri','Adamastor','aetites','Agta','Ahes','Ahkiyyini','Äi','Aitvaras','Ajatar','Al basti','Alan','Alastyn','Alatyr','Alfar','Alp','Alrunes','Alves','Alvina','Alyosha Popovitch','Am','Amleth','Amphisbaena','angau','Anhangá','Anjanas','Ankou','Anthropophagi','arkan sonney','Arquetu','Asrai','Aswang','Auld Clootie','Azeman','Baba Dochia','Baba Yaga','Babe','Bagat','bánánach','Banshee','Baobhan Sith','Barbegazi','Bardi','Barghest','Basilisk','Bawang','Bean Nighe','Bean Sidhe','Beast epic','Beast of Lettir Dallan','Befana La','Bendith Y Mamau','Beowulf','Bernardo del Caprio','Bertha','bhut','Bicho-Papão','Bicorn','Biersal','Bigfoot','Billy Blin','Bishop-fish','Black Annis','Black Dog','Black Donald','Black Peter','Black Shuck','Blarney Stone','Blemmyes','Bloody-bones','Bogeyman','Boggart','Bogie','Boitatá','Bolla','Boobrie','Booyan','Boto','Bozaloshtsh','Bran Galed','Bran','Brownie','Broxa','Bruin','Bubus','Bucca','Buggane','bunadh beag na farraige','bunadh na croc','Bunyan Paul','Burning Land-measurer','bwbach','Bwca','cìrein cròin','Caballucos del diablo','cabyll-ushtey','Cader Idris','Cadi','Caipora','Caladbolg','Caoránach','Carlin','Cath Palug','Cathleen Ni Hoolihan','Catoblepas','Ceffyl-Dwr','Charcoal Crunchers','Chichevache','Chromandae','Cirein crôin','Clootie','Colbronde','Colt-pixy','copóg Phádraig','Corrigan','Cosanzeana Ileana','crion','Croquemitaine','cuachag','Cuca','Cuegle','Cuero','Culebre','Curupira','Cusith','Cythraul','Dana oShee','Dancing-Water','Daoine maite','Daoine Sidhe','Darrant','Davy Jones','Death Coach','Death-bell','Devils Dyke','Dhol','Djinnestan','Dobrynya Nikititch','Dolya','Dones daigua','Doppelgänger','Dracs','Dragobete','Dragon','Draug','Durandal','Dwarf','Dwende','Dyeduska Vodyanoy','each uisge','Echeneis','El Dorado','Elena','Elf','Ellyon','Engkanto','Erlking','Erreka-Mari','Espumeros','Fabián','Fachan','Fairy','Fálga','Fay','Fear Liath More','Feeorin','Fenoderee','Ferragus','Fetch','Feux follets','Fext','Fifinella','Fir Darrig','Firebird','Firedrake','Flabbaert','Flerus','Flying Dutchman','Foawr','Folklore','Fountain of Youth','Frau Hütt','Frau Welt','Freischütz','Friar Tuck','Fuwch Frech','Gabbara','Gaborchend','Gagana','Gamayun','Gandreid','Garafena','Gardsvor','Gargouille','Gargoyle','Gedembai','Germakochi','Ghillie Dhu','Ghost','Giant','Glaistig','Glas Chairm','Glas Ghaibhneach','Glashtyn','Gnome','Goayr Heddagh','Goblin','Goborchend','Gorgoniy','Gorgonya','goric','Granny Wells','Grant','Greegrees','Green Man','Gremlin','Griffin','Grim Reaper','Gua Langsuir','Guadiana','Guarana','Guaxa','Gwrach y Rhibyn','Gwragedd Annwn','Gwyligi','Gwyllion','Gytrash','Haferbock','Hag','Hakenmann','Halloween','Hampelmann','Hans Hagen','Hans Heiling','Hantu Jarang Gigi','Harrowing Of Hell','Hatim Tai','Havelock the Dane','Hedley Kow','Heinzelmännchen','Herne','Hickathrift Tom','Hide','Hildesheim','Hipilik','Hippogriff','Hobgoblin','Holger Danske','Hombre del Saco','Horn Childe','Humber','Hüvelvény','Iara','Igosha','Ijanas','Ilya Muromets','Imap Imassoursua','Imp','Incubus','Indrik the Beast','Írusán','Island of the Seven Cities The','Itchetiky','Ivan Tsarevich','J','Jabberwock','Jack Frost','Jack In the Green','Jack o Lantern','Jack o the bowl','Jack-in-Irons','jalpari','Janggala','Jenny Greenteeth','Jimaninos','Jinn','John Barleycorn','junacke pesme','Kabouter','Kama-kama','Kapre','Karakoncolos','Karakura','Kaukis','Kekeko','Kelembai','Kelpie','Kenne','Kikimora','Killmoulis','King Horn','Kipriano','Kludde','Knocker','Kobold','Kornmutter','Kraken','Krasue','Kriksy','Kulshedra','La Chusa','La Llorona','Lair bán','Lambton Worm','Lamiñas','Lampalugua','Lange Wapper','Lantarón','Leanan Sidhe','Leprechaun','Leucrota','Liderc','Liekkiö','Little Dutch Boy The','Little Red Ridinghood','Lliannan-She','Lorelei','Luchtigern','Lucy St','Lunantishee','Lutin','Mab Queen','Mae Nak','Magnetic Mountain','Mahr','Maize','Makam Ajaib','Makara','Mamur','Manas','Mandrake','Manoa','Manticore','Mantyo','Mara','Marinka','Marmanhig','Marsk Stig','Masabakes','Mauleon','Máurari','Meigas','Melusine','Men Brayut','Mephistopheles','Mermaid','Merrow','Mhorag','Mimis','Mitmit','Moddey Dhoo','Monocoli','Monster of Loch Ness The','Morans Collar','Moshto','Motho and Mungo','Mu','Muirdris','Mula-sem-Cabeça','Muryans','Naecken','Nahuelito','Nain Rouge','Nang Kwak','Nechistaia Sila','Nechistyi Dukh','Nejma','Nick','Niels Ebessen','Nippel','Nisse','Nixes','Nocnitsa','Noggle','Nuberu','Nuckelavee','Nunus','Ogier the Dane','Ogre','Oilliphéist','Ojancanu','Old Harry','Olifant','Oliver','Orc','Orlando','Orm','Osschaart','Osschaert','Ouzelum Bird','Ox of Dil','Ozaena','Panotii','Panulay','Partridge in a Pear Tree','Paved ponds','Pecos Bill','Pedauque Queen','Peg Powler','Pere Noel','Pey','Phajanak','Phooka','Phra Upakud','Phynnodderee','Pigwidgin','Pillywiggins','Pixie','Plaksy','Plant Rhys Dwfen','Poj Ntxoog','Poki','Pop','Portunes','Prester John','Psezpolnica','Puck','puntianak','Red Cap','Revenant','River of the Princess','Robin Hood','Roblón','Roc','Roland','Rübenzahl','Rusalka','Sací-Pererê','Safat','Sand-Man','Santa Claus','Sarut','Sasquatch','Satirmu','Scheherezade','Sciritae','Scratch','Sea Serpent','Sea Witches','Seelie Court','Selkie','Seua Saming','Shellycoat','Shivering Boy The','sianach','Sidhe','Sigbin','Skogsfru','Skrat','Sleeping Beauty The','sleih veggey yn','Sluag','Sluagh','Spriggan','Sprite','Squant','sthich','Stilzel','Stockwell Ghost','Stray Sod','Struthopodes','Su','Succubus','suileach','Swan May','Swiza','Sylph','Szepasszony','Table Mountain','Tai Hong','Tamawo','Tangie','tarbh uisge','tarroo ushtey','Tatzlwurm','Tavara','Tentirujo','Thayè','Thule','Tianak','Tiddy Ones','Tikbalang','Tomte','Trasgu','Trenti','Troll','Trow','tunnerez noz','Tutivillus','Tylwyth Teg','Uilepheist','Ukoy','Undine','Unicorn','Unseelie Court','Urisk','Vadleany','Vampire','Vättar','Vegetable Lamb','Ventolines','Venusleute','Vitore','Vodnik','Vodyanoi','Vrykolakas','Waldmar King','Walpurgis Night','Water Leaper','Werewolf','Will-o-the-wisp','Witte Wieven','Wyvern','Xanas','Xindhi','Yali','Yeti','Zips','Zwarte Madam'	
	],
	
	jobs: [
		'Acolyte','Adventurer','Aegis','Agent','Alchemist','Angel','Animist','Annihilator','Arcanist','Archer','Archivist','Archon','Artificier','Aspect','Assassin','Autarch','Avenger','Barbarian','Bard','Baron','Battlemind','Beast','Beastlord','Berserker','Betrayer','Blackguard','Blade','Blademaster','Bladesinger','Bloodletter','Bloodlord','Bounty Hunter','Breaker','Brigand','Brute','Bulwark','Butcher','Cavalier','Centurion','Champion','Chief','Chieftain','Citadel','Cleric','Commander','Conjurer','Conqueror','Corruptor','Corsair','Count','Crusader','Crusher','Custodian','Deceiver','Defender','Defiler','Demon','Demonhunter','Desecrator','Destroyer','Dragonslayer','Dragoon','Druid','Duelist','Duke','Duskblade','Elementalist','Emperor','Enchanter','Enforcer','Enslaver','Exarch','Executioner','Fanatic','Fiend','Fighter','Flayer','Forger','Gargant','General','Giant','Gladiator','Golem','Goliath','Guard','Guardian','Harbinger','Harvester','Healer','Herald','Hexblade','Holy Knight','Horror','Hunter','Illusionist','Impaler','Imperator','Imperial','Incarnate','Incarnation','Inquisitor','Invoker','Judicator','Juggernaut','King','Knight','Lancer','Legate','Legioner','Legionnaire','Lord','Magi','Mauler','Marauder','Marshal','Master','Mercenary','Monk','Monolith','Monster','Monstrosity','Moonshadow','Mutant','Mutilator','Mystic','Necromancer','Nightblade','Noble','Oppressor','Oracle','Outlaw','Overlord','Overseer','Paragon','Priest','Prince','Privateer','Prophet','Protector','Pulverizer','Punisher','Raider','Ranger','Ravager','Reaper','Reaver','Rebel','Redeemer','Renegade','Rider','Ripper','Ritualist','Ruler','Rune Knight','Runepriest','Runesmith','Sage','Savior','Scavenger','Scourge','Seeker','Seeker','Seer','Sentinel','Shade','Shadowdancer','Shapeshifter','Shatterer','Sire','Slasher','Slavemaster','Slayer','Smasher','Soldier','Sorcerer','Soulknife','Spellblade','Spelldancer','Spidermage','Strider','Subjugator','Swordmaster','Swordsage','Templar','Terror','Titan','Tormentor','Totemist','Transmuter','Traveler','Trooper','Tyrant','Undead','Valkyrie','Vanguard','Vanquisher','Venomist','Vizier','Walker','Wanderer','Warlock','Warlord','Warmage','Warper','Warrior','Whipmaster','Witch','Witchhunter','Zealot'
	],
	
	
	materials: [
		"Steel","Iron","Rock","Adamant","Stone","Fire","Light","Blood","Bone","Flesh","Ice","Mercury","Metal","Venom","Aether","Thunder","Fire","Silver","Mithril","Mud","Lightning","Brass","Bronze","Crystal","Platinum",'onyx'
	],
	
	coolNouns: [
		"Skies","Depths","Dimensions","Dreams","Dynasties","Empires","Immortals","Iron","Legions","Light","Overworlds","Realms","Souls","Underworlds","War","Worlds","Creation","Empyrean","Grace","Immortality","Infinity","Invincibility","Lies","Madness","Malady","Maladies","Malice","Order","Peace","Secrets","Shadows","Solitude","Stars","Truths","War","Wishes","Warfare","Void","Spirit","Shadow","Serpent","Titan","Paragon","Horizon","Star","Hope","Fire","Mercy","Excess","Glory","Justice","Sorrow","Talons","Wrath","Horizons","Forests","Jade","Magnetism","Progress","Blight","Void","Perseverance","Moon","Guardian","Aether","Malevolence","Sky","Sun","Winter","Seasons","Ages","Heaven","Freedom","Pain","Torment","Agony","Triumph","Glory","Earth","Valhalla","Hyperborea","North","Magick","Fate","Hellfire","Grandeur","Hatred","Witchcraft","Witchery","Storm","Snake","Fate","Destinys","Stone","Emerald","Sapphire","Ruby","Diamond","Silver","Gold","Metal","Covenant","Crystal","Dimension","Dynasty","Empire","Legion","Overworld","Underworld","Malady","Horizon","Talon","Jade","Machine","Sol","Cloud","Starlight","Shine","Thunder","Command",
	],
	
	weapons: [
		"Axe","Blade","Claw","Hammer","Lance","Mace","Maul","Scythe","Fang","Spear","Sword","Talon","Club","Staff","Broadsword","Claymore","Javelin","Stick","Dagger","Scepter","Wand","Cutlass","Sabre","Warhammer","Scimitar","Bow","Crossbow","Knife","Hatchet","Fist","Claw","Tooth",
	],

	adjectives: [
		"Abyssal","Ancient","Armored","Arcane","Baleful","Betrayed","Blighted","Boundless","Burning","Carnivorous","Celestial","Chameleon","Chaos","Colossal","Condemned","Cosmic","Crescent","Crimson","Crystalline","Cursed","Dark","Deathless","Desecrated","Divine","Empyrean","Eternal","Ethereal","Fallen","Feral","Final","Forgotten","Foul","Gargantuan","Golden","Holy","Immortal","Imperial","Invincible","Lamented","Last","Mad","Mystic","Mythic","Nether","Primal","Primordial","Radiant","Revered","Righteous","Runic","Runite","Sanctified","Twilight","Underworld","Undying","Unholy","Unknown","Unliving","Venomous","Wild","Winged","Phantom","Explosive", "Black", "Red","Brutish","Brutal","Mighty","Immaculate","Scorned","Horned","Masked","Hidden","Heartless","Demonic","Savage","Proud","Magnificent","Exquisite","Excessive","Perfect","Crownless","Ageless","Blessed","Chained","Corrupt","Corrupted","Refined","Unchained","Angelic","Blind","Brazen","Flawless","Graceful","Majestic","Serpentine","Zealous","Shining","Skeletal","Obsidian","Astral","Glacial","Grand","Onixian","Royal","Dimensional","Temporal","Heavenly","Blessed","Infinite","Toxic","Infused","Tranquil","Raw","Bloody","Painful","Tribal","Artificial","Black","Draconian"
	],
	
	epicPrefixes: [
		"Blood","Bone","Chaos","Doom","Dragon","Fire","Flesh","Iron","Mind","Night","Poison","Shock","Skull","Soul","Spirit","Steel","Storm","Thorn","Venom","Void","War","Stone","Sky","Dusk","Splinter","Power","Star","Metal","Gold","Shadow","Silver","Frost","Falcon","Magic","Moon","Magma"
	],
	
	epicSuffixes: [
		"axe","beast","blade","bloom","born","bound","brand","breaker","bringer","curse","eater","fist","flayer","force","hammer","head","heart","hunger","hunt","hunter","kin","metal","pact","seeker","shackle","shatter","shield","shroud","skin","soul","spark","spike","spirit","storm","stride","strider","sword","talon","teeth","thirst","thorn","thunder","tooth","fang","claw","wing","terror","bleeder","caller","fury","gaze","gazer","maul","rage","scream","seeker","spike","thunder","walker","stealer","slayer"
	],
	
	miscEpicNouns: [
		"Skies","Depths","Dimensions","Dreams","Dynasties","Empires","Immortals","Iron","Legions","Light","Overworlds","Realms","Souls","Underworlds","War","Worlds","Creation","Empyrean","Grace","Immortality","Infinity","Invincibility","Lies","Madness","Malady","Maladies","Malice","Order","Peace","Secrets","Shadows","Solitude","Stars","Truths","War","Wishes","Warfare","Void","Spirit","Shadow","Serpent","Titan","Paragon","Horizon","Star","Hope","Fire","Mercy","Excess","Glory","Justice","Sorrow","Talons","Wrath","Horizons","Forests","Jade","Magnetism","Progress","Blight","Void","Perseverance","Moon","Guardian","Aether","Malevolence","Sky","Sun","Winter","Seasons","Ages","Heaven","Freedom","Pain","Torment","Agony","Triumph","Glory","Earth","Valhalla","Hyperborea","North","Magick","Fate","Hellfire","Grandeur","Hatred","Witchcraft","Witchery","Storm","Snake","Fate","Destinies",
	],
	
	spaceMarineNames: [
		"Jago","Argel","Gal","Malithos","Cel","Sariel","Talos","Vandred","Eurydice","Ruven","Xarl","Cyrion","Raguel","Maruc","Cassian","Barek","Armanneus","Garlon","Garreon","Kaldemar","Sartak","Variel","Demetar","Darnath","Lexandro","Fafnir","Xeros","Franz","Phosis","Kheron","Tovac","Fal","Koor","Orrin","Anvrex","Ghilus","Phael","Amon","Ankhu","Mhotep","Revuel","Hedara","Azhtar","Herume","Mordant","Hakor","Hasophet","Julius","Solomon","Marius","Saul","Azael","Ravasch","Von","Callion","Jihar","Zarghan","Kadalus","Atesh","Pyriel","Sevatarion","Raldoron","Tal","Vorbak","Corswain","Kuln","Herec","Stronos","Ferron","Mercutian","Valcoran","Octavian","Anrathi","Malcharion","Mervallion","Montress","Adhemar","Vaughn","Zytos","Corgon","Valthex","Kursh","Kurskt","Prayd","Halbrecht","Polux","Tyr","Lycus","Loken","Hargrim","Boreas","Romuald","Thane","Gorr","Lysander","Taelos","Garadon","Octavius","Rann","Dantarian","Koorland","Carnak","Nereus","Mordelai","Nidon","Julan","Gauthard","Furan","Halasker","Naraka","Ophion","Hellath","Jakr","Jexad","Kergai","Kur","Maas","Skraivok","Silvadi","Tyridal","Berenon","Valzen","Thandos","Rushal","Decimus","Darjyr","Hemek","Vasylisk","Rarth","Venst","Arvida","Promalac","Daast","Manutec","Aphael","Hex","Khayon","Madox","Myrath","Naratt","Temekh","Tolbek","Kaesoron","Demetor","Vairosean","Tarvitz","Kleos","Ruen","Kalimos","Heliton","Daimon","Illios","Cario","Charmosion","Kalda","Zevan","Lorimarr","Lyras","Revellian","Orlantir","Leodrakk","Tarsa","Nemetor","Nubis","Ushorak","Volos","Toharan","Keryon","Urgaresh","Thorast","Skarh","Ghaan","Jerrak","Neroth"
	],	
		
	chance: function(precentChance) {
		var rnd = heroGen.ranNum(1,100);
		if (rnd <= precentChance) {
			return true;
		} else {
			return false;
		}		
	},
	
	ranNum: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;	
	},
	
	selectFrom: function(arr) {
		return arr[heroGen.ranNum(0, arr.length-1)]; 
	},
			
	selectFromArrs: function(arrayOfArrays) {
		return heroGen.selectFrom(heroGen.selectFrom(arrayOfArrays))
	},
	
	reverseString: function(str) {
		return str.split("").reverse().join("");
	},
		
	regex: {
		removeWhitespaces: function(str){
			return str.replace(/\s/g, "");
		},
		
		removeSpecialChars: function(str) {
			return str.replace(/[.]|[,]|[']|[-]/g, ""); 
		}	
	},
	
	capitalize: function(str) {
		return str.charAt(0).toUpperCase() + str.substr(1);
	},

		
	buildFantasyName: function(arr) {
		//Pick one element from two arrays and combine, element are cut parts from my own fantasy name lists 
		var app = heroGen;
		return app.selectFrom(app.fantasyCombi1) + app.selectFrom(app.fantasyCombi2); 
	},	
	
	buildFolkName: function() {
		//Pick two folk names, cut both and combine to form a new unique folk name 
		var app = heroGen, ranNum = app.ranNum, selectFrom = app.selectFrom;
		var part1 = (selectFrom(app.folkNames)).toLowerCase();
		part1 = part1.charAt(0).toUpperCase() + part1.substr(1, ranNum(1,5));
		part1 = app.regex.removeWhitespaces(part1);
		part1 = app.regex.removeSpecialChars(part1);
		var part2 = (selectFrom(app.folkNames)).toLowerCase();
		part2 = app.regex.removeWhitespaces(part2);
		part2 = app.regex.removeSpecialChars(part2);
		part2 = part2.substring(part2.length - (ranNum(2, 6)), part2.length); // cut by the end of string
		return part1 + part2;	 
	},	
	
	getSpaceMarineName: function() { 
		var app = heroGen; 
		return app.selectFrom(app.spaceMarineNames);
	},

	nameScheme: {
		
		simple: function(){
			var app = heroGen;
			var arrPossible = [app.buildFantasyName, app.buildFolkName, app.getSpaceMarineName];
			return app.selectFrom(arrPossible)();
		},	
		
		twoPart1: function(){
			var app = heroGen, part1;
			var arrPossible = [app.jobs, app.materials];
			part1 = app.selectFromArrs(arrPossible);
			return part1 + " " + app.selectFrom(app.jobs);
		},	
		
		twoPart2: function() {
			var app = heroGen, part1, part2;			
			var arrPossible = [app.jobs, app.adjectives];
			part2 = app.selectFromArrs(arrPossible);
			return app.nameScheme.simple() + ", the " + part2;	
		},
		
		twoPart3: function() {
			var app = heroGen;
			return app.nameScheme.simple() + ", the " + app.selectFrom(app.epicPrefixes) + app.selectFrom(app.epicSuffixes);	
		},		
		
		twoPart4: function() {
			var app = heroGen, part1;
			part1 = app.selectFrom(app.epicPrefixes) + app.selectFrom(app.epicSuffixes);
			var arrPossible = [app.jobs, app.adjectives];
			part2 = app.selectFromArrs(arrPossible);
			return app.selectFrom(app.epicPrefixes) + app.selectFrom(app.epicSuffixes) + ", the " + part2;	
		},	

		twoPart5: function() {
			var app = heroGen, part1, part2;
			part1 = app.selectFrom(app.jobs);
			part2 = app.nameScheme.simple();		
			if (app.chance(60)) {
				return part1 + " " + part2;
			} else {
				return part2 + " " + part1;
			}
		},

		twoPart6: function() {
			var app = heroGen, part1, part2;
			var arrPossible1 = [app.epicPrefixes, app.materials, app.coolNouns];
			var arrPossible2 = [app.weapons, app.jobs];
			part1 = app.selectFromArrs(arrPossible1);
			part2 = app.selectFromArrs(arrPossible2);
			return part1 + " " + part2;
		},	

		twoPart7: function() {  // Metalwing Skyterror
			var app = heroGen;
			return app.selectFrom(app.epicPrefixes) + app.selectFrom(app.epicSuffixes) + " " + app.selectFrom(app.epicPrefixes) + app.selectFrom(app.epicSuffixes);;
		},	

		threePart1: function() {
			var app = heroGen, part1, part2, str;		
			str = app.selectFrom(app.adjectives)+" "+app.selectFrom(app.jobs);
			if (app.chance(50)) {
				str += ",";
			} 			
			return str +" "+ app.nameScheme.simple();
		},				
		
		threePart2: function() {
			var app = heroGen, part2;
			var arrPossible = [app.epicPrefixes, app.epicSuffixes, app.materials, app.coolNouns, app.weapons];
			part2 = app.selectFromArrs(arrPossible);
			part2 = part2.charAt(0).toUpperCase() + part2.substr(1);		
			return app.selectFrom(app.adjectives)+" "+part2+" "+app.selectFrom(app.jobs);	
		},	
		
		threePart3: function() {
			var app = heroGen, part2;
			var arrPossible = [app.miscEpicNouns, app.materials];
			part3 = app.capitalize(app.selectFromArrs(arrPossible));		
			return app.nameScheme.simple()+", "+app.selectFrom(app.jobs)+" of "+part3;	
		},	
		
		threePart4: function() {	// Blasto, Explosive Soldier
			var app = heroGen;
			return app.nameScheme.simple()+", "+app.selectFrom(app.adjectives)+" "+app.selectFrom(app.jobs);	
		},		

		threePart5: function() {	// Bone Assassin, the Ripper | Skeleton Soldier, the Defiled
			var app = heroGen, part1, part2;
			var arrPossible1 = [app.epicPrefixes, app.materials, app.coolNouns];
			var arrPossible2 = [app.weapons, app.jobs];
			part1 = app.selectFromArrs(arrPossible1);
			part2 = app.selectFromArrs(arrPossible2);	
			return part1 + " " + part2 + ", the " + app.selectFrom(app.jobs);
		},	

		fourPart1: function() {	// Fire Sweeper Burning Hellion 
			var app = heroGen, part1, part2, part3, part3;
			var arrPossible1 = [app.epicPrefixes, app.epicSuffixes, app.materials, app.coolNouns];
			var arrPossible2 = [app.jobs, app.weapons, app.coolNouns];
			var arrPossible3 = [app.adjectives, app.coolNouns];
			part1 = app.capitalize(app.selectFromArrs(arrPossible1));	
			part2 = app.capitalize(app.selectFromArrs(arrPossible2));
			part3 = app.capitalize(app.selectFromArrs(arrPossible3));
			return part1 + " " + part2 + " " + part3 + " " + app.selectFrom(app.jobs);
		},				

		
	},	// end nameScheme object

	getName: function() {
		const app = heroGen;
		const nameSchemes = [ 
			app.nameScheme.simple, 
			app.nameScheme.twoPart1, 
			app.nameScheme.twoPart2,
			app.nameScheme.twoPart3,
			app.nameScheme.twoPart4,
			app.nameScheme.twoPart5,
			app.nameScheme.twoPart6,
			app.nameScheme.twoPart7,
			app.nameScheme.threePart1,
			app.nameScheme.threePart2,
			app.nameScheme.threePart3,
			app.nameScheme.threePart4,
			app.nameScheme.threePart5,
			app.nameScheme.fourPart1		
		]		
		return app.selectFrom(nameSchemes)();
	}

}
