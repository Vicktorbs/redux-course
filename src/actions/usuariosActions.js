import axios from 'axios';
import { TRAER_TOODS } from '../types/usuariosType';

export const traerTodos = () => async (dispatch) => {
	try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: TRAER_TOODS,
            payload: respuesta.data
        })
    } catch (error) {
        console.error('Error: ', error.message);
    }
};