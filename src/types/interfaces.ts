export interface Decontamination {
  _id: string;
  deviceId: string;
  timeInSeconds: number;
  createdAt: Date;
}

export interface PulverizationWeather {
  temperature: number;
  windDirection: string;
  windVelocity: number;
  humidity: number;
  condition: string;
  pressure: number;
  sensation: number;
}

export interface Pulverization {
  _id: string;
  deviceId: string;
  timeInSeconds: number;
  weather: PulverizationWeather;
  createdAt: Date;
}

export interface PulverizationHealthParams {
  deviceId: string;
  city: string;
  state: string;
}

export interface PulverizationHealth {
  deviceId: string;
  isClean: boolean;
  nozzleStatus: "ok" | "nok";
  ph: number;
  weather: PulverizationWeather;
}

export interface PhAndTurbidityTelemetry {
  _id: string;
  deviceId: string;
  isClean: boolean;
  isPulverizing: boolean;
  ph: number;
  tb: number;
}

export interface FlowRateTelemetry {
  _id: string;
  deviceId: string;
  isPulverizing: boolean;
  sensor1: number;
  sensor2: number;
  sensor3: number;
  status: "ok" | "nok";
  sector: string;
}
