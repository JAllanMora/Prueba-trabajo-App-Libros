import { NextApiHandler } from "next";
import { query } from "@/lib/db";

const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const results = await query(
        `SELECT * FROM books
        `
      );
      return res.json(results);
    }
    if (req.method === "POST") {
      if (!req.body.name) return res.status(400).json({ message: "`name` required" });
      if (!req.body.author) return res.status(400).json({ message: "`author` required" });
      if (!req.body.review) return res.status(400).json({ message: "`review` required" });

      const results = await query(
        `
            INSERT INTO books (name, author, review)
            VALUES (?, ?, ?)
        `,
        [req.body.name, req.body.author, req.body.review]
      );
      return res.json(results);
    }
    if (req.method === "DELETE") {
      if (!req.body.id) return res.status(400).json({ message: "`id` required" });
      const results = await query(
        `
            DELETE
            FROM books
            WHERE id = ?
        `,
        req.body.id
      );
      return res.json(results);
    }

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
