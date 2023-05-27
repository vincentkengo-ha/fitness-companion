// HÅ norra
export function defaultLocation() {
  const longitude = 60.10351605424711,
    latitude = 19.928358848970145;
  return {
    longitude: longitude,
    latitude: latitude,
  };
}

// DD-MM-YYYY HH:MM:SS
export function formatTime(today: any) {
  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
}

export type Countable = {
  name: string;
  count: number;
  description?: string;
};

export type Run = {
  time: string;
  duration: number;
  tempo: number;
  distance: number;
};
