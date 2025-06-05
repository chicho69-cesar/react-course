const person = {
  name: 'Tony',
  age: 45,
  keyName: 'Ironman'
};

// const { age, keyName, name, } = person;

// console.log(name);
// console.log(age);
// console.log(keyName);

const useContext = ({ keyName, name, age, range = 'Capitán' }) => {
  // console.log(name, age, range);

  return {
    fullName: keyName,
    years: age,
    latlng: {
      lat: 14.1232,
      lng: -12.3232
    }
  }

}

const { fullName, years, latlng: { lat, lng } } = useContext(person);

console.log(fullName, years);
console.log(lat, lng);
