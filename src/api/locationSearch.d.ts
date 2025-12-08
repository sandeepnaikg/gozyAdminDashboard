// Type definitions for locationSearch.js

export interface Location {
  id: string;
  name: string;
  displayText: string;
  detailedName?: string;
  countryName?: string;
  iataCode?: string;
}

export interface FlightDestination {
  destination: string;
  destinationName: string;
  price: number;
  departureDate: string;
}

export interface FlightDestinationsResponse {
  data: Array<{
    type: string;
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    price: {
      total: string;
    };
    links: {
      flightDates: string;
      flightOffers: string;
    };
  }>;
  dictionaries?: {
    locations?: Record<string, {
      cityCode: string;
      countryCode: string;
    }>;
  };
}

export function searchAirports(query: string): Promise<Array<{
  id: string;
  name: string;
  iataCode: string;
  address: {
    cityName: string;
    countryName: string;
  };
}>>;

export function searchCities(query: string): Promise<Array<{
  id: string;
  name: string;
  iataCode: string;
  address: {
    cityName: string;
    countryName: string;
  };
}>>;

export function formatLocation(location: {
  id: string;
  name: string;
  iataCode?: string;
  address?: {
    cityName?: string;
    countryName?: string;
  };
}): Location;

export function searchFlightDestinations(originIataCode: string): Promise<FlightDestinationsResponse>;

export function formatFlightDestination(
  dest: FlightDestinationsResponse['data'][0],
  locationsDict: Record<string, { cityCode: string; countryCode: string }>
): FlightDestination;
