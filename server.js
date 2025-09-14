// Importa os módulos necessários
const express = require('express'); // Framework para criar o servidor web
const { engine } = require('express-handlebars'); // Engine de template para renderizar views
const session = require('express-session'); // Middleware para gerenciar sessões de usuário
const bcrypt = require('bcryptjs'); // Biblioteca para hashear senhas
const db = require('./db'); // Importa o módulo de conexão com o banco de dados

// Cria uma instância do aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000; // Define a porta do servidor, usando a do ambiente ou 3000

// servir o public(css,js etc)
app.use(express.static('public'));

// --- Configuração do Handlebars ---
app.engine('handlebars', engine()); // Configura o Handlebars como o motor de template
app.set('view engine', 'handlebars'); // Define a extensão dos arquivos de view como .handlebars
app.set('views', './views'); // Define o diretório onde os arquivos de view estão localizados

//------------------------------------------------------------------------------------------------

// --- Middlewares ---
// Permite que o Express processe dados de formulários (via req.body)
app.use(express.urlencoded({ extended: true }));


// Configura o middleware de sessão
app.use(session({
    secret: 'sua_chave_secreta', // Chave secreta para assinar o cookie da sessão
    resave: false, // Evita salvar a sessão se não houver mudanças
    saveUninitialized: true, // Força a sessão a ser salva mesmo que não tenha sido inicializada
    cookie: { secure: false } // Define se o cookie deve ser enviado apenas por HTTPS (use true em produção)
}));

// --- Rotas de Navegação (GET) ---

// Rota para a página de login
app.get('/login', (req, res) => {
    // Renderiza a view 'login', passando a mensagem como parâmetro
    res.render('login', { mensagem: req.query.mensagem });
});

// Rota para a página de registro
app.get('/register', (req, res) => {
    // Renderiza a view 'register', passando a mensagem como parâmetro
    res.render('register', { mensagem: req.query.mensagem });
});

// Rota principal (redireciona para o login se não estiver logado)
app.get('/', (req, res) => {
    // Verifica se o usuário já está logado na sessão
    if (req.session.isLoggedIn) {
        return res.redirect('/dashboard'); // Se estiver, redireciona para o dashboard
    }
    res.redirect('/login'); // Se não, redireciona para a página de login
});

// --- Rotas de Processamento de Formulários (POST) ---

// Rota para processar o formulário de registro
app.post('/register', async (req, res) => {
    // Extrai os dados do corpo da requisição
    const { nome, email, senha } = req.body;
    try {
        // Consulta o banco para ver se o email já existe
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length > 0) {
            // Se o email já existe, redireciona com uma mensagem de erro
            return res.redirect('/register?mensagem=Email já cadastrado.');
        }

        // Gera um hash da senha para armazenar de forma segura
        const hashedPassword = await bcrypt.hash(senha, 10);
        // Insere o novo usuário no banco de dados
        await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);
        // Redireciona para o login com uma mensagem de sucesso
        res.redirect('/login?mensagem=Conta criada com sucesso! Faça login.');

    } catch (error) {
        // Em caso de erro no servidor, exibe no console e redireciona com uma mensagem
        console.error('Erro ao registrar usuário:', error);
        res.redirect('/register?mensagem=Erro ao criar conta.');
    }
});

// Rota para processar o formulário de login
app.post('/login', async (req, res) => {
    // Extrai os dados do corpo da requisição
    const { email, senha } = req.body;
    try {
        // Busca o usuário no banco de dados pelo email
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = rows[0];

        // Se o usuário não for encontrado, redireciona com erro
        if (!user) {
            return res.redirect('/login?mensagem=Email ou senha incorretos.');
        }

        // Compara a senha digitada com a senha hash do banco de dados
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (isMatch) {
            // Se as senhas combinam, define as variáveis de sessão
            req.session.isLoggedIn = true;
            req.session.userId = user.id;
            req.session.nome = user.nome;
            return res.redirect('/dashboard'); // Redireciona para o dashboard
        } else {
            // Se as senhas não combinam, redireciona com erro
            return res.redirect('/login?mensagem=Email ou senha incorretos.');
        }

    } catch (error) {
        // Em caso de erro no servidor, exibe no console e redireciona com uma mensagem
        console.error('Erro ao fazer login:', error);
        res.redirect('/login?mensagem=Erro ao fazer login.');
    }
});

// --- Rota Protegida e Logout ---

// Rota do dashboard (só acessível se o usuário estiver logado)
app.get('/dashboard', (req, res) => {
    // Verifica se o usuário não está logado

    if (!req.session.isLoggedIn) {
        return res.redirect('/login?mensagem=Por favor, faça login.');
    }
    // Renderiza o dashboard e passa o nome do usuário da sessão
    res.render('dashboard', {
         nomeUsuario: req.session.nome 
         });
});

// Rota para fazer logout
app.get('/logout', (req, res) => {
    // Destrói a sessão do usuário
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard'); // Em caso de erro, redireciona para o dashboard
        }
        res.clearCookie('connect.sid'); // Limpa o cookie da sessão
        res.redirect('/login?mensagem=Você foi desconectado.'); // Redireciona para o login com uma mensagem
    });
});

// Inicia o servidor e escuta na porta definida
app.listen(PORT, '0.0.0.0',  () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});