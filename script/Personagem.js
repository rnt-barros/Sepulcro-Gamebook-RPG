const personagem = {
  nome: "Sobrevivente",
  atributos: {
    força: 2,
    agilidade: 2,
    Percepção: 2,
    vitalidade: 10
  },
  inventario: []
};

function carregarFicha() {
  const atributosDiv = document.getElementById("atributos");
  const inventarioUl = document.getElementById("inventario");

  
  atributosDiv.innerHTML = "";
  for (const [atrib, valor] of Object.entries(personagem.atributos)) {
    const linha = document.createElement("p");
    linha.textContent = `${atrib.toUpperCase()}: ${valor}`;
    atributosDiv.appendChild(linha);
  }

 
  inventarioUl.innerHTML = "";
  personagem.inventario.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    inventarioUl.appendChild(li);
  });
}


carregarFicha();