const botao = document.querySelector("#rolar");
botao.addEventListener("click", handleClick);

const h2 = (resultados = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]);
const labels = []

let dados = document.querySelectorAll('input[type="checkbox"]');
dados.forEach((e,i) => {
  labels[i] = document.querySelector('label[for="' + e.id + '"]');
});

let rodada = 0;

const tentativas = document.querySelectorAll("#try");

function rolar() {
  return Math.floor(Math.random() * 6) + 1;
}

function handleClick(btn) {
  btn.preventDefault();
  console.log(rodada);
  if (rodada < 2) {
    tentativas[rodada].classList.add("foi");
    rodada = rodada + 1;
  } else {
    botao.disabled = true;
    tentativas[rodada].classList.add("foi");
    dados.forEach((d) => {
      d.checked = true;
      d.disabled = true;
    });
  }

  dados.forEach((d, i) => {
    if (d.checked) {
      console.log(d.id + "marcado");
    } else {
      let num = rolar();
      labels[i].innerHTML = num
    }
  });
}

const teste = document.getElementsByTagName("h2");

function reinicia() {
  dados.forEach((d) => {
    d.checked = false;
    d.disabled = false;
  });
  rodada = 0;
  botao.disabled = false;
  tentativas.forEach((e) => {
    e.classList.remove("foi");
  });
}
teste[0].addEventListener("click", reinicia);
