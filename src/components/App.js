import React from 'react';

const App = () => {

  const ponerFilas = () => [
    <tr>
      <td>
        Victor
      </td>
      <td>
        viktorb.132@gmail.com
      </td>
      <td>
        viktorbs.io
      </td>
    </tr>,
    <tr>
      <td>
        Platzi
      </td>
      <td>
        platzi@gmail.com
      </td>
      <td>
        platzi.com
      </td>
    </tr>
  ]

  return (
    <div className='margen'>
        <table className='tabla'>
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          { ponerFilas() }
        </tbody>
      </table>
    </div>
  )
}

export default App