class Teste {
    #propriedade1: string;
    propriedade2: string;
    constructor(propriedade1: string, propriedade2: string) {
        this.#propriedade1 = propriedade1;
        this.propriedade2 = propriedade2;
    }
}

const teste = new Teste('Prop1', 'Prop2');
console.log(teste);
