import CommonUtils from './common-utils';

type AnyObject = { [key: string]: any };

//Public function
export const deepEqual = (obj1: AnyObject, obj2: AnyObject, log: boolean = false): boolean => {
    const seen = new Set();
    return _deepEqual(obj1, obj2, seen, log);
}

const logger = (text: string, log: boolean = false) => {
    if (log) console.log(text);
}

//To prevent the error - "Maximum call stack size exceeded", 
//deepEqual function has the ability to keep track of the objects it has already seen 
//and avoid comparing them again.
//So it will check if the two objects it is comparing are present in the seen set. 
//If they are, return true to avoid going into an infinite recursive loop.
const _deepEqual = (obj1: AnyObject, obj2: AnyObject, seen: Set<any>, log: boolean = false): boolean => {
    // If both are the same object or are already compared, return true
    if (obj1 === obj2 || seen.has(obj1) || seen.has(obj2)) return true;

    //function deepEqualLog(obj1: AnyObject, obj2: AnyObject): boolean {
    logger(`START : deepEqualLog()......`,log);

    logger(`obj1: ${CommonUtils.toJSONString(obj1, { unformatted: false })}`,log);
    logger(`obj2: ${CommonUtils.toJSONString(obj2, { unformatted: false })}`,log);

    // If both are null or undefined or values equal, logger(`return true`,log)
    if (obj1 === obj2) { logger(`both are null or undefined or values equal - return true`,log); return true }

    // If either is null or undefined (but not both, based on the previous check), logger(`return false`,log)
    if (!obj1 || !obj2) { logger(`either is null or undefined (but not both, based on the previous check) - return false`,log); return false };

    logger(`obj1 instanceof Date : ${obj1 instanceof Date}`,log);
    logger(`obj2 instanceof Date : ${obj2 instanceof Date}`,log);
    // If both are Date objects and check their time values are equal, logger(`return true`,log)
    if (obj1 instanceof Date && obj2 instanceof Date) {
        logger(`both are Date objects, so check their time values are equal`,log);
        if (obj1.getTime() === obj2.getTime()) {
            logger(`return true`,log);
            return true;
        }
        else {
            logger(`return false`,log);
            return false;
        }
    };

    // If one is a Date object and the other isn't, logger(`return false`,log)
    if ((obj1 instanceof Date && !(obj2 instanceof Date)) || (obj2 instanceof Date && !(obj1 instanceof Date))) { logger(`one is a Date object and the other isn't - return false`,log); return false };

    // If one is an Array and the other isn't, logger(`return false`,log)
    if (Array.isArray(obj1) !== Array.isArray(obj2)) {
        logger(`one is an Array and the other isn't - return false`,log); return false
    };

    // After comparing a pair of objects, add them to the seen set
    seen.add(obj1);
    seen.add(obj2);

    // If both are Arrays, compare their items
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        logger(`START : both are Arrays, compare their items`,log);
        if (obj1.length !== obj2.length) { logger(`Array lengths are different - return false`,log); return false };
        for (let i = 0; i < obj1.length; i++) {
            logger(`START : Checking deepEqualLog(${obj1[i]}, ${obj2[i]})......`,log);
            if (!_deepEqual(obj1[i], obj2[i], seen)) { logger(`(!deepEqualLog(${obj1[i]}, ${obj2[i]}))  - return false`,log); return false };
            logger(`END : Checking deepEqualLog(${obj1[i]}, ${obj2[i]})......`,log);
        }
        logger(`END : both are Arrays, compare their items`,log);
        { logger(`All array items match - return true`,log); return true };
    }

    // Extract keys and ensure both objects have the same number of keys
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    logger(`obj1 key lengths - ${keys1.length}`,log);
    Object.keys(obj1).forEach(key => logger(key));
    logger(`obj2 key lengths - ${keys2.length}`,log);
    Object.keys(obj2).forEach(key => logger(key));

    //Not complex object so just compare values
    if (keys1.length == 0 && keys2.length == 0) {
        logger(`Not complex object so just compare values (${obj1} === ${obj2}) - return ${(obj1 === obj2)}`,log)
        return (obj1 === obj2);
    }

    if (keys1.length !== keys2.length) { logger(`difference in key lengths - return false`,log); return false };

    // Check deep equality on each key-value pair
    logger(`START : Check deep equality on each key-value pair......`,log);
    for (const key of keys1) {
        if (!keys2.includes(key)) { logger(`Key ${key} not in obj2 - return false`,log); return false };
        logger(`Check deep equality on each key-value pair ${obj1[key]},${obj2[key]}`,log);
        if (!_deepEqual(obj1[key], obj2[key], seen)) { logger(`!deepEqualLog(obj1[key], obj2[key]) - return false`,log); return false };
    }
    logger(`END : Check deep equality on each key-value pair......`,log);


    logger(`END : deepEqualLog()......`,log);

    { logger(`end of comparison  :obj1: ${CommonUtils.toJSONString(obj1)} : obj2: ${CommonUtils.toJSONString(obj2)}: return true`,log); return true }
}