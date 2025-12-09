export default async function handler(req, res) {
    let token = global.token;

    // kalau user ingin membuka satu email
    if (req.query.id) {
        let response = await fetch(`https://api.mail.tm/messages/${req.query.id}`, {
            headers: { Authorization: "Bearer " + token }
        });
        let data = await response.json();
        return res.status(200).json(data);
    }

    // ambil semua inbox
    let response = await fetch("https://api.mail.tm/messages", {
        headers: { Authorization: "Bearer " + token }
    });

    let data = await response.json();
    res.status(200).json(data);
}
