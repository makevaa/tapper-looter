



const msg = (str, msgColor='default') => {
    const target = document.getElementById('msg-container');

    const elem = document.createElement('div');
    elem.classList.add('msg');
    elem.innerHTML = str;

    let color = 'white';
    if (msgColor !== 'default') {
        color = msgColor;
    }
     
    elem.style.color = color;

    target.append(elem);

    setTimeout(() => {
        
     elem.style.opacity = 0;
    }, 500);


    setTimeout(() => {
        elem.remove();
    }, 1500 + 500);


}