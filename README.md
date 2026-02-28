# Clients Mirelle - Sistema de Gestão de Clientes

Este é um projeto desenvolvido com [Next.js](https://nextjs.org/), focado no gerenciamento de clientes e usuários, com autenticação, banco de dados relacional e uma interface moderna.

## 🚀 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/) (App Router)** - Framework React para SSR e rotas de API.
- **[React](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces.
- **[Prisma](https://www.prisma.io/)** - ORM para banco de dados relacional.
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados utilizado na aplicação.
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticação segura de usuários.
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização baseada em classes utilitárias.
- **[Lucide React](https://lucide.dev/)** - Ícones.
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e sem estilo predefinido.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** / **[Bcrypt.js](https://www.npmjs.com/package/bcryptjs)** - Criptografia de senhas.

## 📋 Pré-requisitos

Para rodar o projeto localmente, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Gerenciador de pacotes (`npm`, `yarn`, `pnpm` ou `bun`)
- [PostgreSQL](https://www.postgresql.org/) rodando localmente (ou a URL de um banco de dados hospedado)

## 🛠️ Como rodar o projeto

1. **Clone o repositório** e acesse a pasta do projeto:

```bash
git clone <url-do-repositorio>
cd clients-mirelle
```

2. **Instale as dependências:**

```bash
npm install
# ou yarn install, pnpm install, bun install...
```

3. **Configuração de Variáveis de Ambiente:**

Crie um arquivo `.env` na raiz do projeto (como documentado) contendo a variável de conexão para o seu banco de dados PostgreSQL e as variáveis do NextAuth:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco?schema=public"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Prepare o Banco de Dados (Prisma):**

Gere os artefatos do Prisma, aplique as migrações (se houver) e alimente o banco inicial usando seed:

```bash
# Sincroniza o schema e gera o client Prisma
npx prisma generate
npx prisma db push

# (Opcional) Popule o banco com dados iniciais (admin de exemplo)
npm run seed  # ou 'npx tsx prisma/seed.ts'
```

5. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

6. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🗄️ Estrutura do Banco de Dados

A aplicação lida com dois modelos principais no Schema do Prisma (`prisma/schema.prisma`):

- **User (`users`)**: Responsável pelo acesso à plataforma (email, password, name, role).
- **Client (`clients`)**: Dados relacionados aos clientes, incluindo CPF/CNPJ, Senha do Gov, Senha do ISS, Código do Simples, entre outros.

## 📂 Estrutura do Projeto

Abaixo uma visão geral das pastas principais (usando o App Router do Next.js):

- `app/api/` - Rotas de API da aplicação (incluindo autenticação com NextAuth na rota `app/api/auth`).
- `app/login/` - Página e componentes de Login.
- `app/clients/` - Telas e componentes relacionados ao gerenciamento de clientes.
- `app/users/` - Telas do painel de administração e/ou gestão de usuários do sistema.
- `app/components/` - Componentes reutilizáveis da interface gráfica.
- `prisma/` - Schema do banco de dados e script de Seed inicial (`seed.ts`).
- `lib/` e `utils/` - Funções e lógicas genéricas compartilhadas pela aplicação.

## 📜 Scripts

Listagem de comandos disponíveis (`package.json`):

- `npm run dev` - Inicia o servidor de desenvolvimento no `localhost:3000`.
- `npm run build` - Executa o "prisma generate" e na sequência gera o build de produção da aplicação.
- `npm run start` - Inicia a aplicação no modo de produção.
- `npm run lint` - Verifica possíveis problemas de linting na aplicação.

## 📄 Licença

Projeto privado (`private: true` no `package.json`).
