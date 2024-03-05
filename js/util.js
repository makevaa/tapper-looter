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


