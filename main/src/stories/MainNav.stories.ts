import { MainNav } from "@/components/MainNav";
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: "Example/MainNav",
    component: MainNav,
    tags: ['autodocs'],
} satisfies Meta<typeof MainNav>;

export default meta;
type Story= StoryObj<typeof meta>;

export const Default: Story = {
    args: {current:"about"},
}