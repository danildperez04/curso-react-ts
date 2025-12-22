import { useMemo } from "react";
import type { Activity } from "../types"
import { CalorieDisplay } from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
}

export function CalorieTracker({ activities }: CalorieTrackerProps) {
  // Contadores

  // Calorias consumidas (categoria 1)
  const consumedCalories = useMemo(
    () => activities.reduce(
      (total, activity) => activity.category === 1
        ? (total + activity.calories)
        : total,
      0),
    [activities]);

  // Calorias quemadas (categoria 2)
  const burnedCalories = useMemo(
    () => activities.reduce(
      (total, activity) =>
        activity.category === 2
          ? (total + activity.calories)
          : total,
      0),
    [activities]);

  const difference = useMemo(() => consumedCalories - burnedCalories, [consumedCalories, burnedCalories]);

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>
      <div className="flex flex-col items-center md:flex-row md: justify-between gap-5 mt-10">
        <CalorieDisplay
          title="Consumidas"
          calories={consumedCalories}
        />
        <CalorieDisplay
          title="Diferencia"
          calories={difference}
        />
        <CalorieDisplay
          title="Quemadas"
          calories={burnedCalories}
        />
      </div>
    </>
  )
}
