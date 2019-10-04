import React, { Component } from "react";
import "./bootstrap.min.css";
import Header from "./components/Header.js";
import NuevaCita from "./components/NuevaCita.js";
import ListaCitas from "./components/ListaCitas.js";

class App extends Component {
  state = {
    citas: []
  };
  //Cuando al app carga
  componentDidMount() {
    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
          citas:JSON.parse(citasLS)
      })
    }

  }
  //cuando agregamos o eliminamos una cita
  componentDidUpdate() {
    localStorage.setItem("citas", JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    //copiar el state actual
    const citas = [...this.state.citas, datos];
    //agregar nuevo
    this.setState({
      citas
    });
  };
  //Elimina las citas del state
  eliminarCita = id => {
    //tomas copia del state antes de modificar hacer una copia del state
    const citasActuales = [...this.state.citas];

    //utilizar filter para sacar el elemento @id
    const citas = citasActuales.filter(cita => cita.id !== id);
    //actualizar el state
    this.setState({
      citas
    });
  };
  render() {
    return (
      <div className="container">
        <Header titulo="Administrador Pacientes Veterinaria" />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas={this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
