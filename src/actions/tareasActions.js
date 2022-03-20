import axios from 'axios';
import { CARGANDO, ERROR, TRAER_TODAS, CAMBIO_TITULO, CAMBIO_USUARIO, GUARDAR, ACTUALIZAR } from '../types/tareasTypes';

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

export const cambioUsuarioId = (valor) => (dispatch) => {
    dispatch({
        type: CAMBIO_USUARIO,
        payload: valor
    })
}

export const cambioTitulo = (valor) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: valor
    })
}

export const agregar = (nueva_tarea) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try {
		const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
		dispatch({
			type: GUARDAR
        });
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'

		});
	}
}

export const editar = (tarea_editada) => async (dispatch) => {
    console.log(tarea_editada);
    dispatch({
        type: CARGANDO
    })

    try {
		const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${ tarea_editada.id }`, tarea_editada);
		dispatch({
			type: GUARDAR
        });
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'

		});
	}
}
export const cambioCheck = (useer_id, tar_id) => (dispatch, getState) => {
    const { tareas } = getState().tareasReducer;
    const seleccionada = tareas[useer_id][tar_id]

    const actualiadas = {
        ...tareas
    }
    actualiadas[useer_id] = {
        ...tareas[useer_id]
    }
    actualiadas[useer_id][tar_id] = {
        ...tareas[useer_id][tar_id],
        completed: !seleccionada.completed
    }

    dispatch({
        type: ACTUALIZAR,
        payload: actualiadas
    })
}