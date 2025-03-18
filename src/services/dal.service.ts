import { getAllPeople, getCachedCollection, getCachedSingleByUrl } from "./cache.service.js";
import { IPerson } from "../models/person.interface.js";

export async function getCollection<T>(resource: string): Promise<{ results: T[] }> {
   if (resource === "people") {
      const results = await getAllPeople(); // Fetch all people (merged logic)
      return { results } as { results: T[] }; // Explicitly cast to match T[]
   }
   return getCachedCollection<T>(resource); // Default for other resources
}

export async function getSingleByUrl<T>(url: string): Promise<T> {
   return getCachedSingleByUrl<T>(url);
}
