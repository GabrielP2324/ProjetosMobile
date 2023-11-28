var listaPizzasCadastradas = [];

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    pegar_Pizzas();
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('btnNovo').addEventListener('click', nova_Pizza);
    document.getElementById('btnCreate').addEventListener('click', Criar);
    document.getElementById('btnCancel').addEventListener('click', Cancelar);
    var listaPizzas = document.getElementById('listaPizzas');
    document.getElementById('btnSave').addEventListener('click', Salvar);
    document.getElementById('btnExclude').addEventListener('click', Excluir);
    cordova.plugin.http.setDataSerializer('json');
}

function Excluir(id){
    cordova.plugin.http.delete(`https://pedidos-pizzaria.glitch.me/admin/pizza/JuliasPizza/${pizza.pizza}`,
        {},
        {},
        function(response){
            console.log(response.data)
            esconder();
            pegar_Pizzas();
        },
        function(response){
            console.log(response.error)
    });
    
}

function Salvar(){
    pizza_temp = {
        pizzaid: pizza._id,
        pizzaria: pizza.pizzaria,
        pizza: document.getElementById('pizza').value,
        preco: document.getElementById('preco').value,
        imagem: document.getElementById('imagem').value
    };
    cordova.plugin.http.put('https://pedidos-pizzaria.glitch.me/admin/pizza/',
    pizza_temp,
    {},
    function (response) {
        pegar_Pizzas();
        esconder();
    },
    function (response) {
        console.error(response.error);
    });
}

function mostrar(){
    applista.style.display = 'none';
    appcadastro.style.display = 'block';
    btnExclude.style.display = 'none';
}
function esconder(){
    applista.style.display = 'block';
    appcadastro.style.display = 'none';
}
function nova_Pizza(){
    mostrar();
    btnCreate.style.display = 'block';
    btnSave.style.display = 'none';
    document.getElementById('pizza').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('imagem').value = '';
}

function Cancelar(){
    applista.style.display = 'block';
    appcadastro.style.display = 'none';
}

function Criar(){
    var pizza = document.getElementById('pizza').value;
    var preco = document.getElementById('preco').value;
    let imagem = 'https://drpizza.grandchef.com.br/storage/images/produto/972b2412f83785054e960273f97cdec6.png';
    var novaPizza = {
        pizza: pizza,
        preco: preco,
        imagem: imagem,
        pizzaria: 'JuliasPizza'
    };
    cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/admin/pizza/',
    novaPizza,
    {},
    function (response) {
        console.log(response.data);
        pegar_Pizzas();
        esconder();
    },
    function (response) {
        console.error(response.error);
    });
}

function carregarDadosPizza (id) {
    pizza = listaPizzasCadastradas[id];
    document.getElementById('pizza').value = pizza.pizza;
    document.getElementById('preco').value = pizza.preco;
    document.getElementById('imagem').value = pizza.imagem;
    mostrar();
    btnExclude.style.display = 'block';
    btnSave.style.display = 'block';
    btnCreate.style.display = 'none';
}
function alterarPizza (id, list) {
  
}

function pegar_Pizzas(){
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/admin/pizzas/JuliasPizza',
    {},
    {},
    function (response) {
        listaPizzasCadastradas = JSON.parse(response.data);
        listaPizzas.innerHTML = '';
        listaPizzasCadastradas.forEach((item, idx) => {
            const novo = document.createElement('li');
                        novo.innerHTML = `<h2>${item.pizza}</h2><h3>R$ ${item.preco}</h3><figure><img src="${item.imagem}" alt=""></figure>`;
            novo.id = idx;
            novo.onclick = function () {
                carregarDadosPizza (novo.id);
            };
            listaPizzas.appendChild(novo);
        });
    },
    function (response) {
        console.error(response.error);
    });
    
}
