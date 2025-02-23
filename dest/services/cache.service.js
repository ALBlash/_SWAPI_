var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const data = yield (yield fetch(url)).json();
        localStorage.setItem(url, JSON.stringify(data));
        return Promise.resolve(data);
    });
}
