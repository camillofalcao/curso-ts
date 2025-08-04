# Entendendo os Tipos na Linguagem Typescript

Os tipos primitivos de Javascript possuem seus tipos correspondentes em Typescript. São eles: string, number, bigint e boolean.

Uma variável em Typescript pode ser declarada de diferentes formas:
```ts
   let num1 = 1;
   let num2: number = 2;
   let num3: number;
   let num4: bigint = BigInt(1000000000000);
   num3 = 3;
```

Arrays em Typescript podem ter seus tipos informados. Exemplos:
```ts
const numeros: number[] = [1,2,3,4,5];
const cidades: string[] = ["Juiz de Fora", "São Paulo", "Rio de Janeiro", "Belo Horizonte"];
```

Também é possível declarar arrays em Typescript da seguinte forma:
```ts
const valores: Array<number> = [1,2,3,4,5];
const linguagens: Array<string> = ["Typescript", "Go", "Easy"];
```

Typescript também possui o tipo especial ```any``` que pode ser utilizado para não gerar erros de checagem de tipo. Você deve tomar cuidado ao utilizar este tipo.
```ts
let idade1: number;
let idade2: any;
idade1 = 20;      //Sem erros
idade1 = "vinte"; //Erro
idade2 = 20;      //Sem erros
idade2 = "vinte"; //Sem erros
```

Os tipos em Typescript sempre que possível são inferidos pelos seus valores de inicialização. Se não houver definição de tipo e se a variável não for inicializada, a mesma será do tipo ```any```.

```ts
//Declaração          Tipo
let var1;             any
let var2 = 10;        number
let var3 = "Teste";   string
let var4 = true;      boolean
```

Typescript permite a união de tipos para a formação de novos tipos, que possibilitam códigos como os abaixo:

```ts
let idade: number | string;
idade = 20;      //Permitido
idade = "vinte"; //Permitido
idade = true;    //Erro: idade precisa ser number ou string
console.log('Idade: ' + idade); //Permitido
console.log(idade.toUpperCase()); //Erro: toUpperCase não existe em no tipo (number | string), pois não existe no tipo number
```

Também é possível fornecer nomes para os tipos. O código abaixo está correto:

```ts
type NumberOrString = number | string;

let idade: NumberOrString;
idade = 20;
console.log(typeof idade); //number
idade = "vinte";
console.log(typeof idade); //string
```

Note que o nome ```NumberOrString``` é apenas um apelido para o tipo, ou seja, não se trata da criação de um novo tipo. Veja abaixo como não criamos um novo tipo, pois objetos do tipo de origem continua podendo ser atribuído.

```ts
type MinhaString = string;

let ini: MinhaString = "Type";
let str: string = "script";
let fim: MinhaString;

//A linha abaixo é válida, pois MinhaString é somente um apelido para string e não um novo tipo.
fim = str;

console.log(ini + fim); //Typescript
```

É possível declarar uma variável que só pode receber um único valor:

```ts
let time: "Flamengo" = "Flamengo"; //Válido
time = "Flamengo"; //Válido
time = "Vasco";    //Inválido
```

Note que no lugar do tipo da variável foi informado um único valor do tipo string, logo a variável só pode receber este valor.


Uma variável que só pode receber um único valor não é algo muito útil, porém é possível utilizar a definição de tipos para restringir quais valores que podem ser adicionados a uma variável, possibilitando criar um conjunto de valores possíveis. Note como que o código abaixo restringe o valor da variável a um dos trẽs valores: "Typescript", "Go" ou "Easy":

```ts
type Lang = "Typescript" | "Go" | "Easy";

let linguagem: Lang;

linguagem = "Typescript"; //Válido
linguagem = "Go";         //Válido
linguagem = "Javascript"; //Inválido
linguagem = "EASY";       //Inválido
```

No próximo tópico, trabalharemos com tipagem em nossas funções.
