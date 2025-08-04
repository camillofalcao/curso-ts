# Introdução à Linguagem Typescript

"Typescript é **Javascript com sintaxe para tipos**"
A definição acima é apresentada no [site oficial da linguagem Typescript](https://www.typescriptlang.org/).

Typescript adiciona sintaxe ao Javascript para adicionar uma melhor integração com o editor de código, facilitando a descoberta de erros à medida em que o código vai sendo digitado.

O código Typescript é convertido para Javascript, logo pode ser executado em qualquer ambiente que execute Javascript, tais como frontends de sistemas web e backends em NodeJS dentre vários outros ambientes.

Typescript é um superset de Javascript, logo código Javascript roda em aplicações Typescript. Isso possibilita a adoção gradual do Typescript em suas aplicações.

Vamos começar com um novo projeto chamado P01Introducao. Vamos começar utilizando Javascript, então siga os seguintes passos:

#### 1) Se não instalou o compilador Typescript, faça-o:
```
npm install typescript --save-dev
```

#### 2) Execute o comando:
```
npm init -y
```
#### 3) Crie a pasta **src** e o arquivo **index.js** com **(exatamente)** o seguinte conteúdo (copie e cole):
```js
let mensagem = 'Olá';
console.log(Mensagem + ' mundo!');
```

#### 4) Adicione a propriedade `dev` ao objeto `scripts` no arquivo **package.json**:
```js
{
  "name": "p01introducao",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node src"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### 5) Execute o seu código:
```
npm run dev
```

#### 6) Na execução do programa, você deve ter recebido uma mensagem de erro. Isso ocorreu devido a um erro no nome da variável. Javascript é case sensitive e o nome da variável declarada foi "mensagem" e não "Mensagem".

#### Agora adicione o comentário abaixo  no início do **index.js**:
```js
// @ts-check

let mensagem = 'Olá';
console.log(Mensagem + ' mundo!');
```

#### 7) Agora o seu editor de código deve ter mostrado uma mensagem indicando que a variável "Mensagem" não foi declarada.

#### Apague novamente o comentário adicionado anteriormente, de forma que o código do **index.js** volte a ser:
```js
let mensagem = 'Olá';
console.log(Mensagem + ' mundo!');
```

#### 8) Em seguida, renomeie o arquivo **index.js** para **index.ts** e veja que o editor de código voltará a apresentar a mensagem de erro.

#### Assim como em várias outras linguagens, código Typescript tem a sua sintaxe validada no próprio editor de código, o que facilita a identificação de erros durante a codificação, sendo que em Javascript estes erros poderiam ser identificados somente durante a execução do programa. Esta já é uma grande vantagem do Typescript em relação ao Javascript, porém não é a única. Vamos trabalhar no próximo tópico com tipos de dados, pois Typescript adiciona tipos a Javascript, o que é a principal vantagem do uso de Typescript em relação ao uso de Javascript.

#### 9) Para executarmos o nosso código, precisamos traduzir o nosso código Typescript para Javascript. 

#### Crie o arquivo typescript.config.json com o seguinte conteúdo:
```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "outDir": "out"
  }
}
```
#### 10) Em seguida, altere a propriedade `dev` do objeto `scripts` no arquivo **package.json**:
```js
  "scripts": {
    "dev": "tsc src/index.ts && node src"
  },
```

#### Utilizamos o compilador Typescript (tsc) para compilar o arquivo **index.ts** e o resultado é o arquivo **index.js**, que será executado pelo segundo comando, que passa a pasta **src** por parâmetro para o programa **node**.

#### 11) Para compilar, você pode usar o comando:
```
npx tsc src/index.ts
```

#### Note que o compilador apresentou o erro, mas mesmo assim criou o arquivo **index.js**.

#### 12) Apague o arquivo **index.js** e execute novamente o comando acima passando um parâmetro que indica que não deve ocorrer a tradução em caso de erros:

```
npx tsc --noEmitOnError src/index.ts
```

#### 13) Agora vamos acertar o código do **index.ts**:
```ts
let mensagem = 'Olá';
console.log(mensagem + ' mundo!');
```

#### 14) Execute novamente o nosso projeto (através do script **dev** que criamos no **package.json**):
```
npm run dev
```

#### Finalmente a nossa aplicação está funcionando e o processo de tradução do Typescript em Javascript está funcionando. Se quiser criar novos projetos, você pode seguir os passos que se encontram no README.md que se encontra na raiz deste repositório.
