import styles from './Alert.module.css';

type AlertProps = {
  children: React.ReactNode;
}

export default function Alert({ children }: AlertProps) {
  return (
    <p className={styles.alert}>{children}</p>
  )
}
