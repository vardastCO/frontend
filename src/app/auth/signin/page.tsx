import SigninForm from "./components/SigninForm"

export default function SigninPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="card w-full max-w-sm rounded bg-white p-6">
        <SigninForm />
      </div>
    </div>
  )
}
