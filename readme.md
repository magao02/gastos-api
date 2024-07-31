#  API IMDB com Node.js e TypeScript

## Introdução

Essa api ela simula o cadastro, listagem e votação de filmes usando um sistema de login com autenticação JWT e autorização por tipo de usuário


## Como Rodar o Projeto

### Pré-requisitos

- Node.js 
- NPM ou Yarn
- Docker 

### Passos para Rodar o Projeto

1. **Clone o Repositório**

   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. **Intale as dependência**
  ```sh
    npm install

3. **Usando Docker**
 - lembre de configurar o .env.Example para .env
 - Rodar o docker-compose
 - ele irá rodar automaticamente o banco de dados e suas migrations e fazer conexão com o backend

4.  **Usuario adm**
- por default um usuario do tipo adm é criado no ao rodas as migrations
- email: admin@email.com,
	password: senha123


## Decisões Tomadas

### Escolha de Dependências

- **Express:** Escolhido por sua simplicidade e flexibilidade para construção de APIs.
- **TypeORM:** Para mapeamento objeto-relacional, decidi usar o typeORM pois com ele caso em uma evolução do sistema seja decidido alterar o banco de dados não iremos precisar mudar todo nosso código, pois o typeORM abstrai o banco de dados, um outro ponto foi que o typeORM ajuda na segurança contra sqlInjection.
- **TypeScript:** Para adicionar tipagem ao objetos fazendo assim com que o código tenha uma melhor legibilidade e previsibilidade.
- **Celebrate:** Para validação de requisições, para garantir que só iremos executar controller ou service caso passe nessa validação por segurança.
- **JWT:** Para autenticação baseada em token, dentro do nosso jWT conseguimos ter uma forma confiavel e fácil de passar o id do usuário e a role do mesmo.

### Escolhas Estruturais

- **Banco de dados:**
  - **Postgres:** escolhi o Postgres pois ele tem compatibilidade total com ACID e MVCC o que o torna mais seguro e extensivel do que o Mysql por exemplo

- **Arquitetura de Pastas:**
  - **controllers**: Os controllers fiz um para necessidade do sistema e ele chama os services de acordo com a necessidade, então temos um para autenticar, um de filmes, um de usuarios e uma para as notas dos filmes.
  - **services**: decidi fazer vários pequenos services para a api que apesar de deixar a mesma com mais arquivos conseguimos separar melhor o que cada um faz e simplificar a manutenção do código.
  - **Entities** Nas entidades de filme decidi criar uma entidade para generos e uma para atores no lugar de usar apenas um array de strings pois caso a api evolua e generos e atores precisem de mais responsabilidades eles já estão prontos outro ponto é que assim temos como validar de maneira mais fácil os filmes que são do mesmo gênero pois podemos olhar direto na coluna intermediaria de genero e filmes pois caso fossémos sair percorrendo todos os arrays de genero de todos os filmes para achar os que possuem o mesmo gênero iria ter um custo muito alto
  - **src/routes:** As rotas tiveram uma proteção com os middlewares de autenticação e autorização que verificam se o usuário está autenticado e se tem autorização para acessar a rota em questão.

- **Tratativa de erros:**
  Para essa tratativa criamos a entidade de AppError que usa no express um sistema para os lançamentos de erros assim todos os erros são tratados e lançado pelo mesmo código

  - **Testes:**
  Iria fazer os testes unitários usando Jest mas nao deu tempo de fazer a implementação

