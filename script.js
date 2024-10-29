const botao = document.querySelector('#rolar')
botao.addEventListener('click',handleClick)

resultados = ['⚀','⚁','⚂','⚃','⚄','⚅']

let rodada = 1;

let dados = document.getElementsByTagName('input')
dados = Array.from(dados)
function rolar(){
    return Math.floor(Math.random() * 6) + 1;
}

function handleClick(btn){
    btn.preventDefault()
    
    dados.forEach(d =>{
        if(d.checked){
            console.log(d.id + "marcado")
        }else{
            console.log(d.id + "desmarcado")
        }   
    })

    
}