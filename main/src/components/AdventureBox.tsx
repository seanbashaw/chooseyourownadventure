/* eslint-disable */ 
"use client";

import {useState} from "react";
import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export interface AdventureNode {
	text: string;
	choices?: Record<string, string>;
	textboxChoices?: Record<string, {
		button: string;
		placeholder: string;
		regex: Record<string, string>;
		default: string;
	}>;
	win?: string;
	lose?: string;
}

export interface NodesData {
	title: string;
	start_node: string;
	nodes: Record<string, AdventureNode>;
}

export interface AdventureBoxProps {
	/* Optional Title of Adventure */
	nodes: NodesData;
}

/** These are mini adventures that you can take. They may interact with each other. Main components include a gif selection and choices in different inputs */
export const AdventureBox = ({
	nodes,
	...props
}: AdventureBoxProps) => {
	const [node, setNode] = useState<AdventureNode>(nodes.nodes[nodes.start_node]);
	const [format, setFormat] = useState<string>("Light");

	function switchNode(link: string) {
		const newNode = nodes.nodes[link];
		setNode(newNode);
		console.log(newNode);
		if ("win" in newNode) {
			setFormat("Success");
		} else if ("lose" in newNode) {
			setFormat("Danger");
		} else {
			setFormat("Light");
		}
	}

	function processText(event: React.FormEvent<HTMLFormElement>, name: string, box: { regex: Record<string, string>; default: string; button: string; placeholder: string }) {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const input = target[1] as HTMLInputElement;
		
		for (const reg of Object.keys(box.regex)) {
			const regex = new RegExp(reg);
			if (regex.test(input.value.toLowerCase())) {
				switchNode(box.regex[reg]);
				return;
			}
		}
		switchNode(box.default);
	}

	return (
		<Card 
			border={format.toLowerCase()}
			bg={format.toLowerCase()}
			key={format}
			text={format.toLowerCase() === 'light' ? 'dark' : 'white'}
			className="mb-2"
		>
			<Card.Body>
				<Card.Title>{nodes.title}</Card.Title>
				<Card.Text>
					{node.text}
				</Card.Text>
				{node.choices ? Object.entries(node.choices).map(([link, choice]) => (
					<Card.Link key={link} onClick={() => switchNode(link)}>{choice}</Card.Link>
				)) : null}
				{node.textboxChoices ? Object.entries(node.textboxChoices).map(([name, box]) => (
					<Form key={name} onSubmit={(event) => processText(event, name, box)}>
						<InputGroup className="mb-3">
							<Button type="submit" variant="outline-info" id="button-addon1">
								{box.button}
							</Button>
							<Form.Control
								aria-label={box.placeholder}
								aria-describedby="basic-addon1"
								placeholder={box.placeholder}
							/>
						</InputGroup>
					</Form>
				)) : null}
			</Card.Body>
		</Card>
	);
};
