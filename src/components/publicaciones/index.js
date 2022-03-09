import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions
const { traerTodos: publicacionesTraerTodos } = publicacionesActions

const Publications = (props) => {
    const params = useParams();
    console.log(props);
    useEffect(() => {
        if (!props.usuariosReducer.usuarios.length) {
            // props.setInitialState()
            props.usuariosTraerTodos()
            props.publicacionesTraerTodos()
        }
    }, [])
    return (
        <div className="margen">
            <h1>Publicaciones de</h1>
            <h2>{params.key}</h2>
        </div>
    );
};

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerTodos
}
export default connect(mapStateToProps, mapDispatchToProps)(Publications);