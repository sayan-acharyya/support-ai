(function () {

    const api_Url = "http://localhost:3000/api/chat";

    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data-owner-id");

    if (!ownerId) {
        console.log("owner is not found");
        return;
    }

    // =========================
    // FLOATING BUTTON
    // =========================
    const button = document.createElement("div");
    button.innerHTML = "💬";

    Object.assign(button.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "24px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        zIndex: "999999"
    });

    document.body.appendChild(button);

    // =========================
    // CHAT BOX
    // =========================
    const box = document.createElement("div");

    Object.assign(box.style, {
        position: "fixed",
        bottom: "95px",
        right: "24px",
        width: "340px",
        height: "500px",
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        display: "none",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: "999999",
        fontFamily: "Inter, system-ui, sans-serif",
        border: "1px solid #e5e7eb"
    });

    box.innerHTML = `
    
    <!-- HEADER -->
    <div style="
        background:#000;
        color:#fff;
        padding:14px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    ">
        <div>
            <div style="font-size:14px;font-weight:600;">
                Chat Support
            </div>
            <div style="font-size:11px;opacity:0.7;">
                Typically replies instantly
            </div>
        </div>

        <button id="chat-close" style="
            background:transparent;
            border:none;
            color:#fff;
            font-size:18px;
            cursor:pointer;
        ">✕</button>
    </div>

    <!-- MESSAGES -->
    <div id="chat-messages" style="
        flex:1;
        display:flex;
        flex-direction:column;
        gap:10px;
        padding:12px;
        overflow-y:auto;
        background:#f9fafb;
        min-height:0;
    ">
         
    </div>

    <!-- INPUT -->
    <div style="
        padding:12px;
        border-top:1px solid #e5e7eb;
        display:flex;
        gap:10px;
        align-items:center;
        background:#fff;
    ">
        <input id="chat-input" type="text" placeholder="Type your message..." style="
            flex:1;
            height:42px;
            border:1px solid #d1d5db;
            border-radius:12px;
            padding:0 12px;
            outline:none;
            background:#f9fafb;
            font-size:14px;
        "/>

        <button id="chat-send" style="
            width:42px;
            height:42px;
            border:none;
            border-radius:12px;
            background:#000;
            color:#fff;
            cursor:pointer;
            font-size:16px;
            display:flex;
            align-items:center;
            justify-content:center;
        ">➤</button>
    </div>
    `;

    document.body.appendChild(box);

    // =========================
    // TOGGLE OPEN
    // =========================
    button.addEventListener("click", () => {
        box.style.display = box.style.display === "none" ? "flex" : "none";
    });

    // =========================
    // CLOSE BUTTON
    // =========================
    document.addEventListener("click", (e) => {
        if (e.target.id === "chat-close") {
            box.style.display = "none";
        }
    });

    const input = document.querySelector("#chat-input")
    const sendBtn = document.querySelector("#chat-send")
    const messageArea = document.querySelector("#chat-messages")

    function addMessage(text, from) {
        const bubble = document.createElement("div")
        bubble.innerHTML = text
        Object.assign(bubble.style, {
            maxWidth: "78%",
            padding: "8px 12px",
            borderRadius: "14px",
            fontSize: "13px",
            lineHeight: "1.4",
            marginBottom: "8px",
            alignSelf: from === "user" ? "flex-end" : "flex-start",
            background: from === "user" ? "#000" : "#e5e7eb",
            color: from === "user" ? "#fff" : "#111",

            /* Bubble direction polish */
            borderTopRightRadius: from === "user" ? "4px" : "14px",
            borderTopLeftRadius: from === "user" ? "14px" : "4px",
        })

        messageArea.appendChild(bubble);
        messageArea.scrollTop = messageArea.scrollHeight
    }

     sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    // typing indicator
    const typing = document.createElement("div");
    typing.innerHTML = "Typing...";
    Object.assign(typing.style, {
        fontSize: "12px",
        color: "#6b7280",
        marginBottom: "8px",
        alignSelf: "flex-start"
    });

    messageArea.appendChild(typing);
    messageArea.scrollTop = messageArea.scrollHeight;

    try {
        // simulate API call delay (replace with real fetch)
        const res = await fetch(api_Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: text,
                ownerId
            })
        });

        const data = await res.json();

        // remove typing BEFORE showing response
        typing.remove();
        addMessage(data.reply || "semething went wrong", "bot");

    } catch (err) {
        typing.remove();
        addMessage("Error getting response", "bot");
        console.error(err);
    }
};



})();
