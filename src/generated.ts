import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
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

export type Area = {
  __typename?: "Area";
  city: City;
  id: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
};

export type Category = {
  __typename?: "Category";
  children?: Maybe<Array<Category>>;
  createdAt: Scalars["DateTime"];
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  parentCategory?: Maybe<Category>;
  slug: Scalars["String"];
  sort: Scalars["Int"];
  title: Scalars["String"];
  titleEn?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  vocabulary: Vocabulary;
};

export type City = {
  __typename?: "City";
  areas: Array<Area>;
  id: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  parentCity: City;
  province: Province;
  slug: Scalars["String"];
  sort: Scalars["Int"];
  type: Scalars["Float"];
};

export type Country = {
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
  provinces?: Maybe<Array<Province>>;
  sort: Scalars["Int"];
};

export type CreateAreaInput = {
  cityId: Scalars["Int"];
  isActive: Scalars["Boolean"];
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  nameEn: Scalars["String"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
};

export type CreateCategoryInput = {
  icon?: InputMaybe<Scalars["String"]>;
  parentCategoryId?: InputMaybe<Scalars["Int"]>;
  slug: Scalars["String"];
  sort?: InputMaybe<Scalars["Int"]>;
  title: Scalars["String"];
  titleEn?: InputMaybe<Scalars["String"]>;
  vocabularyId: Scalars["Int"];
};

export type CreateCityInput = {
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

export type CreateCountryInput = {
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

export type CreateProvinceInput = {
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

export type CreateVocabularyInput = {
  slug: Scalars["String"];
  sort?: Scalars["Int"];
  title: Scalars["String"];
  titleEn?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createArea: Area;
  createCategory: Category;
  createCity: City;
  createCountry: Country;
  createProvince: Province;
  createVocabulary: Vocabulary;
  removeArea: Area;
  removeCategory: Category;
  removeCity: City;
  removeCountry: Country;
  removeProvince: Province;
  removeVocabulary: Vocabulary;
  updateArea: Area;
  updateCategory: Category;
  updateCity: City;
  updateCountry: Country;
  updateProvince: Province;
  updateVocabulary: Vocabulary;
};

export type MutationCreateAreaArgs = {
  createAreaInput: CreateAreaInput;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateCityArgs = {
  createCityInput: CreateCityInput;
};

export type MutationCreateCountryArgs = {
  createCountryInput: CreateCountryInput;
};

export type MutationCreateProvinceArgs = {
  createProvinceInput: CreateProvinceInput;
};

export type MutationCreateVocabularyArgs = {
  createVocabularyInput: CreateVocabularyInput;
};

export type MutationRemoveAreaArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveCategoryArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveCityArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveCountryArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveProvinceArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveVocabularyArgs = {
  id: Scalars["Int"];
};

export type MutationUpdateAreaArgs = {
  updateAreaInput: UpdateAreaInput;
};

export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateCityArgs = {
  updateCityInput: UpdateCityInput;
};

export type MutationUpdateCountryArgs = {
  updateCountryInput: UpdateCountryInput;
};

export type MutationUpdateProvinceArgs = {
  updateProvinceInput: UpdateProvinceInput;
};

export type MutationUpdateVocabularyArgs = {
  updateVocabularyInput: UpdateVocabularyInput;
};

export type Province = {
  __typename?: "Province";
  cities: Array<City>;
  country: Country;
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

export type Query = {
  __typename?: "Query";
  area: Area;
  category: Category;
  city: City;
  countries: Array<Country>;
  country: Country;
  province: Province;
  vocabulary: Vocabulary;
};

export type QueryAreaArgs = {
  id: Scalars["Int"];
};

export type QueryCategoryArgs = {
  id: Scalars["Int"];
};

export type QueryCityArgs = {
  id: Scalars["Int"];
};

export type QueryCountryArgs = {
  id: Scalars["Int"];
};

export type QueryProvinceArgs = {
  id: Scalars["Int"];
};

export type QueryVocabularyArgs = {
  id: Scalars["Int"];
};

export type UpdateAreaInput = {
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

export type UpdateCategoryInput = {
  icon?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  parentCategoryId?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Scalars["String"]>;
  titleEn?: InputMaybe<Scalars["String"]>;
  vocabularyId?: InputMaybe<Scalars["Int"]>;
};

export type UpdateCityInput = {
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

export type UpdateCountryInput = {
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

export type UpdateProvinceInput = {
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

export type UpdateVocabularyInput = {
  id: Scalars["Int"];
  slug?: InputMaybe<Scalars["String"]>;
  sort?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Scalars["String"]>;
  titleEn?: InputMaybe<Scalars["String"]>;
};

export type Vocabulary = {
  __typename?: "Vocabulary";
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  slug: Scalars["String"];
  sort: Scalars["Int"];
  title: Scalars["String"];
  titleEn?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type CreateCountryMutationVariables = Exact<{
  input: CreateCountryInput;
}>;

export type CreateCountryMutation = {
  __typename?: "Mutation";
  createCountry: {
    __typename?: "Country";
    id: number;
    name: string;
    nameEn: string;
    alphaTwo: string;
    iso: string;
    phonePrefix: string;
    sort: number;
  };
};

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCountriesQuery = {
  __typename?: "Query";
  countries: Array<{
    __typename?: "Country";
    id: number;
    name: string;
    alphaTwo: string;
    nameEn: string;
  }>;
};

export type GetCountryQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GetCountryQuery = {
  __typename?: "Query";
  country: {
    __typename?: "Country";
    id: number;
    name: string;
    alphaTwo: string;
    nameEn: string;
    provinces?: Array<{
      __typename?: "Province";
      id: number;
      name: string;
      nameEn: string;
      slug: string;
    }> | null;
  };
};

export const CreateCountryDocument = `
    mutation CreateCountry($input: CreateCountryInput!) {
  createCountry(createCountryInput: $input) {
    id
    name
    nameEn
    alphaTwo
    iso
    phonePrefix
    sort
  }
}
    `;
export const useCreateCountryMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreateCountryMutation,
    TError,
    CreateCountryMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    CreateCountryMutation,
    TError,
    CreateCountryMutationVariables,
    TContext
  >(
    ["CreateCountry"],
    (variables?: CreateCountryMutationVariables) =>
      fetcher<CreateCountryMutation, CreateCountryMutationVariables>(
        client,
        CreateCountryDocument,
        variables,
        headers
      )(),
    options
  );
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
  TData = GetAllCountriesQuery,
  TError = unknown
>(
  client: GraphQLClient,
  variables?: GetAllCountriesQueryVariables,
  options?: UseQueryOptions<GetAllCountriesQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<GetAllCountriesQuery, TError, TData>(
    variables === undefined
      ? ["GetAllCountries"]
      : ["GetAllCountries", variables],
    fetcher<GetAllCountriesQuery, GetAllCountriesQueryVariables>(
      client,
      GetAllCountriesDocument,
      variables,
      headers
    ),
    options
  );
export const GetCountryDocument = `
    query GetCountry($id: Int!) {
  country(id: $id) {
    id
    name
    alphaTwo
    nameEn
    provinces {
      id
      name
      nameEn
      slug
    }
  }
}
    `;
export const useGetCountryQuery = <TData = GetCountryQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetCountryQueryVariables,
  options?: UseQueryOptions<GetCountryQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<GetCountryQuery, TError, TData>(
    ["GetCountry", variables],
    fetcher<GetCountryQuery, GetCountryQueryVariables>(
      client,
      GetCountryDocument,
      variables,
      headers
    ),
    options
  );
