import './styles.css'
import { FC } from "react"
import { Empty, Modal } from "antd"
import Title from 'antd/es/typography/Title';
import { CalculoResponse } from '../../models';

interface Props {
    data?: CalculoResponse | null;
    isModalOpen?: boolean
    onOk?: ((e: React.MouseEvent<HTMLButtonElement>) => void)
    onCancel?: ((e: React.MouseEvent<HTMLButtonElement>) => void)
}

const showDiasText = (dias?: number) => {
    const number = dias ?? 0
    return number == 1 ? `${number} Día` : `${number} Días`
}

/*
 * Componente para presentar el cálculo de fechas y plazo real.
 */
export const CalculoFecha: FC<Props> = ({ data, isModalOpen, onOk, onCancel }) => {
    return (
        <Modal centered title={<Title level={3} style={{ textAlign: 'center' }}>Resultado de los Cálculos</Title>} open={isModalOpen} onOk={onOk} onCancel={onCancel}>
            {data ? <div className='modal-body-wrapper'>
                <p className="modal-body"><strong>Producto:</strong> {data?.producto}</p>
                <p className="modal-body"><strong>Fecha de Creación:</strong> {data?.fechaCreacion}</p>
                <p className="modal-body"><strong>Fecha de Inicio:</strong> {data?.fechaInicio}</p>
                <p className="modal-body"><strong>Fecha de Fin:</strong> {data?.fechaFin}</p>
                <p className="modal-body"><strong>Plazo Real:</strong> {showDiasText(data?.plazoReal)}</p>
                <p className="modal-body"><strong>Plazo solicitato:</strong> {showDiasText(data?.plazo)}</p>
            </div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Modal>
    )
}
