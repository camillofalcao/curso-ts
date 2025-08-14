# Utilizando Tipos em Objetos na Linguagem Typescript

É comum a utilização de objetos em Javascript para agrupamento e transferência de dados. Em Typescript, os objetos possuem tipos, que são chamados de *Object Types*.

Veja o código abaixo, que aceita qualquer objeto que possua o atributo nome:

```ts
function cumprimentar(pessoa: { titulo: string; nome: string }) : void {
    console.log(`Olá ${pessoa.titulo} ${pessoa.nome}!`);
}

var obj1 = {
    nome: "Ana",
    titulo: "Sra."
};

var obj2 = {
    nome: "Ioda",
    titulo: "Mestre Jedi",
    idadeEmAnos: 900
};

cumprimentar(obj1); //Olá Sra. Ana!
cumprimentar(obj2); //Olá Mestre Jedi Yoda!
```

No exemplo acima, qualquer objeto que possua as mesmas propriedades pode ser passado por parâmetro para o método cumprimentar.

Também é possível obter o mesmo resultado com um código mais limpo utilizando interfaces:

```ts
interface Pessoa { 
    titulo: string;
    nome: string;
}

function cumprimentar(pessoa: Pessoa) : void {
    console.log(`Olá ${pessoa.titulo} ${pessoa.nome}!`);
}

var obj1 = {
    nome: "Ana",
    titulo: "Sra."
};

var obj2 = {
    nome: "Ioda",
    titulo: "Mestre Jedi",
    idadeEmAnos: 900
};

cumprimentar(obj1); //Olá Sra. Ana!
cumprimentar(obj2); //Olá Mestre Jedi Yoda!
```

É possível instanciar um objeto do tipo de uma interface adicionando `<NomeDaInterface>` antes de abrir chaves para instanciar um objeto. 

```ts
interface Pessoa { 
    propriedade1: string;
}

var obj = <Pessoa>{
    propriedade1: "Teste",
};
```

Também é possível instanciar um objeto do tipo de uma interface seguindo o padrão de `:TIPO`:

```ts
interface Pessoa { 
    propriedade1: string;
}

var obj : Pessoa = {
    propriedade1: "Teste",
};
```

Também é possível indicar se uma propriedade pode receber o valor `undefined` adicionando-se uma interrogação ( `?` ) ao final do nome da propriedade. O valor padrão desta propriedade será `undefined`. Veja abaixo:

```ts
interface Pessoa { 
    propriedade1: string;
    propriedade2?: string;
}

var obj : Pessoa = {
    propriedade1: "Teste",
};

console.log(obj.propriedade1); //null
console.log(obj.propriedade2); //undefined

obj.propriedade1 = "Teste";     //Válido
obj.propriedade1 = undefined;   //Inválido
obj.propriedade2 = "Teste";     //Válido
obj.propriedade2 = undefined;   //Válido
```

Uma propriedade também pode ser readonly (somente leitura):

```ts
interface Pessoa { 
    propriedade1: string;
    readonly propriedade2: string;
}

var obj : Pessoa = {
    propriedade1: "Teste 1",
    propriedade2: "Teste 2"
};

obj.propriedade1 = "Teste";     //Válido
obj.propriedade2 = "Teste";     //Inválido
```

Uma propriedade readonly não pode ser reescrita, porém isso não indica que a mesma não possa ser alterada. Veja o caso abaixo:

```ts
interface VeiculoInfo { 
    marca: string;
    modelo: string;
    ano: number;
}

interface Carro {
    readonly dadosBasicos: VeiculoInfo;
    portas: number
}

var veiculo : VeiculoInfo = {
    marca: "Honda",
    modelo: "CR-V",
    ano: 2025
};

var carro = <Carro>{
    dadosBasicos: veiculo,
    portas: 4
};

carro.dadosBasicos.ano = 2026; //Válido!

//Inválido
carro.dadosBasicos = <VeiculoInfo>{
    marca: "Honda",
    modelo: "CR-V",
    ano: 2026
};
```

Note que uma propriedade `readonly` em uma interface indica que esta propriedade não pode ser alterada diretamente na variável do tipo da interface, o que não impede alteração diretamente no objeto.

```ts
interface Pessoa {
  nome: string;
}
 
interface PessoaReadonly {
  readonly nome: string;
}
 
let pessoa: Pessoa = {
  nome: "Ana"
};
 
let pessoaReadonly: PessoaReadonly = pessoa;
 
//pessoaReadonly.nome = "Bruno"; //Inválido
console.log(pessoaReadonly.nome); //Ana

pessoa.nome = "Bruno"; //Válido
console.log(pessoaReadonly.nome); //Bruno
```

Se uma interface é uma extensão de outra (herança de interfaces), basta indicar, após o nome da interface, a palavra chave `extends` seguida do nome da interface pai:

```ts
interface Veiculo { 
    marca: string;
    modelo: string;
    ano: number;
}

interface Carro extends Veiculo {
    portas: number
}

let carro : Carro = {
    marca: "Honda",
    modelo: "CR-V",
    ano: 2026,
    portas: 4
};
```

Uma iterface pode ser uma extensão de mais de uma interface:

```ts
interface Documento { 
    numero: string;
}

interface PrevisaoDespesa {
    dataVencimento: Date;
    dataPagamento: Date;
    valorPrevisto: number
    valorRealizado: number
}

interface ContaAPagar extends Documento, PrevisaoDespesa {
    dataEmissao: Date;
};

let obj : ContaAPagar = {
    numero: "12345",
    dataPagamento: new Date(2025, 11, 10),
    dataEmissao: new Date(2025, 10, 10),
    dataVencimento: new Date(2025, 11, 10),
    valorPrevisto: 1.23,
    valorRealizado: 1.0,
};

console.log(obj);
```

Já sabemos que podemos combinar tipos utilizando `|` e o mesmo se aplica a interfaces:

```ts
interface Peso {
    peso: number
}

interface Altura {
    altura: number;
}

type PesoOuAltura = Peso | Altura;

let obj : PesoOuAltura;

obj = {
    peso: 60
};

console.log(obj); //{ peso: 60 }

obj = {
    altura: 60
};

console.log(obj); //{ altura: 60 }

obj = {
    peso: 60,
    altura: 1.6
};

console.log(obj); //{ peso: 60, altura: 1.6 }
```

Existe também a opção de combinar tipos utilizando `&`, o que nos entrega um tipo que combina ambas as interfaces e exige que o objeto atenda a ambas. Veja abaixo:

```ts
interface Peso {
    peso: number
}

interface Altura {
    altura: number;
}

type PesoEAltura = Peso & Altura;

let obj : PesoEAltura;

// //Inválido!
// obj = {
//     peso: 60
// };

// //Inválido!
// obj = {
//     altura: 60
// };

obj = {
    peso: 60,
    altura: 1.6
};

console.log(obj); //{ peso: 60, altura: 1.6 }
```

Com isso, já temos uma introdução ao uso de objetos em Typescript.
