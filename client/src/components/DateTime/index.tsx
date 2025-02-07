import { FC } from "react";
import { Dayjs } from "dayjs";
import { DatePicker, Flex } from "antd"

interface Props {
    label?: string;
    value?: Dayjs | null;
    onChange?: (date: Dayjs | null) => void
}

/*
 * Componente para obtener la fecha y hora.
 */
export const DateTime: FC<Props> = ({ label, value, onChange }) => {

    const handleChange = (date: Dayjs) => {
        if (onChange) onChange(date)
    }

    return (
        <Flex justify="left" align="left" gap="5px" vertical>
            {label && <span>{label}</span>}
            <DatePicker size="large" defaultValue={value} showTime onChange={handleChange} />
        </Flex>
    )
}

export default DateTime
