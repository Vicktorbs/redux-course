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
        const { tareas } = this.props
        const por_ususario = {
            ...tareas[useer_id]
        }

        return Object.keys(por_ususario).map((tar_id) => (
            <div key={ tar_id }>
                <input type='checkbox' defaultChecked={ por_ususario[tar_id].completed } />
                {
                    por_ususario[tar_id].title
                }
            </div>
        ))
    }

    render() {
        // console.log(this.props);
        return (
            <div className='margen'>
                <button>
                    <Link to='/tareas/guardar'>
                        Agregar
                    </Link>
                </button>
                { this.mostrarContenido() }
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas);