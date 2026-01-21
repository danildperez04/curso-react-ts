import { create } from 'zustand';
import type { DraftPatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type PatientState = {
  patients: Patient[];
  addPatient: (data: DraftPatient) => void;
  removePatient: (id: Patient['id']) => void;
  activeId: Patient['id'];
  setActiveId: (id: Patient['id']) => void;
  updatePatient: (data: DraftPatient) => void;
}

const createPatient = (data: DraftPatient): Patient => ({
  id: uuidv4(),
  ...data
})

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        addPatient: (data) => {
          set((state) => ({
            patients: [...state.patients, createPatient(data)],
          }));
        },
        removePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter(patient => patient.id !== id),
          }))
        },
        activeId: '',
        setActiveId: (id) => {
          set(() => ({
            activeId: id,
          }))
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map(
              patient => patient.id === state.activeId
                ? { ...patient, ...data }
                : patient
            ),
            activeId: '',
          }))
        }
      }),
      {
        name: 'patient-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
);