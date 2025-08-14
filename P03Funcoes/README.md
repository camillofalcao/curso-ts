# Trabalhando com Tipos e Funções na Linguagem Typescript

Veja o trecho de código Javascript abaixo:

```js
var ano3Mil = new Date(3000,1, 1);

if (ano3Mil > hoje())
    console.log('O ano três mil ainda não chegou!');
else
    console.log('Já estamos no ano três mil!');


function hoje() {
    return new Date().toLocaleDateString();
}
```

O código acima loga a mensagem "Já estamos no ano três mil".

A mensagem incorreta impressa no código acima não ocorreria se estivéssemos utilizando Typescript, pois colocaríamos o tipo de retorno da função como sendo `string` e não conseguiríamos comparar uma string com um Date.

Para definir o tipo de retorno de uma função, basta colocar este tipo após fechar os parênteses que delimitam os parâmetros ao final da linha onde a função é declarada e logo após do caractere `:` (dois pontos). Veja abaixo o código em Typescript com o tipo de retorno da função como sendo `string`:

```ts

var ano3Mil = new Date(3000,1, 1);

if (ano3Mil > hoje())
    console.log('O ano três mil ainda não chegou!');
else
    console.log('Já estamos no ano três mil!');


function hoje() : string {
    return new Date().toLocaleDateString();
}


```

Agora temos o seguinte erro sendo apresentado no editor de código: `"Operator '<' cannot be applied to types 'Date' and 'string'"`. Com isso, conseguimos facilmente identificar o problema e evitá-lo.

Vamos corrigir a nossa função e o código passará a funcionar conforme o desejado:

```ts
var ano3Mil = new Date(3000,1, 1);

if (ano3Mil > hoje())
    console.log('O ano três mil ainda não chegou!');
else
    console.log('Já estamos no ano três mil!');


function hoje() : Date {
    return new Date();
}

```

Já quando queremos definir os tipos dos parâmetros, pode-se fazê-lo adicionando `: TIPO` após o nome do parâmetro, substituindo `TIPO` pelo tipo desejado. Exemplo:

```ts
function getMedia(n1: number, n2: number): number {
    return (n1 + n2) / 2;
}
```

Se a função não produz um valor de retorno, o tipo dela deve ser void:

```ts
function ImprimeMedia(n1: number, n2: number): void {
    console.log((n1 + n2) / 2);
}
```

O mesmo apresentado anteriormente se aplica às *arrow functions*:


```ts
const getMedia = (n1: number, n2: number): number => {
    return (n1 + n2) / 2;
};

const imprimeMedia = (n1: number, n2: number): void => {
    const media = getMedia(n1, n2);
    console.log(`A média é: ${media}`);
}

imprimeMedia(6,8);
```

Você também pode receber por parâmetro uma função, conforme é possível verificar na função imprimir abaixo:


```ts
const getMedia = (n1: number, n2: number): number => {
    return (n1 + n2) / 2;
};

const imprimeMedia = (n1: number, n2: number, media: (a: number, b: number) => number): void => {
    console.log(`A média é: ${media(n1, n2)}`);
}

imprimeMedia(6, 8, getMedia);
```

Veja também este outro exemplo de passagem de função por parâmetro:


```ts
let numeros: number[] = [1, -2, -3, 4, 5];

imprimirSelecionados(numeros, (n) => n % 2 === 0); // Imprime apenas os números pares

console.log('---');

imprimirSelecionados(numeros, (n) => n > 0); // Imprime apenas os positivos


function imprimirSelecionados(args: number[], selecionar: (n: number) => boolean) {
  for (let i = 0; i < args.length; i++) {
    if (selecionar(args[i])) {
      console.log(args[i]);
    }
  }
}
```

O código acima imprime somente os números pares e somente os números positivos do array. Isso é possível devido à função imprimir receber uma função que recebe um `number` e retorna um `boolean`. A função imprimir passa por parâmetro para a função recebida cada um dos números do *array*. Logicamente se trata apenas de um exemplo e você deveria utilizar as funções já prontas para percorrer *arrays*, tal como no exemplo abaixo:


```ts
let numeros: number[] = [1, -2, -3, 4, 5];

numeros.forEach(x => {
    if (x > 0) {
        console.log(x);
    }
});
```

Também é possível criar um aliás para o tipo de uma função, conforme pode ser visto no tipo `Predicado` abaixo:

```ts
let numeros: number[] = [1, -2, -3, 4, 5];

imprimirSelecionados(numeros, (n) => n % 2 === 0); // Imprime apenas os números pares

console.log('---');

imprimirSelecionados(numeros, (n) => n > 0); // Imprime apenas os positivos


type Predicado = (n: number) => boolean;

function imprimirSelecionados(args: number[], selecionar: Predicado) {
  for (let i = 0; i < args.length; i++) {
    if (selecionar(args[i])) {
      console.log(args[i]);
    }
  }
}
```

### Generics

Veja a função abaixo:

```ts
paraCada(x => console.log(x), 10,20,30,40,90);

console.log("-----");

paraCada(x => console.log(x), "Ana", "Bruno", "Carlos");

function paraCada(executar: (x: any) => void, ... args: any[]) {
    for (let i = 0; i < args.length; i++) {
        executar(args[i]);
    }
}
```

