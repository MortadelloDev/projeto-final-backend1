const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const veiculosRoutes = require('./veiculos/veiculosController'); 
require('./veiculos/veiculosController'); // Adicionado por Micael
const entregasRoutes = require('./entregas/entregasController'); // Adicionado por Natan
app.use('/veiculos', veiculosRoutes);
app.use('/entregas', entregasRoutes);
app.listen(PORT, () => {
  console.log([Debian Linux] Servidor rodando na porta ${PORT});
  console.log(Processo PID: ${process.pid});
});