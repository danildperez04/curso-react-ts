type AlertProps = {
  children: React.ReactNode;
  type: 'success' | 'error'
}

export default function Alert({ children, type }: AlertProps) {
  const styles = type === 'success' ? 'success' : 'error';
  return (
    <p className={`alert ${styles}`
    }> {children}</p >
  )
}
