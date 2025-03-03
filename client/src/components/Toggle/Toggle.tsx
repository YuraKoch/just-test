import styles from './Toggle.module.css';

interface ToggleProps {
  isOn: boolean;
  onChange: () => void;
}

export const Toggle = ({ isOn, onChange }: ToggleProps) => {
  return (
    <div
      className={`${styles.toggle} ${isOn ? styles.toggleOn : ''}`}
      onClick={onChange}
    >
      <div className={styles.slider} />
    </div>
  );
}; 