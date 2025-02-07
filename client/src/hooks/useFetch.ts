import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { ErrorResponse } from "../models";

// API BASE URL
const API_URL: string = import.meta.env.VITE_API_URL;

interface Props {
	URI: string;
	init?: RequestInit;
	payload?: unknown;
	autofetch?: boolean;
}

/**
 *  Custom Hook para hacer las peticiones a la API
 */
export const useFetch = <T>({ URI, init, payload, autofetch = true }: Props) => {
	const [data, setData] = useState<T | null>(null);
	const [code, setCode] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<ErrorResponse | null>({ message: "", error: null });
	const setAuthenticated = useStore().setAuthenticated;

	const handleFetch = async (payloadQuery?: unknown, cb?: (response: T | null, code?: number) => void) => {
		// Construimos las propiedades del request
		const initObject: RequestInit = {
			...init,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
				"Content-Type": "application/json",
			},
		};

		// Revisamos si hay payload por enviar
		if (payload) {
			initObject.body = JSON.stringify(payload);
		}
		if (payloadQuery) {
			initObject.body = JSON.stringify(payloadQuery);
		}

		try {
			setLoading(true);

			const response = await fetch(`${API_URL}${URI}`, initObject);

			// Revisamos si algun request no esta autorizado para hacer logout
			if (response.status === 401) {
				localStorage.removeItem("_jwt");
				setAuthenticated(false);
			}

			if (!response.ok) {
				if (cb) cb(null, response.status);
				throw new Error(response.statusText);
			}

			const data = (await response.json()) as T;

			// Asignamos la información recibida
			if (cb) cb(data, response.status);
			setData(data);
			setCode(response.status);
			setLoading(false);
			setError({ message: "", error: null });
		} catch (error) {
			if (cb) cb(null);
			setData(null);
			setCode(null);
			setLoading(false);
			setError({ message: "Error cargando los productos", error });
		}
	};

	useEffect(() => {
		if (autofetch) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [URI]);

	// Retornamos la información recibida
	return { data, loading, error, code, query: handleFetch };
};
