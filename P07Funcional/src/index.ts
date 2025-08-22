let numeros = [1,2,3,4,5];
let pares = numeros.filter(x => x % 2 == 0);
let impares = numeros.filter(x => x % 2 != 0);

console.log("Pares: ", pares);     //Pares:  [ 2, 4 ]
console.log("Ímpares: ", impares); //Ímpares:  [ 1, 3, 5 ]
