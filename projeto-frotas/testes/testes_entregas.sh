#!/bin/bash

BASE_URL="http://localhost:3030/entregas"

{
  echo "=========================================="
  echo "  RELATÓRIO DE EXECUÇÃO DOS TESTES DE ENTREGAS"
  echo "  Data: $(date)"
  echo "=========================================="
  echo ""

  # 1. CREATE (POST /entregas)
  echo "[TESTE 1] Criando uma nova entrega (POST /entregas):"
  RESPOSTA_POST=$(curl -s -X POST "$BASE_URL" \
       -H "Content-Type: application/json" \
       -d '{"veiculoId": 2, "enderecoDestino": "Rua das Flores, 500", "status": "pendente"}')
  echo "$RESPOSTA_POST"
  echo -e "\n"

  # Extrai o ID dinâmico da entrega recém-criada
  NOVO_ID=$(echo "$RESPOSTA_POST" | node -pe "JSON.parse(require('fs').readFileSync(0, 'utf-8')).id")

  # 2. READ ALL (GET /entregas)
  echo "[TESTE 2] Listando todas as entregas (GET /entregas):"
  curl -s -X GET "$BASE_URL"
  echo -e "\n"

  # 3. READ FILTERED BY STATUS (GET /entregas?status=pendente)
  echo "[TESTE 3] Filtrando entregas por status 'pendente' (GET /entregas?status=pendente):"
  curl -s -X GET "$BASE_URL?status=pendente"
  echo -e "\n"

  # 4. READ FILTERED BY VEICULO (GET /entregas?veiculoId=2)
  echo "[TESTE 4] Filtrando entregas pelo veiculoId 2 (GET /entregas?veiculoId=2):"
  curl -s -X GET "$BASE_URL?veiculoId=2"
  echo -e "\n"

  # 5. READ ONE (GET /entregas/:id)
  echo "[TESTE 5] Buscando a entrega pelo ID $NOVO_ID (GET /entregas/$NOVO_ID):"
  curl -s -X GET "$BASE_URL/$NOVO_ID"
  echo -e "\n"

  # 6. UPDATE (PUT /entregas/:id)
  echo "[TESTE 6] Atualizando o status da entrega ID $NOVO_ID (PUT /entregas/$NOVO_ID):"
  curl -s -X PUT "$BASE_URL/$NOVO_ID" \
       -H "Content-Type: application/json" \
       -d '{"status": "em_andamento"}'
  echo -e "\n"

  # 7. DELETE (DELETE /entregas/:id)
  echo "[TESTE 7] Deletando a entrega ID $NOVO_ID (DELETE /entregas/$NOVO_ID):"
  curl -s -X DELETE "$BASE_URL/$NOVO_ID" -w " | Status Code HTTP: %{http_code}"
  echo -e "\n\n"

  echo "=========================================="
  echo " TESTES DE ENTREGAS CONCLUÍDOS!"
  echo "=========================================="

} > resultado_execucao.log 2>&1

echo "Testes de entregas concluídos! O relatório foi salvo em 'resultado_execucao.log'."