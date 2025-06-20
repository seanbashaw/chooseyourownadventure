import styles from "./page.module.css";
import { AdventureBox, NodesData } from "../../components/AdventureBox";
import pizzaAdventure from "../../stories/AdventureNodes.json";
import textboxAdventure from "../../stories/AdventureNodeTextBox.json";

export default function Home() {
  return (
    <div className={styles.page}>
        <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>Home</a>
        <br></br>
        <a href="/about" className={styles.navLink}>About</a>
      </nav>
      <main className={styles.main}>
        <h1>Why'd you make this?</h1>
        <p>I love choose your own adventure stories. So much so that I decided to make my own platform! I'm starting with text to get some of the basic and fun features sorted out but soon hope to have image and video support.</p>
        <h1>This looks cool, what's your inspiration?</h1>
        <p>I was big into Youtube Annotations when they first came out. I loved the idea of being able to click on a part of the video and have a new video play. They had it for nine whole years before removing it for some stupid reason. I wanted to make something similar but for text first.</p>
        <p>I thought the black mirror bandersnatch was a cool and seamless way to make a choose your own adventure game. There was one section where you had to type in a phone number in a short time period and that was thought provoking.</p>
        <p>The book <a href="https://www.amazon.com/Meanwhile-Path-Possibilities-Graphic-Novels/dp/0810984237/">Meanwhile, on the Path of Possibilities</a> is a great example of a choose your own adventure game. It's a graphic novel that allows you to choose your own path through flipping to tabs decided by choices you make and lines you cross.</p>
        <h1>So how do I play an adventure?</h1>
        <p>Each adventure has a series of links that you can choose. Sometimes there will be textboxes which will take you in different directions depending on what you type in. More features are being added as we SPEAK!</p>
        </main>
    </div>
  );
}
