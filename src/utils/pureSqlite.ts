import fs from "fs";
import path from "path";

export class Database {
  private filePath: string;
  private data: Record<string, any> = {};

  constructor(filePath: string, callback?: (err: Error | null) => void) {
    // Handle the .db ext, convert to .json internally for clean handling
    const jsonPath = filePath.endsWith(".db") ? filePath.replace(/\.db$/, ".json") : filePath;
    this.filePath = jsonPath;
    
    // Emulate connection delay
    setTimeout(() => {
      try {
        const dbPath = path.resolve(this.filePath);
        if (fs.existsSync(dbPath)) {
          const content = fs.readFileSync(dbPath, "utf-8");
          this.data = JSON.parse(content || "{}");
        } else {
          this.data = {};
          fs.writeFileSync(dbPath, JSON.stringify({}, null, 2), "utf-8");
        }
        if (callback) callback(null);
      } catch (err: any) {
        if (callback) callback(err);
      }
    }, 20);
  }

  run(query: string, params?: any[] | any, callback?: (err: Error | null) => void) {
    if (typeof params === "function") {
      callback = params;
      params = [];
    }
    
    setTimeout(() => {
      try {
        const trimmedQuery = query.trim().toUpperCase();
        if (trimmedQuery.startsWith("INSERT INTO") && Array.isArray(params)) {
          // params: [id, title, author, description, category, chaptersString]
          const [id, title, author, description, category, chapters] = params;
          this.data[id] = { id, title, author, description, category, chapters };
          fs.writeFileSync(path.resolve(this.filePath), JSON.stringify(this.data, null, 2), "utf-8");
        }
        if (callback) callback(null);
      } catch (err: any) {
        if (callback) callback(err);
      }
    }, 10);
  }

  get(query: string, params: any[], callback: (err: Error | null, row: any) => void) {
    setTimeout(() => {
      try {
        const titleSearch = params[0].toLowerCase().replace(/%/g, "");
        const rows = Object.values(this.data);
        const found = rows.find((row: any) => {
          const t = String(row.title).toLowerCase();
          return t === titleSearch || t.includes(titleSearch);
        });
        callback(null, found || null);
      } catch (err: any) {
        callback(err, null);
      }
    }, 10);
  }
}
