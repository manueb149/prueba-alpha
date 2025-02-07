import { FC } from 'react';
import { Flex, Switch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/es/switch';

interface Props {
    label?: string;
    checked?: boolean;
    onChange?: SwitchChangeEventHandler;
}

/**
 * Componente para mostrar un toggle con su texto en un formulario
 */
export const Switcher: FC<Props> = ({ label, checked, onChange }) => {

    return (
        <Flex justify="left" align="center" gap="10px">
            {label && <span>{label}</span>}
            <Switch defaultChecked={checked} onChange={onChange} />
        </Flex>
    )
};
