function loginSelected() {
    const selected = document.getElementById("emailSelect").value;

    // panggil login backend
    fetch("/api/login?acc=" + selected)
        .then(res => res.json())
        .then(() => {
            document.getElementById("viewer").style.display = "block";
            loadInbox();
        });
}

async function loadInbox() {
    let res = await fetch("/api/inbox");
    let data = await res.json();

    let box = document.getElementById("inbox");
    box.innerHTML = "";

    if (!data["hydra:member"].length) {
        box.innerHTML = "Inbox kosong.";
        return;
    }

    data["hydra:member"].forEach(msg => {
        let div = document.createElement("div");
        div.className = "email-item";
        div.innerHTML =
            `<b>From:</b> ${msg.from.address}<br>
             <b>Subject:</b> ${msg.subject}`;
        div.onclick = () => loadEmail(msg.id);
        box.appendChild(div);
    });
}

async function loadEmail(id) {
    let res = await fetch("/api/inbox?id=" + id);
    let data = await res.json();

    let box = document.getElementById("emailContent");
    box.style.display = "block";

    box.innerHTML = `
        <h3>${data.subject}</h3>
        <p><b>From:</b> ${data.from.address}</p>
        <hr>
        ${data.intro}
    `;
}