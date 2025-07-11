import { AdventureMaker } from "@/components/AdventureMaker";
import { Meta, StoryObj } from "@storybook/react";
import pizzaAdventure from "./AdventureNodes.json";
import { processNode } from "@/components/AdventureBox";

const meta = {
    title: 'Example/AdventureMaker',
    component: AdventureMaker,
    tags: ['autodocs'],
} satisfies Meta<typeof AdventureMaker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args:processNode(pizzaAdventure),
};