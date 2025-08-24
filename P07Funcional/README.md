# EXTRA - Programação Funcional em Typescript

Typescript não é uma linguagem criada para Programação Funcional, porém possui vários recursos que possibilitam o seu uso em sistemas que seguem este paradigma.

Se você está estudando Typescript, provavelmente já estudou Algoritmos, que é uma disciplina geralmente abordada utilizando-se o paradigma da Programação Imperativa (PI). Provavelmente você também já deve ter tido contato com a Programação Orientada a Objetos (POO), que utiliza abstrações de objetos ao invés de abstrações algorítmicas.

De forma diferente da PI e da POO, a Programação Funcional é um paradigma em que os programas são construídos pela utilização e composição de funções. De forma distinta da PI, onde possuímos uma sequência de declarações imperativas qua atualizam o estado da aplicação, a Programação Funcional é um paradigma de programação declarativa no qual as definições de função são árvores de expressões que mapeiam um valor de entrada para um novo valor de saída.

A Programação Funcional busca a utilização de funções puras, que são funções em que o valor da saída pode totalmente ser mapeado pelo valor de entrada, nunca podendo apresentar saída diferente para uma mesma entrada.

Um subconjunto da Programação Funcional é a Programação Funcional Pura onde **todas** as funções do sistema precisam ser funções puras, ou seja, não podem alterar variáveis externas ou realizar input/output.

Uma das vantagens do uso de funções puras é a possibilidade do uso de cache, onde é possível retornar o valor retornado em execução anterior desde que o mesmo tenha sido realizado para o mesmo valor de entrada.

Quando estiver utilizando Programação Funcional, você deve privilegiar o uso de constantes ao invés de variáveis.

Em Programação Funcional, recursão é utilizada para realizar loops (lembre-se de que um laço do tipo `while` ou `for` provavelmente possuiria uma variável de controle, o que deve ser evitado em programação funcional).

Em linguagens cujo compilador não realiza Tail Call Optimization, você pode encontrar o erro de stack overflow ao utilizar recursão. Tail Call Optimization é uma técnica onde, quando a chamada recursiva for a última instrução de uma função, a entrada da própria função é alterada para que a mesma seja executada para esta nova entrada. Isso evita criar uma nova chamada à função, evitando o empilhamento dessas chamadas e o consequente estouro da pilha (*stack overflow*) quando se atinge o limite desta estrutura (pilha). O ECMA Script 6 realiza esse tipo de otimização.

À partir deste ponto, vamos buscar entender alguns tópicos que são importantes para o entendimento da Programação Funcional.

### Funções são Tratadas como Cidadãos de Primeira Classe (First-class Citzens)

Isso significa que, da mesma forma que outros tipos de dados, funções podem:
  - Ser referenciadas por variáveis ou constantes.
  - Ser passadas por parâmetros para funções.
  - Ser retornadas por funções.

Funções são cidadãos de primeira classe em Typescript:

```ts
const dobro = (number: number): number => {
    return number * 2;
};

const dobroTambem = dobro;

const imprimirResultado = (numero: number, funcao: (number: number) => number) => {
    console.log(funcao(numero));
};


const getSaudacao = (saudacao: string) => {
    return (nome: string) => {
        console.log(`${saudacao}, ${nome}!`);
    };
};

let bomDia = getSaudacao("Bom dia");
let boaTarde = getSaudacao("Boa tarde");

bomDia("Ana");       //Bom dia, Ana!
bomDia("Bruno");     //Bom dia, Bruno!
boaTarde("Carlos");  //Boa tarde, Carlos!
boaTarde("Daniela"); //Boa tarde, Daniela!

console.log("Dobro de 2:", dobro(2));       //Dobro de 2: 4
console.log("Dobro de 2:", dobroTambem(2)); //Dobro de 2: 4
console.log("O dobro de 5 é:"); //Dobro de 5 é:
imprimirResultado(5, dobro);    //10
```

### Funções Podem Ser de Ordem Superior

Uma função é dita de ordem superior quando recebe uma outra função por parâmetro ou quando retorna uma função.

