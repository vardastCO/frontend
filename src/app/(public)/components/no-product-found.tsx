import { IconBoxOff } from "@tabler/icons-react"

const NoProductFound = () => {
  return (
    <div className="mx-auto flex max-w-xs flex-col">
      <IconBoxOff className="mb-4 h-10 w-10 text-gray-400" />
      <p className="mb-2 text-lg font-bold text-gray-800">
        کالایی با این مشخصات پیدا نشد
      </p>
      <p className="text-sm text-gray-600">
        برای پیدا کردن کالای مورد نظر می‌توانید فیلترها را تغییر دهید
      </p>
    </div>
  )
}

export default NoProductFound
