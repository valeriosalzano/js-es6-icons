
const categoryFilterDom = document.getElementById('category-filter');
categoryFilterDom.addEventListener('change', categoryFilterOnChange);

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

const iconsContainerDom = document.getElementById('icons-container');
// genero dinamicamente tutte le box per ogni elemento di "data"
generateIcons();

const colorFilterDom = document.getElementById('color-filter');
colorFilterDom.addEventListener('change', colorFilterOnChange);


// *** LISTA FUNZIONI ***
// funzione che genera tutte le icone
function generateIcons(){
    iconsContainerDom.innerHTML = '';
    data.forEach(icon => {
        const newBox = document.createElement('div');
    
        // aggiungo le classi funzionali...
        newBox.classList.add('box',`${icon.type}`);
        //...e quelle di stile
        newBox.classList.add('col-12','col-sm-4','col-md-3','col-lg-2','p-3','mx-sm-2','text-uppercase','fw-semibold','fs-6','text-center','rounded-3','bg-white','shadow');
        newBox.style.border = (`2px outset ${icon.color}`)
        
        // aggiungo i contenuti a "box"
        newBox.innerHTML = `
        <i class="fa-solid ${icon.prefix}${icon.name} mb-1 fs-2" style="color:${icon.color}"></i>
        <br>
        ${icon.name}
        `
    
        iconsContainerDom.append(newBox);
    })
}

// funzione che al cambiare del filtro nasconde gli elementi che non appartengono alla categoria selezionata
function categoryFilterOnChange(){
    // creo un array con tutti i box e li ciclo
    const boxNodes = document.getElementsByClassName('box');
    for (let i=0; i<boxNodes.length; i++){
        if (!boxNodes[i].classList.contains(categoryFilterDom.value) && categoryFilterDom.value!='all'){
            // CASO 1: il box non contiene il value del filtro AND non ho selezionato "all"
            boxNodes[i].classList.add('d-none');
        } else {
            // CASO 2: filtro all OR il box contiene il filtro selezionato
            boxNodes[i].classList.remove('d-none')
        }
    };
}

// funzione che al cambiare del filtro genera nuove iconi con colori randomici/originali.
function colorFilterOnChange(){
    categoryFilterDom.value = 'all';
    let userColorChoice = colorFilterDom.value;
    if (userColorChoice == 'random'){
        data.forEach(icon => icon.color = randomHexColor());
    } else {
        data.forEach(icon => {
            if (icon.type == "animal"){
                icon.color = 'orange';
            } else if (icon.type == 'vegetable'){
                icon.color = 'green';
            } else if (icon.type == 'user') {
                icon.color = 'blue';
            } else {
                icon.color = 'gray';
            }
        })
    }
    generateIcons();
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