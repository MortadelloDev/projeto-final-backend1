// Base de dados em memória para Entregas
let entregas = [
  { id: 1, veiculoId: 2, enderecoDestino: "Rua Belterra, 281", status: "em_andamento" },
  { id: 2, veiculoId: 1, enderecoDestino: "Rua Alexandria, 86", status: "pendente" }
];

let proximoId = 3;

module.exports = {
  // Retorna todas as entregas com suporte a query params (status ou veiculoId)
  listar: (filtros) => {
    let resultado = entregas;
    if (filtros.status) {
      resultado = resultado.filter(e => e.status.toLowerCase() === filtros.status.toLowerCase());
    }
    if (filtros.veiculoId) {
      resultado = resultado.filter(e => e.veiculoId === parseInt(filtros.veiculoId));
    }
    return resultado;
  },

  // Busca entrega por ID
  buscarPorId: (id) => entregas.find(e => e.id === parseInt(id)),

  // Cria uma nova entrega
  criar: (dados) => {
    const novaEntrega = {
      id: proximoId++,
      veiculoId: parseInt(dados.veiculoId),
      enderecoDestino: dados.enderecoDestino,
      status: dados.status || "pendente"
    };
    entregas.push(novaEntrega);
    return novaEntrega;
  },

  // Atualiza entrega
  atualizar: (id, dados) => {
    const index = entregas.findIndex(e => e.id === parseInt(id));
    if (index === -1) return null;

    entregas[index] = {
      ...entregas[index],
      ...dados,
      id: parseInt(id)
    };
    return entregas[index];
  },

  // Remove entrega
  deletar: (id) => {
    const index = entregas.findIndex(e => e.id === parseInt(id));
    if (index === -1) return false;
    entregas.splice(index, 1);
    return true;
  }
};
