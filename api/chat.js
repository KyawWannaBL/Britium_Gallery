document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const chatBtn = document.getElementById('chatBtn');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // --- State ---
    let isChatOpen = false;

    // --- Event Listeners ---
    
    // Toggle Chat Window
    chatBtn.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatWindow.classList.add('active');
            // Focus input when opening
            setTimeout(() => chatInput.focus(), 300);
        } else {
            chatWindow.classList.remove('active');
        }
    });

    // Close Chat Button
    closeChat.addEventListener('click', () => {
        isChatOpen = false;
        chatWindow.classList.remove('active');
    });

    // Send Message on Button Click
    sendBtn.addEventListener('click', sendMessage);

    // Send Message on Enter Key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- Core Functions ---

    function sendMessage() {
        const text = chatInput.value.trim();
        
        if (text) {
            // 1. Add User Message to UI
            addMessage(text, 'user');
            
            // 2. Clear Input
            chatInput.value = '';

            // 3. Simulate Bot "Thinking" Delay
            const loadingId = showTypingIndicator();

            // 4. Generate & Display Bot Response
            setTimeout(() => {
                removeTypingIndicator(loadingId);
                const botResponse = getBotResponse(text);
                addMessage(botResponse, 'bot');
            }, 800); // 800ms natural delay
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        
        // Simple HTML sanitization for text
        msgDiv.innerText = text; 
        
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
        msgDiv.style.fontStyle = 'italic';
        msgDiv.style.opacity = '0.7';
        msgDiv.innerText = 'Concierge is typing...';
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    // --- Bot Logic / Knowledge Base ---
    // Based on Britium Gallery System Instructions
    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();

        // 1. GREETINGS
        if (lowerInput.match(/\b(hi|hello|hey|greetings|start)\b/)) {
            return "Good day. Welcome to Britium Gallery. I am your personal concierge. How may I assist you with your luxury shopping experience today?";
        }

        // 2. ORDER TRACKING
        if (lowerInput.includes('track') || lowerInput.includes('where is my order') || lowerInput.includes('status')) {
            return "To track your shipment, please provide your Order Number. You can view the status—from Processing to Delivery—on our 'Track Order' page found in the main menu.";
        }

        // 3. RETURNS & REFUNDS
        if (lowerInput.includes('return') || lowerInput.includes('refund') || lowerInput.includes('exchange')) {
            return "We accept returns within 30 days of purchase. Items must be in their original, unused condition with tags attached. You may submit a request via our Return Panel with your reason (e.g., Defective, Wrong Item).";
        }

        // 4. STORE LOCATIONS
        if (lowerInput.includes('location') || lowerInput.includes('store') || lowerInput.includes('address') || lowerInput.includes('visit')) {
            return "Our flagship location is at No. 277, Anawrahta Road, 9th Ward, East Dagon. We also have locations operating in Yangon and Mandalay.";
        }

        // 5. CONTACT & SUPPORT
        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('support')) {
            return "You may reach our client services team directly at info@britiumgallery.com or by calling 09897447744.";
        }

        // 6. SHIPPING INFO
        if (lowerInput.includes('shipping') || lowerInput.includes('delivery') || lowerInput.includes('cost')) {
            return "We offer Standard Shipping (3-5 business days). Shipping is complimentary on all orders over $100.";
        }

        // 7. CAREERS
        if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('hiring') || lowerInput.includes('work')) {
            return "We are currently looking for talent in New York, Los Angeles, and remote roles. Please send your resume to careers@britiumgallery.com.";
        }

        // 8. PRODUCTS
        if (lowerInput.includes('bag') || lowerInput.includes('handbag') || lowerInput.includes('tote') || lowerInput.includes('collection')) {
            return "Our collection features exquisite pieces like the Quilted Shoulder Bag, Monogram Totes, and Structured Leather Satchels. Would you like to see our New Arrivals?";
        }

        // DEFAULT FALLBACK
        return "I apologize, I didn't quite catch that. As the Britium Concierge, I can assist you with Order Tracking, Returns, Store Locations, or Product Information. How may I help?";
    }
});
