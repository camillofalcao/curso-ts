# Classes em Typescript

É possível criar classes em Typescript, assim como é possível fazê-lo em Javascript moderno. A vantagem do uso de Typescript está na adição de tipos nos atributos e nos parâmetros dos métodos.

***Neste material, passaremos a gerar o nosso Javascript como ECMA Script 6, então você deve seguir os passos 1 a 5 abaixo antes de testar qualquer código.***

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

---
---
---

**Agora Vamos Prosseguir com a nossa Introdução às Classes:**

Veja o código abaixo:

```ts
class Pessoa {
  nome: string;
}

let obj = new Pessoa();

obj.nome = "Ana";

console.log(obj.nome);
```

Foi criada uma classe Pessoa contendo o atributo nome. Um objeto pode ser instanciado utilizando-se a palavra chave `new`. Esta mesma classe pode ser criada de outras formas:


```ts
class Pessoa {
  nome: string = "Ana";
}
```

```ts
class Pessoa {
  nome = "Ana";
}
```

É necessário tomar cuidado para não utilizar parte da sintaxe de instanciação de objeto em uma classe:

```ts
var objeto = {
    nome: "Ana"
}

class Pessoa {
    nome: "Ana"
}

objeto.nome = "Ana Maria"; //Válido!

let obj = new Pessoa();
//Inválido, pois somente o tipo "Ana" é permitido
obj.nome = "Ana Maria";
obj.nome = "Ana"; //Válido
```
Note que, no exemplo acima, o atributo nome da classe pessoa possui o tipo "Ana", logo só pode receber esta string.

Se o objetivo fosse inicializar o nome com a string *Ana*, então o atributo deveria ser: `nome : string = "Ana"` ou `nome = "Ana"`.

Um construtor pode ser adicionado da mesma forma que em Javascript, porém em Typescript podemos definir os tipos para os parâmetros:

```ts
class Pessoa {
    constructor(nome: string) {
        this.nome = nome;
    }
    nome: string
}

let obj = new Pessoa("Ana");
obj.nome = "Ana Maria";
```

É possível definir um atributo como readonly:

```ts
class Pessoa {
    constructor(nome: string) {
        this.nome = nome;
    }
    readonly nome: string
}

let obj = new Pessoa("Ana");
obj.nome = "Ana Maria"; //Inválido
```

Herança pode ser feita utilizando a palavra chave `extends`:

```ts
class Pessoa {
    nome: string
}

class Aluno extends Pessoa {
    matricula: string;
}

class Professor extends Pessoa {
    matricula: string;
}

var a = new Aluno();
a.matricula = "123";
a.nome = "Ana"

var p = new Professor();
p.matricula = "100";
p.nome = "Bruno"
```

Note que as classes **Professor** e **Aluno**, declaradas acima, são idênticas. Dessa forma, um objeto Professor pode ser referenciado por uma variável do tipo Aluno:

```ts
class Pessoa {
    nome: string
}

class Aluno extends Pessoa {
    matricula: string;
}

class Professor extends Pessoa {
    matricula: string;
}

let a : Aluno = new Professor();
a.matricula = "123";
a.nome = "Ana"

console.log(a);
```

Assim como em Javascript, o construtor de uma sub-classe precisa obrigatoriamente chamar `super();` antes de acessar `this`:

```ts
class Pessoa {
    nome: string
}

class Aluno extends Pessoa {
    matricula: string;
    constructor (matricula: string, nome: string) {
        super();
        this.matricula = matricula;
        this.nome = nome;
    }
}
```

Métodos podem ser adicionados normalmente, como pode ser visto no método `getIdade` abaixo. Note que dentro do método, todo acesso à propriedade do objeto precisa obrigatoriamente ser realizado através de `this.NOME_DO_ATRIBUTO`:

```ts
class Pessoa {
    constructor(nome: string, nascimento: Date) {
        this.nome = nome;
        this.nascimento = nascimento;
    }
    nome: string;
    nascimento: Date;
    getIdade() : number {
        let hoje = new Date();
        let idade = hoje.getFullYear() - this.nascimento.getFullYear();
        if (hoje.getMonth() < this.nascimento.getMonth())
            idade--;
        else if (hoje.getMonth() == this.nascimento.getMonth() && hoje.getDay() >= this.nascimento.getDay())
            idade--;

        return idade;
    }
}

let obj = new Pessoa("Ana", new Date(2000, 1, 1));

console.log(`${obj.nome}: ${obj.getIdade()} anos`);
```

É possível indicar que uma classe deve implementar determinadas interfaces. Note no código abaixo que, como as propriedades inseridas nas iterfaces `ITeste1` e `Iteste2` não possuem `?`, elas não podem possuir o valor `undefined` e, por isso, tivemos que inicializá-las.

```ts
interface ITeste1 {
  propriedade1: string;
  propriedade2: string;
}

interface ITeste2 {
  propriedade3: string;
}

interface ITeste3 {
  propriedade4?: string;
}

class Teste implements ITeste1, ITeste2, ITeste3 {
    propriedade1: string = "";
    propriedade2: string = "";
    propriedade3: string = "";
    propriedade4?: string;
}
```

Classes também podem possuir acessores (get e set). Assim como em Javascript, o uso de `_` antes de um atributo indica que não se deve utilizar este atributo fora da classe em que o mesmo foi declarado:

```ts
class Teste {
  _propriedade1 = 0;
  get propriedade1() {
    return this._propriedade1;
  }
  set propriedade1(value) {
    this._propriedade1 = value;
  }
}

let obj = new Teste();
obj.propriedade1 = 10;
console.log(obj.propriedade1);
```

Se estiver utilizando ECMA Script 6, você pode utilizar o modificador de acesso private (`#`):

```ts
class Teste {
  #propriedade1 = 0;
  get propriedade1() {
    return this.#propriedade1 = 0;
;
  }
  set propriedade1(value) {
    this.#propriedade1 = value;
  }
}

let obj = new Teste();

//As linhas abaixo são inválidas, pois 
//o atributo #propriedade1 é privado
obj.#propriedade1 = 10;
console.log(obj.#propriedade1);
```

Typescript também permite indicar a visibilidade de membros como `public`, `protected` e `private`. Note que com estes não é necessário utilizar ECMA Script 6.

```ts
class Teste {
  protected _prop1 = 1;
  private _prop2 = 2;
  public get propriedade1() : number {
    return this._prop1;
  }
  public get propriedade2() : number {
    return this._prop2;
  }
}

class Teste2 extends Teste {
  private _prop3 = 3;
  public get propriedade3() : number {
    return this._prop3;
  }

  public getSoma() : number {
    //Note que aqui eu não consigo acessar this._prop2, 
    // pois este atributo é privado.
    return this._prop1 + this.propriedade2 + this._prop3;
  }
}

let obj = new Teste2();
//Neste ponto, apenas o método getSoma e 
// as propriedades propriedade1, propriedade2 e 
// propriedade3 estarão visíveis.
```

Classes também podem possuir membros estáticos:

```ts
class Teste {
    prop1: number = 1;
    static prop2: number = 2;
    public acao1() : void {
        console.log("Ação 1");
    }

    public static acao2() : void {
        console.log("Ação 2");
    }
}

let obj = new Teste();

//Disponível apenas:
//  obj.prop1
//  obj.acao1

//Na classe, disponível:
//  Teste.prop2
//  Teste.acao2
```