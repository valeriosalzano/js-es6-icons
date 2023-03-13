// CATEGORY FILTER
// genero il collegamento al filtro delle categoriee con relativo eventListener
const categoryFilterDom = document.getElementById('category-filter');
categoryFilterDom.addEventListener('change', generateIcons);
// creo dinamicamente la lista delle options select con "all" di default
const optionArray = ['all'];
data.forEach( element => {
    if (!optionArray.includes(element.type)){
        optionArray.push(element.type);
    }
});
// stampo la lista delle options nel select
optionArray.forEach( category => {
    const newOption = document.createElement('option');
    newOption.value = category;
    newOption.innerHTML = category;
    categoryFilterDom.append(newOption);
} )

// COLOR FILTER
// genero il collegamento al filtro del colore con relativo eventListener
const colorFilterDom = document.getElementById('color-filter');
colorFilterDom.addEventListener('change', generateIcons);

// ICONS GENERATOR
// genero dinamicamente tutte le box per ogni elemento di "data" in iconsContainerDom
const iconsContainerDom = document.getElementById('icons-container');
generateIcons();


// *** LISTA FUNZIONI ***

// funzione che genera tutte le icone
function generateIcons(){
    iconsContainerDom.innerHTML = '';
    // filtro gli elementi di data in base alla categoria
    const newData = data.filter(element => categoryFilterDom.value == element.type || categoryFilterDom.value == 'all');
    // creo una box per ogni elemento filtrato
    newData.forEach(icon => {
        const newBox = document.createElement('div');

        // esamino il valore scelto dall'utente per il colore
        const boxColor = (colorFilterDom.value == 'original'? icon.color : randomHexColor())
    
        // aggiungo le classi funzionali...
        newBox.classList.add('box',`${icon.type}`);
        //...e quelle di stile
        newBox.classList.add('col-12','col-sm-4','col-md-3','col-lg-2','p-3','mx-sm-2','text-uppercase','fw-semibold','fs-6','text-center','rounded-3','bg-white','shadow');
        newBox.style.border = (`2px outset ${boxColor}`)
        
        // aggiungo i contenuti a "box"
        newBox.innerHTML = `
        <i class="fa-solid ${icon.prefix}${icon.name} mb-1 fs-2" style="color:${boxColor}"></i>
        <br>
        ${icon.name}
        `
        iconsContainerDom.append(newBox);
    })
}

// funzione che genera un numero casuale compreso tra min e max

function randomNumber (min,max){
    return Math.floor(Math.random()*(max - min +1)+min);
}

// funzione che genera un numero esadecimale casuale
function randomHexNumber (){
    const values = '0123456789ABCDEF'.split('');
    return values[randomNumber(0,15)];
}

// funzione che genera un colore randomico in notazione esadecimale
function randomHexColor (){
    let hexColor = '#';
    for (let i=0; i<6; i++){
        hexColor += randomHexNumber();
    }
    return hexColor;
}