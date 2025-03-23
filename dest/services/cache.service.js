var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAllPeople() {
    return __awaiter(this, void 0, void 0, function* () {
        const cache = localStorage.getItem("allPeople");
        if (cache) {
            return JSON.parse(cache);
        }
        const spinner = document.querySelector('.spinner');
        let allPeople = [];
        let nextUrl = "https://swapi.dev/api/people/";
        const body = document.querySelector('.body');
        body.style.opacity = '0.5';
        while (nextUrl) {
            spinner.classList.add("loader");
            const data = yield fetch(nextUrl).then(res => res.json());
            allPeople = [...allPeople, ...data.results];
            nextUrl = data.next;
        }
        localStorage.setItem("allPeople", JSON.stringify(allPeople));
        console.log("Fetched all people:", allPeople);
        body.style.opacity = '1';
        spinner.classList.remove("loader");
        return allPeople;
    });
}
export function getCachedCollection(resource) {
    return __awaiter(this, void 0, void 0, function* () {
        const cache = localStorage.getItem(resource);
        if (cache) {
            return JSON.parse(cache);
        }
        const data = yield fetch(`https://swapi.dev/api/${resource}`).then(res => res.json());
        localStorage.setItem(resource, JSON.stringify(data));
        return Promise.resolve(data);
    });
}
export function getCachedSingleByUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const cache = localStorage.getItem(url);
        if (cache) {
            return JSON.parse(cache);
        }
        const data = yield fetch(url).then(res => res.json());
        localStorage.setItem(url, JSON.stringify(data));
        return Promise.resolve(data);
    });
}
