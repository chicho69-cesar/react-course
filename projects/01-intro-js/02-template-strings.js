const myName = 'Cesar';
const myLastName = 'Villalobos Olmos';

const fullName = `${myName} ${myLastName}`;

console.log(fullName);

function createGreeting(name) {
  return 'Hola ' + name;
}

console.log(`Este es un texto: ${createGreeting(myName)}`);
