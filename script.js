const botao = document.querySelector("#rolar");
botao.addEventListener("click", handleClick);

const resultados = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const labels = [];

let dados = document.querySelectorAll('input[type="checkbox"]');
dados.forEach((e, i) => {
  labels[i] = document.querySelector('label[for="' + e.id + '"]');
});

dados.forEach((d) => {
  d.disabled = true;
});

let rodada = 0;

const tentativas = document.querySelectorAll("#try");

function rolar() {
  return resultados[Math.floor(Math.random() * 6)];
}

function handleClick(btn) {
  btn.preventDefault();

  if (rodada < 2) {
    tentativas[rodada].classList.add("foi");
    dados.forEach((d) => {
      d.disabled = false;
    });
  } else {
    botao.disabled = true;
    tentativas[rodada].classList.add("foi");
    dados.forEach((d) => {
      d.disabled = true;
    });
  }
  rodada = rodada + 1;

  dados.forEach((d, i) => {
    if (!d.checked) {
      let valor = rolar();
      labels[i].innerHTML = valor;
    }
  });
  if (rodada == 3) {
    dados.forEach((d) => {
      d.checked = true;
    });
  }
}

const teste = document.getElementsByTagName("h2");

function reinicia() {
  dados.forEach((d) => {
    d.checked = false;
    d.disabled = true;
  });
  rodada = 0;
  botao.disabled = false;
  tentativas.forEach((e) => {
    e.classList.remove("foi");
  });
}
teste[0].addEventListener("click", reinicia);
