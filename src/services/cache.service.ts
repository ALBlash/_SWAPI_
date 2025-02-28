export async function getCachedCollection<T>(resource: string): Promise<{ results: T[] }> {
    const cache = localStorage.getItem(resource);
    if (cache) {
        return JSON.parse(cache);
    }
    const data: { results: T[] } = await fetch(`https://swapi.dev/api/${resource}`).then(res => res.json());
    localStorage.setItem(resource, JSON.stringify(data));
    return Promise.resolve(data);
}

// export async function getCachedNextPage<T>(resource: string): Promise<{ results: T[] }> {
//     const cache = localStorage.getItem(`${resource}?page=${localStorage.getItem(`${resource}-page`) || 1}`);
//     if (cache) {
//         return JSON.parse(cache);
//     }
//     const data: { results: T[] } = await fetch(`https://swapi.dev/api/${resource}?page=${Number(localStorage.getItem(`${resource}-page`) || 1) + 1}`).then(res => res.json());
//     localStorage.setItem(`${resource}-page`, (Number(localStorage.getItem(`${resource}-page`) || 1) + 1).toString());
//     localStorage.setItem(`${resource}`, JSON.stringify(data));
//     return Promise.resolve(data);
// }

export async function getCachedSingleByUrl<T>(url: string): Promise<T> {
    const cache = localStorage.getItem(url);
    if (cache) {
        return JSON.parse(cache);
    }
    const data: T = await (await fetch(url)).json();
    localStorage.setItem(url, JSON.stringify(data));
    return Promise.resolve(data);
}