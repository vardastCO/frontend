import { ShareIcon as ShareIconHero } from "@heroicons/react/24/outline"
import copy from "copy-to-clipboard"

import { Button } from "@core/components/ui/button"
import { toast } from "@core/hooks/use-toast"

type Props = {
  name: string
}

export default function ShareIcon({ name }: Props) {
  const handleOnClick = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          url: window.location.href,
          text: name,
          title: "وردست"
        })
      } catch (err) {
        // toast({
        //   description: `${err}`,
        //   duration: 5000,
        //   variant: "danger"
        // })
      }
    } else {
      copy(window.location.href)
      toast({
        description: "کپی شد!",
        duration: 5000,
        variant: "success"
      })
    }
  }

  return (
    <Button variant={"ghost"} iconOnly onClick={handleOnClick}>
      <ShareIconHero className="h-6 w-6 text-alpha" />
    </Button>
  )
}
