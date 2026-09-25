import express from "express";
import { getDatabase, saveDatabase } from "./db.js";

export const databaseRouter = express.Router();

export interface DbTable {
  name: string;
  columns: string; // comma-separated
  rows: any[];
}

databaseRouter.get("/tables", (req, res) => {
  res.json(getDatabase());
});

databaseRouter.post("/create-table", (req, res) => {
  const { name, columns } = req.body;
  if (!name || !columns) {
    return res.status(400).json({ error: "Table name and columns are required." });
  }

  const db = getDatabase();
  const existing = db.find(t => t.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: `Table "${name}" already exists.` });
  }

  const newTable: DbTable = {
    name: name.toLowerCase().replace(/[^a-z0-9_]/g, ""),
    columns: columns,
    rows: []
  };

  db.push(newTable);
  saveDatabase(db);

  res.json({ success: true, table: newTable });
});

databaseRouter.post("/insert-row", (req, res) => {
  const { tableName, rowData } = req.body;
  if (!tableName || !rowData) {
    return res.status(400).json({ error: "Table name and row data are required." });
  }

  const db = getDatabase();
  const table = db.find(t => t.name.toLowerCase() === tableName.toLowerCase());
  if (!table) {
    return res.status(404).json({ error: `Table "${tableName}" not found.` });
  }

  table.rows.push(rowData);
  saveDatabase(db);

  res.json({ success: true, table });
});

databaseRouter.post("/clear-table", (req, res) => {
  const { tableName } = req.body;
  if (!tableName) {
    return res.status(400).json({ error: "Table name is required." });
  }

  const db = getDatabase();
  const table = db.find(t => t.name.toLowerCase() === tableName.toLowerCase());
  if (!table) {
    return res.status(404).json({ error: `Table "${tableName}" not found.` });
  }

  table.rows = [];
  saveDatabase(db);

  res.json({ success: true, table });
});
