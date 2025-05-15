import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AdventureBox } from '../components/AdventureBox';
import * as pizzaAdventure from "./AdventureNodes.json"

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