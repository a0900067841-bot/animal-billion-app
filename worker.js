export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("億家即時通 API 已啟動 🚀", {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    if (url.pathname === "/init") {
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      return new Response("資料表建立成功！");
    }

    if (url.pathname === "/users") {
      const result = await env.DB.prepare(
        "SELECT * FROM users ORDER BY id DESC"
      ).all();

      return Response.json(result.results);
    }

    return new Response("404 Not Found", {
      status: 404,
    });
  },
};
