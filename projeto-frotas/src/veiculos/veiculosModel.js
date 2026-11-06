
let veiculos = [
  { id: 1, placa: "DQJ-7792", modelo: "Volvo FH 540", status: "disponivel" },
  { id: 2, placa: "BET-6789", modelo: "Scania R450", status: "em_rota" }
];

let proximoId = 3;

module.exports = {
  
  listar: (status) => {
    if (status) {
      return veiculos.filter(v => v.status.toLowerCase() === status.toLowerCase());
    }
    return veiculos;
  },

  buscarPorId: (id) => veiculos.find(v => v.id === parseInt(id)),

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

  atualizar: (id, dados) => {
    const index = veiculos.findIndex(v => v.id === parseInt(id));
    if (index === -1) return null;

    veiculos[index] = {
      ...veiculos[index],
      ...dados,
      id: parseInt(id) 
    };
    return veiculos[index];
  },

  deletar: (id) => {
    const index = veiculos.findIndex(v => v.id === parseInt(id));
    if (index === -1) return false;
    veiculos.splice(index, 1);
    return true;
  }
};