
const darks = document.querySelectorAll('.dark');

const tds = document.querySelectorAll('td');


tds.forEach((element, index) => {
    if(!element.dataset.id) {
        element.dataset.id = index;
    }
})


darks.forEach(element => {
    

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

darks.forEach(element => {
    
    element.addEventListener("drop", e => {
        const id = e.dataTransfer.getData("id");
        let takan = document.getElementById(id);
        // if(e.target.classList.contains('black') && takan.parentElement.dataset.id < e.target.dataset.id) {
        //     return;
        // }
        let difference;
        function differenceAbs () {
            difference = Math.abs(takan.parentElement.dataset.id - e.target.dataset.id);
            return difference;
        }

        differenceAbs();

        console.log(takan.parentElement.dataset.id);
        console.log(e.target.dataset.id);
        console.log(difference);
        
        if(difference == 7 || difference == 9) {

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
