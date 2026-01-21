import type { Patient } from "../types"
import { formatDate } from "../utils";
import PatientDetailItem from "./PatientDetailItem";
import { usePatientStore } from "../store/patient";
import { toast } from "react-toastify";

type PatientDetailsProps = {
  patient: Patient;
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
  const { removePatient, setActiveId } = usePatientStore();

  const handleClick = () => {
    removePatient(patient.id)
    toast.warn('Paciente eliminado');
  }

  return (
    <div className="mx-5 my-10 py-10 bg-white rounded-xl shadow-md p-4">
      <PatientDetailItem label="ID" value={patient.id} />
      <PatientDetailItem label="Nombre" value={patient.name} />
      <PatientDetailItem label="Propietario" value={patient.caretaker} />
      <PatientDetailItem label="Email" value={patient.email} />
      <PatientDetailItem label="Fecha de Alta" value={formatDate(patient.date)} />
      <PatientDetailItem label="Síntomas" value={patient.symptoms} />
      <div className="flex flex-col gap-3 lg:flex-row justify-between mt-10">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg cursor-pointer"
          onClick={() => { setActiveId(patient.id) }}
        >Editar</button>
        <button
          className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg cursor-pointer"
          onClick={handleClick}
        >Eliminar</button>
      </div>
    </div>
  )
}
