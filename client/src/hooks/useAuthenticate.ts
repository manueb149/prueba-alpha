import { AuthResponse, ValidateResponse } from "../models";
import { useFetch } from "./useFetch";

/**
 *  Custom Hook para autenticar al usuario
 */
export const useAuthenticate = () => {
	const { data, loading, query } = useFetch<AuthResponse>({ URI: "auth/login", autofetch: false, init: { method: "POST" } });

	const {
		code: validateCode,
		loading: validateLoading,
		query: validateQuery,
	} = useFetch<ValidateResponse>({ URI: "auth/validate", autofetch: false, init: { method: "POST" } });

	return { data, loading, validateCode, validateLoading, query, validateQuery };
};

export default useAuthenticate;
