# Curso Introdutório da Linguagem Typescript

Este é um curso introdutório da linguagem Typescript. Espera-se que o aluno já tenha conhecimentos básicos de Algoritmos e da linguagem Javascript. Você pode obter um material da linguagem Javascript na pasta "Material" do seguinte repositório:
https://github.com/camillofalcao/curso-intro-web


<details>

<summary>Não sabe como instalar e executar? Expanda aqui</summary>

#### 0) Instale o compilador Typescript:
```
npm install typescript --save-dev
```

#### 1) Execute o comando:
```
npm init -y
```
#### 2) Crie o arquivo typescript.config.json com o seguinte conteúdo:
```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "outDir": "out"
  }
}
```
#### 3) Adicione a propriedade `dev` ao objeto `scripts` no arquivo **package.json**:
```js
  "scripts": {
    "dev": "tsc src/index.ts && node src"
  },
```

#### 4) Crie a pasta **src** e o arquivo **index.ts** com o seguinte conteúdo:
```ts
let mensagem: string = 'Olá mundo!';
console.log(mensagem);
```

#### 5) Execute o seu código:
```
npm run dev
```

</details>

### Conteúdo:

#### [1) Introdução à Linguagem Typescript](/P01Introducao)
#### [2) Entendendo os Tipos na Linguagem Typescript](/P02Tipos)
#### [3) Trabalhando com Tipos e Funções na Linguagem Typescript](/P03Funcoes)
#### [4) Objetos - EM CONSTRUÇÃO](/P04Objetos)
#### [5) Manipulando Tipos - EM CONSTRUÇÃO](/P05ManipulandoTipos)
#### [6) Classes - EM CONSTRUÇÃO](/P06Classes)
#### [7) Módulos - EM CONSTRUÇÃO](/P07Modulos)
