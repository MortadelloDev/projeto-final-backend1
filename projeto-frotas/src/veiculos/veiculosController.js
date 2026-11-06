const express = require('express');
const router = express.Router();
const VeiculosModel = require('./veiculosModel');

// GET /veiculos - Lista veículos (suporta Query Params ex: ?status=disponivel)
router.get('/', (req, res) => {
  const { status } = req.query;
  const resultados = VeiculosModel.listar(status);
  res.status(200).json(resultados);
});

// GET /veiculos/:id - Busca veículo por ID
router.get('/:id', (req, res) => {
  const veiculo = VeiculosModel.buscarPorId(req.params.id);
  if (!veiculo) {
    return res.status(404).json({ erro: "Veículo não encontrado" });
  }
  res.status(200).json(veiculo);
});

// POST /veiculos - Cria novo veículo (Validação de payload)
router.post('/', (req, res) => {
  const { placa, modelo } = req.body;

  // Validação: placa e modelo são obrigatórios
  if (!placa || !modelo) {
    return res.status(400).json({ erro: "Campos 'placa' e 'modelo' são obrigatórios" });
  }

  const novoVeiculo = VeiculosModel.criar(req.body);
  res.status(201).json(novoVeiculo);
});

// PUT /veiculos/:id - Atualiza um veículo
router.put('/:id', (req, res) => {
  const veiculoAtualizado = VeiculosModel.atualizar(req.params.id, req.body);
  if (!veiculoAtualizado) {
    return res.status(404).json({ erro: "Veículo não encontrado para atualização" });
  }
  res.status(200).json(veiculoAtualizado);
});

// DELETE /veiculos/:id - Remove um veículo
router.delete('/:id', (req, res) => {
  const deletado = VeiculosModel.deletar(req.params.id);
  if (!deletado) {
    return res.status(404).json({ erro: "Veículo não encontrado para remoção" });
  }
  res.status(200).json({ mensagem: "Veículo removido com sucesso" });
});

module.exports = router;