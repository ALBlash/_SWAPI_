var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCollection, getSingleByUrl } from "./services/dal.service.js";
import { createElementList, createPlanetElement } from "./services/element.service.js";
import { getIdFromModel } from "./services/helper.service.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { results: people } = yield getCollection('people');
    // const result = await getCollection<IPerson>('people');
    // const people = result.results;
    const peopleList = document.querySelector('.people-list');
    const homeWorldName = document.querySelector('.homeworld');
    const vehiclesList = document.querySelector('.vehicles-list');
    const starShipsList = document.querySelector('.starships-list');
    const filmsList = document.querySelector('.films-list');
    (_a = peopleList.querySelector(".list-group")) === null || _a === void 0 ? void 0 : _a.remove();
    const personList = createElementList(people);
    peopleList.appendChild(personList);
    console.log(people);
    personList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function () {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function* () {
                (_a = homeWorldName.querySelectorAll('.homeworld-name')) === null || _a === void 0 ? void 0 : _a.forEach(el => el.remove());
                (_b = vehiclesList.querySelectorAll('.list-group')) === null || _b === void 0 ? void 0 : _b.forEach(el => el.remove());
                (_c = starShipsList.querySelectorAll('.list-group')) === null || _c === void 0 ? void 0 : _c.forEach(el => el.remove());
                (_d = filmsList.querySelectorAll('.list-group')) === null || _d === void 0 ? void 0 : _d.forEach(el => el.remove());
                const person = people.find(p => this.id === getIdFromModel(p));
                console.log(person);
                // populate starships list
                const starShipsPromises = person.starships.map((getSingleByUrl));
                const starShips = yield Promise.all(starShipsPromises);
                const starShipsListElements = createElementList(starShips);
                starShipsList.appendChild(starShipsListElements);
                // populate film list
                const filmsPromises = person.films.map((getSingleByUrl));
                const films = yield Promise.all(filmsPromises);
                const filmsListElements = createElementList(films);
                filmsList.appendChild(filmsListElements);
                // populate vehicles list
                const vehiclesPromises = person.vehicles.map((getSingleByUrl));
                const vehicles = yield Promise.all(vehiclesPromises);
                const vehiclesListElements = createElementList(vehicles);
                vehiclesList.appendChild(vehiclesListElements);
                // populate homeworld name
                const homeWorld = yield getSingleByUrl(person.homeworld);
                homeWorldName.appendChild(createPlanetElement(homeWorld));
            });
        });
    });
}))();
