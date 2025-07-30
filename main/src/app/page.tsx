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
        <h2 style={{textAlign:"center"}}>Adventure calls you...</h2>
        <p>Do you have yearning for adventure and want to play mini-adventures?</p>
        <p>Or do you have incredible visions of adventure and choice that you want to build easily?</p>
        <p>Welcome to the incredible site where you can do both!</p>
        <p>AdventureBox is a choose-your-own adventure site that has a curated selection of ready to play adventures.</p>
        <p>We also have a no-code adventure maker you can use to create your own adventures and post them on here.</p>
      </main>
    </>
  );
}
