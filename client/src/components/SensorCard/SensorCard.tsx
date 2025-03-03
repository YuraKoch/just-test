import { Sensor } from '../../types/sensor';
import { Toggle } from '../Toggle/Toggle';
import styles from './SensorCard.module.css';

interface SensorCardProps {
  sensor: Sensor;
  onToggleConnection: (id: string) => void;
}

export const SensorCard = ({ sensor, onToggleConnection }: SensorCardProps) => {
  const shouldShowUnit = sensor.unit && !sensor.name.includes('PM');

  return (
    <div className={`${styles.sensorCard}`}>
      <div className={styles.sensorHeader}>
        <Toggle
          isOn={sensor.connected}
          onChange={() => onToggleConnection(sensor.id)}
        />
        <div className={styles.sensorName}>{sensor.name}</div>
        {shouldShowUnit && (<div className={styles.unit}>{sensor.unit}</div>)}
      </div>

      <div className={`${styles.sensorValue} ${!sensor.connected ? styles.disabledValue : ''}`}>
        {sensor.connected ? sensor.value : '...'}
      </div>
    </div>
  );
}; 