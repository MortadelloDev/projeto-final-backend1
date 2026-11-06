# API RESTful — Gestão de Frotas e Entregas

API RESTful desenvolvida para a disciplina no ambiente **Debian Linux** para o gerenciamento de veículos e entregas de frota.

---

## Integrantes da Dupla

- **Micael**: Responsável pelo módulo e CRUD da entidade **Veículos**.
- **Natan**: Responsável pelo módulo e CRUD da entidade **Entregas**.

---

## Tecnologias Utilizadas

- **Node.js** & **Express** (Construção da API RESTful)
- **Bash Shell Script**, **curl** e **jq** (Automação de Testes)
- **Debian Linux** (Ambiente de Execução e Gerenciamento de Processos)
- **Git / GitHub** (Controle de Versão)

---

## Como Executar o Projeto

Siga os passos abaixo no seu terminal Linux para instalar as dependências e rodar a API:

1. **Instalar as dependências do projeto:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor Express:**
   ```bash
   npm start
   ```
   *(O servidor rodará por padrão na porta `3000`)*.

### Gerenciamento de Processos no Debian Linux

- **Identificar o PID do processo em execução:**
  ```bash
  ps aux | grep node
  ```

- **Encerrar a aplicação de forma limpa:**
  ```bash
  kill <PID>
  ```

---

## Execução dos Testes Automáticos

Com a API em execução em segundo plano ou em outro terminal, rode o script de testes automatizados:

```bash
chmod +x testes.sh
./testes.sh
```

> **Nota:** Todos os resultados detalhados das requisições `curl`, formatados via `jq` e com os devidos status HTTP, serão armazenados automaticamente no arquivo `resultado_execucao.log`.

---

## Documentação dos Endpoints

### Entidade: Veículos (Micael)

#### 1. Listar Veículos
Retorna a lista de veículos cadastrados. Suporta filtro por status via *Query Params*.
- **Método & Endpoint:** `GET /veiculos`
- **Query Params:** `?status=disponivel` *(Opcional)*
- **Resposta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "placa": "ABC-1234",
      "modelo": "Volvo FH 540",
      "status": "disponivel"
    }
  ]
  ```

#### 2. Buscar Veículo por ID
- **Método & Endpoint:** `GET /veiculos/:id`
- **Resposta Sucesso (200 OK):** Objeto do veículo.
- **Resposta Erro (404 Not Found):**
  ```json
  {
    "erro": "Veículo não encontrado"
  }
  ```

#### 3. Criar Veículo
- **Método & Endpoint:** `POST /veiculos`
- **Payload Obrigatório:** `placa`, `modelo`
- **Exemplo de Corpo da Requisição:**
  ```json
  {
    "placa": "MOC-2024",
    "modelo": "Mercedes Actros",
    "status": "disponivel"
  }
  ```
- **Resposta Sucesso (201 Created):** Retorna o veículo cadastrado com `id` gerado.
- **Resposta Erro (400 Bad Request):** Faltando campos obrigatórios (`placa` ou `modelo`).

#### 4. Atualizar Veículo
- **Método & Endpoint:** `PUT /veiculos/:id`
- **Resposta Sucesso (200 OK):** Retorna o objeto atualizado.
- **Resposta Erro (404 Not Found):** Veículo não encontrado.

#### 5. Deletar Veículo
- **Método & Endpoint:** `DELETE /veiculos/:id`
- **Resposta Sucesso (200 OK):** `{"mensagem": "Veículo removido com sucesso"}`
- **Resposta Erro (404 Not Found):** Veículo não encontrado.

---

### Entidade: Entregas (Natan)

#### 1. Listar Entregas
Retorna a lista de entregas. Suporta filtros por status e por veículo associado via *Query Params*.
- **Método & Endpoint:** `GET /entregas`
- **Query Params:** `?status=pendente` ou `?veiculoId=1` *(Opcionais)*
- **Resposta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "veiculoId": 2,
      "enderecoDestino": "Rua Belaterra, 281",
      "status": "em_andamento"
    }
  ]
  ```

#### 2. Buscar Entrega por ID
- **Método & Endpoint:** `GET /entregas/:id`
- **Resposta Sucesso (200 OK):** Objeto da entrega.
- **Resposta Erro (404 Not Found):**
  ```json
  {
    "erro": "Entrega não encontrada"
  }
  ```

#### 3. Criar Entrega
- **Método & Endpoint:** `POST /entregas`
- **Payload Obrigatório:** `veiculoId`, `enderecoDestino`
- **Exemplo de Corpo da Requisição:**
  ```json
  {
    "veiculoId": 1,
    "enderecoDestino": "Rua Alexandria, 86",
    "status": "pendente"
  }
  ```
- **Resposta Sucesso (201 Created):** Retorna a entrega cadastrada com `id` gerado.
- **Resposta Erro (400 Bad Request):** Faltando campos obrigatórios (`veiculoId` ou `enderecoDestino`).

#### 4. Atualizar Entrega
- **Método & Endpoint:** `PUT /entregas/:id`
- **Resposta Sucesso (200 OK):** Retorna a entrega atualizada.
- **Resposta Erro (404 Not Found):** Entrega não encontrada.

#### 5. Deletar Entrega
- **Método & Endpoint:** `DELETE /entregas/:id`
- **Resposta Sucesso (200 OK):** `{"mensagem": "Entrega removida com sucesso"}`
- **Resposta Erro (404 Not Found):** Entrega não encontrada.
