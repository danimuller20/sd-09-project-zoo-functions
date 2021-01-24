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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  return animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(species, age) {
  return animals
    .find(animal => animal.name === species)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(
    employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  const animalsList = {};
  animals.forEach((animal) => { animalsList[animal.name] = animal.residents.length; });
  if (!species) {
    return animalsList;
  }
  return animalsList[species];
}

function entryCalculator(entrants) {
  let entryTotal = 0;
  if (entrants) {
    Object.keys(prices).forEach((age) => {
      if (entrants[age]) {
        entryTotal += prices[age] * entrants[age];
      }
    });
  }
  return entryTotal;
}

function emptyAnimalMap(myAnimalMap, animal) {
  if (!myAnimalMap[animal.location]) {
    myAnimalMap[animal.location] = [animal.name];
  } else {
    myAnimalMap[animal.location].push(animal.name);
  }
  return myAnimalMap;
}

function getResidentsBySpecies(species, genre = false) {
  return species.residents.reduce((namesBySpeacies, animalName) => {
    if (genre) {
      if (animalName.sex === genre) {
        namesBySpeacies[species.name].push(animalName.name);
      }
    } else {
      namesBySpeacies[species.name].push(animalName.name);
    }
    return namesBySpeacies;
  }, { [species.name]: [] });
}

function namesAnimalMap(genre) {
  return animals.reduce((myAnimalMap, animal) => {
    if (!myAnimalMap[animal.location]) {
      myAnimalMap[animal.location] = [getResidentsBySpecies(animal, genre)];
    } else {
      myAnimalMap[animal.location].push(getResidentsBySpecies(animal, genre));
    }
    return myAnimalMap;
  }, {});
}

function animalMap(options) {
  if (!options || !options.includeNames) {
    return animals.reduce(emptyAnimalMap, {});
  }
  let newAnimalMap = {};
  if (options.includeNames === true) {
    newAnimalMap = namesAnimalMap(options.sex);
  }
  if (options.sorted === true) {
    Object.keys(newAnimalMap).forEach((region) => {
      newAnimalMap[region].forEach((species) => {
        species[Object.keys(species)[0]].sort();
      });
    });
  }
  return newAnimalMap;
}

function getSchedule(day) {
  const { open, close } = hours[day];
  if (open === 0) {
    return 'CLOSED';
  }
  return `Open from ${open}am until ${close - 12}pm`;
}

function schedule(dayName) {
  if (!dayName) {
    return Object.keys(hours).reduce((result, day) => {
      result[day] = getSchedule(day);
      return result;
    }, {});
  }
  return { [dayName]: getSchedule(dayName) };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const firstSpecies = employees.find(employee => employee.id === id).responsibleFor[0];
  return Object.values(animals.find(animal => animal.id === firstSpecies)
  .residents.reduce(function (oldest, resident) {
    return resident.age > oldest.age ? resident : oldest;
  }));
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((agePrice) => {
    prices[agePrice] =
      (Math.round(prices[agePrice] * percentage) + (prices[agePrice] * 100)) / 100;
  });
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    const coverageList = employees.reduce(
      (employeeList, { firstName, lastName, responsibleFor }) => {
        employeeList[`${firstName} ${lastName}`] = responsibleFor.map(animalId => {
          return animals.find(({ id }) => animalId === id).name;
        });
        return employeeList;
      },
      {}
    );
    return coverageList;
  }

  const { firstName, lastName, responsibleFor } = employees.find(({ firstName, lastName, id }) => firstName === idOrName || lastName === idOrName || id === idOrName);
  return { [`${firstName} ${lastName}`]: responsibleFor.map(animalId => {
    return animals.find(({ id }) => animalId === id).name;
  }) };
}
// console.log(employeeCoverage());
// console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
