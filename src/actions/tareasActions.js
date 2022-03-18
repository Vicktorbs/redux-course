import axios from 'axios';
import { CARGANDO, ERROR, TRAER_TODAS } from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
	try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

        const tareas = {}
        respuesta.data.map((tar) => (
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        ))

        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    } catch (error) {
        console.error('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: 'Informacion de tareas no disponible'
        })
    }
};