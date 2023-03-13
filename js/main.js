
const selectInput = document.getElementById('category-filter');

// creo dinamicamente la lista delle options select con "all" di default
const optionArray = ['all'];
data.forEach( element => {
    if (!optionArray.includes(element.type)){
        optionArray.push(element.type);
    }
});

// stampo la lista delle options nel select
optionArray.forEach( element => {
    const newOption = document.createElement('option');
    newOption.value = element;
    newOption.innerHTML = element;
    selectInput.append(newOption);
} )

const iconsContainerDom = document.getElementById('icons-container');
// genero dinamicamente tutte le box per ogni elemento di "data"
data.forEach(icon => {
    const newBox = document.createElement('div');
    
    // aggiungo le classi funzionali...
    newBox.classList.add('box',`${icon.type}`);
    //...e quelle di stile
    newBox.classList.add('col-sm-4','col-md-3','col-lg-2','p-3','mx-3','text-uppercase','fw-semibold','fs-6','text-center','rounded-3','bg-white');
    newBox.style.border = (`3px solid ${icon.color}`)
    
    // aggiungo i contenuti a "box"
    newBox.innerHTML = `
    <i class="fa-solid ${icon.prefix}${icon.name} mb-1 fs-2" style="color:${icon.color}"></i>
    <br>
    ${icon.name}
    `

    iconsContainerDom.append(newBox);
})