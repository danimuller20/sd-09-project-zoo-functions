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
const { animals } = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const findEspecie = animals.find(especie => (especie.name === animal));
  return findEspecie.residents.every(idade => (idade.age > age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const findEmployees = employees
    .find(func => func.firstName === employeeName || func.lastName === employeeName);
  return findEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return employees.some(employeer =>
    employeer.managers.some(employeerId => employeerId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if(!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    } , {});
  } return animals.find(element => element.name === species).residents.length;
}
console.log(animalCount('lions'));
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
