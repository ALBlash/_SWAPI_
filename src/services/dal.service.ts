import { getCachedCollection, getCachedSingleByUrl } from "./cache.service.js";


export async function getCollection<T>(resource: string): Promise<{results: T[]}> {
   // return await fetch(`https://swapi.dev/api/${resource}`).then(res => res.json());
   return getCachedCollection<T>(resource);
} 

export async function getSingleByUrl<T>(url:string): Promise<T> {
   // return (await fetch(url)).json();
   return getCachedSingleByUrl<T>(url);
}