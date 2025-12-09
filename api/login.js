export default async function handler(req, res) {
    // pilih akun berdasarkan query ?acc=1 atau ?acc=2
    const acc = req.query.acc;

    const accounts = {
        "1": {
            email: "aseplogimaja@comfythings.com",
            pass: "aseplogimaja"
        },
        "2": {
            email: "EMAIL_ASLI_2",
            pass: "PASSWORD_ASLI_2"
        }
    };

    const selected = accounts[acc];

    if (!selected) {
        return res.status(400).json({ error: "Akun tidak ditemukan" });
    }

    let response = await fetch("https://api.mail.tm/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            address: selected.email,
            password: selected.pass
        })
    });

    let data = await response.json();

    // Simpan token di server (tidak terlihat user)
    global.token = data.token;

    return res.status(200).json({ status: "OK" });
}
