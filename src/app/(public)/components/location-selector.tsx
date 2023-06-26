"use client"

import { IconChevronLeft, IconLoader2, IconMapPin } from "@tabler/icons-react"

import { useGetCountryQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import { Button } from "@core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@core/components/ui/dialog"

interface ProvinceItemProps {
  title: string
}

const ProvinceItem = ({ title }: ProvinceItemProps) => {
  return (
    <button className="flex items-center justify-between border-b border-gray-200 py-2 last:border-b-0">
      <span>{title}</span>
      <IconChevronLeft className="h-4 w-4 text-gray-500" />
    </button>
  )
}

const LocationSelector = () => {
  const countryQuery = useGetCountryQuery(
    graphqlRequestClient,
    {
      slug: "iran-islamic-republic-of"
    },
    {
      enabled: false
    }
  )

  const loadCountry = () => {
    countryQuery.refetch()
  }

  return (
    <Dialog onOpenChange={() => loadCountry()}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="small">
          <IconMapPin className="icon" />
          <span>انتخاب شهر</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>انتخاب شهر</DialogTitle>
          {countryQuery.isLoading && (
            <div className="flex items-center justify-center p-12">
              <IconLoader2 className="animate-spin text-gray-400" />
            </div>
          )}
          {countryQuery.data &&
            countryQuery.data.country.provinces.map(
              (province) =>
                province && (
                  <ProvinceItem title={province.name} key={province.id} />
                )
            )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LocationSelector
