import {CarProps, FilterProps} from "@/types";

export const fetchCars = async (filters: FilterProps) => {
  const {manufacturer, year, fuel, limit, model} = filters;
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&limit=${limit}&fuel_type=${fuel}&year=${year}`;
  const headers = {
    "X-RapidAPI-Key": "3a9f277899mshcff789229f9f4fap1518fbjsn8abd2cc587b1",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com"
  };
  try {
    const response = await fetch(url, {
      headers
    });
    const res = await response.json();
    console.log("=========");
    console.log(res);
    console.log("=========");
    return res;
  } catch (error) {
    console.log("in error");
    console.error(error);
  }
};

export const genCarImageUrl = (car: CarProps, angle?: string) => {
  //KEY: hrjavascript-mastery
  const url = new URL("https://cdn.imagin.studio/getimage");

  const {make, year, model} = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  console.log(url);
  return `${url}`;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParam = new URLSearchParams(window.location.search);
  searchParam.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParam.toString()}`;

  return newPathname;
};
