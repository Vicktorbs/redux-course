import React from 'react';
import { connect } from 'react-redux';
import Fatal from '../general/Fatal';
import Spinner from '../general/Spinner';

const Comentarios = (props) => {

    if (props.com_error) {
        return <Fatal mensaje={ props.com_error } />
    }
    if (props.com_cargando && !props.comentarios.length) {
        return <Spinner />
    }

    const ponerComentatios = () => (
        props.comentarios.map((comentario) => (
            <li key={ comentario.id }>
                <b>
                    <u>
                        { comentario.email }
                    </u>
                </b>
                <br />
                { comentario.body }
            </li>
        ))
    )

    return (
        <ul>
            { ponerComentatios() }
        </ul>
    )
}

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios);