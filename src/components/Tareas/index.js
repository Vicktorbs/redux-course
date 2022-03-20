import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as tareasActions from '../../actions/tareasActions'
import Fatal from '../general/Fatal';
import Spinner from '../general/Spinner';

class Tareas extends Component {
    componentDidMount() {
        if (!Object.keys(this.props.tareas).length) {
            this.props.traerTodas()
        }
    }

    componentDidUpdate() {
        const { tareas, cargando, traerTodas } = this.props;

		if (!Object.keys(tareas).length && !cargando) {
			traerTodas();
		}
    }

    mostrarContenido() {
        const { tareas, cargando, error } = this.props

        if (cargando) {
            return <Spinner />
        }
        if (error) {
            return <Fatal mensaje={ error } />
        }

        return Object.keys(tareas).map((user_id) => (
            <div key={ user_id }>
                <h2>
                    Usuario { user_id }
                </h2>
                <div className='contenedor_tareas'>
                    { this.ponerTareas(user_id) }
                </div>
            </div>
        ))
    }

    ponerTareas = (useer_id) => {
        const { tareas, cambioCheck, eliminar } = this.props
        const por_ususario = {
            ...tareas[useer_id]
        }

        return Object.keys(por_ususario).map((tar_id) => (
            <div key={ tar_id }>
                <input
                    type='checkbox'
                    defaultChecked={ por_ususario[tar_id].completed }
                    onChange={ () => cambioCheck(useer_id, tar_id) }
                    />
                {
                    por_ususario[tar_id].title
                }
                <button className='m_left'>
                    <Link to={`/tareas/guardar/?useer_id=${ useer_id }&tar_id=${ tar_id }`} >
                        Editar
                    </Link>
                </button>
                <button className='m_left' onClick={ () => eliminar(tar_id) }>
                    Eliminar
                </button>
            </div>
        ))
    }

    render() {
        // console.log(this.props);
        // console.log(this.props.tareas);
        return (
            <div className='margen'>
                <button>
                    <Link to='/tareas/guardar'>
                        Agregar
                    </Link>
    // console.log(props);
                </button>
                { this.mostrarContenido() }
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas);