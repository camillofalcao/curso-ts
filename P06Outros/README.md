# Outros Recursos da Linguagem Typescript

Para finalizar este curso introdutório da linguagem Typescript, vamos trabalhar com generics e com módulos.

<details>

<summary>Se não possui uma aplicação Typescript para gerar ECMA Script 6, expanda aqui</summary>

1 - Crie e abra uma nova pasta no terminal.

2 - Inicialize o projeto: `npm init -y`

3 - Crie a pasta e o arquivo: `src/index.ts`

4 - Na raiz do projeto (na pasta criada, fora da pasta `src`), crie o arquivo `tsconfig.json` com o seguinte conteúdo:

```json
{
  "compilerOptions": {
    "target": "es6",               // Define a versão do ECMAScript para a saída
    "module": "esnext",            // Define o sistema de módulos (esnext é recomendado para módulos ES6)
    "lib": ["es6", "dom"],         // Inclui bibliotecas padrão do ES6 e do DOM
    "outDir": "./dist",            // Define o diretório de saída para os arquivos JavaScript compilados
    "rootDir": "./src",            // Define o diretório raiz do código TypeScript
    "strict": true,                // Habilita verificações estritas de tipo (opcional, mas recomendado)
    "esModuleInterop": true,       // Permite interoperabilidade com módulos CommonJS
    "skipLibCheck": true,          // Ignora erros de verificação em arquivos de biblioteca
    "moduleResolution": "node",    // Define o algoritmo de resolução de módulos (recomendado para Node.js)
    "sourceMap": true,             // Gera arquivos de source map para depuração
    "declaration": true,           // Gera arquivos de definição de tipo (.d.ts)
    "declarationDir": "./types"    // Define o diretório de saída para os arquivos de definição
  },
  "include": ["src/**/*"],         // Inclui todos os arquivos TypeScript na pasta 'src'
  "exclude": ["node_modules"]      // Exclui a pasta 'node_modules'
}
```

Agora estamos utilizando uma versão mais recente do Javascript (ECMA Script 6).

5 - Altere o arquivo `package.json` para passar adicionar o script que gerará o Javascript na pasta `dist` e executará o node nesta pasta:

```json
  "scripts": {
    "dev": "tsc && node dist"
  },
```

Lembre-se que para executar, basta digitar: `npm run dev`.

</details>

### Generics

Generics nos permite criar componentes que trabalham com uma variedade de tipos de dados ao invés de apenas um tipo. Ele faz isso permitindo que o programador usuário do componente possa especificar o(s) tipo(s) de dados utilizado(s) na inicialização do componente.

Vamos iniciar primeiramente declarando duas variáveis e seus tipos e criando um código que nos permite receber um valor por parâmetro, passar este valor para a função `atualizar` e retornar este mesmo valor (este código ainda não utiliza generics):

```ts
let nome: string = "Ana";
let idade: number = 20;

function atualizarNumber(original: number, novo: number) : number {
    console.log(`${original} -> ${novo}`);    
    return novo;
}

function atualizarString(original: string, novo: string) : string {
    console.log(`${original} -> ${novo}`);    
    return novo;
}

nome = atualizarString(nome, nome.toUpperCase());
idade = atualizarNumber(idade, idade + 1);

console.log(nome, "terá", idade, "anos no próximo ano.");
```

Veja que construímos duas funções que recebem um valor por parâmetro, passa este valor por parâmetro para a função `console.log` e, em seguida, retorna o próprio valor recebido. Com essas funções, é possível logar a troca de valor na mesma linha em que a mesma é atualizada.

Estas funções são muito simples e estão aqui somente para serem utilizadas como exemplo. Verificando as mesmas, você já deve ter notado que terá que criar uma função dessa para cada tipo que quiser logar a atualização, o que pode incluir criar funções para logar objetos e isso facilmente poderá gerar uma quantidade de funções tão grande que gerará muita dificuldade de manutenção.

Vamos então criar uma única função do tipo `any`:

```ts
let nome: string = "Ana";
let idade: number = 20;

function atualizar(original: any, novo: any) : any {
    console.log(`${original} -> ${novo}`);    
    return novo;
}

nome = atualizar(nome, nome.toUpperCase());
idade = atualizar(idade, idade + 1);

console.log(nome, "terá", idade, "anos no próximo ano.");
```

Aparentemente funcionou, mas agora você entenderá melhor que não se deve utilizar o tipo `any` em Typescript:

```ts
let nome: string = "Ana";
let idade: number = 20;

function atualizar(original: any, novo: any) : any {
    console.log(`${original} -> ${novo}`);    
    return novo;
}

nome = atualizar(nome, nome.toUpperCase());
idade = atualizar(nome, nome.toUpperCase());

console.log(nome, "terá", idade, "anos no próximo ano.");
```

Se você executou o código acima, pode ter percebido que o tipo `any` nos ajudou a burlar o tipo da variável `idade`, que deveria receber apenas números.

Lembre-se que um dos motivos de se utilizar Typescript é exatamente para evitar a tipagem fraca.

Generics solucionam isso ao permitir que seja utilizado um nome para o tipo que será passado no momento da utilização do método. Note que em cada chamada do método abaixo, o tipo que chamamos de `Type` está sendo passado entre `<>`:

```ts
let nome: string = "Ana";
let idade: number = 20;

function atualizar<Type>(original: Type, novo: Type) : Type {
    console.log(`${original} -> ${novo}`);    
    return novo;
}

nome = atualizar<string>(nome, nome.toUpperCase());
idade = atualizar<number>(idade, idade + 1);

console.log(nome, "terá", idade, "anos no próximo ano.");
```

Note que agora os tipos das duas últimas variáveis declaradas estão corretos (string e number). Quando se coloca `<string>` após o nome do método `atualizar`, estamos identificando que `Type` (veja `<Type>` após o nome do método) é **string** e só podemos passar uma **string** para este método neste caso.

O Typescript também consegue, em alguns casos, inferir o tipo automaticamente. Note no código abaixo que Type foi inferido pelo tipo do parâmetro passado (se passo uma string, então `Type` só pode ser string):

```ts
let nome: string = "Ana";
let idade: number = 20;

function atualizar<Type>(original: Type, novo: Type) : Type {
    console.log(`${original} -> ${novo}`);    
    return novo;
}

nome = atualizar(nome, nome.toUpperCase());
idade = atualizar(idade, idade + 1);

console.log(nome, "terá", idade, "anos no próximo ano.");
```

Entenda também que o nome `Type` não é uma palavra reservada para uso com Generics. Podemos dar o nome que quisermos para o nosso tipo. No código abaixo, chamei o tipo de `T`:

```ts
let nome: string = "Ana";
let idade: number = 20;

function logar<T>(valor: T) : T {
    console.log(valor);
    return valor;
}

let nomeMaiusculas = logar(nome).toUpperCase();
let proximaIdade = logar(idade) + 1;

console.log(nomeMaiusculas, "terá", proximaIdade, "anos no próximo ano.");
```

Também é possível definir mais de um tipo genérico:

```ts
function exemplo<T,K>(primeiroTipo: T, segundoTipo: K) : void {
    console.log(typeof primeiroTipo, typeof segundoTipo);
}

exemplo("Teste", 123);
exemplo(true, false);
```

Se for necessário identificar que tipo de valor pode ser utilizado com Generics, faça como no código abaixo:

```ts
type MeuTipo  = string | number;

function exemplo<T extends MeuTipo>(valor: T) : void {
    console.log(`O valor é: ${valor}`);
}

exemplo("Teste");
exemplo(42);

// Erro de tipo, pois boolean não é MeuTipo
exemplo(true);
```

#### Entendendo o comando keyof

Para que possamos apresentar um exemplo mais sofisticado sobre restrições (constraints) em Generics, vamos primeiramente entender o comando `keyof`, que retorna um tipo composto pelas chaves de um objeto. Note que em Javascript os nomes das propriedades são chaves, ou seja, `obj.nome` é o mesmo que `obj["nome"]`.

