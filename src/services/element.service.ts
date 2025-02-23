import { IFilm } from '../models/film.interface';
import { IPerson } from "../models/person.interface";
import { IPlanet } from '../models/planet.interface';
import { IStarship } from "../models/starship.interface";
import { IVehicle } from "../models/vehicle.interface";
import { getIdFromModel } from './helper.service.js';

// creates a div with a class that will hold all the buttons;
export function createElementList(elements: (IPerson | IStarship | IVehicle | IFilm)[]) {
    const div = document.createElement('div');
    div.classList.add('list-group');

    elements.forEach((el) => {
        const btn = createButtonElement(el, 'eye_color' in el && 'gender' in el); // Pass a flag for IPerson
        div.appendChild(btn);
    });

    return div;
}

// generating the buttons one by one
export function createButtonElement(element: IPerson | IStarship | IVehicle | IFilm, isPerson: boolean) {
    const btn = document.createElement('button');
    btn.classList.add('list-group-item', 'list-group-item-action');
    btn.innerText = 'name' in element ? element.name : element.title;
    btn.id = getIdFromModel(element);

    if (isPerson) {
        btn.addEventListener('click', function () {
            this.parentElement?.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    }

    const iconContainer = document.createElement('div');
    btn.style.display = 'flex';
    btn.style.justifyContent = 'space-between';
    btn.appendChild(iconContainer);

    if (isPerson) {
        // Add eye color icon
        const icon = document.createElement('i');
        icon.classList.add('bi', 'bi-eye-fill');
        icon.style.color = (element as IPerson).eye_color;
        iconContainer.appendChild(icon);

        // Add gender icon
        const genderIcon = document.createElement('i');
        genderIcon.classList.add('bi');
        genderIcon.classList.add((element as IPerson).gender === 'male' ? 'bi-person-standing' :
            (element as IPerson).gender === 'female' ? 'bi-person-standing-dress' : 'bi-robot');
        iconContainer.appendChild(genderIcon);
    }

    return btn;
}


export function createPlanetElement(planet: IPlanet) {
    const div = document.createElement('div');
    div.classList.add('homeworld-name');
    // div.innerText = planet.name;
    div.appendChild(document.createTextNode(planet.name));
    return div;
}
