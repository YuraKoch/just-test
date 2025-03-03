import { useState, useRef, useEffect } from 'react';
import { Sensor } from '../types/sensor';

export const useSensors = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:5001');

    wsRef.current.onmessage = (event) => {
      const updatedSensor = JSON.parse(event.data);
      setSensors(prev => {
        const existingSensor = prev.find(sensor => sensor.id === updatedSensor.id);
        if (!existingSensor) { return [...prev, updatedSensor]; }
        return prev.map(sensor => sensor.id === updatedSensor.id ? updatedSensor : sensor);
      });
    };

    return () => wsRef.current?.close();
  }, []);

  const handleToggleConnection = (id: string) => {
    const sensor = sensors.find(s => s.id === id);
    if (!sensor || !wsRef.current) return;

    const command = sensor.connected ? 'disconnect' : 'connect';
    wsRef.current.send(JSON.stringify({ command, id }));
  };

  return {
    sensors,
    handleToggleConnection
  };
}; 