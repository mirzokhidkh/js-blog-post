export class TransformService {
    static objectToArray(data) {
        return Object.keys(data).map(key => {
            const item = data[key];
            item.id = key;
            return item;
        })
    }
}