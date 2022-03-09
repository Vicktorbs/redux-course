import { CARGANDO, ERROR, TRAER_TOODS } from "../types/publicacionesTypes";
import axios from "axios";

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('http://jsonplaceholder.typicode.com/posts')
        dispatch({
            type: TRAER_TOODS,
            payload: respuesta.data
        })
    } catch (error) {
        console.error('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: 'Algo salio mal, intente mas tarde'
        })
    }
}