let numeroSecreto;
let tentativasRestantes;
const maxTentativas = 10;

const form = document.getElementById("form-jogo");
const inputPalpite = document.getElementById("palpite");
const mensagem = document.getElementById("mensagem");
const tentativas = document.getElementById("tentativas");
const botaoReiniciar = document.getElementById("reiniciar");
const listaRanking = document.getElementById("listaRanking");

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = maxTentativas;

    mensagem.textContent = "🤔 Faça seu primeiro palpite...";
    tentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;

    inputPalpite.value = "";
    inputPalpite.disabled = false;

    botaoReiniciar.classList.add("hidden");
}

function verificarPalpite(palpite) {

    tentativasRestantes--;

    if (palpite === numeroSecreto) {

        mensagem.textContent = "🎉 Você acertou!";
        finalizarJogo(true);

    } else if (palpite < numeroSecreto) {

        mensagem.textContent = "📈 O número secreto é MAIOR.";

    } else {

        mensagem.textContent = "📉 O número secreto é MENOR.";

    }

    tentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;

    if (tentativasRestantes === 0 && palpite !== numeroSecreto) {
        mensagem.textContent = `💀 Você perdeu! O número era ${numeroSecreto}`;
        finalizarJogo(false);
    }
}

function finalizarJogo(vitoria) {

    inputPalpite.disabled = true;
    botaoReiniciar.classList.remove("hidden");

    if (vitoria) {
        const nome = prompt("Digite seu nome para o ranking:");

        if (nome) {
            salvarRanking(nome, maxTentativas - tentativasRestantes);
        }
    }
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const palpite = parseInt(inputPalpite.value);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagem.textContent = "⚠️ Digite um número entre 1 e 100.";
        return;
    }

    verificarPalpite(palpite);

    inputPalpite.value = "";
});

botaoReiniciar.addEventListener("click", iniciarJogo);

function salvarRanking(nome, tentativasUsadas) {

    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({
        nome,
        tentativas: tentativasUsadas
    });

    ranking.sort((a, b) => a.tentativas - b.tentativas);

    localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 5)));

    mostrarRanking();
}

function mostrarRanking() {

    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    listaRanking.innerHTML = "";

    ranking.forEach((jogador, index) => {

        const li = document.createElement("li");

        li.textContent =
            `${index + 1}º 🏆 ${jogador.nome} - ${jogador.tentativas} tentativas`;

        listaRanking.appendChild(li);
    });
}

mostrarRanking();
iniciarJogo();