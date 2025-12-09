export default async function handler(req, res) {
    const token = global.token;

    // jika buka 1 email
    if (req.query.id) {
        let r = await fetch(`https://api.mail.tm/messages/${req.query.id}`, {
            headers: { Authorization: "Bearer " + token }
        });
        let d = await r.json();
        return res.status(200).json(d);
    }

    // ambil inbox
    let response = await fetch("https://api.mail.tm/messages", {
        headers: { Authorization: "Bearer " + token }
    });

    let data = await response.json();
    res.status(200).json(data);
}
