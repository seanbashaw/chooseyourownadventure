import styles from "./page.module.css";
import { AdventureBox, NodesData } from "../components/AdventureBox";
import pizzaAdventure from "../stories/AdventureNodes.json";
import textboxAdventure from "../stories/AdventureNodeTextBox.json";
import elevator from "../stories/AdventureNode2.json";
import { processNode } from "../utils/processNode";
import { MainNav } from "../components/MainNav";

export default function Home() {
  return (
    <>
      <MainNav current="home"/>
      <main className={styles.main}>
        <h1>Featured Adventures</h1>
        <AdventureBox {...processNode(pizzaAdventure)} />
        <AdventureBox {...processNode(elevator)}/>
        <AdventureBox {...processNode(textboxAdventure)} />
      </main>
    </>
  );
}
