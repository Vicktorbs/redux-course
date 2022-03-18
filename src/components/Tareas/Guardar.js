import React, { Component } from 'react';

class Guardar extends Component {
    render() {
        return (
            <div className='margen'>
                <h1>
                    Guardar tarea
                </h1>
                <div className='inputContainer'>
                    <label>Usuario id:</label>
                    <input type='number' />
                </div>
                <div className='inputContainer'>
                    <label>Titulo:</label>
                    <input type='text' />
                </div>
                <button>
                    Guardar
                </button>
            </div>
        );
    }
}

export default Guardar;