import { useState } from 'react'
import { SensorCard } from './components/SensorCard/SensorCard'
import { Button } from './components/Button/Button'
import { useSensors } from './hooks/useSensors'
import styles from './App.module.css'

function App() {
  const { sensors, handleToggleConnection } = useSensors();
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const filteredSensors = showOnlyActive
    ? sensors.filter(sensor => sensor.connected)
    : sensors;

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Button
          onClick={() => setShowOnlyActive(false)}
          theme={!showOnlyActive ? 'green' : 'gray'}
        >
          All sensors
        </Button>
        <Button
          onClick={() => setShowOnlyActive(true)}
          theme={showOnlyActive ? 'green' : 'gray'}
        >
          Active sensors
        </Button>
      </div>
      <div className={styles.sensorGrid}>
        {filteredSensors.map(sensor => (
          <SensorCard
            key={sensor.id}
            sensor={sensor}
            onToggleConnection={handleToggleConnection}
          />
        ))}
        {filteredSensors.length === 0 &&
          <div className={styles.emptyState}>
            No active sensors found
          </div>
        }
      </div>
    </div>
  );
}

export default App;
