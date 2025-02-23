export function getIdFromModel(model) {
    return model.url.split('/').filter(x => !!x).slice(-1)[0];
}
