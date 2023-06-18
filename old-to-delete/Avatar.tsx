import { cva, VariantProps } from "class-variance-authority"
import Image from "next/image"

const avatarClasses = cva("avatar", {
  variants: {
    size: {
      xsmall: "avatar-xs",
      small: "avatar-sm",
      DEFAULT: "",
      medium: "avatar-md",
      large: "avatar-lg",
      xlarge: "avatar-xl"
    },
    rounded: {
      true: "rounded-full"
    }
  },
  compoundVariants: [
    {
      size: "DEFAULT"
    }
  ],
  defaultVariants: {
    size: "DEFAULT"
  }
})

export interface AvatarProps extends VariantProps<typeof avatarClasses> {
  src: string
  alt: string
}

export const Avatar = ({ src, alt, ...props }: AvatarProps) => {
  const { size } = props

  return (
    <div className={avatarClasses({ size })}>
      <Image src={src} alt={alt} fill />
    </div>
  )
}
