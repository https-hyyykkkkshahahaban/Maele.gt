export default async function handler(req, res) {

    const realEmail = "aseplogimaja@comfythings.com";
    const realPassword = "aseplogimaja";

    let response = await fetch("https://api.mail.tm/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            address: realEmail,
            password: realPassword
        })
    });

    let data = await response.json();

    // simpan token di server (tidak terlihat user)
    global.token = data.token;

    // kirim token palsu
    res.status(200).json({ token: "SENSOR" });
}
