export const enumToKeyValueObject = (enumObj: any): {
    [key: string]: string
} => {
    const keys = Object.keys(enumObj)
    const keyValueObj: {
        [key: string]: string
    } = {}

    for (let key of keys) {
        if (!isNaN(Number(key))) {
            // Skip numeric keys (assigned automatically by TypeScript)
            continue
        }

        keyValueObj[key] = enumObj[key]
    }

    return keyValueObj
}
