export function defaultLocation() {
  let longitude = 60.10351605424711,
    latitude = 19.928358848970145;
  return {
    'longitude': longitude,
    'latitude': latitude,
  };
}

export type Countable = {
  name: string;
  count: number;
  description?: string;
}

export type Run = {
  time: number;
  duration: number;
  tempo: number;
  distance: number;
}