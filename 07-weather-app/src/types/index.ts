export type Country = {
  code: string;
  name: string;
}

export type Search = {
  country: string;
  city: string;
}

export type Weather = {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number
  }
}