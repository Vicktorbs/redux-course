import { TRAER_TOODS } from "../types/usuariosType";

const INITIAL_STATE = {
	usuarios: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_TOODS:
			return { ...state, usuarios: action.payload };

		default: return state;
	};
};