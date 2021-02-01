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
  // seu código aqui
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const especie = data.animals.find(specie => specie.name === animal);
  return especie.residents.every(obj => obj.age > age);
}

function employeeByName(name) {
  // seu código aqui
  let employee = data.employees.find(emp => emp.firstName === name || emp.lastName === name);
  if (!name) employee = {};
  return employee;
}
// https://www.digitalocean.com/community/tutorials/js-array-find-method
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee => employee.managers.some(idEmployee => idEmployee === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function createNumberForAnimals() {
  return data.animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
}

function animalCount(species) {
  // seu código aqui
  const countAnimalSpecies = createNumberForAnimals();
  if (!species) {
    return countAnimalSpecies;
  }
  return countAnimalSpecies[species];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (data.prices.Adult * Adult) + (data.prices.Child * Child) + (data.prices.Senior * Senior);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  let workDay;
  if (dayName) workDay = { [dayName]: data.hours[dayName] };
  else workDay = data.hours;
  return Object.entries(workDay)
    .reduce((agenda, day) => Object.assign(agenda, { [day[0]]: (day[1].open !== 0) ?
      `Open from ${day[1].open}am until ${day[1].close - 12}pm` : 'CLOSED' }), {});
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const helper = data.employees.find(person => person.id === id).responsibleFor[0];
  const answer = data.animals.find(creature => creature.id === helper).residents
    .sort((creature1, creature2) => creature2.age - creature1.age)[0];
  return [answer.name, answer.sex, answer.age];
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(data.prices).forEach((category) => {
    data.prices[category] *= (1 + (percentage / 100));
    data.prices[category] = Math.round(data.prices[category] * 100) / 100;
  });
}
// function employeeCoverage
function listEmployees() {
  return data.employees.reduce((acc, employ) => {
    acc.push(employ.id);
    return acc;
  }, []);
}

function createObject(ids) {
  const obj = {};
  ids.reduce((acc, id) => {
    const employ = employeeByName(id);
    const listEmploy = employ.responsibleFor;
    const animals = listEmploy.reduce((arr, animal) => {
      arr.push(animalsByIds(animal)[0].name);
      return arr;
    }, []);
    obj[`${employ.firstName} ${employ.lastName}`] = animals;
    return acc;
  }, {});
  return obj;
}

function employeeCoverage(idOrName = false) {
  // seu código aqui
  let ids = '';
  ids = listEmployees();
  let obj = createObject(ids);
  if (idOrName) {
    const employ = employeeByName(idOrName);
    const fullName = `${employ.firstName} ${employ.lastName}`;
    obj = { [fullName]: obj[fullName] };
  }
  return obj;
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
