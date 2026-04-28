export type UnitSystem = "metric" | "imperial";

export function cmToFeetIn(cm: number) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches - feet * 12;
  return { ft: feet, in: inches };
}

export function feetInToCm(ft: number, inches: number) {
  const totalInches = ft * 12 + inches;
  return totalInches * 2.54;
}

export function kgToLbs(kg: number) {
  return kg * 2.2046226218;
}

export function lbsToKg(lbs: number) {
  return lbs / 2.2046226218;
}

export function kmToMiles(km: number) {
  return km * 0.6213711922;
}

export function milesToKm(miles: number) {
  return miles / 0.6213711922;
}

export function cToF(c: number) {
  return (c * 9) / 5 + 32;
}

export function fToC(f: number) {
  return ((f - 32) * 5) / 9;
}
