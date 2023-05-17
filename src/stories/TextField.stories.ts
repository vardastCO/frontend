import type { Meta, StoryObj } from '@storybook/react';

import TextField from '@core/components/form/TextField';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextField> = {
    title: 'TextField',
    component: TextField,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
    args: {
        label: 'نام و نام خانوادگی',
        name: 'name',
        description: 'نام و نام خانوادگی خود بطور کامل و به فارسی وارد کنید',
        errorMessage: 'وارد کردن این فیلد الزامی است'
    },
};
