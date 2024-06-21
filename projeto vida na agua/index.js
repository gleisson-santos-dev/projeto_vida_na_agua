/*Para realizar tais funcionalidades, deverão ser utilizadas as API’s DOM HTML e Web
Storage.
*/
//Carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    const formularioUsuario = document.getElementById('formularioUsuario');
    const listaUsuarios = document.getElementById('listaUsuarios');
    const pesquisa = document.getElementById('pesquisa');
    const botaoLimparCampos = document.getElementById('limparCampos');
    const botaoExcluirTodos = document.getElementById('excluirTodos');

    /*PEga os usuarios que foram armazenados no localStorage.
      Essa função faz a busca dos dados armazenados na chave usuarios
      Convertendo a string JSON em um objeto, mas caso nao tenha nada ela retorna um array vazio*/
    function obterUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    /*Salvar um usuario no localStorage e atualizar a lista na pagina.
      Aqui ela vai trasformar a lista de usuarios em uma string JSON e armazenar no localStorage */
    function salvarUsuario(usuario) {
        const usuarios = obterUsuarios();
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderizarUsuarios(usuarios);
    }

    /* Função que vai exibir a lista na pagina
       Limpa a lista atual mostrada na pagina
       É criado um item de lista 'li' para os usuarios 
       Adiciona o botão excluir
       Ao clicar no botao excluir temos um evento para remover o usuário da lista e do localStorage*/
    function renderizarUsuarios(usuarios) {
        listaUsuarios.innerHTML = '';
        usuarios.forEach((usuario, indice) => {
            const li = document.createElement('li');
            li.textContent = `${usuario.data} - ${usuario.nome} - ${usuario.email}`;
            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.addEventListener('click', function() {
                excluirUsuario(indice);
            });
            li.appendChild(botaoExcluir);
            listaUsuarios.appendChild(li);
        });
    }

    /* Essa função vai excluir um usuario especifico da lista e tambem do localStorage
       Remove a partir do indice passado
       O localStorage é atualizado com a nova lista e chama a função renderizarUsuarios */
    function excluirUsuario(indice) {
        const usuarios = obterUsuarios();
        usuarios.splice(indice, 1);
        //Atualiza o localStorage com a nova lista
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        //atualiza a lista mostrada na pagina
        renderizarUsuarios(usuarios);
    }

    // Função para excluir todos os usuários da lista e do Local Storage
    function excluirTodosUsuarios() {
        localStorage.removeItem('usuarios');
        //Limpar a lista mostrada na pagina
        renderizarUsuarios([]);
    }

    /* Funcao para pesquisar por nome na lista 
       A partir do dos caracteres digitados filtra a lista, 
       Exibindo aqueles que possuem os caracteres e chama a função renderizarUsuario*/
    function filtrarUsuarios(consulta) {
        const usuarios = obterUsuarios();
        const usuariosFiltrados = usuarios.filter(usuario => 
            usuario.nome.includes(consulta)
        );
        renderizarUsuarios(usuariosFiltrados);
    }

    
    formularioUsuario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const data = new Date().toLocaleString();
        salvarUsuario({ nome, email, data });
        formularioUsuario.reset();
    });

    
    botaoLimparCampos.addEventListener('click', function() {
        formularioUsuario.reset();
    });

    
    botaoExcluirTodos.addEventListener('click', function() {
        excluirTodosUsuarios();
    });

    
    pesquisa.addEventListener('input', function() {
        filtrarUsuarios(pesquisa.value);
    });

   
    renderizarUsuarios(obterUsuarios());
});
