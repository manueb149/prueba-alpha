import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

let notificationApi: NotificationInstance;
let notificationContext: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;

/**
 *  Custom Hook para mostrar las notificaciones
 */
const useNotification = () => {
	const [api, context] = notification.useNotification();

	// Creamos un singleton hook para usarlo en toda la app
	if (!notificationApi || !notificationContext) {
		notificationApi = api;
		notificationContext = context;
	}

	return { notificationApi, notificationContext };
};

export default useNotification;
