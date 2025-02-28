// 1. "https://swapi.dev/api/people/1/".split('/')
// 2. ["https:", "", "swapi.dev", "api", "people", "1", ""]
// 3. ["https:", "swapi.dev", "api", "people", "1"]
// 4. "1"
export function getIdFromModel(model) {
    return model.url.split('/').filter(x => !!x).slice(-1)[0];
}
