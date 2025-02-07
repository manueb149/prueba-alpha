import './styles.css'
import { useEffect } from 'react';
import { Logo } from '../../components/Logo';
import { useStore } from '../../store/store';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useAuthenticate } from '../../hooks/useAuthenticate';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useNotification from '../../hooks/useNotification';
import { LoginForm } from '../../models';

/**
 * Componente que controla el inicio de sesión
 */
export const Login = () => {
    // Para mostrar las notificaciones
    const { notificationApi } = useNotification();

    // Obtener los valores desde el estado global
    const { username, password, remember } = useStore(state => state.loginForm)
    const setAuthenticated = useStore().setAuthenticated

    // Obtener el JTW Token
    const { loading, query, validateLoading, validateQuery } = useAuthenticate()

    // Capturar el envío del formulario del cálculo
    const onFinish = (values: LoginForm) => {
        const { username, password } = values
        const payload = { username, password }

        query(payload, (response, code) => {
            if (code === 200) {
                localStorage.setItem('_jwt', response?.access ?? '')
                setAuthenticated(true)
                notificationApi?.success({
                    message: 'Inicio de sesión correcto!',
                    duration: 3
                })
            }
            if (code === 401) {
                notificationApi?.error({ message: "Favor validar usuario y clave.", duration: 3 });
            }
        })
    };

    // Validar JWT Token (si hay almacenado)
    const validateJWT = () => {
        const token = localStorage.getItem('_jwt')
        if (token) {
            validateQuery({ token }, (_, code) => {
                if (code === 200) {
                    setAuthenticated(true)
                    notificationApi.success({
                        message: 'Sesión validada!',
                        duration: 3
                    })
                }
                if (code === 401) {
                    notificationApi.error({ message: "Sesión caducada. Favor iniciar sesión nuevamente.", duration: 3 });
                }
            })
        }
    }

    useEffect(() => {
        validateJWT()
    }, [])

    const formLoading = loading || validateLoading

    return (
        <>
            <Form
                name="login-container"
                initialValues={{ username, password, remember }}
                onFinish={onFinish}
            >
                <Form.Item style={{ marginBottom: '5px' }}>
                    <Flex justify="center" align="center">
                        <Logo height='auto' />
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Flex justify="center" align="center">
                        <strong>Calculadora de Fechas</strong>
                    </Flex>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Favor ingresar su suario!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Usuario" size='large' disabled={formLoading} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Favor ingresar su clave!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Clave" size='large' disabled={formLoading} />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Recordarme</Checkbox>
                        </Form.Item>
                        <a href="">Olvidé mi clave</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" size='large' loading={formLoading} iconPosition='end'>
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;