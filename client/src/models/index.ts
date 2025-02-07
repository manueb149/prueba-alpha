import { Dayjs } from "dayjs";

export interface Product {
	id: number;
	nombre: string;
	fecha_creacion: string;
}

export interface LoginForm {
	username: string;
	password: string;
	remember: boolean;
}

export interface CalculadoraForm {
	producto?: { label: string; value: string | number } | null;
	fechaCreacion?: Dayjs | null;
	plazo?: number | null;
	enReinversion?: boolean;
}

export interface CalculoResponse {
	producto?: string;
	fechaCreacion?: string;
	fechaInicio?: string;
	fechaFin?: string;
	plazoReal?: number;
	plazo?: number;
}

export interface AuthResponse {
	refresh?: string;
	access?: string;
	detail?: string;
}

export interface ValidateResponse {
	code?: string;
	detail?: string;
}

export interface ErrorResponse {
	message: string;
	error: unknown;
}
