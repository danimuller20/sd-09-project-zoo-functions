/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals } = require('./data');
const data = require('./data');


function animalsByIds(...ids) {
  const zooArray = [];
  if (!ids) {
    return [];
  }
  if (ids.length === 1) {
    zooArray.push(data.animals.find(animal => animal.id === ids[0]));
  }
  if (ids.length > 1) {
    // for (let index = 0; index < ids.length; index++) {
    //   const element = ids[index];
    //   achou.push(data.animals.find((animal) => animal.id === element));
    // }
    ids.forEach((codigo) => {
      zooArray.push(animals.find(animal => animal.id === codigo));
    });
  }
  return zooArray;
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function animalsOlderThan(animal, age) {
  let returnSearch = false;
  animals.find((especie) => {
    if (especie.name === animal) {
      returnSearch = especie.residents.some(apelido => apelido.age < age);
    }
    return returnSearch;
  });
  return !returnSearch;
}
console.log(animalsOlderThan('penguins', 7));
// console.log(animals[0].residents);

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
