import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'
import Comentarios from "./Comentarios";

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions
const { traerPorUsuario : publicacionesTraerPorUsuarios, abrirCerrar, traerComentarios } = publicacionesActions

const Publications = (props) => {
    const params = useParams();
    // console.log(props);q
    useEffect(() => {
        async function reducersCall() {
            if (!props.usuariosReducer.usuarios.length) {
                // props.setInitialState()
                await props.usuariosTraerTodos()
            }
            if (props.usuariosReducer.error) {
                return;
            }
            if (!('publicaciones_key' in props.usuariosReducer.usuarios[params.key])) {
                await props.publicacionesTraerPorUsuarios(params.key)
            }
        }
        reducersCall()
    }, [])

    const ponerUsuario = () => {
        if (props.usuariosReducer.error) {
            return <Fatal mensaje={ props.usuariosReducer.error } />
        }
        if (props.usuariosReducer.cargando) {
        // if (props.usuariosReducer.usuarios.length || props.usuariosReducer.cargando) {
            return <Spinner />
        }
        const nombre = props.usuariosReducer.usuarios[params.key].name || ''
        return (
            <h1>Publicaciones de { nombre }</h1>
        )
    }

    const ponerPublicaciones = () => {
        if (!props.usuariosReducer.usuarios) return;
        if (props.usuariosReducer.error) return;
        if (props.publicacionesReducer.cargando) {
            return <Spinner />
        }
        if (props.publicacionesReducer.error) {
            return <Fatal mensaje={ props.publicacionesReducer.error } />
        }
        if (!props.publicacionesReducer.publicaciones.length) return;
        if (!('publicaciones_key' in props.usuariosReducer.usuarios[params.key])) return;

        // console.log(props.usuariosReducer.usuarios[params.key]);
        const { publicaciones_key } = props.usuariosReducer.usuarios[params.key]
        return mostrarInfo(publicaciones_key)
    }

    const mostrarInfo = (publicaciones_key) => (
        props.publicacionesReducer.publicaciones[publicaciones_key].map((publicacion, com_key) => (
			<div
				key={publicacion.id}
				className='pub_titulo'
				onClick={ ()=> mostrarComentarios(publicaciones_key, com_key, publicacion.comentarios) }
			>
				<h2>
					{ publicacion.title }
				</h2>
				<h3>
					{ publicacion.body }
				</h3>
                {
                    (publicacion.abierto) ? <Comentarios comentarios={ publicacion.comentarios } /> : ''
                }
			</div>
		))
    )

    const mostrarComentarios = (publicaciones_key, com_key, comentarios) => {
        // console.log('comentarios', comentarios);
        props.abrirCerrar(publicaciones_key, com_key)
        if (!comentarios.length) {
            props.traerComentarios(publicaciones_key, com_key)
        }
    }

    return (
        <div className="margen">
            { ponerUsuario() }
            { ponerPublicaciones() }
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
    publicacionesTraerPorUsuarios,
    abrirCerrar,
    traerComentarios
}
export default connect(mapStateToProps, mapDispatchToProps)(Publications);