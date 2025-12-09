function startLogin() {
    // tampilkan viewer
    document.getElementById("viewer").style.display = "block";

    // panggil backend login (server yang simpan password asli)
    fetch("/api/login")
        .then(r => r.json())
        .then(d => {
            window.realToken = d.token; // token palsu "SENSOR"
            console.log("Login backend OK");
        });
}

async function loadInbox() {
    let response = await fetch("/api/inbox");
    let data = await response.json();

    let box = document.getElementById("inbox");
    box.innerHTML = "";

    if (!data["hydra:member"].length) {
        box.innerHTML = "Inbox kosong.";
        return;
    }

    data["hydra:member"].forEach(msg => {
        let div = document.createElement("div");
        div.className = "email-item";
        div.innerHTML = `<b>From:</b> ${msg.from.address}<br><b>Subject:</b> ${msg.subject}`;
        div.onclick = () => loadEmail(msg.id);
        box.appendChild(div);
    });
}

async function loadEmail(id) {
    let response = await fetch("/api/inbox?id=" + id);
    let data = await response.json();

    let box = document.getElementById("emailContent");
    box.style.display = "block";
    box.innerHTML = `
        <h3>${data.subject}</h3>
        <p><b>From:</b> ${data.from.address}</p>
        <hr>
        ${data.intro}
    `;
}