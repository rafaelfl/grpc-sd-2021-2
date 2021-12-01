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

const client = new protoDescriptor.PizzaService("127.0.0.1:50051", grpc.credentials.createInsecure());

// client.AdicionarPizza({
//     "id": 1,
//     "nome": "Calabresa",
//     "descricao": "Descrição da calabresa",
//     "preco": 14
//   }, (err, result) => {
//     if (err) {
//         console.log("Erro: " + err);
//     } else {
//         console.log("Pizza cadastrada com sucesso!");
//     }
//   });

//   client.AdicionarPizza({
//     "id": 2,
//     "nome": "Nordestina",
//     "descricao": "Pizza de carne de sol e manteiga de garrafa",
//     "preco": 20
//   }, (err, result) => {
//     if (err) {
//         console.log("Erro: " + err);
//     } else {
//         console.log("Pizza cadastrada com sucesso!");
//     }
//   });

client.ListarPizzas({}, (err, result) => {
    if (err) {
        console.log("Erro: " + err);
    } else {
        console.log("Cardápio:");

        const { pizzas } = result;

        for (let i = 0; i < pizzas.length; i++) {
            console.log("- Pizza:");
            console.log(pizzas[i]);
        }
    }
});