import { useState } from "react";
import Mensaje from "./Mensaje";

export const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsvalidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");
  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!presupuesto || Number(presupuesto) < 0) {
      setMensaje("No es un presupuesto valido");
      return;
    }

    setMensaje("");
    setIsvalidPresupuesto(true);
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};
