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
	//modal.style.opacity = 1;
    modal.style.visibility = 'visible';
    modal.style.opacity = 1;
    //target.style.opacity = 1;
}




const showMenu = (show=true) => {
    const elem = document.getElementById('menu-container');

    if (show) { // Show
		elem.style.visibility = 'visible';
		elem.style.opacity = 1;
    } else { // Hide 
		elem.style.opacity = 0;
		setTimeout(() => {
			elem.style.visibility = 'hidden';
		}, 200);
    }
}

/*
const showMap = (show=true) => {
    const elem = document.getElementById('map-container');

    if (show) {
        // Show 
		elem.style.visibility = 'visible';
		elem.style.opacity = 1;

    } else {
        // Hide 
		elem.style.opacity = 0;
		setTimeout(() => {
			elem.style.visibility = 'hidden';
		}, 200);
    }
}
*/
