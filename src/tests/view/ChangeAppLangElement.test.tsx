import { render } from '@testing-library/react';
import { TEST_IDS } from '../../defaults';
import { AppLangs } from '../../types';
import { ChangeAppLangElement } from '../../view/page/ChangeAppLangElement';
import * as viewModel from '../../viewModels/useChangeLangElementViewModel';

const VIEW_MODEL_DATA = {
    onClickItem: jest.fn(),
    appLang: AppLangs.EN,
    items: [],
};

describe('ChangeAppLangElement', () => {
    test('Should render correctly', () => {
        jest.spyOn(viewModel, 'useChangeLangElementViewModel').mockReturnValue(VIEW_MODEL_DATA);
        const { getByTestId } = render(<ChangeAppLangElement />);
        expect(getByTestId(TEST_IDS.CHANGE_APP_LANG_ELEMENT)).toBeInTheDocument();
    });
});

export {};
