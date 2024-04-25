export class LocalStorageKit {
    static set(key:string, value:string){
        localStorage[key] = value;
    }

    static get(key:string):string {
        return localStorage[key] || "";
    }

}