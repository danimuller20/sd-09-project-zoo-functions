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

function animalsByIds(...ids) {
  return data.animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals.find(obj => obj.name === animal).residents.every(rsd => rsd.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const Managers = [];
  data.employees.map(employee => Managers.push(...employee.managers));
  return Managers.some(value => value === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: [],
    responsibleFor: [],
  };
  if (managers !== undefined) { newEmployee.managers = managers; }
  if (responsibleFor !== undefined) { newEmployee.responsibleFor = responsibleFor; }
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const countList = {};
    data.animals.forEach((animal) => { countList[animal.name] = animal.residents.length; });
    return countList;
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  let valueToPay = 0;
  Object.keys(entrants).forEach((actualKey) => {
    valueToPay += data.prices[actualKey] * entrants[actualKey];
  });
  return valueToPay;
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
