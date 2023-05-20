import { action } from "@storybook/addon-actions"
import { StoryFn } from "@storybook/react"
import { FC, ReactElement, ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"

const StorybookFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default (showSubmitButton: boolean) =>
  (Story: FC): ReturnType<StoryFn<ReactElement>> =>
    (
      <StorybookFormProvider>
        <Story />
        {showSubmitButton && <button type="submit">Submit</button>}
      </StorybookFormProvider>
    )
