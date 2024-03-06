const log = console.log;
const viewportW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const viewportH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

const ranNum = function(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const selectFrom = function(arr) {
	return arr[ranNum(0, arr.length-1)];
}
    
const selectFromArrs = function(arrayOfArrays) {
	return selectFrom(selectFrom(arrayOfArrays))
}
	
const chance = function(chancePercent) {
	if (ranNum(1,100) <= chancePercent){
		return true;
	} else {
		return false;
	}
}	

const shuffleArr = function(arr) {
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
  
}

const showModal = targetName => {
    const target = document.querySelector(`#modal-container > .modal-window.${targetName}`);
    
    target.style.visibility = 'visible';
    modal.style.visibility = 'visible';
    modal.style.opacity = 1;
    //target.style.opacity = 1;
}




const showMenu = (show=true) => {
    const menu = document.getElementById('menu-container');
    let visi, opa;

    if (show) {
        // Show menu
        visi = 'visible';
		opa = 1;
        //menu.classList.remove('hidden');

    } else {
        // Hide menu
        visi = 'hidden';
		opa = 0;
        //menu.classList.add('hidden');
    }

	menu.style.visibility = visi;
	menu.style.opacity = opa;

	/*
	if (show) {
		menu.style.visibility = visi;
		menu.style.opacity = opa;
	} else {
		menu.style.opacity = opa;
		setTimeout(() => {
			menu.style.visibility = visi;
		}, 200);
	}
	*/

}
