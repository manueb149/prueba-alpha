
import './AppLayout.styles.css'
import { Login } from '../pages/Login'
import { ConfigProvider, Flex, Space } from 'antd';
import { Calculadora } from '../pages/Calculadora';
import { useStore } from '../store/store';
import { Logo } from '../components/Logo';
import { CSSProperties } from 'react';
import useNotification from '../hooks/useNotification';

/**
 * Componente que controla las vista del SPA
 */
const AppLayout = () => {

    const { notificationContext } = useNotification();
    const authenticated = useStore().authenticated
    const logoStyle: CSSProperties = { position: 'absolute', left: '1%', top: '1%' }

    return (
        <main id="app-container">
            {notificationContext}
            {authenticated && <Logo style={logoStyle} />}
            <ConfigProvider
                theme={{
                    token: {
                        borderRadius: 8,
                        colorPrimary: '#2E58EB',
                        colorBgContainer: '#ffffff',
                    },
                }}
            >
                <Space>
                    <Flex align='center' justify='center' vertical gap="20px">
                        {authenticated ? <Calculadora /> : <Login />}
                    </Flex>
                </Space>
            </ConfigProvider>
        </main>
    )
}

export default AppLayout
