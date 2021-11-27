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

// implementação do serviço
server.addService(pizzaService.service, {
    AdicionarPizza: (call, callback) => {
        
    },

    ListarPizzas: (call, callback) => {
    },

    RealizarPedido: (call, callback) => {
    },
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log("Servidor gRPC rodando!");
    server.start();
});