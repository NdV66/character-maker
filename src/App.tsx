import { AppContextWrapper } from './context';
import { Page } from './view/page';

import 'antd/dist/reset.css';

export const App = () => (
    <AppContextWrapper>
        <Page />
    </AppContextWrapper>
);

export default App;
