const botao = document.querySelector("#rolar");
botao.addEventListener("click", handleClick);
// const proxima = document.querySelector(".proxima");
const tentativas = document.querySelectorAll("#try");

const jogo1 = document.querySelectorAll("tr td:nth-child(3)");
const jogo2 = document.querySelectorAll("tr td:nth-child(4)");
const jogo3 = document.querySelectorAll("tr td:nth-child(5)");
const jogo4 = document.querySelectorAll("tr td:nth-child(6)");
const jogo5 = document.querySelectorAll("tr td:nth-child(7)");
const jogo6 = document.querySelectorAll("tr td:nth-child(8)");

const jogos = [jogo1, jogo2, jogo3, jogo4, jogo5, jogo6];

let jogada = 0;
let rodada = 0;

const resultados = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const labels = [];
marcados = [];

let dados = document.querySelectorAll('input[type="checkbox"]');

dados.forEach((e, i) => {
  labels[i] = document.querySelector('label[for="' + e.id + '"]');
  e.disabled = true;
});

function rolar() {
  return resultados[Math.floor(Math.random() * 6)];
}

function selecionado(item, index) {
  marcados.push(index);
  const escolha = item.innerHTML;
  jogos[jogada].forEach((e) => {
    e.classList.remove("clicavel");
    e.innerHTML = "";
  });
  reinicia();
  item.innerHTML = escolha;
}

function finalizaRodada() {
  const valores = [];
  labels.forEach((e, i) => {
    switch (e.innerHTML) {
      case "⚀":
        valores[i] = 1;
        break;
      case "⚁":
        valores[i] = 2;
        break;
      case "⚂":
        valores[i] = 3;
        break;
      case "⚃":
        valores[i] = 4;
        break;
      case "⚄":
        valores[i] = 5;
        break;
      case "⚅":
        valores[i] = 6;
        break;
    }
  });
  const contador = {};
  for (let elemento of valores) {
    contador[elemento] = (contador[elemento] || 0) + 1;
  }

  jogos[jogada].forEach((e, i) => {
    const clickHandler = selecionado.bind(null, e, i);
    if (!marcados.includes(i)) {
      e.addEventListener("click", clickHandler);
      e.clickHandler = clickHandler;
      e.classList.add("clicavel");
    }
  });

  jogos[jogada][6].classList.remove("clicavel");
  jogos[jogada][7].classList.remove("clicavel");
  jogos[jogada][8].classList.remove("clicavel");
  jogos[jogada][16].classList.remove("clicavel");
  jogos[jogada][17].classList.remove("clicavel");
  jogos[jogada][18].classList.remove("clicavel");
  jogos[jogada][19].classList.remove("clicavel");
  jogos[jogada][20].classList.remove("clicavel");

  // SEÇÃO SUPERIOR
  if (!marcados.includes(0))
    jogos[jogada][0].innerHTML = contador["1"] ? contador["1"] * 1 : 0;
  if (!marcados.includes(1))
    jogos[jogada][1].innerHTML = contador["2"] ? contador["2"] * 2 : 0;
  if (!marcados.includes(2))
    jogos[jogada][2].innerHTML = contador["3"] ? contador["3"] * 3 : 0;
  if (!marcados.includes(3))
    jogos[jogada][3].innerHTML = contador["4"] ? contador["4"] * 4 : 0;
  if (!marcados.includes(4))
    jogos[jogada][4].innerHTML = contador["5"] ? contador["5"] * 5 : 0;
  if (!marcados.includes(5))
    jogos[jogada][5].innerHTML = contador["6"] ? contador["6"] * 6 : 0;

  //SEÇÃO INFERIOR
  //trinca
  jogos[jogada][9].innerHTML = 0;
  for (const prop in contador) {
    if (contador[prop] >= 3) {
      let total = 0;
      valores.forEach((e) => {
        total += e;
      });
      jogos[jogada][9].innerHTML = total;
    }
  }
  //quadra
  jogos[jogada][10].innerHTML = 0;
  for (const prop in contador) {
    if (contador[prop] >= 4) {
      let total = 0;
      valores.forEach((e) => {
        total += e;
      });
      jogos[jogada][10].innerHTML = total;
    }
  }
  //fullhouse
  jogos[jogada][11].innerHTML = 0;
  if (Object.keys(contador).length == 2) {
    for (const prop in contador) {
      if (contador[prop] == 3 || contador[prop] == 2) {
        jogos[jogada][11].innerHTML = 25;
      }
    }
  }
  //sequencia menor
  jogos[jogada][12].innerHTML = 0;
  if (Object.keys(contador).length == 4) {
    if (contador["1"] && contador["2"] && contador["3"] && contador["4"])
      jogos[jogada][12].innerHTML = 30;
    if (contador["5"] && contador["2"] && contador["3"] && contador["4"])
      jogos[jogada][12].innerHTML = 30;
    if (contador["5"] && contador["6"] && contador["3"] && contador["4"])
      jogos[jogada][12].innerHTML = 30;
  }

  //sequencia maior
  jogos[jogada][13].innerHTML = 0;
  if (Object.keys(contador).length == 5) {
    if (
      contador["1"] &&
      contador["2"] &&
      contador["3"] &&
      contador["4"] &&
      contador["5"]
    )
      jogos[jogada][13].innerHTML = 40;
    if (
      contador["6"] &&
      contador["2"] &&
      contador["3"] &&
      contador["4"] &&
      contador["5"]
    )
      jogos[jogada][13].innerHTML = 40;
  }
  //yahtzee
  jogos[jogada][14].innerHTML = 0;
  if (Object.keys(contador).length == 1) {
    jogos[jogada][14].innerHTML = 50;
  }

  //chance
  jogos[jogada][15].innerHTML = 0;
  let chance = 0;
  valores.forEach((e) => {
    chance += e;
  });
  jogos[jogada][15].innerHTML = chance;
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
    // proxima.style.display = "block";
    tentativas[rodada].classList.add("foi");
    dados.forEach((d) => {
      d.disabled = true;
    });
  }
  rodada = rodada + 1;

  dados.forEach((d, i) => {
    if (!d.checked) {
      labels[i].innerHTML = rolar();
    }
  });
  if (rodada == 3) {
    dados.forEach((d) => {
      d.checked = true;
    });
    finalizaRodada();
  }
}

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
  jogos[jogada].forEach((e, i) => {
    e.removeEventListener("click", e.clickHandler);
  });
  // proxima.style.display = "none";
}

// proxima.addEventListener("click", (e) => {
//   e.preventDefault();
//   reinicia();
// });
