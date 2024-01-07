"use client"

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useQuery } from "@tanstack/react-query"

import { GetAllFaqQuery } from "@/generated"

import { getAllFaqQueryFns } from "@core/queryFns/getAllFaqQueryFns"
import QUERY_FUNCTIONS_KEY from "@core/queryFns/queryFunctionsKey"
import FilterBlock from "@/app/(public)/components/filter-block"

const Faq = () => {
  const faqs = useQuery<GetAllFaqQuery>({
    queryKey: [QUERY_FUNCTIONS_KEY.GET_ALL_FAQ],
    queryFn: getAllFaqQueryFns
  })
  return (
    <div className="flex flex-col rounded-3xl bg-alpha-white px md:mt-11 md:p-11 md:pt-0">
      <div className="my-7 flex items-center gap-x-4 py">
        <QuestionMarkCircleIcon className="h-10 w-10 text-primary" />
        <h2 className="font-bold">پرسش های متداول</h2>
      </div>

      <div className="flex flex-col gap-y divide-y-0.5">
        {faqs.data?.faqs.map(({ answer, id, question }) => (
          <FilterBlock key={id} title={question}>
            {answer}
          </FilterBlock>
        ))}
      </div>
    </div>
  )
}

export default Faq
