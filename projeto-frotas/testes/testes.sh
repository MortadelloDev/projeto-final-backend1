#!/bin/bash

# Garante permissão de execução nos sub-scripts
chmod +x ./testes/testes_veiculos.sh
chmod +x ./testes/testes_entregas.sh

# Executa ambos os testes gravando a saída completa em resultado_execucao.log
{
  echo "=========================================="
  echo "  RELATÓRIO DE EXECUÇÃO DOS TESTES AUTOMÁTICOS"
  echo "  Data: $(date)"
  echo "=========================================="
  echo ""
  
  ./testes/testes_veiculos.sh
  
  echo ""
  echo "------------------------------------------"
  echo ""
  
  ./testes/testes_entregas.sh

} > resultado_execucao.log 2>&1

echo "Testes concluídos! O relatório foi salvo em 'resultado_execucao.log'."