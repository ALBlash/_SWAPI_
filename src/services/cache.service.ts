import { IPerson } from "../models/person.interface";

type PeopleResponse = {
    results: IPerson[];
    next?: string;
};

export async function getAllPeople(): Promise<IPerson[]> {
    const cache = localStorage.getItem("allPeople");
    if (cache) {
        return JSON.parse(cache);
    }
    const spinner = document.querySelector('.spinner') as HTMLDivElement;
    let allPeople: IPerson[] = [];
    let nextUrl: string | undefined = "https://swapi.dev/api/people/";
    const body = document.querySelector('.body') as HTMLBodyElement;
    body.style.opacity = '0.5';

    while (nextUrl) {
        spinner.classList.add("loader");
        const data: PeopleResponse = await fetch(nextUrl).then(res => res.json());
        allPeople = [...allPeople, ...data.results];
        nextUrl = data.next;
    }

    localStorage.setItem("allPeople", JSON.stringify(allPeople));
    console.log("Fetched all people:", allPeople);
    body.style.opacity = '1';
    spinner.classList.remove("loader");
    return allPeople;
}

export async function getCachedCollection<T>(resource: string): Promise<{ results: T[] }> {
    const cache = localStorage.getItem(resource);
    if (cache) {
        return JSON.parse(cache);
    }

    const data: { results: T[]; next?: string } = await fetch(`https://swapi.dev/api/${resource}`).then(res => res.json());

    localStorage.setItem(resource, JSON.stringify(data));
    return Promise.resolve(data);
}

export async function getCachedSingleByUrl<T>(url: string): Promise<T> {
    const cache = localStorage.getItem(url);
    if (cache) {
        return JSON.parse(cache);
    }

    const data: T = await fetch(url).then(res => res.json());
    localStorage.setItem(url, JSON.stringify(data));
    return Promise.resolve(data);
}
