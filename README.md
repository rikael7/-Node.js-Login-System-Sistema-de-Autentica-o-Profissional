🔐 Node.js Login System – Sistema de Autenticação Profissional


💻 Sobre o Projeto
Este é um sistema de login completo construído com Node.js, Express e MySQL, que permite:
Cadastro de usuários com validação.
Login seguro com senha criptografada via bcryptjs.
Proteção de rotas privadas usando sessões (express-session).
Logout do usuário com encerramento de sessão.
O projeto é ideal para portfólio e demonstração de habilidades em backend e autenticação web.

🎥 Demonstração

Substitua pelo GIF ou screenshot real do seu sistema funcionando.

🛠 Tecnologias Utilizadas
Tecnologia	Função
Node.js	Ambiente de execução JavaScript
Express	Framework web para Node.js
MySQL2	Conexão e manipulação do banco de dados MySQL
Express-Handlebars	Template engine para páginas HTML
Express-Session	Gerenciamento de sessões
Bcryptjs	Criptografia de senhas
Nodemon	Monitoramento de mudanças em desenvolvimento

📂 Estrutura do Projeto
      login-system/
      │
      ├─ config/
      │   └─ database.js          # Configuração do MySQL
      ├─ models/
      │   └─ User.js              # Modelo de usuário
      ├─ routes/
      │   └─ auth.js              # Rotas de autenticação
      ├─ views/
      │   ├─ login.handlebars
      │   ├─ register.handlebars
      │   └─ dashboard.handlebars
      ├─ public/
      │   └─ css/                 # Arquivos de estilo
      ├─ app.js                   # Arquivo principal
      └─ package.json

⚡ Instalação e Uso

Clone o repositório:
git clone https://github.com/seu-usuario/nome-do-projeto.git
Acesse a pasta do projeto:
cd nome-do-projeto

Instale as dependências:
npm install
Configure o banco de dados em config/database.js.
Inicie a aplicação em modo desenvolvimento:
npm run dev

Abra no navegador:
http://localhost:3000

🚀 Rotas Principais
/register – Cadastro de usuários
/login – Login de usuários
/dashboard – Área privada
/logout – Encerrar sessão

🔒 Segurança

Senhas criptografadas com bcryptjs.
Sessões protegidas com express-session.
Rotas privadas protegidas por middleware de autenticação.

🌟 Como Contribuir
Faça um fork do projeto.
Crie uma branch (git checkout -b feature/nova-funcionalidade).
Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade').
Push para sua branch (git push origin feature/nova-funcionalidade).
Abra um Pull Request.

📄 Licença

MIT © [Rikael Ribeiro]
