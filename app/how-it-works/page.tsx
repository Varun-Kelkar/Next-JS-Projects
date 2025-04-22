"use client";
import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import useIsMobile from "@/app/hooks";
import "reactflow/dist/style.css";
import styles from "./page.module.css";

export default function Workflow() {
  const isMobile = useIsMobile();

  const nodes = useMemo(() => {
    return [
      {
        id: "1",
        position: isMobile ? { x: 50, y: 0 } : { x: 0, y: 50 },
        data: { label: "Create Expense & Submit for Approval" },
        type: "input",
        style: {
          background: "#E8F5E9",
          color: "#1B5E20",
          border: "1px solid #2E7D32",
          padding: 10,
          borderRadius: 8,
        },
      },
      {
        id: "2",
        position: isMobile ? { x: 50, y: 150 } : { x: 250, y: 50 },
        data: { label: "Manager Review & Approval" },
        type: "input ",
        style: {
          background: "#B3E5FC",
          color: "#0D47A1",
          border: "1px solid #0288D1",
          padding: 10,
          borderRadius: 8,
        },
      },
      {
        id: "3",
        position: isMobile ? { x: 50, y: 300 } : { x: 500, y: 50 },
        data: { label: "Accounts Manager Review & Approval" },
        type: "input ",
        style: {
          background: "#FFF9C4",
          color: "#795548",
          border: "1px solid #FBC02D",
          padding: 10,
          borderRadius: 8,
        },
      },
      {
        id: "4",
        position: isMobile ? { x: 50, y: 450 } : { x: 750, y: 50 },
        data: { label: "Amount is Reimbursed to employee account" },
        type: "output",
        style: {
          background: "#FFF9C4",
          color: "#795548",
          border: "1px solid #FBC02D",
          padding: 10,
          borderRadius: 8,
        },
      },
    ];
  }, [isMobile]);

  const edges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3", animated: true },
    { id: "e3-4", source: "3", target: "4", animated: true },
    { id: "e4-5", source: "4", target: "5", animated: true }
  ];

  return (
    <main className={styles.page}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        zoomOnScroll={false}
        panOnDrag
      >
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  );
}
