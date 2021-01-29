
const icons = document.querySelectorAll('td img');
const darks = document.querySelectorAll('.dark');

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
        if(e.target.firstElementChild || e.target.tagName !== 'TD' ) {
            const id = e.dataTransfer.getData("id");
            document.getElementById(id).removeAttribute('id');
            return;
        }

        const id = e.dataTransfer.getData("id");
        let img = document.createElement('img');
        img.src = document.getElementById(id).src;
        document.getElementById(id).remove();
        e.target.appendChild(img);
    });
});
