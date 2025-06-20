"use client";

import { AdventureMaker } from "@/components/AdventureMaker";
import { NodesData } from "@/components/AdventureBox";
import pizzaAdventure from "@/stories/AdventureNodes.json";

export default function AdventureMakerPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <AdventureMaker nodes={pizzaAdventure as NodesData} />
        </main>
    );
} 