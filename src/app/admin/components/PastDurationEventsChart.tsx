"use client"

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js"
import { Bar } from "react-chartjs-2"

import { useGetPastDurationEventsChartQuery } from "@/generated"

import graphqlRequestClient from "@core/clients/graphqlRequestClient"
import Card from "@core/components/shared/Card"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {}

const PastDurationEventsChart = (props: Props) => {
  const { data, isLoading } =
    useGetPastDurationEventsChartQuery(graphqlRequestClient)

  return (
    <Card
      title="تعداد نمایش اطلاعات تماس شما"
      description="این آمار مربوط به ۳۰ روز گذشته است"
    >
      {isLoading && (
        <div className="animate-pulse">
          <div className="mt-4 flex items-baseline space-x-6 space-x-reverse">
            <div className="h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-56 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-64 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-80 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-80 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      )}
      {data && (
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
          data={{
            labels: data.pastDurationEventsChart.labels,
            datasets: [
              {
                label: "تعداد نمایش",
                backgroundColor: "#1d4ed8",
                data: data.pastDurationEventsChart.data
              }
            ]
          }}
        />
      )}
    </Card>
  )
}

export default PastDurationEventsChart
