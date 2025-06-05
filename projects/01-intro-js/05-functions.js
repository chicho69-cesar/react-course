const greet = function (name) {
  return `Hola, ${name}`;
}

const greet2 = (name) => {
  return `Hola, ${name}`;
}

const greet3 = (name) => `Hola, ${name}`;
const greet4 = () => `Hola Mundo`;

// console.log( greet('Goku') )

console.log(greet2('Vegeta'));
console.log(greet3('Goku'));
console.log(greet4());

const getUser = () => ({
  uid: 'ABC123',
  username: 'El_Papi1502'
});

const user = getUser();
console.log(user);

// Tarea
const getActiveUser = (nombre) => ({
  uid: 'ABC567',
  username: nombre
})

const activeUser = getActiveUser('Cesar');
console.log(activeUser);
