import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit["headers"]
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type IArea = {
  __typename?: "Area";
  city: ICity;
  id: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
};

export type ICategory = {
  __typename?: "Category";
  children?: Maybe<Array<ICategory>>;
  createdAt: Scalars["DateTime"];
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  parentCategory?: Maybe<ICategory>;
  slug: Scalars["String"];
  sort: Scalars["Int"];
  title: Scalars["String"];
  titleEn?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  vocabulary: IVocabulary;
};

export type ICity = {
  __typename?: "City";
  areas: Array<IArea>;
  id: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  parentCity: ICity;
  province: IProvince;
  slug: Scalars["String"];
  sort: Scalars["Int"];
  type: Scalars["Float"];
};

export type ICountry = {
  __typename?: "Country";
  alphaTwo: Scalars["String"];
  id: Scalars["Int"];
  isActive: Scalars["Boolean"];
  iso: Scalars["String"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  phonePrefix: Scalars["String"];
  provinces?: Maybe<Array<IProvince>>;
  sort: Scalars["Int"];
};

export type ICreateAreaInput = {
  cityId: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
};

export type ICreateCategoryInput = {
  icon?: InputMaybe<Scalars["String"]>;
  parentCategoryId?: InputMaybe<Scalars["Int"]>;
  slug: Scalars["String"];
  sort?: InputMaybe<Scalars["Int"]>;
  title: Scalars["String"];
  titleEn?: InputMaybe<Scalars["String"]>;
  vocabularyId: Scalars["Int"];
};

export type ICreateCityInput = {
  isActive: Scalars["Boolean"];
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  parentCityId: Scalars["Int"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
  type: Scalars["Float"];
};

export type ICreateCountryInput = {
  alphaTwo: Scalars["String"];
  isActive: Scalars["Boolean"];
  iso: Scalars["String"];
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  phonePrefix: Scalars["String"];
  sort: Scalars["Int"];
};

export type ICreateProvinceInput = {
  countryId: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  path: Scalars["String"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
};

export type ICreateVocabularyInput = {
  /** Example field (placeholder) */
  exampleField: Scalars["Int"];
};

export type IMutation = {
  __typename?: "Mutation";
  createArea: IArea;
  createCategory: ICategory;
  createCity: ICity;
  createCountry: ICountry;
  createProvince: IProvince;
  createVocabulary: IVocabulary;
  removeArea: IArea;
  removeCategory: ICategory;
  removeCity: ICity;
  removeCountry: ICountry;
  removeProvince: IProvince;
  removeVocabulary: IVocabulary;
  updateArea: IArea;
  updateCategory: ICategory;
  updateCity: ICity;
  updateCountry: ICountry;
  updateProvince: IProvince;
  updateVocabulary: IVocabulary;
};

export type IMutationCreateAreaArgs = {
  createAreaInput: ICreateAreaInput;
};

export type IMutationCreateCategoryArgs = {
  createCategoryInput: ICreateCategoryInput;
};

export type IMutationCreateCityArgs = {
  createCityInput: ICreateCityInput;
};

export type IMutationCreateCountryArgs = {
  createCountryInput: ICreateCountryInput;
};

export type IMutationCreateProvinceArgs = {
  createProvinceInput: ICreateProvinceInput;
};

export type IMutationCreateVocabularyArgs = {
  createVocabularyInput: ICreateVocabularyInput;
};

export type IMutationRemoveAreaArgs = {
  id: Scalars["Int"];
};

export type IMutationRemoveCategoryArgs = {
  id: Scalars["Int"];
};

export type IMutationRemoveCityArgs = {
  id: Scalars["Int"];
};

export type IMutationRemoveCountryArgs = {
  id: Scalars["Int"];
};

export type IMutationRemoveProvinceArgs = {
  id: Scalars["Int"];
};

export type IMutationRemoveVocabularyArgs = {
  id: Scalars["Int"];
};

export type IMutationUpdateAreaArgs = {
  updateAreaInput: IUpdateAreaInput;
};

export type IMutationUpdateCategoryArgs = {
  updateCategoryInput: IUpdateCategoryInput;
};

export type IMutationUpdateCityArgs = {
  updateCityInput: IUpdateCityInput;
};

export type IMutationUpdateCountryArgs = {
  updateCountryInput: IUpdateCountryInput;
};

export type IMutationUpdateProvinceArgs = {
  updateProvinceInput: IUpdateProvinceInput;
};

export type IMutationUpdateVocabularyArgs = {
  updateVocabularyInput: IUpdateVocabularyInput;
};

export type IProvince = {
  __typename?: "Province";
  cities: Array<ICity>;
  country: ICountry;
  id: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  path: Scalars["String"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
};

export type IQuery = {
  __typename?: "Query";
  area: IArea;
  category: ICategory;
  city: ICity;
  countries: Array<ICountry>;
  country: ICountry;
  province: IProvince;
  vocabulary: IVocabulary;
};

export type IQueryAreaArgs = {
  id: Scalars["Int"];
};

export type IQueryCategoryArgs = {
  id: Scalars["Int"];
};

export type IQueryCityArgs = {
  id: Scalars["Int"];
};

export type IQueryCountryArgs = {
  id: Scalars["Int"];
};

export type IQueryProvinceArgs = {
  id: Scalars["Int"];
};

export type IQueryVocabularyArgs = {
  id: Scalars["Int"];
};

export type IUpdateAreaInput = {
  cityId?: InputMaybe<Scalars["Int"]>;
  id: Scalars["Int"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  nameEn?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["Int"]>;
};

export type IUpdateCategoryInput = {
  icon?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  parentCategoryId?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Scalars["String"]>;
  titleEn?: InputMaybe<Scalars["String"]>;
  vocabularyId?: InputMaybe<Scalars["Int"]>;
};

export type IUpdateCityInput = {
  id: Scalars["Int"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  nameEn?: InputMaybe<Scalars["String"]>;
  parentCityId?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["Int"]>;
  type?: InputMaybe<Scalars["Float"]>;
};

export type IUpdateCountryInput = {
  alphaTwo?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  iso?: InputMaybe<Scalars["String"]>;
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  nameEn?: InputMaybe<Scalars["String"]>;
  phonePrefix?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["Int"]>;
};

export type IUpdateProvinceInput = {
  countryId?: InputMaybe<Scalars["Int"]>;
  id: Scalars["Int"];
  isActive?: InputMaybe<Scalars["Boolean"]>;
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  nameEn?: InputMaybe<Scalars["String"]>;
  path?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["Int"]>;
};

export type IUpdateVocabularyInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars["Int"]>;
  id: Scalars["Int"];
};

export type IVocabulary = {
  __typename?: "Vocabulary";
  categories?: Maybe<Array<ICategory>>;
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
  title: Scalars["String"];
  titleEn: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type IGetAllCountriesQueryVariables = Exact<{ [key: string]: never }>;

export type IGetAllCountriesQuery = {
  __typename?: "Query";
  countries: Array<{
    __typename?: "Country";
    id: number;
    name: string;
    alphaTwo: string;
    nameEn: string;
  }>;
};

export const GetAllCountriesDocument = `
    query GetAllCountries {
  countries {
    id
    name
    alphaTwo
    nameEn
  }
}
    `;
export const useGetAllCountriesQuery = <
  TData = IGetAllCountriesQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: IGetAllCountriesQueryVariables,
  options?: UseQueryOptions<IGetAllCountriesQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<IGetAllCountriesQuery, TError, TData>(
    variables === undefined
      ? ["GetAllCountries"]
      : ["GetAllCountries", variables],
    fetcher<IGetAllCountriesQuery, IGetAllCountriesQueryVariables>(
      client,
      GetAllCountriesDocument,
      variables,
      headers
    ),
    options
  );
