export const characterTraitModelMock = (id = '1', nameTranslationKey = 'key', percent = 66) => ({
    id,
    nameTranslationKey,
    percent,
    reset: jest.fn(),
});
