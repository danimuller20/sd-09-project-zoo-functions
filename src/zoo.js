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

const data = require('./data');

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.some(currentAnimal =>
    currentAnimal.residents
    .every(resident => resident.age >= age && currentAnimal.name === animal));
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return employees
    .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees
    .some(employee => employee.managers
    .some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  const animalsObject = {};
  animals.map((animal) => {
    animalsObject[animal.name] = animal.residents.length;
    return animalsObject;
  });
  if (!species) {
    return animalsObject;
  }
  return animals.filter(animal => animal.name === species)[0].residents.length;
}


function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  let entrantTotal = 0;
  Object.keys(prices)
    .forEach((key) => {
      if (key in entrants) {
        entrantTotal += prices[key] * entrants[key];
      }
    });
  return entrantTotal;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const selectedEmployee = employees.filter(employee => employee.id === id);
  const animalId = selectedEmployee.map(element => element.responsibleFor[0]);
  const residents = animals.find(animal => animal.id === animalId[0]).residents;
  const olderAnimal = residents.reduce((acc, current) => {
    if (acc.age < current.age) {
      acc = current;
    }
    return acc;
  });
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices)
    .forEach((key) => {
      prices[key] = parseFloat(Math
    .fround(prices[key] * ((percentage / 100) + 1))
    .toFixed(2))
    });
}

function employeeCoverage(idOrName) {
  // seu codigo aqui
  let coverageList = {};
  if(!idOrName) {
    const employeeRespectiveAnimals = employees
      .map(employee => employee.responsibleFor
      .map(animalId => animals
      .find(animal => animal.id === animalId).name));
    employees
      .forEach(({ firstName, lastName }, index) =>
      coverageList[`${firstName} ${lastName}`] = employeeRespectiveAnimals[index]);
    return coverageList;
  }

  const { firstName, lastName, responsibleFor } = employees
    .find(employee =>
      employee.firstName === idOrName ||
      employee.lastName === idOrName ||
      employee.id === idOrName);

  return { [`${firstName} ${lastName}`]: responsibleFor.map(animalId => animals.find(animal => animal.id === animalId).name) };
}

console.log(employeeCoverage())

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
