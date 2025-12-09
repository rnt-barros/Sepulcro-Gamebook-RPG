export function desenharFaceDado(numero = 1) {
    const svg = document.getElementById("dado-svg");
    svg.innerHTML = "";

    const faces = {
        1: [[50, 50]],
        2: [[30, 30], [70, 70]],
        3: [[30, 30], [50, 50], [70, 70]],
        4: [[30, 30], [30, 70], [70, 30], [70, 70]],
        5: [[30, 30], [30, 70], [70, 30], [70, 70], [50, 50]],
        6: [[30, 30], [30, 50], [30, 70], [70, 30], [70, 50], [70, 70]]
    };

    svg.innerHTML += `
        <rect x="5" y="5" width="90" height="90" rx="10"
            fill="rgba(0,255,80,0.1)"
            stroke="#00ff55"
            stroke-width="4"/>
    `;

    faces[numero].forEach(([x, y]) => {
        svg.innerHTML += `<circle cx="${x}" cy="${y}" r="7" fill="#00ff55"/>`;
    });
}

export async function rolarDado(numDados = "1d6", atributo = 0) {
    let quantidade = 1;
    let lados = 6;

    if (typeof numDados === "string") {
        const match = numDados.toLowerCase().match(/(\d+)d(\d+)/);
        if (match) {
            quantidade = parseInt(match[1]);
            lados = parseInt(match[2]);
        }
    } else {
        quantidade = parseInt(numDados);
    }

    const svg = document.getElementById("dado-svg");
    svg.classList.add("gira");

    for (let i = 0; i < 10; i++) {
        desenharFaceDado(Math.floor(Math.random() * 6) + 1);
        await new Promise(res => setTimeout(res, 50));
    }

    svg.classList.remove("gira");

    let total = 0;
    let ultimoValor = 1;
    for (let i = 0; i < quantidade; i++) {
        const valor = Math.floor(Math.random() * lados) + 1;
        total += valor;
        ultimoValor = valor;
    }

    total += atributo;
    desenharFaceDado(Math.min(ultimoValor, 6));

    return total;
}

const btnRolar = document.getElementById("btn-rolar");
btnRolar.disabled = true;
desenharFaceDado();
