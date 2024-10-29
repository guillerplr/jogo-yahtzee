const botao = document.querySelector("#rolar");
botao.addEventListener("click", handleClick);

const h2 = 

resultados = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

let dados = document.getElementsByTagName("input");

dados = Array.from(dados);

let rodada = 0;

const tentativas = document.querySelectorAll("#try");

function rolar() {
  return Math.floor(Math.random() * 6) + 1;
}

function handleClick(btn) {
  btn.preventDefault();
  console.log(rodada)
  if (rodada < 2) {
    tentativas[rodada].classList.add("foi");
    rodada = rodada + 1;
  }else{
    botao.disabled = true;
    tentativas[rodada].classList.add("foi");
    dados.forEach((d) =>{
        d.checked = true;
        d.disabled = true;
    })
  }

  dados.forEach((d) => {
    if (d.checked) {
      console.log(d.id + "marcado");
    } else {
      console.log(d.id + "desmarcado");
    }
  });
}

const teste = document.getElementsByTagName('h2')

function reinicia(){
    dados.forEach((d)=>{
        d.checked = false;
        d.disabled = false;
    })
    rodada = 0;
    botao.disabled = false;
    tentativas.forEach(e => {
        e.classList.remove('foi')
    })
}
teste[0].addEventListener('click', reinicia)