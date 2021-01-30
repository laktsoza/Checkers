
const darks = document.querySelectorAll('.dark');


darks.forEach((element, index) => {
    if(!element.dataset.id) {
        element.dataset.id = index;
    }

    element.addEventListener('dragstart', e => {
        e.target.setAttribute('id', 'taken')
        e.dataTransfer.setData('id', e.target.id);
    })
});

darks.forEach(element => {
    element.addEventListener("dragover", e => {
        e.preventDefault();
    });
});

darks.forEach((element, index) => {
    
    element.addEventListener("drop", e => {
        const id = e.dataTransfer.getData("id");
        let takan = document.getElementById(id);
        
        let difference;
        function differenceAbs () {
            difference = Math.abs(takan.parentElement.dataset.id - e.target.dataset.id);
            return difference;
        }

        differenceAbs();
        
        if(difference == 3 || difference == 4 || difference == 5) {

            if(e.target.firstElementChild || e.target.tagName !== 'TD' ) {
                document.getElementById(id).removeAttribute('id');
                return;
            }
            let img = document.createElement('img');
            img.src = document.getElementById(id).src;
            document.getElementById(id).remove();
            e.target.appendChild(img);
        } 
    });
});
