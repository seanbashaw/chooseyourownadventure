import styles from "./page.module.css";
import { AdventureBox } from "../components/AdventureBox";
import pizzaAdventure from "../stories/AdventureNodes.json";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Choose Your Own Adventure!</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <AdventureBox nodes={pizzaAdventure} />
        </div>
      </main>
    </div>
  );
}
