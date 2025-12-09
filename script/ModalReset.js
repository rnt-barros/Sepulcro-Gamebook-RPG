document.addEventListener("DOMContentLoaded", () => {
    const btnInstrucoes = document.getElementById("btn-instrucoes");
    const modalInstrucoes = document.getElementById("modal-instrucoes");
    const btnFecharModal = document.getElementById("fechar-modal");

    btnInstrucoes.addEventListener("click", () => {
        modalInstrucoes.classList.remove("hidden");
    });

    btnFecharModal.addEventListener("click", () => {
        modalInstrucoes.classList.add("hidden");
    });

    modalInstrucoes.addEventListener("click", (e) => {
        if (e.target === modalInstrucoes) {
            modalInstrucoes.classList.add("hidden");
        }
    });

    const btnReiniciar = document.getElementById("btn-reiniciar");
    btnReiniciar.addEventListener("click", () => {
        location.reload(); 
    });
});
