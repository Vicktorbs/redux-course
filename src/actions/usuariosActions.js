import axios from 'axios';
import { CARGANDO, ERROR, TRAER_TOODS } from '../types/usuariosType';

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
	try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: TRAER_TOODS,
            payload: respuesta.data
        })
    } catch (error) {
        console.error('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
};