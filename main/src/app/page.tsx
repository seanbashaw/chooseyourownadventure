import styles from "./page.module.css";
import { AdventureBox } from "../components/AdventureBox";
import pizzaAdventure from "../stories/AdventureNodes.json";
import textboxAdventure from "../stories/AdventureNodeTextBox.json";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Choose Your Own Adventure!</h1>
        <p>This is a social media built around creating your own adventures. Currently, we support only text adventures but we're working on adding more features.</p>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <AdventureBox nodes={pizzaAdventure} />
        </div>
        <p>Currently, we have a few adventures to demo our product. Feel free to play some! You can learn how to create your own adventure soon. </p>
        <p>We focus on creating new and innovative ways to tell stories and capture the imagination of our adventurers. The newest addition is textboxes that allow you to branch out from textbox input.<b>Try it out!</b></p>
        <AdventureBox nodes={textboxAdventure} />
        
      </main>
    </div>
  );
}
