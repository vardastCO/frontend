import * as Sentry from "@sentry/nextjs"

export default function AuthLogger() {
  return {
    error(message: string, ...extra: any[]) {
      Sentry.captureException(new Error(message))
      console.error(message, ...extra)
    },
    warn: console.warn,
    info: console.info,
    debug: console.debug
  }
}
