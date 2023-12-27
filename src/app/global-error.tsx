"use client"

import Script from "next/script"

import { Button } from "@core/components/ui/button"

const ErrorCardContainer = ({ style }: any) => {
  return (
    <div className="card-container">
      <div className="perspec" style={style}>
        <ErrorCard />
      </div>
    </div>
  )
}

const ErrorCard = () => {
  return (
    <div className="card">
      <div className="writing">
        <div className="topbar">
          <div className="red"></div>
          <div className="yellow"></div>
          <div className="green"></div>
        </div>
        <div className="code">
          <ul></ul>
        </div>
      </div>
    </div>
  )
}

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error)

  return (
    <html>
      <body>
        <div className="container">
          <div className="error">
            <h2>ببخشید!</h2>
            <p>خطایی هنگام درست کردن صفحه رخ داده...</p>
            <Button onClick={() => reset()} className="mt-8">
              تلاش مجدد
            </Button>
          </div>
          <div className="stack-container">
            <ErrorCardContainer
              style={{
                "--spreaddist": "125px",
                "--scaledist": 0.75,
                "--vertdist": "-25px"
              }}
            >
              <ErrorCard />
            </ErrorCardContainer>
            <ErrorCardContainer
              style={{
                "--spreaddist": "100px",
                "--scaledist": 0.8,
                "--vertdist": "-20px"
              }}
            >
              <ErrorCard />
            </ErrorCardContainer>
            <ErrorCardContainer
              style={{
                "--spreaddist": "75px",
                "--scaledist": 0.85,
                "--vertdist": "-15px"
              }}
            >
              <ErrorCard />
            </ErrorCardContainer>
            <ErrorCardContainer
              style={{
                "--spreaddist": "50px",
                "--scaledist": 0.9,
                "--vertdist": "-10px"
              }}
            >
              <ErrorCard />
            </ErrorCardContainer>
            <ErrorCardContainer
              style={{
                "--spreaddist": "25px",
                "--scaledist": 0.95,
                "--vertdist": "-5px"
              }}
            >
              <ErrorCard />
            </ErrorCardContainer>
            <ErrorCardContainer
              style={{
                "--spreaddist": "0px",
                "--scaledist": 1,
                "--vertdist": " 0px"
              }}
            >
              <ErrorCard />
            </ErrorCardContainer>
          </div>
        </div>
      </body>
      <Script src="/error.js" strategy="afterInteractive" />
    </html>
  )
}
