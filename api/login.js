export default async function handler(req, res) {
  const acc = req.query.acc;

  // Ambil data dari environment variables (AMAN)
  const accounts = {
    "1": {
      email: aseplogimaja@comfythings.com,
      pass: aseplogimaja
    },
    "2": {
      email: process.env.ACC2_EMAIL,
      pass: process.env.ACC2_PASS
    }
  };

  const selected = accounts[acc];

  if (!selected || !selected.email || !selected.pass) {
    return res.status(400).json({ error: "Akun tidak ditemukan atau env vars belum dibuat." });
  }

  const r = await fetch("https://api.mail.tm/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address: selected.email,
      password: selected.pass
    })
  });

  const data = await r.json();

  if (!data.token) {
    return res.status(500).json({ error: "Login gagal ke Mail.tm", detail: data });
  }

  return res.status(200).json({ token: data.token });
}