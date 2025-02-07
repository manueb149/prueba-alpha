import { FC } from "react"
import { Flex, InputNumber } from "antd"

interface Props {
    label?: string;
    value?: number | null;
    onChange?: ((value: number | null) => void)
}

/*
 * Componente para obtener una cantidad numérica de días.
 */
export const Plazo: FC<Props> = ({ label, value, onChange }) => {
    return (
        <Flex justify="left" align="left" gap="5px" vertical>
            {label && <span>{label}</span>}
            <InputNumber value={value} style={{ minWidth: '100%' }} size="large" min={1} max={1000} defaultValue={value || 30} onChange={onChange} changeOnWheel suffix={'días'} />
        </Flex>
    )
}
