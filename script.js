
const darks = document.querySelectorAll('.dark');
const tds = document.querySelectorAll('td');

tds.forEach((element, index) => {
    if(!element.dataset.id) {
        element.dataset.id = index;
    }
});

darks.forEach(element => {
    element.addEventListener('dragstart', e => {
        e.target.setAttribute('id', 'taken')
        e.dataTransfer.setData('id', e.target.id);
    })
    element.addEventListener("dragover", e => {
        e.preventDefault();
    });
});

darks.forEach(element => {
    element.addEventListener("drop", e => {
        if (e.target.tagName !== 'TD' || e.target.firstElement) {
            return;
        }
        let id = e.dataTransfer.getData('id');
        let takenDraughts = document.getElementById(id);

        let difference;
        function differenceCount () {
            difference = Math.abs(e.target.dataset.id - takenDraughts.parentElement.dataset.id);
        }
        differenceCount();

        if(difference == 14 || difference == 18) {
            let avarage = (+takenDraughts.parentElement.dataset.id + +e.target.dataset.id)/2;
            tds.forEach(element => {
                if(element.dataset.id == avarage && element.firstElementChild && 
                    !element.firstElementChild.classList.contains(takenDraughts.classList[0])) {
                    setTimeout(() => {
                        element.firstElementChild.remove();
                    }, 100);
                } else {
                    return;
                }
                e.target.appendChild(takenDraughts);
            });   
        }
        
        if(takenDraughts.classList.contains('red') && +e.target.dataset.id < +takenDraughts.parentElement.dataset.id) {
            takenDraughts.removeAttribute('id');
            return;
        }
        
        if(takenDraughts.classList.contains('black') && +e.target.dataset.id > +takenDraughts.parentElement.dataset.id) {
            takenDraughts.removeAttribute('id');
            return;
        }
        
        takenDraughts.removeAttribute('id');

        if(difference == 7 || difference == 9) {
            e.target.appendChild(takenDraughts);
            return;
        }
    });
});




