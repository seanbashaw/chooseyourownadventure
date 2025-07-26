"use client";

import { AdventureMaker } from "@/components/AdventureMaker";
import { NodesData } from "@/components/AdventureBox";
import pizzaAdventure from "@/stories/AdventureNodeTextBox.json";
import { processNode } from "@/utils/processNode";
import { MainNav } from "../../components/MainNav";
export default function AdventureMakerPage() {
    return (
        <main style={{ padding: "2rem" }}>
            <MainNav current="maker"/>
            <AdventureMaker {...processNode(pizzaAdventure)} />
        </main>
    );
} 