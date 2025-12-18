document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const chatBtn = document.getElementById('chatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // --- STATE MANAGEMENT ---
    let isChatOpen = false;

    // --- EVENT LISTENERS ---

    // Open Chat
    if(chatBtn) {
        chatBtn.addEventListener('click', () => {
            isChatOpen = true;
            chatWindow.classList.add('active');
            setTimeout(() => chatInput.focus(), 300); // Focus input for UX
        });
    }

    // Close Chat
    if(closeChat) {
        closeChat.addEventListener('click', () => {
            isChatOpen = false;
            chatWindow.classList.remove('active');
        });
    }

    // Send Message via Button
    if(sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    // Send Message via Enter Key
    if(chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // --- CORE FUNCTIONS ---

    function sendMessage() {
        const text = chatInput.value.trim();
        
        if (text) {
            // 1. Display User Message
            addMessage(text, 'user');
            
            // 2. Clear Input
            chatInput.value = '';

            // 3. Show "Typing..." indicator (Simulated)
            const typingId = showTypingIndicator();

            // 4. Process Logic & Reply
            setTimeout(() => {
                removeTypingIndicator(typingId);
                const botResponse = generateResponse(text);
                addMessage(botResponse, 'bot');
            }, 800); // Natural delay
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = text; // innerHTML allows us to send clickable links
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', 'bot');
        msgDiv.id = id;
        msgDiv.style.opacity = '0.7';
        msgDiv.style.fontStyle = 'italic';
        msgDiv.innerText = 'Concierge is typing...';
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // --- INTELLIGENCE / KNOWLEDGE BASE ---
    
    function generateResponse(input) {
        const lowerInput = input.toLowerCase();

        // --- GREETINGS ---
        if (lowerInput.match(/\b(hi|hello|hey|start)\b/)) {
            return "Greetings. I am the Britium Concierge. I can assist with Luxury Handbags, Corporate Gifts, Logistics, or Order Support. How may I help?";
        }

        // --- CUSTOMER SERVICE ---
        if (lowerInput.includes('track') || lowerInput.includes('order status') || lowerInput.includes('where is my')) {
            return "You can track the status of your shipment on our <a href='track_order.html' style='color:#fff; text-decoration:underline;'>Tracking Page</a> using your Order ID.";
        }

        if (lowerInput.includes('return') || lowerInput.includes('refund') || lowerInput.includes('exchange')) {
            return "We accept returns within 30 days. To initiate a request, please visit our <a href='return_request.html' style='color:#fff; text-decoration:underline;'>Return Center</a>.";
        }

        if (lowerInput.includes('location') || lowerInput.includes('store') || lowerInput.includes('address') || lowerInput.includes('map')) {
            return "Our flagship showroom is located at No. 277, Anawrahta Road, East Dagon. View all branches on our <a href='store_locator.html' style='color:#fff; text-decoration:underline;'>Store Locator</a>.";
        }

        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('support')) {
            return "You may reach our team via the form on our <a href='contact_us.html' style='color:#fff; text-decoration:underline;'>Contact Page</a> or call us directly.";
        }

        if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('hiring') || lowerInput.includes('work')) {
            return "We are currently seeking talent for Store Managers and Sales Associates. Apply now at our <a href='careers.html' style='color:#fff; text-decoration:underline;'>Careers Page</a>.";
        }

        // --- PRODUCT SPECIFIC KNOWLEDGE ---

        // 1. Handbags / Fashion
        if (lowerInput.includes('bag') || lowerInput.includes('tote') || lowerInput.includes('fashion') || lowerInput.includes('collection')) {
            return "Our 'V Collection' and 'Monogram Series' are currently trending. Visit the <a href='shop.html' style='color:#fff; text-decoration:underline;'>Shop</a> to view the latest arrivals.";
        }

        // 2. Tech / Dual Screen
        if (lowerInput.includes('screen') || lowerInput.includes('monitor') || lowerInput.includes('tech') || lowerInput.includes('display')) {
            return "Boost your productivity with our <strong>Dual Screen Extender</strong>. It's portable, lightweight, and 1080p. <a href='dual_screen_extender.html' style='color:#fff; text-decoration:underline;'>View Tech Details</a>.";
        }

        // 3. Flexitanks / Logistics
        if (lowerInput.includes('liquid') || lowerInput.includes('tank') || lowerInput.includes('oil') || lowerInput.includes('transport') || lowerInput.includes('logistics')) {
            return "We offer certified <strong>Flexitank Solutions</strong> for bulk liquid transport (12k-24k Liters). <a href='flexitank.html' style='color:#fff; text-decoration:underline;'>Learn about Logistics</a>.";
        }

        // 4. Corporate Gifts
        if (lowerInput.includes('gift') || lowerInput.includes('corporate') || lowerInput.includes('promo') || lowerInput.includes('pen') || lowerInput.includes('notebook')) {
            return "Looking for branded solutions? Explore our <strong>Promotional Gifts</strong> catalog for corporate events. <a href='promotiongift.html' style='color:#fff; text-decoration:underline;'>View Catalog</a>.";
        }

        // --- DEFAULT FALLBACK ---
        return "I apologize, I didn't quite catch that. You can ask me about 'Tracking', 'Handbags', 'Flexitanks', or 'Corporate Gifts'.";
    }
});
