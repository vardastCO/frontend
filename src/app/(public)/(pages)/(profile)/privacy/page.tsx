// Import the file system module from Node.js
import fs from "fs"
import { Metadata } from "next"
import { ScaleIcon } from "@heroicons/react/24/solid"

import { CheckIsMobileView } from "@core/actions/checkIsMobileView"
import withMobileHeader from "@core/middlewares/withMobileHeader"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "قوانین و مقررات"
  }
}

const PrivacyPage = async () => {
  const isMobileView = CheckIsMobileView()

  const htmlFilePath = "public/privacy.html"
  const htmlContent = fs.readFileSync(htmlFilePath, "utf-8")

  return (
    <div className="flex flex-col gap-y text-justify leading-loose">
      {!isMobileView && (
        <div className="my-7 flex items-center gap-x-4 py">
          <ScaleIcon className="h-10 w-10 text-primary" />
          <h1 className="font-bold">قوانین و مقررات</h1>
        </div>
      )}
      <div className="flex-1">
        <div
          className="leading-10"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      </div>
    </div>
  )
}

export default withMobileHeader(PrivacyPage, {
  title: "قوانین و مقررات"
})
