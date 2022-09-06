export type header_props = {
  currentIconURL: string
}

export type localization_coordinates = {
  lat: number,
  lon: number
}

export type getInformationParams = {
  type: "current" | "5days"
}

export type place_extended_information = {
  [name: string]: place_information
}

export type store_initial_information = {
  current: place_extended_information,
  future: future_place_information[],
  localCurrentPlace: string,
}

export type future_place_information = {
  dt: number,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  clouds: {
    all: number
  },
  wind: {
    speed: number,
    deg: number,
    gust: number
  },
  visibility: number,
  pop: number,
  rain: {
    "3h": number
  },
  sys: {
    pod: string
  },
  dt_txt: string
}

export type place_information = {
  base: string,
  clouds: {
    all: number
  },
  cod: number,
  coord: {
    lat: number,
    lon: number
  },
  dt: number,
  id: number,
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number
  },
  name: string,
  sys: {
    country: string,
    id: number,
    sunrise: number,
    sunset: number,
    type: number
  },
  timezone: number,
  visibility: number,
  weather: [
    {
      description: string,
      icon: string,
      id: number,
      main: string
    }
  ],
  wind: {
    deg: number,
    speed: number
  }
}