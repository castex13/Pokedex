// GLOBAL
let id= 0;

// SELECTORS
const pokemon = document.querySelector('#pokemon');
const right = document.querySelector('#right');
const left = document.querySelector('#left');
const up = document.querySelector('#up');
const down = document.querySelector('#down');
const namePokemon = document.querySelector('#namePokemon');
const statsButton = document.querySelector('#stats');
const modalTitle = document.querySelector('#modalTitle');
const modalBody = document.querySelector('#modalBody');
// GET API
const linkPokemon = 'https://pokeapi.co/api/v2/pokemon'
const obtenerPokemon = async(id) =>{
  
    const resp = await fetch(`${linkPokemon}/${id}`);
    const {sprites, species, stats} = await resp.json();
    return {sprites, species, stats};

}

// FUNCTION EVENTS
function handlerRight(e){
    if(e.type == 'click' || e.keyCode == 39){
        id += 1;
        obtenerPokemon(id).then(({sprites, species, stats}) => {
            pokemon.setAttribute('src', sprites.front_default);
            let name = species.name;
            namePokemon.innerHTML = name;
            modalTitle.innerHTML =`Name: ${name}`;
            modalBody.innerHTML= ''
            let createUl = document.createElement('ul');
            modalBody.appendChild(createUl)
            stats.forEach(stat=>{
                createUl.innerHTML += `<li>${stat.stat.name} : ${stat.base_stat}`;
            })
        });
    }  
}
function handlerLeft(e){
    if((e.type == 'click' || e.keyCode == 37) && id > 0 ){
        id -= 1;
        if(id == 0){
            pokemon.setAttribute('src',"./img/Logo-Pokemon-peque.png")
            namePokemon.innerHTML = '';
            modalTitle.innerHTML = 'Name: NoName'
            modalBody.innerHTML= '...'
        }
        else{  
            obtenerPokemon(id).then(({sprites, species, stats}) => {
                pokemon.setAttribute('src', sprites.front_default);
                let name = species.name;
                namePokemon.innerHTML = name;
                modalTitle.innerHTML =`Name: ${name}`;
                modalBody.innerHTML= ''
                let createUl = document.createElement('ul');
                modalBody.appendChild(createUl)
                stats.forEach(stat=>{
                    createUl.innerHTML += `<li>${stat.stat.name} : ${stat.base_stat}`;
                })
        })
        }  
    }
}
function handlerUp(e){
    if((e.type == 'click' || e.keyCode == 38) && id >= 1){
        obtenerPokemon(id).then(({sprites}) => pokemon.setAttribute('src', sprites.front_default))
    }
}
function handlerDown(e){
    if((e.type == 'click' || e.keyCode == 40) && id >= 1){
        obtenerPokemon(id).then(({sprites}) => pokemon.setAttribute('src', sprites.back_default))
    }
}

// EVENTS
right.addEventListener('click', handlerRight);
window.addEventListener('keydown', handlerRight);

left.addEventListener('click', handlerLeft);
window.addEventListener('keydown', handlerLeft);

up.addEventListener('click', handlerUp);
window.addEventListener('keydown', handlerUp);

down.addEventListener('click', handlerDown);
window.addEventListener('keydown', handlerDown);


