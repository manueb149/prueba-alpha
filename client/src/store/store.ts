import dayjs from "dayjs";
import { create } from "zustand";
import { CalculadoraForm, LoginForm } from "../models";

interface LoginFormState {
	loginForm: LoginForm;
	setLoginForm: (data: LoginFormState["loginForm"]) => void;
}

interface CalculadoraFormState {
	calculadoraForm: CalculadoraForm;
	setCalculadoraForm: (data: CalculadoraFormState["calculadoraForm"]) => void;
}

interface AuthenticationState {
	authenticated: boolean;
	setAuthenticated: (data: AuthenticationState["authenticated"]) => void;
}

type Store = LoginFormState & CalculadoraFormState & AuthenticationState;

/**
 * Store para manejar el estado globalmente
 */
export const useStore = create<Store>((set) => ({
	authenticated: false,
	loginForm: {
		username: "",
		password: "",
		remember: false,
	},
	calculadoraForm: {
		producto: null,
		fechaCreacion: dayjs().hour(9).minute(0).second(0),
		plazo: 30,
		enReinversion: false,
	},
	setAuthenticated: (data) => set(() => ({ authenticated: data })),
	setLoginForm: (data) => set((state) => ({ loginForm: { ...state.loginForm, ...data } })),
	setCalculadoraForm: (data) => set((state) => ({ calculadoraForm: { ...state.calculadoraForm, ...data } })),
}));
