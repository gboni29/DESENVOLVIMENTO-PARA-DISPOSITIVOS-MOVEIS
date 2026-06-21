# Catálogo de Filmes com Avaliações

Trabalho acadêmico — catálogo de filmes com watchlist e avaliações de usuários.  
Persistência feita em arquivos JSON locais (sem banco de dados).

## Arquitetura

```
.
├── backend/   # API REST em Java + Spring Boot
└── frontend/  # Interface web em React + TypeScript
```

### Backend — fluxo de uma requisição

```
HTTP Request
    │
    ▼
Controller        → recebe a requisição, valida o formato e delega
    │
    ▼
Service           → aplica regras de negócio (validações, composição)
    │
    ▼
Repository        → lê/escreve no arquivo .json correspondente (substitui o banco)
    │
    ▼
arquivo .json     → persistência local em src/main/resources/data/
```

### Frontend — organização de pastas

| Pasta         | Responsabilidade                                              |
|---------------|---------------------------------------------------------------|
| `types/`      | Interfaces TypeScript que espelham os Models do backend       |
| `services/`   | Funções de chamada HTTP à API (único ponto de `fetch`)        |
| `pages/`      | Telas completas — buscam dados via services                   |
| `components/` | Blocos de UI reutilizáveis — recebem dados via props          |

## Arquivos JSON de dados

Localizados em `backend/src/main/resources/data/`:

| Arquivo           | Conteúdo                        |
|-------------------|---------------------------------|
| `filmes.json`     | Catálogo de filmes              |
| `usuarios.json`   | Usuários cadastrados            |
| `watchlist.json`  | Relação usuário ↔ filmes salvos |
| `avaliacoes.json` | Avaliações e notas por filme    |

## Pré-requisitos

- Java 21+
- Maven 3.9+
- Node.js 20+

## Como rodar

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

No Windows sem o wrapper Maven:
```bash
cd backend
mvn spring-boot:run
```

API disponível em `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponível em `http://localhost:5173`

## Endpoints disponíveis

| Método | Rota                          | Descrição                        |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/filmes`                 | Lista todos os filmes            |
| GET    | `/api/filmes/:id`             | Busca filme por ID               |
| POST   | `/api/filmes`                 | Cria novo filme                  |
| PUT    | `/api/filmes/:id`             | Atualiza filme                   |
| DELETE | `/api/filmes/:id`             | Remove filme                     |
| GET    | `/api/usuarios`               | Lista usuários                   |
| POST   | `/api/usuarios`               | Cria usuário                     |
| GET    | `/api/watchlist/usuario/:id`  | Watchlist de um usuário          |
| POST   | `/api/watchlist`              | Adiciona à watchlist             |
| DELETE | `/api/watchlist/:id`          | Remove da watchlist              |
| GET    | `/api/avaliacoes/filme/:id`   | Avaliações de um filme           |
| GET    | `/api/avaliacoes/usuario/:id` | Avaliações feitas por um usuário |
| POST   | `/api/avaliacoes`             | Cria avaliação                   |
| DELETE | `/api/avaliacoes/:id`         | Remove avaliação                 |
