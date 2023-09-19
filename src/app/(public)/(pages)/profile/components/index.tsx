"use client"

import { useRouter } from "next/navigation"

import { Button } from "@core/components/ui/button"
import { _profile_items } from "@core/lib/constants"

import ProfileItem from "./ProfileItem"

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
          block
        >
          ورود / ثبت‌نام
        </Button>
      </div>
    </>
  )
}

export default ProfileIndex
