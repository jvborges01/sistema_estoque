# Sistema de Estoque

Ter um sistema de estoque é essencial para qualquer negócio que lida com produtos físicos. Ele permite o controle preciso de entradas e saídas de mercadorias, ajudando a evitar faltas ou excessos de estoque. Com um sistema eficiente, é possível monitorar as quantidades disponíveis, prever a necessidade de reposição e reduzir desperdícios. Além disso, um bom sistema de estoque facilita a organização e gestão dos produtos, melhora o atendimento ao cliente e otimiza os processos de compra e venda, contribuindo para o sucesso e a sustentabilidade do negócio.

1. Baixar o repositório
`git clone https://github.com/jvborges01/sistema_estoque`

## Back-End

2. Criar a database sistema_estoque
`mysql create sistema_estoque`

3. Importar as tabelas
`mysql -u usuario -p nome_do_banco_de_dados < caminho_para_o_arquivo/tabelas.sql`

3. Entrar na pasta principal
`cd sistemma`

4. Entrar na pasta do back-end
`cd sistema_back`

5. Baixar as dependências
`npm install`

6. Verifique se os dados de conexão estão certos
`cd sistema_back/config/db.js`

7. Inicializar Api
`npm start`

## Front-End

1. Entrar na pasta do front
`cd sistema_front`

2. Baixar as dependências
`npm install`

3. Inicializar Servidor Vite
`npm run dev`

## Tecnologias Usadas


![Express.js Icon.](https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000)
![React.js Icon.](https://img.icons8.com/?size=100&id=122637&format=png&color=000000)
![Mysql Icon.](https://img.icons8.com/?size=100&id=39858&format=png&color=000000)


