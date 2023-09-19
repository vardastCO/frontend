import { Metadata } from "next"

import ContactForm from "./components/ContactForm"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "تماس با ما"
  }
}

const ContactPage = async () => {
  return (
    <>
      <p className="text-justify">
        لطفا پیش از ارسال ایمیل یا تماس تلفنی، ابتدا{" "}
        <span className="text-primary">پرسش های متداول</span> را مشاهده کنید.
      </p>
      <ContactForm />
    </>
  )
}

export default ContactPage
