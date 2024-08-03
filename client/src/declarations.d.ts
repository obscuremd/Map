declare module 'use-react-countries' {
    export interface Country {
      name: string;
      code: string;
      flag: string;
      dialCode: string;
    }
  
    export function useCountries(): {
      countries: Country[];
    };
  }