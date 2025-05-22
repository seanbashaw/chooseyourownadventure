import {useState, React}  from "react";
import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
const stateToStyle = {"win":"Success","lose":"Danger"};
export interface AdventureBoxProps {
/* Optional Title of Aventure */
	nodes?:dict;
}

/** These are mini adventures that you can take. They may interact with each other. Main components include a gif selection and choices in diferent inputs */
export const AdventureBox = ({
nodes,
...props
}: AdventureBoxProps) => {
	const [node, setNode] = useState(nodes["nodes"][nodes["start_node"]]);
	const [format,setFormat] = useState("Light");
	function switchNode(link){
		setNode(nodes["nodes"][link]);
		console.log(node);
	if ("win" in node){
		setFormat("Success");
	}else if ("lose" in node){
		setFormat("Danger");
	}else{
		setFormat("Light");
	}
	}
	function processText(event,name,box){
		event.preventDefault();
    for (var ind in Object.keys(box.regex)) {
    	var reg = Object.keys(box.regex)[ind];
    	var regex = new RegExp(reg);
    	console.log(reg);
        if (regex.test(event.target[1].value)){
        	switchNode(box.regex[reg]);
        	return;
        }
    }
    switchNode(box.default);
	}
	return (
		<Card border={format.toLowerCase()} 
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
		{node["choices"]?Object.entries(node["choices"]).map(([link,choice])=>(
		<Card.Link onClick={()=>switchNode(link)}>{choice}</Card.Link>
		)):''}
		{node["textboxChoices"]?Object.entries(node["textboxChoices"]).map(([name,box]) =>(
			
				<Form onSubmit={(event)=>processText(event,name,box)}>
			<InputGroup className="mb-3">
				<Button type="submit" variant="outine-info" id="button-addon1">
{box.button}
				</Button>
				<Form.Control
				aria-label={box.placeholder}
				aria-describedby="basic-addon1"
				placeholder={box.placeholder}
				/>
			</InputGroup>
				</Form>
		)):''}
		</Card.Body>
		</Card>
	);
};
