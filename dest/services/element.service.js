import { getIdFromModel } from './helper.service.js';
// creates a div with a class that will hold all the buttons;
export function createElementList(elements) {
    const div = document.createElement('div');
    div.classList.add('list-group');
    if (elements.length === 0) {
        const noData = document.createElement('div');
        noData.classList.add('no-data');
        noData.innerHTML = `
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" fill="red"/>
            </svg>
            <p style="margin-top:5px;">No Results</p>
        `;
        div.appendChild(noData);
    }
    elements.forEach((el) => {
        const btn = createButtonElement(el, 'eye_color' in el && 'gender' in el); // Pass a flag for IPerson
        div.appendChild(btn);
    });
    return div;
}
// generating the buttons one by one
export function createButtonElement(element, isPerson) {
    const btn = document.createElement('button');
    btn.classList.add('list-group-item', 'list-group-item-action');
    btn.innerText = 'name' in element ? element.name : element.title;
    btn.id = getIdFromModel(element);
    if (isPerson) {
        btn.addEventListener('click', function () {
            var _a;
            (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
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
        icon.style.color = element.eye_color;
        iconContainer.appendChild(icon);
        // Add gender icon
        const genderIcon = document.createElement('i');
        genderIcon.classList.add('bi');
        genderIcon.classList.add(element.gender === 'male' ? 'bi-person-standing' :
            element.gender === 'female' ? 'bi-person-standing-dress' : 'bi-robot');
        iconContainer.appendChild(genderIcon);
    }
    return btn;
}
export function createPlanetElement(planet) {
    const div = document.createElement('div');
    div.classList.add('homeworld-name');
    // div.innerText = planet.name;
    div.appendChild(document.createTextNode(planet.name));
    return div;
}
