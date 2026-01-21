type ErrorProps = {
  children: React.ReactNode;
}

export default function Error({ children }: ErrorProps) {
  return (
    <p className="text-red-500 text-sm text-center font-bold p-2 uppercase">
      {children}
    </p>
  )
}
