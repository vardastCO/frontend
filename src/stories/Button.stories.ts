import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@core/components/ui/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        loading: {
            type: 'boolean',
            defaultValue: false
        },
        fullWidth: {
            type: 'boolean',
            defaultValue: false
        },
        iconOnly: {
            type: 'boolean',
            defaultValue: false
        }
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

const label = 'کلیک کن';

export const Primary: Story = {
    args: {
        intent: 'primary',
        size: 'DEFAULT',
        loading: false,
        iconOnly: false,
        fullWidth: false,
        children: label
    },
};

export const Secondary: Story = {
    args: {
        intent: 'secondary',
        size: 'DEFAULT',
        loading: false,
        iconOnly: false,
        fullWidth: false,
        children: label
    },
};

export const Danger: Story = {
    args: {
        intent: 'danger',
        size: 'DEFAULT',
        loading: false,
        iconOnly: false,
        fullWidth: false,
        children: label
    },
};

export const Ghost: Story = {
    args: {
        intent: 'ghost',
        size: 'DEFAULT',
        loading: false,
        iconOnly: false,
        fullWidth: false,
        children: label
    },
};
