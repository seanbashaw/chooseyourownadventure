import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AdventureBox, processNode } from '../components/AdventureBox';
import pizzaAdventure from "./AdventureNodes.json";
import elevatorAdventure from "./AdventureNode2.json";
import textboxAdventure from "./AdventureNodeTextBox.json";


const meta = {
	title: 'Example/AdventureBox',
	component: AdventureBox,
	tags: ['autodocs'],
} satisfies Meta<typeof AdventureBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: processNode(pizzaAdventure)
}; 

export const ChatGPT: Story = {
	args:  processNode(elevatorAdventure)
}; 

export const TextBox: Story = {
	args: processNode(textboxAdventure)
};