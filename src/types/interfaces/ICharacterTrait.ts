export interface ICharacterTrait {
    id: string;
    nameTranslationKey: string;
    percent: number;

    reset: () => void;
}
