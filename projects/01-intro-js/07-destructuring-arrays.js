const characters = ['Goku', 'Vegeta', 'Trunks'];
const [, , p3] = characters;
console.log(p3);

const returnArray = () => {
  return ['ABC', 123];
}

const [letters, numbers] = returnArray();
console.log(letters, numbers);

// Tarea
// 1. el primer valor del arr se llamará nombre
// 2. se llamará setNombre

const useState = (value) => {
  return [value, () => { console.log('Hola Mundo') }];
}

const [name, setName] = useState('Goku');

console.log(name);
setName();
