document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const loginButton = document.getElementById('login-button');

    // Desabilita o botão de login no início
    loginButton.disabled = true;

    // Função para verificar os campos e habilitar/desabilitar o botão
    const checkInputs = () => {
        // Verifica se ambos os campos têm algum valor
        if (emailInput.value.length > 0 && senhaInput.value.length > 0) {
            loginButton.disabled = false; // Habilita o botão
        } else {
            loginButton.disabled = true; // Desabilita o botão
        }
    };

    // Adiciona "ouvintes" de evento para quando o usuário digita
    emailInput.addEventListener('input', checkInputs);
    senhaInput.addEventListener('input', checkInputs);
});