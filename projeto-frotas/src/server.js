const express = require('express');
const app = express();
const PORT = 3000;
// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());
// Importação das Rotas
const veiculosRoutes = require('./veiculos/veiculosController'); 
require('./veiculos/veiculosController'); // Adicionado por Micael
const entregasRoutes = require('./entregas/entregasController'); // Adicionado por Natan
// Registro das Rotas
app.use('/veiculos', veiculosRoutes);
app.use('/entregas', entregasRoutes);
// Servidor escutando na porta configurada
app.listen(PORT, () => {
  console.log([Debian Linux] Servidor rodando na porta ${PORT});
  console.log(Processo PID: ${process.pid});
});