As funções `getSaudacao` e `imprimirResultado`, apresentadas no exemplo anterior, são funções de ordem superior.

### Transparência Referencial / Funções Side-Effect-Free

Em Programação Funcional, uma função não utiliza comandos de atribuição em variáveis, exceto em sua inicialização. Isso elimina efeitos colaterais, pois qualquer função pode ser substituída por seu valor real em qualquer ponto da execução, o que torna os testes mais fáceis e confiáveis.

A mudança de estado, desta forma, pode ser realizada da seguinte forma: a função recebe o estado atual e cria um novo estado retornando-o.

Veja o caso da funão `map`, que cria um novo *array* ao invés de alterar o *array* recebido por parâmetro:

```ts
const numeros = [1,2,3,4,5];

const dobro = numeros.map(dobrar);

console.log(dobro) //[2, 4, 6, 8, 10]

function dobrar(numero: number) : number {
    return numero * 2;
}
```

### Lambdas

Lambdas são funções anônimas que podem ser utilizadas como opções menos verbosas que as declaradas de forma tradicional.

Veja como fica o último exemplo apresentado quando utilizamos lambda:

```ts
const numeros = [1,2,3,4,5];

const dobro = numeros.map(x => x * 2);

console.log(dobro) //[2, 4, 6, 8, 10]
```

### Closures

Uma closure é uma função que referencia variáveis em um determinado ambiente/contexto externo ao escopo da função.

Uma closure manterá a referência para a variável externa mesmo que a função em que esta variável tenha sido criada já tenha terminado a sua execução.

Note que define-se uma função externa contendo uma variável e esta função externa retorna uma função aninhada criada dentro da própria função externa. Mesmo após o término da execução da função externa, a função aninhada retornada materá o acesso às variáveis externas referenciadas, devido ao *snapshot* da função externa que a chamou. Dessa forma, a função interna aninhada "fecha" sobre o ambiente léxico da função externa, mantendo acesso às suas variáveis.

Note que, se uma função altera o valor de uma variável, ela não é uma função pura, logo não estamos falando de Programação Funcional Pura quando se utiliza closure desta forma.

Veja o exemplo abaixo:

```ts
function Contador() {
    let valor = 0;

    return function() {
        return ++valor;
    }
}

let novoId1 = Contador();

console.log("ID 1:", novoId1()); //ID 1: 1
console.log("ID 1:", novoId1()); //ID 1: 2
console.log("ID 1:", novoId1()); //ID 1: 3

let novoId2 = Contador();
console.log("ID 2:", novoId2()); //ID 2: 1
console.log("ID 2:", novoId2()); //ID 2: 2
console.log("ID 1:", novoId1()); //ID 1: 4
```

Note que a função `Contador` retorna uma função anônima que incrementa em 1 o valor da variável `valor` e retorna este valor incrementado. A variável `valor` foi definida dentro da função `Contador`, cuja execução foi terminada logo após a linha `let novoId1 = Contador();`. Ainda assim, quando executarmos `novoId1`, o acesso à variável `valor` continua podendo ser realizado.

O uso de closures é bastante comum e permite códigos como o abaixo:

```ts
let numeros = [1,2,3,4,5];
let pares = Array<number>();
let impares = Array<number>();

numeros.forEach(x => {
  if (x % 2 == 0) {
    pares[pares.length] = x;
  } else {
    impares[impares.length] = x;
  }
});

console.log("Pares: ", pares);     //Pares:  [ 2, 4 ]
console.log("Ímpares: ", impares); //Ímpares:  [ 1, 3, 5 ]
```

Note que a função forEach está utilizando variáveis que estão no contexto externo a quem o chamou.

Você também pode resolver o problema acima utilizando a função `filter`:

```ts
let numeros = [1,2,3,4,5];
let pares = numeros.filter(x => x % 2 == 0);
let impares = numeros.filter(x => x % 2 != 0);

console.log("Pares: ", pares);     //Pares:  [ 2, 4 ]
console.log("Ímpares: ", impares); //Ímpares:  [ 1, 3, 5 ]
```
