import { createUniqueFieldSchema } from "@ts-react/form"
import { z } from "zod"
import CheckboxField from "../components/shared/Form/CheckboxField"
import NumberField from "../components/shared/Form/NumberField"
import TextField from "../components/shared/Form/TextField"
import { persianCharactersValidator } from "./persianCharactersValidator"
import { slugValidator } from "./slugValidator"

export const slugSchema = createUniqueFieldSchema(
    z.string().refine((data) => slugValidator(data), {
        message: "مقدار نامک صحیح نیست"
    }),
    "slug"
)

export const persianInputSchema = createUniqueFieldSchema(
    z.string().refine((data) => persianCharactersValidator(data), {
        message: "مقدار فیلد باید فارسی باشد"
    }),
    "persianInput"
)

export const tsReactFormDefaultMapping = [
    [z.string(), TextField],
    [z.number(), NumberField],
    [z.boolean(), CheckboxField],
    [slugSchema, TextField],
    [persianInputSchema, TextField]
] as const
