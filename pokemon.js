let pokemon = document.getElementById('choose');
let getPoke = document.getElementById('get');
let clearPoke = document.getElementById('clear');
let displayName = document.getElementById('showName');
let sprite = document.getElementById('sprite');

const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let url;


getPoke.addEventListener('click', findPoke);
clearPoke.addEventListener('click', clrPoke);

document.addEventListener('mousemove', getMouse);
const offx = 0;
const offy = -40;
let spritepos = {x:0, y:0};
let mouse = {x:0, y:0};
setInterval(follow, 50);
let dir = "right";

function findPoke(e) {
    // e.preventDefault();
    if (pokemon != undefined) {
        clrPoke(e);
    }
    pokemon = pokemon.value;
    console.log(`input: ${pokemon}`);
    url = baseURL + pokemon;
    fetch(url)
    .then(data => {
        if (!data.ok) {
            console.log(data);
            displayName.innerText = "No Pokemon found";
            return;
        }
        return data.json();
    })
    .then(json => {
        dispPoke(json)
    })
}

function dispPoke(json) {
    // set up sprite following cursor
    console.log(json);
    displayName.innerText = `#${json.id}: ${json.name}`;
    sprite.style.backgroundImage = `url(${json.sprites.front_default})`;
}

function clrPoke(e) {
    pokemon = document.getElementById('choose');
    displayName.innerText = '';
    sprite.style.backgroundImage = 'none';
}

function getMouse(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    if(mouse.x > spritepos.x){
        dir = "right";
    } else {
        dir = "left";
    }
    follow(e)
}

function follow(e) {
    let distX = mouse.x - spritepos.x;
    let distY = mouse.y - spritepos.y;
    spritepos.x += distX/5 + offx;
    spritepos.y += distY/2 + offy;
    
    sprite.style.marginLeft = spritepos.x + "px";
    sprite.style.marginTop = spritepos.y + "px";

    if (dir == "right"){
        sprite.setAttribute("class", "right");
    } else {
        sprite.setAttribute("class", "left");        
    }
}

// function mouseX(evt) {
//     if (!evt) {evt = window.event}; 
//     if (evt.pageX) {return evt.pageX} 
//     else if (evt.clientX) {
//         return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft)
//     } else {return 0};
// }

// function mouseY(evt) {
//     if (!evt) {evt = window.event}; 
//     if (evt.pageY) {return evt.pageY} 
//     else if (evt.clientY) {
//         return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
//     } else {return 0}
// }

// function follow(evt) {
//     var obj = sprite.style;
//     obj.marginLeft = (parseInt(mouseX(evt))+offx) + 'px';
//     obj.marginTop = (parseInt(mouseY(evt))+offy) + 'px'; 
// }
