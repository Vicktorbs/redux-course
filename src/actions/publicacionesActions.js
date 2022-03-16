import axios from "axios";
import { CARGANDO, ERROR, TRAER_POR_USUARIO } from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosType"

const { TRAER_TOODS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO
    })

    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id

    try {
        const respuesta = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${ usuario_id }`);

        const publicaciones_actualizadas = [
            ...publicaciones,
            respuesta.data
        ]

        const publicaciones_key = publicaciones_actualizadas.length - 1
        const usuarios_actualizados = [...usuarios]

        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }

        dispatch({
            type: TRAER_POR_USUARIO,
            payload: publicaciones_actualizadas
        })

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles'
        })
    }
}