A função `paraCada` executa a função `executar` em cada elemento do *array* args (os três pontos antes do array permitem que os elementos do mesmo sejam passados na subrotina separados por vírgula, como se tivéssemos um número variável de parãmetros).

O problema desta função é que a mesma não me permite trabalhar com tipos adequadamente, uma vez que aceita qualquer tipo, o que pode resultar em comportamento indesejado ou erros de execução. Para exemplificar, note que o código abaixo gera um erro de execução, pois a função `toUpperCase`não existe para valores do tipo `number`.

```ts
paraCada(x => console.log(x.toUpperCase()), 1,2,"três","quatro",6);

function paraCada(executar: (x: any) => void, ... args: any[]) {
    for (let i = 0; i < args.length; i++) {
        executar(args[i]);
    }
}
```

Para este caso, podemos criar um tipo genérico (T), conforme o exemplo abaixo:

```ts
paraCada<string>(x => {
    console.log(x.toUpperCase());
}, "um","dois","três","quatro");

console.log("-----");

paraCada(x => {
    console.log(x.toUpperCase());
}, "um","dois","três","quatro");

console.log("-----");

paraCada(x => {
    if (x % 2 == 0) {
        console.log(x);
    }
}, 1,2,3,4,6);

function paraCada<T>(executar: (x: T) => void, ... args: T[]) {
    for (let i = 0; i < args.length; i++) {
        executar(args[i]);
    }
}
```

Note que agora podemos definir o tipo <T> na chamada da função, como quando chamamos `paraCada<string>(...`. Este tipo também pode ser inferido pelo tipo de dados do parâmetro que estamos passando (como nosso *array* é do tipo T, o Typescript consegue inferir qual o tipo T em acordo com o tipo do parâmetro passado).

Com generics, o código abaixo apresentará erro no editor devido ao tipo de dados dos elementos do vetor estar incorreto (como T é string, não podemos passar numbers):

```ts
paraCada<string>(x => {
    console.log(x.toUpperCase());
}, 1,2,"três","quatro");

function paraCada<T>(executar: (x: T) => void, ... args: T[]) {
    for (let i = 0; i < args.length; i++) {
        executar(args[i]);
    }
}
```

É possível definir o retorno de uma função utilizando generics, assim como definir que uma função pode ter dois tipos de retorno, como na próxima função que pode retornar T ou undefined.

```ts
console.log(getPrimeiro(1, 2, 3, 4, 5));
console.log(getPrimeiro('a', 'b', 'c'));
console.log(getPrimeiro());

function getPrimeiro<T>(... args: T[]) : T | undefined {
    if (args.length == 0) {
        return undefined;
    }

    return args[0];
}
```

Falando em definição de retorno da função, veja a função abaixo que retorna um dos dois valores: `"aprovado"` ou `"reprovado"`:

```ts
console.log(resultadoFinal(10, 0));
console.log(resultadoFinal(6, 0.8));
console.log(resultadoFinal(5, 0.2));
console.log(resultadoFinal(9, 0.3));

function resultadoFinal(media: number, faltas: number): "aprovado" | "reprovado" {
    if (media < 7 || faltas > 0.25) {
        return "reprovado";
    }

    return "aprovado";
}
```

Ao definirmos o retorno da função como tendo somente os dois valores (`"aprovado" | "reprovado"`), se errarmos o valor dentro da função, como por exemplo retornarmos `"Aprovado"`, o Typescript apresentará um erro em nosso editor de forma que será possível corrigirmos o mesmo.

É possível restringir o tipo genérico, como no exemplo abaixo, que exige que o tipo <T> tenha uma propriedade`length` do tipo `number`:

```ts
console.log(getMaior('abc', 'de'));
console.log(getMaior([1, 2, 3], [4, 5, 6, 7]));
console.log(getMaior('abc', [4, 5, 6, 7])); //Inválido, pois se espera um mesmo tipo T

function getMaior<T extends { length: number }>(a: T, b: T) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

Note que a terceira chamada que fizemos é inválida, pois a função espera que `a` e `b` possuam um mesmo tipo `T`. Para que seja possível fazer esta chamada, você pode adicionar um novo tipo genérico:

```ts
console.log(getMaior('abc', 'de'));
console.log(getMaior([1, 2, 3], [4, 5, 6, 7]));
console.log(getMaior('abc', [4, 5, 6, 7])); //Inválido, pois se espera um mesmo tipo T

function getMaior<
    T extends { length: number },
    K extends { length: number }
    >(a: T, b: K) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

Funções também podem receber parâmetros opcionais, que são definidos utilizando `?`após o nome do parâmetro. Quando um parâmetro opcional não é informado, o seu valor será `undefined`. Veja abaixo:

```ts
imprimeSaudacao("Ana");
imprimeSaudacao("Bruno", 2);

function imprimeSaudacao(nome: string, qtdeRepeticoes?: number): void {
  if (qtdeRepeticoes == undefined) {
    qtdeRepeticoes = 1;
  }    
  for (let i = 0; i < qtdeRepeticoes; i++) {
    console.log(`Olá, ${nome}!`);
  }
}
```

Neste ponto já conhecemos o básico sobre o uso de funções em Typescript.
