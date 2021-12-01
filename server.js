const PROTO_PATH = __dirname + '/pizzaria.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).pizzaria;

// The protoDescriptor object has the full package hierarchy
const pizzaService = protoDescriptor.PizzaService;

const server = new grpc.Server();

const bd = {
    pedidos: [],
    cardapio: [],
};

// implementação do serviço
server.addService(pizzaService.service, {
    AdicionarPizza: (call, callback) => {
        const pizza = call.request;
        bd.cardapio.push(pizza);

        callback(null, {});
    },

    ListarPizzas: (call, callback) => {
        callback(null, { pizzas: bd.cardapio });
    },

    RealizarPedido: (call, callback) => {
        const pedido = call.request;
        const valorTotal = pedido.pizza.preco * pedido.quantidade;

        bd.pedidos.push(pedido);

        callback(null, { valorTotal });
    },

    ListarPedidos: (call, callback) => {
        callback(null, { pedidos: bd.pedidos });
    },
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log("Servidor gRPC rodando!");
    server.start();
});