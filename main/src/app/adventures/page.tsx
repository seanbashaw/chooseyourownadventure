import styles from "../about/page.module.css";
import { AdventureBox, NodesData } from "../../components/AdventureBox";
import pizzaAdventure from "../../stories/AdventureNodes.json";
import textboxAdventure from "../../stories/AdventureNodeTextBox.json";
import elevator from "../../stories/AdventureNode2.json";
import { processNode } from "../../utils/processNode";
import { MainNav } from "../../components/MainNav";
import { AdventureMaker } from "@/components/AdventureMaker";

export default function Home() {
  return (
    <>
    <MainNav current="adventures"/>
    <main className={styles.main}>
      <h2 style={{textAlign:"center"}}>Featured adventures.</h2>
      <AdventureBox {...processNode(pizzaAdventure)}/>
      <AdventureBox {...processNode(elevator)}/>
      <AdventureBox {...processNode(textboxAdventure)}/>
      </main>
  </>
  );
}
