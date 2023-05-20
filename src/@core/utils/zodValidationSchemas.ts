import { z } from "zod"
import { persianCharactersValidator } from "./persianCharactersValidator"
import { slugValidator } from "./slugValidator"

export const slugInputSchema =
    z.string().refine((data) => slugValidator(data), {
        message: "مقدار نامک صحیح نیست"
    })

export const persianInputSchema =
    z.string().refine((data) => persianCharactersValidator(data), {
        message: "مقدار فیلد باید فارسی باشد"
    })

export const englishInputSchema =
    z.string().refine((data) => !persianCharactersValidator(data), {
        message: "مقدار فیلد باید انگلیسی باشد"
    })

export const passwordInputSchema =
    z.string()
