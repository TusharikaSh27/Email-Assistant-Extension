console.log("Email Assistant Loaded");

/* ----------------------------------------------------
   GET EMAIL CONTENT
---------------------------------------------------- */
function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) return content.innerText.trim();
    }

    return '';
}

/* ----------------------------------------------------
   FIND COMPOSE OR REPLY TOOLBAR
---------------------------------------------------- */
function findComposeToolbar() {
    const selectors = [
        '.btC',                   // New compose bottom toolbar
        '.aDh',                   // Compose formatting bar
        '.amn',                   // INLINE REPLY TOOLBAR (IMPORTANT)
        '.gU.Up',                 // Reply “send” area
        '[aria-label="More options"]',
        '[role="toolbar"]',
        '[gh="mtb"]'
    ];

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }

    return null;
}

/* ----------------------------------------------------
   CREATE AI BUTTON
---------------------------------------------------- */
function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

/* ----------------------------------------------------
   INJECT AI BUTTON
---------------------------------------------------- */
function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found yet...");
        return;
    }

    console.log("Toolbar found — injecting AI button");

    const button = createAIButton();

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.style.opacity = '0.6';
            button.disabled = true;

            const emailContent = getEmailContent();

            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) throw new Error("API Request Failed");

            const generatedReply = await response.text();

            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }

        } catch (error) {
            console.error("Error generating reply:", error);

        } finally {
            button.innerHTML = 'AI Reply';
            button.style.opacity = '1';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

/* ----------------------------------------------------
   OBSERVE FOR COMPOSE & REPLY WINDOWS
---------------------------------------------------- */
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = [...mutation.addedNodes];

        const hasComposeOrReply = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (
                node.matches?.('.aDh, .btC, .amn, [role="dialog"]') ||   // include REPLY toolbar
                node.querySelector?.('.aDh, .btC, .amn, [role="dialog"]')
            )
        );

        if (hasComposeOrReply) {
            console.log("Compose or Reply Window Detected");

            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                const toolbar = findComposeToolbar();

                if (toolbar) {
                    injectButton();
                    clearInterval(interval);
                }

                if (attempts > 10) clearInterval(interval);
            }, 200);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
