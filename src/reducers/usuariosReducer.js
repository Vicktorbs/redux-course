import { CARGANDO, ERROR, TRAER_TOODS } from "../types/usuariosType";

const INITIAL_STATE = {
	usuarios: [],
	cargando: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TOODS:
			return { ...state, usuarios: action.payload, cargando: false };
		case CARGANDO:
			return { ...state, cargando: true };
		case ERROR:
			return { ...state, error: action.payload, cargando: false };
		default: return state;
	};
};