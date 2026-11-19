const express = require('express');
const router = express.Router();

// Base de dados em memória para Entregas
let entregas = [
  { id: 1, veiculoId: 2, enderecoDestino: "Rua Belterra, 281", status: "em_andamento" },
  { id: 2, veiculoId: 1, enderecoDestino: "Rua Alexandria, 86", status: "pendente" }
];

let proximoId = 3;

// Retorna todas as entregas com suporte a query params (status ou veiculoId)
router.get('/', (req, res) => {
  let resultado = entregas;
  
  if (req.query.status) {
    resultado = resultado.filter(e => e.status.toLowerCase() === req.query.status.toLowerCase());
  }
  if (req.query.veiculoId) {
    resultado = resultado.filter(e => e.veiculoId === parseInt(req.query.veiculoId));
  }
  
  res.json(resultado);
});

// Busca entrega por ID
router.get('/:id', (req, res) => {
  const entrega = entregas.find(e => e.id === parseInt(req.params.id));
  
  if (!entrega) {
    return res.status(404).json({ erro: "Entrega não encontrada" });
  }
  res.json(entrega);
});

// Cria uma nova entrega
router.post('/', (req, res) => {
  const novaEntrega = {
    id: proximoId++,
    veiculoId: parseInt(req.body.veiculoId),
    enderecoDestino: req.body.enderecoDestino,
    status: req.body.status || "pendente"
  };
  
  entregas.push(novaEntrega);
  res.status(201).json(novaEntrega);
});

// Atualiza entrega
router.put('/:id', (req, res) => {
  const index = entregas.findIndex(e => e.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ erro: "Entrega não encontrada" });
  }

  entregas[index] = {
    ...entregas[index],
    ...req.body,
    id: parseInt(req.params.id) // Garante que o ID da URL seja mantido
  };
  
  res.json(entregas[index]);
});

// Remove entrega
router.delete('/:id', (req, res) => {
  const index = entregas.findIndex(e => e.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ erro: "Entrega não encontrada" });
  }
  
  entregas.splice(index, 1);
  res.status(204).send(); // Retorna sucesso sem conteúdo
});

// Exporta o roteador montado no final do arquivo
module.exports = router;