```ts
class Pessoa {
    nome = "Ana";
    idade = 20;
    cidade = "Juiz de Fora";
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = [1,2,3,4,5];
let y = new Pessoa();

console.log(getProperty(x, 0)); //1
console.log(getProperty(x, 1)); //2
console.log(getProperty(x, 4)); //5
console.log(getProperty(y, "nome"));
console.log(getProperty(y, "idade"));

//Inválido, pois "telefone" não é uma chave de Pessoa
console.log(getProperty(y, "telefone"));
```

Para finalizar, vamos criar uma classe com generics para exemplificar um uso possível deste recurso:

```ts
class Pilha<T> {
  private elementos: T[] = [];

  empilhar(elemento: T): void {
    this.elementos.push(elemento);
  }

  desempilhar(): T | undefined {
    return this.elementos.pop();
  }

  topo(): T | undefined {
    return this.elementos[this.elementos.length - 1];
  }

  estaVazia(): boolean {
    return this.elementos.length === 0;
  }
}

let pilha = new Pilha<number>();
pilha.empilhar(1);
pilha.empilhar(2);
pilha.empilhar(3);
console.log(pilha.desempilhar()); // 3
console.log(pilha.estaVazia()); // false
console.log(pilha.desempilhar()); // 2
console.log(pilha.desempilhar()); // 1
console.log(pilha.estaVazia()); // true
```

Note que utilizamos o tipo `T` na classe, o que nos obriga a definir `T` ao instanciar a classe Pilha. Com isso, temos uma pilha genérica.

## Módulos

É possível modularizar a sua aplicação em Typescript utilizando módulos ES6 (ECMA Script 6). Qualquer arquivo que contenha uma instrução `import` ou `export` é considerado um módulo em Typescript.

Qualquer arquivo que não seja um módulo é tratado como um script cujo conteúdo está disponível no escopo global, logo também está disponível para todos os módulos.

Cada módulo é executado em seu próprio escopo, que não é o escopo global. Variáveis, classes, funções e qualquer outro recurso do módulo não podem ser acessados fora do módulo, exceto se o mesmo tiver sido exportado (`export` ou `export default`). Um módulo pode conter zero ou no máximo um `export default`, porém pode conter zero, um ou vários `export`. O principal recurso de um módulo, que pode ser importado diretamente, mesmo sem indicar o nome do recurso, deve ser exportado como `export default`.

Para trabalharmos com módulos, você precisa adicionar `"type": "module"` no `package.json`, como no exemplo abaixo:

```ts
{
  "name": "p06Outros",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "tsc && node dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

Agora vamos criar três arquivos novos na pasta `src`:

`modulo1.ts:`
```ts
export default function executar() {
    console.log("Executando... ");
}

export function executarModulo1() {
    console.log("Executando Módulo 1");
}
```

---

`modulo2.ts:`
```ts
export function executarModulo2() {
    console.log("Executando Módulo 2");
}
```

---

`modulo3.ts:`
```ts
export default function executarModulo3() {
    console.log("Executando Módulo 3");
}
```

Por último, segue o conteúdo do `index.ts`:

```ts
import executarDefault, { executarModulo1 } from './modulo1.js';
import { executarModulo2 } from './modulo2.js';
import executar3 from './modulo3.js';

executarDefault();
executarModulo1();
executarModulo2();
executarModulo3();
```

Note que a função `executar` foi exportada como `default` no arquivo `modulo1.ts`, o que permite a sua importação no `index.ts` sem o uso de `{}`: `import executar from './modulo1.js';`. Note que a importação default (padrão) não obriga que o nome do recurso seja igual ao nome importado: `import ABCD from './modulo1.js';`.

Note também que quando uma função é exportada apenas com `export` (sem **default**), a mesma precisa ser importada com o uso de `{}`: `import { executarModulo1 } from './modulo1.js';`

É possível importar mais de um recurso, separando com vírgula. Exemplo:

```ts
import x, {y, z} from 'xyz.js';
```

O código acima importaria o recurso `x` do módulo `xyz.js`, sendo que este recurso teria sido exportado como padrão (`export default`). Este código também importaria os recursos `y` e `z` do módulo `xyz.js`, sendo que estes teriam sido exportados apenas com `export`.

Com estas informações, você já consegue iniciar o uso de generics, assim como separar o seu código em módulos funcionais.
