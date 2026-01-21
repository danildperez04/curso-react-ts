import { usePatientStore } from "../store/patient"
import PatientDetails from "./PatientDetails";

export default function PatientList() {
  const { patients } = usePatientStore();

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {
        patients.length === 0
          ? <>
            <h2 className="font-black text-3xl text-center">No hay pacientes registrados</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {''}
              <span className="text-indigo-600 font-bold"> y apareceran en este lugar</span>
            </p>
          </>
          : <>
            <h2 className="text-3xl text-center font-black">Lista de Pacientes</h2>
            <p className="text-xl text-center mt-5 mb-10">
              Administra tus {''}
              <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>
            {
              patients.map(patient => (
                <PatientDetails key={patient.id} patient={patient} />
              ))
            }
          </>
      }
    </div>
  )
}
