// ===========================
// EMAILJS CONFIGURATION
// ===========================
// Configuration loaded from config.js (not tracked in git)
const EMAILJS_PUBLIC_KEY = CONFIG.EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = CONFIG.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = CONFIG.EMAILJS_TEMPLATE_ID;

// ===========================
// GIFT DATA
// ===========================
const gifts = [
    // Romantic & Valentine's
    { id: 1, name: 'Rose', icon: '🌹' },
    { id: 2, name: 'Flowers', icon: '💐' },
    { id: 3, name: 'Heart', icon: '❤️' },
    { id: 4, name: 'Ring', icon: '💍' },
    { id: 5, name: 'Love Letter', icon: '💌' },
    
    // Sweet Treats (Universal)
    { id: 6, name: 'Chocolates', icon: '🍫' },
    { id: 7, name: 'Cake', icon: '🎂' },
    { id: 8, name: 'Cookie', icon: '🍪' },
    { id: 9, name: 'Ice Cream', icon: '🍦' },
    { id: 10, name: 'Cupcake', icon: '🧁' },
    
    // Cute & Fun (Kids & Friends)
    { id: 11, name: 'Teddy Bear', icon: '🧸' },
    { id: 12, name: 'Balloons', icon: '🎈' },
    { id: 13, name: 'Gift Box', icon: '🎁' },
    { id: 14, name: 'Football', icon: '⚽' },
    { id: 15, name: 'Trophy', icon: '🏆' },
    
    // Everyday & Casual (Friends & Colleagues)
    { id: 16, name: 'Coffee', icon: '☕' },
    { id: 17, name: 'Pizza', icon: '🍕' },
    { id: 18, name: 'Book', icon: '📚' },
    { id: 19, name: 'Donut', icon: '🍩' },
    { id: 20, name: 'Sunflower', icon: '🌻' },
    
    // Fancy & Elegant (Parents & Mentors)
    { id: 21, name: 'Perfume', icon: '🧴' },
    { id: 22, name: 'Candle', icon: '🕯️' },
    { id: 23, name: 'Wallet', icon: '👛' },
    { id: 24, name: 'Watch', icon: '⌚' },
    { id: 25, name: 'Diamond', icon: '💎' },
];

// ===========================
// STATE MANAGEMENT
// ===========================
let selectedGifts = [];
let currentStep = 1;

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Initialize gift grid
    initGiftGrid();
});

/**
 * Initialize the gift grid with all available gifts
 */
function initGiftGrid() {
    const grid = document.getElementById('giftGrid');
    
    gifts.forEach(gift => {
        const item = document.createElement('div');
        item.className = 'gift-item';
        item.dataset.id = gift.id;
        item.innerHTML = `
            <div class="gift-icon">${gift.icon}</div>
            <div class="gift-name">${gift.name}</div>
        `;
        item.addEventListener('click', () => toggleGift(gift));
        grid.appendChild(item);
    });
}

// ===========================
// GIFT SELECTION
// ===========================
/**
 * Toggle gift selection on/off
 * @param {Object} gift - The gift object to toggle
 */
function toggleGift(gift) {
    const index = selectedGifts.findIndex(g => g.id === gift.id);
    const item = document.querySelector(`[data-id="${gift.id}"]`);

    if (index > -1) {
        // Gift is already selected, remove it
        selectedGifts.splice(index, 1);
        item.classList.remove('selected');
    } else {
        // Gift is not selected
        if (selectedGifts.length < 5) {
            selectedGifts.push(gift);
            item.classList.add('selected');
        } else {
            alert('You can select up to 5 items only! 🎁');
            return;
        }
    }

    updateSelectedCount();
}

/**
 * Update the selected count display and button state
 */
function updateSelectedCount() {
    const count = document.getElementById('selectedCount');
    const nextBtn = document.getElementById('nextBtn1');

    count.textContent = selectedGifts.length;
    nextBtn.disabled = selectedGifts.length === 0;
}

// ===========================
// NAVIGATION
// ===========================
/**
 * Navigate to the next step
 */
function nextStep() {
    if (currentStep < 4) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateStepIndicator();
    }
}

/**
 * Navigate to the previous step
 */
function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        updateStepIndicator();
    }
}

/**
 * Update the visual step indicator
 */
function updateStepIndicator() {
    // Update circles
    document.querySelectorAll('.step-circle').forEach((circle, index) => {
        const stepNum = index + 1;
        if (stepNum <= currentStep) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    // Update lines
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    
    if (currentStep >= 2) {
        line1.classList.add('active');
    } else {
        line1.classList.remove('active');
    }
    
    if (currentStep >= 3) {
        line2.classList.add('active');
    } else {
        line2.classList.remove('active');
    }
}

// ===========================
// GIFT SENDING
// ===========================
/**
 * Validate and send the gift via email
 */
function sendGift() {
    const email = document.getElementById('recipientEmail').value;
    const name = document.getElementById('senderName').value;
    const message = document.getElementById('message').value;

    // Validation
    if (!email || !name) {
        alert('Please fill in all required fields! 💌');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address! 📧');
        return;
    }

    // Display message and sender in success page
    const displayMessage = document.getElementById('displayMessage');
    const displaySender = document.getElementById('displaySender');
    
    const finalMessage = message.trim() || 'Sending you love and warm wishes! 💝';
    displayMessage.textContent = `"${finalMessage}"`;
    displaySender.textContent = name;
    
    // Show wrapping animation
    nextStep();

    // Prepare gift list for email
    const giftList = selectedGifts.map(g => `${g.icon} ${g.name}`).join(', ');

    // Email template parameters
    const templateParams = {
        to_email: email,
        from_name: name,
        message: finalMessage,
        gifts: giftList
    };

    // Send email via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(
            function(response) {
                console.log('✅ Email sent successfully!', response.status, response.text);
                // Show success after 3 seconds
                setTimeout(() => {
                    nextStep();
                }, 3000);
            },
            function(error) {
                console.error('❌ Email failed to send:', error);
                alert('Oops! There was an error sending the gift. Please try again! 💔');
                // Go back to form
                prevStep();
            }
        );
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===========================
// RESET
// ===========================
/**
 * Reset the entire application to initial state
 */
function resetApp() {
    // Clear state
    selectedGifts = [];
    currentStep = 1;
    
    // Clear gift selections
    document.querySelectorAll('.gift-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Clear form inputs
    document.getElementById('recipientEmail').value = '';
    document.getElementById('senderName').value = '';
    document.getElementById('message').value = '';
    
    // Reset sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    
    // Update UI
    updateSelectedCount();
    updateStepIndicator();
}