
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
            let takenDrought = document.getElementById(id);
            
            if(takenDrought.classList.contains('red') && +e.target.dataset.id < +takenDrought.parentElement.dataset.id) {
                takenDrought.removeAttribute('id');
                return;
            }
            
            if(takenDrought.classList.contains('black') && +e.target.dataset.id > +takenDrought.parentElement.dataset.id) {
                takenDrought.removeAttribute('id');
                return;
            }
            
            let difference;
            function differenceCount () {
                difference =  Math.abs(e.target.dataset.id - takenDrought.parentElement.dataset.id);
            }
            differenceCount();

            takenDrought.removeAttribute('id');

            if(difference == 7 || difference == 9) {
                e.target.appendChild(takenDrought);
                return;
            }
            if(difference == 14 || difference == 18) {
                let g = (+takenDrought.parentElement.dataset.id + +e.target.dataset.id)/2;
                tds.forEach(element => {
                    if(element.dataset.id == g && element.firstElementChild && 
                        !element.firstElementChild.classList.contains(takenDrought.classList[0])) {
                        console.log(element.firstElementChild);
                        element.firstElementChild.remove();
                    } else {
                        return;
                    }
                    e.target.appendChild(takenDrought);
                });
                
            }
        });
});




