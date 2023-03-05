import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import fa from "@fullcalendar/core/locales/fa";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

const CalendarPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="تقویم کاری" />
      <div className="flex flex-col flex-1 h-auto">
        <h1 className="text-n-gray-800 mb-8 text-3xl font-black">تقویم کاری</h1>

        <div className="h-auto">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            timeZone="Asia/Tehran"
            locale={fa}
            nowIndicator={true}
            headerToolbar={{ center: "dayGridDay,timeGridWeek,dayGridMonth" }}
            events={[
              {
                title: "قرار ملاقات حضوری با خانم کریمی",
                start: "2023-03-01T08:15:00",
                end: "2023-03-03",
              },
              {
                title: "مشاوره تلفنی اصغری",
                start: "2023-03-01T09:15:00",
                end: "2023-03-01T09:45:00",
                url: "https://google.com",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

CalendarPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CalendarPage;
