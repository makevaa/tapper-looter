const log = console.log;
const viewportW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const viewportH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const mainMenuTitle = document.getElementById('title');
const mainMenuElem = document.getElementById('menu-container');



const ranNum = (min,max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const selectFrom = arr => {
	return arr[ranNum(0, arr.length-1)];
}
    
const selectFromArrs = arrayOfArrays => {
	return selectFrom(selectFrom(arrayOfArrays))
}
	
const chance = chancePercent =>  {
	if (ranNum(1,100) <= chancePercent){
		return true;
	} else {
		return false;
	}
}	

const chanceFrac = fraction => {
	if (Math.random() <= fraction){
		//log(`Hit drop for drop rate: ${fraction}`)
		return true;
	} else {
		return false;
	}
}	

/*
// test chanceFrac
for (let i=0; i<10000; i++) {
	const dropRate = 1/250; //0.01
	chanceFrac(dropRate);
	//log(Math.random())
}
*/

const shuffleArr = arr => {
	for (let i = arr.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
	}		
}
	
function toTitleCase(str) {
	return str.replace(
	  /\w\S*/g,
	  function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  }
	);
  }


const hideModal = () => {
    modal.style.opacity = 0;

    const windows = document.querySelectorAll('#modal-container > .modal-window');
    
    setTimeout(() => {
        modal.style.visibility = 'hidden';

        for (const win of windows) {
            win.style.visibility = 'hidden';
            //win.style.opacity = 0;
        }
      }, 200);
	enableMainMenuTitleAnimation(true);
}

const showModal = targetName => {
    const target = document.querySelector(`#modal-container > .modal-window.${targetName}`);
    
    target.style.visibility = 'visible';
	//modal.style.opacity = 1;
    modal.style.visibility = 'visible';
    modal.style.opacity = 1;
    //target.style.opacity = 1;
	enableMainMenuTitleAnimation(false);
}




const showMenu = (show=true) => {
	const elem = mainMenuElem;
    if (show) { // Show
		elem.style.visibility = 'visible';
		elem.style.opacity = 1;
		enableMainMenuTitleAnimation(true);
    } else { // Hide 
		elem.style.opacity = 0;
		setTimeout(() => {
			elem.style.visibility = 'hidden';
			enableMainMenuTitleAnimation(false);
		}, 200);
    }
}

const setUniqueListInMenu = () => {
	const target = document.getElementById('unique-list');
	const uniqueList = Object.getOwnPropertyNames(uniques);
	uniqueList.sort();
	for (const item of uniqueList) {
		const elem = document.createElement('li');
		elem.innerHTML = `<span style="color:#a79a6d;">${item}</span>`;
		target.append(elem);
	}
}


const enableMainMenuTitleAnimation = enable => {
	//log('enableMainMenuTitleAnimation')
	if (enable) {
		mainMenuTitle.classList.add('red-glow-animation');
	} else {
		mainMenuTitle.classList.remove('red-glow-animation');
	}
}

