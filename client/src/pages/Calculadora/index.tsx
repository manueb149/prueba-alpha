import './styles.css'
import { Button, Flex, Form } from "antd"
import { Productos } from "../../components/Productos"
import { DateTime as FechaCreacion } from "../../components/DateTime"
import { Plazo } from "../../components/Plazo"
import { Switcher as Reinversion } from '../../components/Switcher'
import { useStore } from '../../store/store'
import { useFetch } from '../../hooks/useFetch'
import Title from 'antd/es/typography/Title'
import { useState } from 'react'
import { CalculoFecha } from '../../components/CalculoFecha'
import useNotification from '../../hooks/useNotification'
import { CalculadoraForm, CalculoResponse } from '../../models'


/**
 * Componente que controla la vista del cálculo de fechas
 */
export const Calculadora = () => {
    // Para mostrar las notificaciones
    const { notificationApi } = useNotification()

    // Estados para manejar los calculos
    const [mostrarCalculos, setMostrarCalculos] = useState(false)
    const [calculos, setCalculos] = useState<CalculoResponse | null>(null)
    const { producto, fechaCreacion, plazo, enReinversion } = useStore().calculadoraForm

    // Interfaz para llamar a la API
    const { loading, query } = useFetch<CalculoResponse>({ URI: 'inversiones/calculo', init: { method: 'POST' }, autofetch: false })

    const onFinish = (values: CalculadoraForm) => {
        const { producto, fechaCreacion, plazo, enReinversion } = values
        const payload = { producto: producto?.value, plazo, enReinversion, fechaCreacion: fechaCreacion?.format('YYYY-MM-DD HH:mm:ss') }
        query(payload, (response, code) => {
            if (code === 200) {
                setMostrarCalculos(true)
                setCalculos({ ...response, producto: producto?.label, fechaCreacion: payload.fechaCreacion })
            }
            if (code === 401) {
                notificationApi.error({ message: "Sesión caducada. Favor iniciar sesión nuevamente.", duration: 5 });
            }
            if (code === 500) {
                notificationApi.error({ message: "Error al hacer los cálculos.", duration: 3 });
            }
            if (code === 400) {
                notificationApi.error({ message: "Favor validar los parámetros de entrada.", duration: 3 });
            }
        })
    };


    return (
        <section id="calculadora-section">
            <Title style={{ textAlign: 'center' }}>Calculadora de fechas de inversión<br></br>Puesto de Bolsa</Title>
            <Flex vertical gap='15px'>
                <Form
                    name="calculadora-form"
                    initialValues={{ producto, fechaCreacion, plazo, enReinversion }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="producto"
                        rules={[{ required: true, message: 'Favor ingresar un producto.' }]}
                    >
                        <Productos label='Producto' />
                    </Form.Item>
                    <Form.Item
                        name="fechaCreacion"
                        rules={[{ required: true, message: 'Favor ingresar una fecha y hora.' }]}
                    >
                        <FechaCreacion label='Fecha creación' />
                    </Form.Item>
                    <Form.Item
                        name="plazo"
                        rules={[{ required: true, message: 'Favor ingresar un plazo.' }]}
                    >
                        <Plazo label='Plazo de la inversión' />
                    </Form.Item>
                    <Form.Item name="enReinversion">
                        <Reinversion label='Es reinversión?' />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" size='large' loading={loading} iconPosition='end'>
                            Calcular
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
            <CalculoFecha isModalOpen={mostrarCalculos} data={calculos} onOk={() => { setMostrarCalculos(false) }} onCancel={() => { setMostrarCalculos(false) }} />
        </section>
    )
}

export default Calculadora
