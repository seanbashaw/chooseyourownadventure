/* eslint-disable */ 
"use client";

import {useState} from "react";
import { Card, Button, Form, InputGroup, DropdownButton, Dropdown, SplitButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { NodesData, AdventureNode } from "./AdventureBox";
import { AdventureBox } from "./AdventureBox";

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

export const AdventureMaker = ({nodes: nodesProp, ...props}: AdventureMakerProps) => {
    const [isNodeIdInvalidated, setInvalidReason] = useState<string | false>(false);
    const convertChoices = (node: AdventureNode): AdventureNode => {
        if (Array.isArray(node.choices)) return node;
        if (!node.choices) return { ...node, choices: [] };
        return {
            ...node,
            choices: Object.entries(node.choices).map(([targetNode, text]) => ({ text: String(text), targetNode }))
        };
    };
    const [formData, setFormData] = useState<Record<string, AdventureNode>>(() => {
        const nodes = nodesProp.nodes;
        const converted: Record<string, AdventureNode> = {};
        for (const key in nodes) {
            converted[key] = convertChoices(nodes[key]);
        }
        return converted;
    });
    const [currentNodeID, setCurrentNodeId] = useState(nodesProp.start_node);
    const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newForm = { ...formData };
        //add check to see if new id currently exists
        if (!(value in newForm)){
            newForm[value] = newForm[currentNodeID];
            delete newForm[currentNodeID];
            setCurrentNodeId(value);
            setInvalidReason(false);
            setFormData(newForm);
        } else {
            console.log(e);
            setInvalidReason("The node you're trying to type exists already.");
        }
    };
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev: Record<string, AdventureNode>) => ({
            ...prev,
            [currentNodeID]: {
                ...prev[currentNodeID],
                text: value
            }
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
    };
    const addChoice = () => {
        setFormData((prev: Record<string, AdventureNode>) => ({
            ...prev,
            [currentNodeID]: {
                ...prev[currentNodeID],
                choices: [
                    ...prev[currentNodeID].choices,
                    { text: '', targetNode: '' }
                ]
            }
        }));
    };
    const updateChoice = (index: number, field: 'text' | 'targetNode', value: string) => {
        setFormData((prev: Record<string, AdventureNode>) => {
            const newChoices = [...prev[currentNodeID].choices];
            newChoices[index] = {
                ...newChoices[index],
                [field]: value
            };
            return {
                ...prev,
                [currentNodeID]: {
                    ...prev[currentNodeID],
                    choices: newChoices
                }
            };
        });
    };
    // Before rendering AdventureBox preview
    const normalizedFormData: Record<string, AdventureNode> = Object.fromEntries(
        Object.entries(formData)
            .filter(([_, node]) =>
                node &&
                typeof node === 'object' &&
                typeof (node as AdventureNode).text === 'string' &&
                Array.isArray((node as AdventureNode).choices)
            )
            .map(([key, node]) => [key, node as AdventureNode])
    );
    return (
        <Card>
            <Card.Body>
                <Card.Title>Adventure Maker</Card.Title>
                <Form noValidate validated={isNodeIdInvalidated ? true : false} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="adventureNodeID">
                        <Form.Label>Adventure Node ID</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="nodeId"
                            placeholder="Enter adventure node ID"
                            value={currentNodeID}
                            onChange={handleIDChange}
                            isInvalid={isNodeIdInvalidated ? true : false}
                        />
                        <Form.Control.Feedback type="invalid">
                            {isNodeIdInvalidated}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="adventureNodeText">
                        <Form.Label>Adventure Node Text</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="text"
                            placeholder="Enter adventure node text"
                            value={formData[currentNodeID].text}
                            onChange={handleTextChange}
                        />
                        <Form.Control.Feedback type="invalid">
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="winLoseTextboxes">
                        <Form.Label>Win message</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter win message (leave blank for none)"
                            value={formData[currentNodeID].win || ''}
                            onChange={e => {
                                const value = e.target.value;
                                setFormData(prev => ({
                                    ...prev,
                                    [currentNodeID]: {
                                        ...prev[currentNodeID],
                                        win: value ? value : undefined
                                    }
                                }));
                            }}
                        />
                        <Form.Label className="mt-2">Lose message</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter lose message (leave blank for none)"
                            value={formData[currentNodeID].lose || ''}
                            onChange={e => {
                                const value = e.target.value;
                                setFormData(prev => ({
                                    ...prev,
                                    [currentNodeID]: {
                                        ...prev[currentNodeID],
                                        lose: value ? value : undefined
                                    }
                                }));
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="adventureChoices">
                        <Form.Label>Enter your choices here</Form.Label>
                        {
                            formData[currentNodeID].choices &&
                            formData[currentNodeID].choices.map((choice: { text: string; targetNode: string }, idx: number) => (
                                <InputGroup className="mb-2" key={idx}>
                                    <Form.Select
                                        onChange={e => updateChoice(idx, 'targetNode', e.target.value)}
                                        value={choice.targetNode}
                                        aria-label="Default select example"
                                    >
                                        <option value="">Open this select menu</option>
                                        {Object.keys(formData).map((key, i) => (
                                            <option value={key} key={key}>{key}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control
                                        type="text"
                                        value={choice.text}
                                        placeholder="Choice text"
                                        onChange={e => updateChoice(idx, 'text', e.target.value)}
                                    />
                                </InputGroup>
                            ))
                        }
                    </Form.Group>
                    <Button variant="secondary" onClick={addChoice} className="me-2">
                        Add new choice
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Adventure
                    </Button>
                    <hr />
                    <Form.Group className="mb-3" controlId="nodeSelector">
                        <Form.Label>Jump to node</Form.Label>
                        <Form.Select
                            value={currentNodeID}
                            onChange={e => setCurrentNodeId(e.target.value)}
                        >
                            {Object.keys(formData).map(key => (
                                <option value={key} key={key}>{key}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
                <AdventureBox
                    title={nodesProp.title}
                    start_node={currentNodeID}
                    nodes={normalizedFormData}
                />
            </Card.Body>
        </Card>
    );
}