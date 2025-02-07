import { Flex, Select } from 'antd';
import { useFetch } from '../../hooks/useFetch';
import { FC } from 'react';
import { Product } from '../../models';

interface Props {
    label?: string;
    value?: number | null;
    onChange?: (value: number, option?: unknown) => void
}

/*
 * Componente para presentar los diferentes productos disponibles.
 */
export const Productos: FC<Props> = ({ label, value, onChange }) => {

    const { data, loading, error } = useFetch<Product[]>({ URI: 'productos', init: { method: 'GET' } })

    return (
        <Flex justify="left" align="left" gap="5px" vertical>
            {label && <span>{label}</span>}
            <Select
                allowClear
                showSearch
                labelInValue
                id='productos'
                size='large'
                style={{ minWidth: '250px' }}
                placeholder="Selecione un producto"
                optionFilterProp="nombre"
                disabled={loading || Boolean(error?.error)}
                fieldNames={{ value: 'id', label: 'nombre' }}
                options={data ?? []}
                onChange={onChange}
                value={value}
            />
        </Flex>
    )
}
