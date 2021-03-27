const fs = require('fs');

const statesJSON = './databs/Estados.json';
const citiesJSON = './databs/Cidades.json';

//creation of .json files according to each state
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

//Get data from .json files
function searchUF(UF) {
  const data = JSON.parse(fs.readFileSync(`./createDATA/${UF}.json`));
  const total = data.length;
  return total;
}

/* console.log(searchUF('MG')); */

//Get five states that least have cities

function getFiveCities() {
  const states = JSON.parse(fs.readFileSync(statesJSON, 'utf-8'));
  const newArrayStates = [];
  states.forEach((state) => {
    const UF = state.Sigla;
    const quantidade_estados = searchUF(UF);
    const objeto = { UF, quantidade_estados };
    newArrayStates.push(objeto);
  });
  //Asc
  //newArrayStates.sort((a, b) => a.quantidade_estados - b.quantidade_estados);
  //Desc
  newArrayStates.sort((a, b) => b.quantidade_estados - a.quantidade_estados);
  newArrayStates.length = 5;
  const arrayOfString = newArrayStates.map(
    (state) => `${state.UF} - ${state.quantidade_estados}`
  );
  return arrayOfString;
}

console.log(getFiveCities());

//Get biggest name of each state

function getNameBigCities() {
  const states = JSON.parse(fs.readFileSync(statesJSON, 'utf-8'));
  const cities = JSON.parse(fs.readFileSync(citiesJSON, 'utf-8'));
  const arrayName = [];
  states.forEach((state) => {
    let citiesState = cities.filter((city) => {
      return city.Estado === state.ID;
    });
    let nameMax = '';
    citiesState.forEach((city) => {
      if (city.Nome.length > nameMax.length) nameMax = city.Nome;
    });
    const obj = {
      UF: state.Sigla,
      Cidade: nameMax,
    };
    arrayName.push(obj);
    arrayName.sort((a, b) => a.Cidade.length - b.Cidade.length);
  });
  return arrayName;
}
//console.log(getNameBigCities());

//Get smallest name of each state
function getNameSmallCities() {
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

    arrayName.sort((a, b) => a.Cidade.length - b.Cidade.length);
  });
  return arrayName;
}

//console.log(getNameSmallCities());
