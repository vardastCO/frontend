"use client"

import { useRouter } from "next/navigation"
import {
  LucideInfo,
  LucideNewspaper,
  LucidePhone,
  LucideShieldQuestion
} from "lucide-react"

import { Button } from "@core/components/ui/button"

import ProfileItem from "./ProfileItem"

const _profile_items = [
  {
    href: "/profile/faq",
    Icon: LucideShieldQuestion,
    title: "سوالات متداول",
    id: 0
  },
  {
    href: "/profile/policy",
    Icon: LucideNewspaper,
    title: "قوانین و مقررات",
    id: 1
  },
  {
    href: "/profile/contact",
    Icon: LucidePhone,
    title: "تماس با ما",
    id: 2
  },
  {
    href: "/profile/about",
    Icon: LucideInfo,
    title: "درباره ما",
    id: 3
  }
]

const ProfileIndex = () => {
  const { push } = useRouter()

  return (
    <>
      <div className="flex-1 pt">
        <ul className="flex flex-col bg-alpha-white">
          {_profile_items.map((props) => (
            <ProfileItem key={props.id} {...props} />
          ))}
        </ul>
      </div>
      <div className="p">
        <Button
          onClick={() => {
            push("/admin")
          }}
          other={"block"}
        >
          ورود / ثبت‌نام
        </Button>
      </div>
    </>
  )
}

export default ProfileIndex
