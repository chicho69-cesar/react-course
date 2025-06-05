import { getHeroById } from './08-import-and-export';

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const p1 = getHeroById(2);
    resolve(p1);
    // reject('No se pudo encontrar el héroe');
  }, 2000);
});

promise
  .then((hero) => {
    console.log('Hero: ', hero)
  })
  .catch(err => console.warn(err));

const getHeroByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const p1 = getHeroById(id);

      if (p1) {
        resolve(p1);
      } else {
        reject('No se pudo encontrar el héroe');
      }
    }, 2000);
  });
}

getHeroByIdAsync(1)
  .then(console.log)
  .catch(console.warn);
