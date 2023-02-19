import { Switch, SwitchProps } from 'antd';
import { TEST_IDS } from '../../defaults';

type Props = Pick<SwitchProps, 'unCheckedChildren' | 'checked' | 'checkedChildren'> & {
    onChange: () => void;
};

export const SwitchButton: React.FC<Props> = ({ onChange, ...props }) => (
    <Switch onChange={onChange} {...props} data-test-id={TEST_IDS.SWITCH_BUTTON} />
);
