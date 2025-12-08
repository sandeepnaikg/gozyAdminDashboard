import { gql } from 'graphql-request';

export const SEARCH_LOCATIONS_QUERY = gql`
  query SearchLocations($subType: String!, $keyword: String!) {
    searchLocations(
      request: {
        subType: $subType
        keyword: $keyword
      }
    ) {
      meta {
        count
        links {
          self
        }
      }
      data {
        type
        subType
        name
        detailedName
        id
        iataCode
        timeZoneOffset
        geoCode {
          latitude
          longitude
        }
        address {
          cityName
          cityCode
          countryName
          countryCode
          stateCode
          regionCode
        }
        analytics {
          travelers {
            score
          }
        }
        self {
          href
          methods
        }
      }
    }
  }
`;

export const SEARCH_FLIGHT_DESTINATIONS_QUERY = gql`
  query SearchFlightDestinations($origin: String!) {
    searchFlightDestinations(request: { origin: $origin }) {
      data {
        origin
        destination
        departureDate
        returnDate
        price {
          total
        }
        links {
          flightDates
          flightOffers
        }
      }
      dictionaries {
        currencies
        locations
      }
      meta {
        currency
        links {
          self
        }
        defaults {
          departureDate
          oneWay
          duration
          nonStop
          viewBy
        }
      }
    }
  }
`;
