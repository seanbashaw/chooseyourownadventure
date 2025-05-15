import {useState, React}  from "react";
import { Card, Button } from 'react-bootstrap';
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
		</Card.Body>
		</Card>
	);
};
