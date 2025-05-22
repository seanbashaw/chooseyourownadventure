import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AdventureBox } from '../components/AdventureBox';
import * as pizzaAdventure from "./AdventureNodes.json"
import * as elevatorAdventure from "./AdventureNode2.json"
import * as textboxAdventure from "./AdventureNodeTextBox.json"
const meta = {
	title: 'Example/AdventureBox',
	component: AdventureBox,
	tags: ['autodocs'],
	args: {

	}
} satisfies Meta<typeof AdventureBox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		'nodes': {...pizzaAdventure}
	}
}; 
export const ChatGPT: Story = {
	args: {
		'nodes': {...elevatorAdventure}
	}
}; 
export const TextBox: Story = {
	args: {
		'nodes': {...textboxAdventure}
	}
}