/* eslint-disable */ 
"use client";
import { Trash } from "react-bootstrap-icons";
import {useState} from "react";
import { Card, Button, Form, InputGroup, DropdownButton, Dropdown, SplitButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { NodesData, AdventureNode } from "./AdventureBox";
import { AdventureBox } from "./AdventureBox";
import { Prev } from "react-bootstrap/esm/PageItem";

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
    choices: string[][];
}

export const AdventureMaker = (nodeProps: NodesData) => {
    const [isNodeIdInvalidated, setInvalidReason] = useState<string | false>(false);
    const [formData, setFormData] = useState(nodeProps.nodes);
    const [currentNodeID, setCurrentNodeId] = useState(nodeProps.start_node);
    const [startNode, setStartNode] = useState(nodeProps.start_node);
    const [title, setTitle] = useState(nodeProps.title)
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
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setTitle(value);
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
        setFormData(prev => ({
        ...prev, 
        [currentNodeID]: {
            ...prev[currentNodeID],
            choices: [
                ...(Array.isArray(prev[currentNodeID].choices) ? prev[currentNodeID].choices : []),
                ["", ""]
            ],
        }
    }));
};
const deleteChoice = (a:number) => {
    const newChoices = formData[currentNodeID].choices;
    newChoices.splice(a,1);
setFormData(prev => ({
    ...prev, 
    [currentNodeID]: {
        ...prev[currentNodeID],
        choices: newChoices
    }
}));
};
const downloadJSON = () =>{

}
const updateChoice = (index: number, field: 0 | 1, value: string) => {
    setFormData(prev => {
        const oldChoices = prev[currentNodeID].choices;
        const updatedChoice = field === 0
            ? [value, oldChoices[index][1]]
            : [oldChoices[index][0], value];
        const newChoices = [
            ...oldChoices.slice(0, index),
            updatedChoice,
            ...oldChoices.slice(index + 1)
        ];
        return {
            ...prev,
            [currentNodeID]: {
                ...prev[currentNodeID],
                choices: newChoices
            }
        };
    });
};
    
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">Adventure Maker</Card.Title>
                <Form noValidate validated={isNodeIdInvalidated ? true : false} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="adventureTitle">
                        <Form.Label>Adventure Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="adventureTitle"
                            placeholder="Type a title for your adventure..."
                            value={title}
                            onChange={handleTitleChange}
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="adventureStartNode">
                        <Form.Label>Starting Node</Form.Label>
                        <Form.Select
                                        onChange={(e) => setStartNode(e.target.value)}
                                        value={startNode}
                                        aria-label="Default select example"
                                    >
                                        <option value="">Select target node</option>
                                        {Object.keys(formData).map((nodeKey) => (
                                            <option value={nodeKey} key={nodeKey}>{nodeKey}</option>
                                        ))}
                                    </Form.Select>
                    </Form.Group>
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
                            formData[currentNodeID].choices.map((choiceValue, num) => (
                                <InputGroup className="mb-2" key={currentNodeID+'-'+num}>
                                    <Form.Select
                                        onChange={(e) => updateChoice(num, 0, e.target.value)}
                                        value={choiceValue[0]}
                                        aria-label="Default select example"
                                    >
                                        <option value="">Select target node</option>
                                        {Object.keys(formData).map((nodeKey) => (
                                            <option value={nodeKey} key={nodeKey}>{nodeKey}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control
                                        type="text"
                                        value={choiceValue[1]}
                                        placeholder="Choice text"
                                        onChange={(e) => updateChoice(num, 1, e.target.value)}
                                    />
                                    <Button variant="outline-secondary" onClick={()=>deleteChoice(num)}><Trash/></Button>
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
                    title={title}
                    start_node={startNode}
                    nodes={formData}
                />
            </Card.Body>
        </Card>
    );
}