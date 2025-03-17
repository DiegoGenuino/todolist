async function carregarDados() {
    const resposta = await fetch("http://localhost:3000/tarefas");
    const dados = await resposta.json();

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    dados.forEach(user => {
        let item = document.createElement("div");
        item.textContent = `${user.nome} - ${user.email}`;
        lista.appendChild(item);

        // Criando botão de remover 
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remove";
        botaoRemover.classList.add("style-button");
        botaoRemover.onclick = () => excluirUsuario(user.id);

        item.appendChild(botaoRemover);
    });
}

async function adicionarUsuario() {
    const nome = document.getElementById("user").value;
    const email = document.getElementById("email").value;

    const resposta = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    });

    if (resposta.ok) {
        carregarDados();
    }
}

async function excluirUsuario(id) {
    const resposta = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
    });

    if (resposta.ok) {
        carregarDados(); // Recarrega a lista após a remoção 
    } else {
        alert("Erro ao excluir usuário");
    }
}

carregarDados(); 
</script>