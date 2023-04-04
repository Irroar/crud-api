import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';
function checkDataForCreateFunction (username: string, age: number, hobbies: string[]) {
    const isTypeThreshold = (currentValue) => typeof currentValue === 'string';
    if (typeof username === 'string' && typeof age === 'number' && hobbies) {
        if (hobbies.every(isTypeThreshold) || hobbies.length == 0) {
            return true;
        }
        
    } else {
        return false;
    }
}

function checkThatThisIsUUID4 (id: string) {
    return uuidValidate(id) && uuidVersion(id) === 4;
} 

export {
    checkDataForCreateFunction,
    checkThatThisIsUUID4
}