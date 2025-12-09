export default async function handler(req, res) {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ error: "Token tidak ditemukan" });
  }

  // Ambil 1 email
  if (req.query.id) {
    const r = await fetch(`https://api.mail.tm/messages/${req.query.id}`, {
      headers: { Authorization: "Bearer " + token }
    });
    const d = await r.json();
    return res.status(200).json(d);
  }

  // Ambil semua inbox
  const r = await fetch("https://api.mail.tm/messages", {
    headers: { Authorization: "Bearer " + token }
  });

  const d = await r.json();
  return res.status(200).json(d);
}