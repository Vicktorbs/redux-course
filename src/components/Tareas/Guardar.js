import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fatal from '../general/Fatal';
import Spinner from '../general/Spinner';
import { Navigate } from "react-router-dom";
import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {
	componentDidMount() {
		const queryParams = new URLSearchParams(window.location.search);
		const useer_id = queryParams.get('useer_id');
		const tar_id = queryParams.get('tar_id');
		const {
			// match: { params: { useer_id, tar_id } },
			tareas,
			cambioUsuarioId,
			cambioTitulo
		} = this.props;
		// console.log(useer_id, tar_id);

		if (useer_id && tar_id) {
			const tarea = tareas[useer_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title);
		}
	}
	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
	};

	guardar = () => {
		const queryParams = new URLSearchParams(window.location.search);
		const useer_id = queryParams.get('useer_id');
		const tar_id = queryParams.get('tar_id');
		const { tareas, usuario_id, titulo, agregar, editar } = this.props
		const nueva_tarea = {
			userId: usuario_id,
			title: titulo,
			completed: false
		}

		if (useer_id && tar_id) {
			const tarea = tareas[useer_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			}
			editar(tarea_editada)
		} else {
			agregar(nueva_tarea)
		}
	}

	deshabilitar = () => {
		const { usuario_id, titulo, cargando } = this.props

		if (cargando) {
			return true
		}
		if (!usuario_id || !titulo) {
			return true
		}
		return false
	}

	mostrarAccion = () => {
		const { cargando, error } = this.props

		if (cargando) {
			return <Spinner />
		}
		if (error) {
			return <Fatal mensaje={ error } />
		}
	}

	render() {
		return (
			<div className='margen'>
				{
					(this.props.regresar) ? <Navigate to='/tareas' /> : ''
				}
				<h1>Guardar Tarea</h1>
				Usuario id:
				<input
					type='number'
					value={ this.props.usuario_id }
					onChange={ this.cambioUsuarioId }
				/>
				<br /><br />
				Título:
				<input
					value={ this.props.titulo }
					onChange={ this.cambioTitulo }
				/>
				<br /><br />
				<button onClick={ this.guardar } disabled={ this.deshabilitar() } >
					Guardar
				</button>
				{ this.mostrarAccion() }
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);