import { AppLangs } from '../types';
import { GenericSingletonManager } from '../models';

import { TEXTS_EN } from '../langs/en';
import { TEXTS_PL } from '../langs/pl';

const langs = {
    [AppLangs.EN]: TEXTS_EN,
    [AppLangs.PL]: TEXTS_PL,
};

export const langManager = new GenericSingletonManager(langs);
