
export interface BaseAddress {
  AddressLines: string[];
};

export interface UkAddress extends BaseAddress {
  PostCode: string;
};

export interface NonUKAddress extends BaseAddress {
  Country: string;
};

export interface UkAddressWithCountry extends UkAddress {
  Country: string;
};

export interface NonUKAddressWithCountryCode extends NonUKAddress {
  CountryCode: string;
};

export interface BFPOAddress extends BaseAddress {
  BFPONumber: string;
};
