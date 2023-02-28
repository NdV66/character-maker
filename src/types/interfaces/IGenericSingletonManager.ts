export interface IGenericSingletonManager {
    getSingleton: <T>(name: string) => T;
}
