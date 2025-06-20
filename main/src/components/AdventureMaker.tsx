/* eslint-disable */ 
"use client";

import {useState} from "react";
import { Card, Button, Form, InputGroup, DropdownButton, Dropdown, SplitButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { NodesData } from "./AdventureBox";

interface AdventureMakerProps {
    nodes: NodesData;
}

interface FormChoice {
    text: string;
    targetNode: string;
}

interface FormData {
    nodeId: string;
    text: string;
    choices: FormChoice[];
}

export const AdventureMaker = ({nodes,...props}: AdventureMakerProps) => {
    const [isValidated, setValidated] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nodeId: '',
        text: '',
        choices: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // Here you would typically save the adventure data
            console.log('Form submitted:', formData);
            // TODO: Add your save logic here
        }
        
        setValidated(true);
    };

    const addChoice = () => {
        setFormData(prev => ({
            ...prev,
            choices: [...prev.choices, { text: '', targetNode: '' }]
        }));
    };

    const updateChoice = (index: number, field: 'text' | 'targetNode', value: string) => {
        setFormData(prev => ({
            ...prev,
            choices: prev.choices.map((choice, i) => 
                i === index ? { ...choice, [field]: value } : choice
            )
        }));
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>Adventure Maker</Card.Title>
                <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="adventureNodeID">
                        <Form.Label>Adventure Node ID</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="nodeId"
                            placeholder="Enter adventure node ID"
                            value={formData.nodeId}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a node ID.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="adventureNodeText">
                        <Form.Label>Adventure Node Text</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="text"
                            placeholder="Enter adventure node text"
                            value={formData.text}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide node text.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="adventureChoices">
                        <Form.Label>Enter your choices here</Form.Label>
                        {formData.choices.map((choice, index) => (
                            <InputGroup key={index} className="mb-3">
                                <Form.Control
                                    required
                                    placeholder="Choice text"
                                    value={choice.text}
                                    onChange={(e) => updateChoice(index, 'text', e.target.value)}
                                />
                                <SplitButton
                                    variant="outline-secondary"
                                    title="Go to Node"
                                    id={`choice-${index}`}
                                >
                                    <Dropdown.Item href="#">Node 1</Dropdown.Item>
                                    <Dropdown.Item href="#">Node 2</Dropdown.Item>
                                    <Dropdown.Item href="#">Node 3</Dropdown.Item>
                                </SplitButton>
                                <Form.Control
                                    required
                                    placeholder="Target node ID"
                                    value={choice.targetNode}
                                    onChange={(e) => updateChoice(index, 'targetNode', e.target.value)}
                                />
                            </InputGroup>
                        ))}
                    </Form.Group>

                    <Button variant="secondary" onClick={addChoice} className="me-2">
                        Add new choice
                    </Button>
                    
                    <Button variant="primary" type="submit">
                        Save Adventure
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}