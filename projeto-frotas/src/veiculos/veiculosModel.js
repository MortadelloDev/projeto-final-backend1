// Base de dados em memória para Veículos
let veiculos = [
  { id: 1, placa: "BET-6700", modelo: "Volvo FH 540", status: "disponivel" },
  { id: 2, placa: "SON-3456", modelo: "Scania R450", status: "em_rota" }
];

let proximoId = 3;

module.exports = {
  // Retorna todos os veículos ou filtra por status
  listar: (status) => {
    if (status) {
      return veiculos.filter(v => v.status.toLowerCase() === status.toLowerCase());
    }
    return veiculos;
  },

  // Busca veículo por ID
  buscarPorId: (id) => veiculos.find(v => v.id === parseInt(id)),

  // Cria um novo veículo
  criar: (dados) => {
    const novoVeiculo = {
      id: proximoId++,
      placa: dados.placa,
      modelo: dados.modelo,
      status: dados.status || "disponivel"
    };
    veiculos.push(novoVeiculo);
    return novoVeiculo;
  },

  // Atualiza veículo existente
  atualizar: (id, dados) => {
    const index = veiculos.findIndex(v => v.id === parseInt(id));
    if (index === -1) return null;

    veiculos[index] = {
      ...veiculos[index],
      ...dados,
      id: parseInt(id) // Mantém o ID original
    };
    return veiculos[index];
  },

  // Remove veículo
  deletar: (id) => {
    const index = veiculos.findIndex(v => v.id === parseInt(id));
    if (index === -1) return false;
    veiculos.splice(index, 1);
    return true;
  }
};