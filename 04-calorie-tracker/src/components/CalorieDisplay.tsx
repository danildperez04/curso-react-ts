type CalorieDisplayProps = {
  title: string;
  calories: number;
}

export function CalorieDisplay({ title, calories }: CalorieDisplayProps) {
  return (
    <p className="text-center text-white font-bold rounded-full grid grid-cols-1 gap-3">
      <span className="font-black text-6xl text-orange">
        {calories}
      </span>
      {title}
    </p>
  )
}
