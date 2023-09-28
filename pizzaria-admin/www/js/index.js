var PIZZARIA_ID = "Pizzageddon";
var listaPizzasCadastradas = [];

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    loadPizzas();
    // Cordova is now initialized. Have fun!
    alert("Bem vindo ao Pizzageddon");
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('btnNovo').addEventListener('click', newPizza);
    document.getElementById('btnCreate').addEventListener('click', create);
    document.getElementById('btnCancel').addEventListener('click', cancel);
    var listaPizzas = document.getElementById('listaPizzas');
    document.getElementById('btnSave').addEventListener('click', save);
    document.getElementById('btnExclude').addEventListener('click', exclude);
    cordova.plugin.http.setDataSerializer('json');
}

function exclude(id){
    cordova.plugin.http.delete(`https://pedidos-pizzaria.glitch.me/admin/pizza/Pizzageddon/${pizza.pizza}`,
        {},
        {},
        function(response){
            console.log(response.data)
            unshow();
            loadPizzas();
        },
        function(response){
            console.log(response.error)
    });
    
}

function save(){
    pizzaOld = {
        pizzaid: pizza._id,
        pizzaria: pizza.pizzaria,
        pizza: document.getElementById('pizza').value,
        preco: document.getElementById('preco').value,
        imagem: document.getElementById('imagem').value
    };
    cordova.plugin.http.put('https://pedidos-pizzaria.glitch.me/admin/pizza/',
    pizzaOld,
    {},
    function (response) {
        loadPizzas();
        unshow();
    },
    function (response) {
        console.error(response.error);
    });
}

function show(){
    applista.style.display = 'none';
    appcadastro.style.display = 'block';
    btnExclude.style.display = 'none';
}
function unshow(){
    applista.style.display = 'block';
    appcadastro.style.display = 'none';
}
function newPizza(){
    show();
    btnCreate.style.display = 'block';
    btnSave.style.display = 'none';
    document.getElementById('pizza').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('imagem').value = '';
}

function cancel(){
    applista.style.display = 'block';
    appcadastro.style.display = 'none';
}

function create(){
    var pizza = document.getElementById('pizza').value;
    var preco = document.getElementById('preco').value;
    let imagem = 'https://media.tenor.com/uarApvGaKDcAAAAM/panut-butter-jelly-time-dancing.gif';
    var novaPizza = {
        pizza: pizza,
        preco: preco,
        imagem: imagem,
        pizzaria: PIZZARIA_ID
    };
    cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/admin/pizza/',
    novaPizza,
    {},
    function (response) {
        console.log(response.data);
        loadPizzas();
        unshow();
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
    show();
    btnExclude.style.display = 'block';
    btnSave.style.display = 'block';
    btnCreate.style.display = 'none';
}
function alterarPizza (id, list) {
  
}

function loadPizzas(){
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/admin/pizzas/Pizzageddon',
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
