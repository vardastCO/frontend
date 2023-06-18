import type { Meta, StoryObj } from "@storybook/react"

import TextField from "@core/components/form/TextField"
import { TablerIcons } from "@core/components/shared/TablerIcon"

import withRHF from "./withRHF"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
  decorators: [withRHF(true)],
  tags: ["autodocs"],
  argTypes: {
    rounded: {
      type: "boolean"
    }
  }
}

export default meta

type Story = StoryObj<typeof TextField>

// export const TextFieldWithValue = Template.bind({})
// TextFieldWithValue.args = {}

export const Primary: Story = {
  args: {
    label: "نام و نام خانوادگی",
    type: "text",
    name: "name",
    description: "نام و نام خانوادگی خود بطور کامل و به فارسی وارد کنید"
  }
}

export const WithAddons: Story = {
  args: {
    label: "مبلغ",
    type: "number",
    name: "price",
    description: "مبلغ را به ریال وارد کنید",
    prefixAddon: "قیمت",
    suffixAddon: "ریال"
  }
}

export const WithElements: Story = {
  args: {
    label: "مبلغ",
    type: "number",
    name: "price",
    description: "مبلغ را به ریال وارد کنید",
    prefixElement: TablerIcons({
      icon: "IconMailOpened",
      className: "icon",
      stroke: 1.5
    }),
    suffixElement: ".com",
    placeholder: "آدرس ایمیل خود را وارد کنید..."
  }
}
