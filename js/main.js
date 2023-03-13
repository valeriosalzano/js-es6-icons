
const selectInput = document.getElementById('category-filter');

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
    selectInput.append(newOption);
} )

// modifica del color in "data" randomico
let userColorChoice = 'original';
do {
    userColorChoice = prompt(`
        Scegli la modalità di colorazione per le icone:
        - random : colori casuali per ogni icona.
        - original : colore diverso a seconda della categoria.
        `,
        'original');
} while (userColorChoice != 'original' && userColorChoice != 'random')
console.log(userColorChoice);
if (userColorChoice == 'random'){
    data.forEach(icon => icon.color = randomHexColor());
}
console.log(data);

const iconsContainerDom = document.getElementById('icons-container');
// genero dinamicamente tutte le box per ogni elemento di "data"
data.forEach(icon => {
    const newBox = document.createElement('div');

    // aggiungo le classi funzionali...
    newBox.classList.add('box',`${icon.type}`);
    //...e quelle di stile
    newBox.classList.add('col-sm-4','col-md-3','col-lg-2','p-3','mx-3','text-uppercase','fw-semibold','fs-6','text-center','rounded-3','bg-white','shadow');
    newBox.style.border = (`2px outset ${icon.color}`)
    
    // aggiungo i contenuti a "box"
    newBox.innerHTML = `
    <i class="fa-solid ${icon.prefix}${icon.name} mb-1 fs-2" style="color:${icon.color}"></i>
    <br>
    ${icon.name}
    `

    iconsContainerDom.append(newBox);
})

selectInput.addEventListener('change',filterOnChange);


// *** LISTA FUNZIONI ***

// funzione che al cambiare del filtro nasconde gli elementi che non appartengono alla categoria selezionata
function filterOnChange (){
    // creo un array con tutti i box e li ciclo
    const boxNodes = document.getElementsByClassName('box');
    for (let i=0; i<boxNodes.length; i++){
        if (!boxNodes[i].classList.contains(selectInput.value) && selectInput.value!='all'){
            // CASO 1: il box non contiene il value del filtro AND non ho selezionato "all"
            boxNodes[i].classList.add('d-none');
        } else {
            // CASO 2: filtro all OR il box contiene il filtro selezionato
            boxNodes[i].classList.remove('d-none')
        }
    };


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