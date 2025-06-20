import styles from "./page.module.css";
import { AdventureBox, NodesData } from "../components/AdventureBox";
import pizzaAdventure from "../stories/AdventureNodes.json";
import textboxAdventure from "../stories/AdventureNodeTextBox.json";
import elevator from "../stories/AdventureNode2.json";
export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>Home</a>
        <br></br>
        <a href="/about" className={styles.navLink}>About</a>
      </nav>
      <main className={styles.main}>
        <h1>Featured Adventures</h1>
        <AdventureBox nodes={pizzaAdventure as NodesData} />
        <AdventureBox nodes={elevator as NodesData}/>
        <AdventureBox nodes={textboxAdventure as NodesData} />
      </main>
    </div>
    
  );
}
