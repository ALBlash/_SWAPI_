import { IFilm } from "./models/film.interface.js";
import { IPerson } from "./models/person.interface.js";
import { IPlanet } from "./models/planet.interface.js";
import { IStarship } from "./models/starship.interface.js";
import { IVehicle } from "./models/vehicle.interface.js";
import { getAllPeople } from "./services/cache.service.js";
import { getCollection, getSingleByUrl } from "./services/dal.service.js";
import { createElementList, createPlanetElement } from "./services/element.service.js";
import { getIdFromModel } from "./services/helper.service.js";

(async () => {
    getAllPeople()
    const { results: people } = await getCollection<IPerson>('people');
    // const result = await getCollection<IPerson>('people');
    // const people = result.results;
    const peopleList = document.querySelector('.people-list') as HTMLDivElement;
    const homeWorldName = document.querySelector('.homeworld') as HTMLDivElement;
    const vehiclesList = document.querySelector('.vehicles-list') as HTMLDivElement;
    const starShipsList = document.querySelector('.starships-list') as HTMLDivElement;
    const filmsList = document.querySelector('.films-list') as HTMLDivElement;

    // removes the list of buttons before creating new elements
    peopleList.querySelector(".list-group")?.remove();
    const personList: HTMLDivElement = createElementList(people);
    peopleList.appendChild(personList);
    console.log(people);




    // TODO: change the option of active btn only for the people list
    personList.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', async function () {
            homeWorldName.querySelectorAll('.homeworld-name')?.forEach(el => el.remove());
            vehiclesList.querySelectorAll('.list-group')?.forEach(el => el.remove());
            starShipsList.querySelectorAll('.list-group')?.forEach(el => el.remove());
            filmsList.querySelectorAll('.list-group')?.forEach(el => el.remove());

            const person = people.find(p => this.id === getIdFromModel(p)) as IPerson;
            console.log(person);

            // populate starships list
            // one person may have more then one starship
            // the starships are saved in an array so we are iterating over the array with map
            // creating a promise to each starship, then the promise will let us know whats the status
            // if its Pending" or "Fulfilled" or "Rejected"
            const starShipsPromises = person.starships.map(getSingleByUrl<IStarship>);
            const starShips = await Promise.all(starShipsPromises);
            const starShipsListElements = createElementList(starShips);
            starShipsList.appendChild(starShipsListElements);

            // populate film list
            const filmsPromises = person.films.map(getSingleByUrl<IFilm>);
            const films = await Promise.all(filmsPromises);
            const filmsListElements = createElementList(films);
            filmsList.appendChild(filmsListElements);

            // populate vehicles list
            const vehiclesPromises = person.vehicles.map(getSingleByUrl<IVehicle>);
            const vehicles = await Promise.all(vehiclesPromises);
            const vehiclesListElements = createElementList(vehicles);
            vehiclesList.appendChild(vehiclesListElements);

            // populate homeworld name
            const homeWorld = await getSingleByUrl(person.homeworld) as IPlanet;
            homeWorldName.appendChild(createPlanetElement(homeWorld))

        });
    });

})();