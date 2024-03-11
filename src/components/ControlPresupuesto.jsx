import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ presupuesto, setPresupuesto, gastos, setGastos, setIsvalidPresupuesto }) => {
  const [procentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const cantidad = (cantidadP) => {
    return cantidadP.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApplication = () => {
      const salir = confirm("Are you sure you want to reset?");
      if (salir){
        setGastos([]);
      setPresupuesto(0);
      setIsvalidPresupuesto(false);
      }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: procentaje > 100 ? '#dc2626' : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: procentaje > 100 ? '#dc2626' : "#3B82F6"
          })}
          value={procentaje}
          text={`${procentaje} % Gastados`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app"
        type="button"
        onClick={handleResetApplication}>Resetear app</button>
        <p>
          <span>Presupuesto:</span> C{cantidad(presupuesto)}{" "}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible:</span> C{cantidad(disponible)}{" "}
        </p>
        <p>
          <span>Gastado:</span> C{cantidad(gastado)}{" "}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
