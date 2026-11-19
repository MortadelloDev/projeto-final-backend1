#!/bin/bash

BASE_URL="http://localhost:3030/veiculos"

{
  echo "=========================================="
  echo "  RELATÓRIO DE EXECUÇÃO DOS TESTES AUTOMÁTICOS"
  echo "  Data: $(date)"
  echo "=========================================="
  echo ""

  # 1. Testando POST (Criar novo) primeiro para garantir que existe um registro
  echo "[TESTE 1] Criando um novo veículo (POST /veiculos):"
  RESPOSTA_POST=$(curl -s -X POST "$BASE_URL" \
       -H "Content-Type: application/json" \
       -d '{"placa": "ABC-1234", "modelo": "Volkswagen Gol", "status": "disponivel"}')
  echo "$RESPOSTA_POST"
  echo -e "\n"

  # Extrai o ID dinâmico do veículo recém-criado
  NOVO_ID=$(echo "$RESPOSTA_POST" | node -pe "JSON.parse(require('fs').readFileSync(0, 'utf-8')).id")

  # 2. Testando GET (Listar todos - já deve mostrar o veículo criado acima)
  echo "[TESTE 2] Listando todos os veículos (GET /veiculos):"
  curl -s -X GET "$BASE_URL"
  echo -e "\n"

  # 3. Testando GET por ID (usando o NOVO_ID)
  echo "[TESTE 3] Buscando o veículo recém-criado pelo ID $NOVO_ID (GET /veiculos/$NOVO_ID):"
  curl -s -X GET "$BASE_URL/$NOVO_ID"
  echo -e "\n"

  # 4. Testando PUT (Atualizar o NOVO_ID)
  echo "[TESTE 4] Atualizando o status do veículo ID $NOVO_ID (PUT /veiculos/$NOVO_ID):"
  curl -s -X PUT "$BASE_URL/$NOVO_ID" \
       -H "Content-Type: application/json" \
       -d '{"status": "em_manutencao"}'
  echo -e "\n"

  # 5. Testando DELETE (Remover o NOVO_ID)
  echo "[TESTE 5] Deletando o veículo ID $NOVO_ID (DELETE /veiculos/$NOVO_ID):"
  curl -s -X DELETE "$BASE_URL/$NOVO_ID" -w " | Status Code HTTP: %{http_code}"
  echo -e "\n\n"

  echo "=========================================="
  echo " TESTES CONCLUÍDOS!"
  echo "=========================================="

} > resultado_execucao.log 2>&1

echo "Testes concluídos! O relatório foi salvo em 'resultado_execucao.log'."