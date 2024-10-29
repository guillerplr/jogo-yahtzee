const btn = document.querySelector('#rolar')

btn.addEventListener('click',handleClick)

dado = ['⚀','⚁','⚂','⚃','⚄','⚅']

function rolar(){
    return Math.floor(Math.random() * 6) + 1;
}

function handleClick(){

   
}