import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  theme?: 'green' | 'gray';
  children: React.ReactNode;
}

export const Button = ({
  onClick,
  theme = 'gray',
  children
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[theme]}`}
    >
      {children}
    </button>
  );
}; 