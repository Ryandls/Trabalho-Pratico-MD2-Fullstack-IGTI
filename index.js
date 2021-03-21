const fs = require('fs');

const statesJSON = './databs/Estados.json';
const citiesJSON = './databs/Cidades.json';

function readJSON() {
  const states = JSON.parse(fs.readFileSync(statesJSON, 'utf-8'));
  const cities = JSON.parse(fs.readFileSync(citiesJSON, 'utf-8'));

  states.forEach((state) => {
    let statesCities = cities.filter((city) => {
      return city.Estado === state.ID;
    });
    createJSON = `./createDATA/${state.Sigla}.json`;
    fs.writeFileSync(createJSON, JSON.stringify(statesCities, null, 2));
  });
}

function searchUF(UF) {
  const data = JSON.parse(fs.readFileSync(`./createDATA/${UF}.json`));
  const total = data.length;
  return total;
}

/* console.log(searchUF('MG')); */

function getGreaterStatesString() {
  const states = JSON.parse(fs.readFileSync(statesJSON, 'utf-8'));
  const newArrayStates = [];
  states.forEach((state) => {
    const UF = state.Sigla;
    const quantidade_estados = searchUF(UF);
    const objeto = { UF, quantidade_estados };
    newArrayStates.push(objeto);
  });
  newArrayStates.sort((a, b) => a.quantidade_estados - b.quantidade_estados);
  newArrayStates.length = 5;
  const arrayOfString = newArrayStates.map(
    (state) => `${state.UF} - ${state.quantidade_estados}`
  );
  console.log(arrayOfString);
}

/* getGreaterStatesString(); */

function getNamesCities() {
  const states = JSON.parse(fs.readFileSync(statesJSON, 'utf-8'));
  const cities = JSON.parse(fs.readFileSync(citiesJSON, 'utf-8'));
  const arrayName = [];
  states.forEach((state) => {
    let citiesState = cities.filter((city) => {
      return city.Estado === state.ID;
    });
    let nameMax = citiesState[0].Nome;
    citiesState.forEach((city) => {
      if (city.Nome.length < nameMax.length) nameMax = city.Nome;
    });
    const obj = {
      UF: state.Sigla,
      Cidade: nameMax,
    };
    arrayName.push(obj);
  });
  return arrayName;
}
getNamesCities();

console.log(getNamesCities());
