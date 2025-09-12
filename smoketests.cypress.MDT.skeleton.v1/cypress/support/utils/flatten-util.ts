import CommonUtils from "./common-utils";

export class Flatten {
    
    static ComplexObjectsToIndexedCompositeList(objList01: any, objList02: any, objList03: any): any[] {
        return objList01.map((obj: any, index: number) => ({
            // NB : When a object list has been exhaust of members [Index > object list size] then an empty object will be added {}
            Index: index + 1,               // Adding 1 to make the index 1-based, similar to LINQ's Enumerable.Select method in C#
            obj1: { ...obj },               // Spread operator to copy properties of the original object
            obj2: { ...objList02[index] },  // include properties from the second complex object
            obj3: { ...objList03[index] }   // include properties from the third complex object
        }));
    };

    static ComplexObjectsToIndexedCompositeList_OrderBy_Size(objList01: any, objList02: any, objList03: any): any[] {

        let orderedBySize = this.OrderedCollectionsBySize(objList01, objList02, objList03);

        console.log(`ComplexObjects orderedBySize: ${CommonUtils.toJSONString(orderedBySize)}`);

        return this.ComplexObjectsToIndexedCompositeList(orderedBySize[0], orderedBySize[1], orderedBySize[2]);
    };

    static ComplexObjectsToIndexedCompositeList_Randomized(objList01: any, objList02: any, objList03: any): any[] {
        let objList01_Randomized = this.shuffleCollection(objList01);
        console.log(`objList01_Randomized: ${CommonUtils.toJSONString(objList01_Randomized)}`);

        let objList02_Randomized = this.shuffleCollection(objList02);

        console.log(`objList02_Randomized: ${CommonUtils.toJSONString(objList02_Randomized)}`);

        let objList03_Randomized = this.shuffleCollection(objList03);

        console.log(`objList03_Randomized: ${CommonUtils.toJSONString(objList03_Randomized)}`);

        return this.ComplexObjectsToIndexedCompositeList(objList01_Randomized, objList02_Randomized, objList03_Randomized);
    };

    //Use the Fisher-Yates shuffle to randomize
    static shuffleCollection<T>(array: T[]): T[] {
        // Creating a copy of the original array to avoid modifying it directly
        let shuffledCollection = [...array];

        for (let i = shuffledCollection.length - 1; i > 0; i--) {
            // Generating a random index between 0 and i (inclusive)
            let j = Math.floor(Math.random() * (i + 1));

            // Swapping elements at indices i and j
            [shuffledCollection[i], shuffledCollection[j]] = [shuffledCollection[j], shuffledCollection[i]];
        }

        return shuffledCollection;
    };

    // Function to return the collections ordered by size, largest first
    static OrderedCollectionsBySize<T, U, V>(objList01: T[], objList02: U[], objList03: V[]): any[] {
        // Creating an array of tuples [collection, size]
        let collectionsWithSizes: [any[], number][] = [
            [objList01, objList01.length],
            [objList02, objList02.length],
            [objList03, objList03.length]
        ];

        // Sorting the collections based on their sizes in descending order
        collectionsWithSizes.sort((a, b) => b[1] - a[1]);

        // Extracting and returning the collections in sorted order
        return collectionsWithSizes.map(item => item[0]);
    }
}