import { desenharFaceDado, rolarDado } from "./Dado.js";

document.addEventListener("DOMContentLoaded", () => {
    let capituloAtual = "1";

    const personagem = {
        nome: "Sobrevivente",
        atributos: { força: 2, agilidade: 2, Percepção: 2, vitalidade: 10 },
        inventario: []
    };

    const conteudo = document.getElementById("conteudo");
    const opcoesDiv = document.getElementById("opcoes");
    const atributosDiv = document.getElementById("atributos");
    const inventarioUl = document.getElementById("inventario");
    const btnRolar = document.getElementById("btn-rolar");

    btnRolar.disabled = true;
    desenharFaceDado();

    function carregarFicha() {
        atributosDiv.innerHTML = "";
        for (const [atrib, valor] of Object.entries(personagem.atributos)) {
            const li = document.createElement("li");
            li.textContent = `${atrib.toUpperCase()}: ${valor}`;
            atributosDiv.appendChild(li);
        }

        inventarioUl.innerHTML = "";
        personagem.inventario.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            inventarioUl.appendChild(li);
        });
    }

    async function processarTeste(teste) {
        let resultado = await rolarDado(teste.dado, teste.atributo ? personagem.atributos[teste.atributo] : 0);
        const proximo = resultado >= teste.dificuldade ? teste.sucesso : teste.falha;
        btnRolar.disabled = true;
        carregarCapitulo(proximo);
    }

    async function carregarCapitulo(id) {
        try {
            const data = await fetch("./historia.json").then(res => res.json());
            const capitulo = data[id];

            if (!capitulo) {
                conteudo.textContent = "Capítulo não encontrado!";
                opcoesDiv.innerHTML = "";
                return;
            }

            conteudo.textContent = capitulo.texto;

            if (capitulo.itens) {
                capitulo.itens.forEach(item => {
                    if (!personagem.inventario.includes(item)) personagem.inventario.push(item);
                });
            }

            if (capitulo.dano) personagem.atributos.vitalidade -= capitulo.dano;

            carregarFicha();

            opcoesDiv.innerHTML = "";
            btnRolar.disabled = true;
            btnRolar.onclick = null;

            if (capitulo.teste) {
                btnRolar.disabled = false;
                btnRolar.onclick = () => processarTeste(capitulo.teste);
            }

            if (capitulo.opcoes) {
                capitulo.opcoes.forEach(op => {
                    const btn = document.createElement("button");
                    btn.textContent = op.texto;
                    btn.classList.add("opcao-btn");
                    btn.addEventListener("click", () => {
                        if (op.teste) {
                            btnRolar.disabled = false;
                            btnRolar.onclick = () => processarTeste(op.teste);
                        } else if (op.vaiPara) {
                            carregarCapitulo(op.vaiPara);
                        }
                    });
                    opcoesDiv.appendChild(btn);
                });
            }

            capituloAtual = id;

        } catch (err) {
            conteudo.textContent = "Erro ao carregar história: " + err;
        }
    }

    carregarCapitulo(capituloAtual);
});
