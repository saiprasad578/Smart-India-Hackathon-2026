/* =========================================================
   AgriDirect - Common Shared Engine, WhatsApp Bot & Voice AI
   Smart India Hackathon 2026
   ========================================================= */

// Default Seed Data
const DEFAULT_PRODUCTS = [
    {
        id: "PROD-101",
        name: "Fresh Hybrid Tomatoes",
        hindiName: "ताज़ा टमाटर",
        category: "Vegetables",
        emoji: "🍅",
        directPrice: 28,
        mandiPrice: 16,
        retailPrice: 42,
        farmer: "Ramesh FPO",
        location: "Kolar Cluster, Karnataka",
        availableQty: 1200,
        unit: "kg",
        harvestDate: "Harvested 6 hrs ago",
        grade: "Grade A+ (Moisture 94%)",
        type: "b2c-b2b",
        verified: true
    },
    {
        id: "PROD-102",
        name: "Nashik Red Onions",
        hindiName: "लाल प्याज़",
        category: "Vegetables",
        emoji: "🧅",
        directPrice: 24,
        mandiPrice: 14,
        retailPrice: 38,
        farmer: "Sahyadri Farmers FPO",
        location: "Lasalgaon, Nashik",
        availableQty: 3500,
        unit: "kg",
        harvestDate: "Cured & Graded yesterday",
        grade: "Grade A Export Quality",
        type: "b2c-b2b",
        verified: true
    },
    {
        id: "PROD-103",
        name: "Traditional Basmati Rice (1121)",
        hindiName: "बासमती चावल",
        category: "Grains",
        emoji: "🌾",
        directPrice: 78,
        mandiPrice: 54,
        retailPrice: 110,
        farmer: "Krishna Valley Agro",
        location: "Karnal Belt, Haryana",
        availableQty: 5000,
        unit: "kg",
        harvestDate: "Fresh Milling Batch",
        grade: "Aged 12 Months, Extra Long Grain",
        type: "b2b",
        verified: true
    },
    {
        id: "PROD-104",
        name: "Ratnagiri Alphonso Mango",
        hindiName: "हापुस आम",
        category: "Fruits",
        emoji: "🥭",
        directPrice: 140,
        mandiPrice: 85,
        retailPrice: 220,
        farmer: "Devgad Mango Producers",
        location: "Ratnagiri, Maharashtra",
        availableQty: 800,
        unit: "kg",
        harvestDate: "Tree-ripened 12 hrs ago",
        grade: "GI Tag Certified Organic",
        type: "b2c-b2b",
        verified: true
    },
    {
        id: "PROD-105",
        name: "Agra Kufri Jyoti Potatoes",
        hindiName: "आगरा आलू",
        category: "Vegetables",
        emoji: "🥔",
        directPrice: 22,
        mandiPrice: 12,
        retailPrice: 34,
        farmer: "Braj Bhoomi FPO",
        location: "Agra, Uttar Pradesh",
        availableQty: 4200,
        unit: "kg",
        harvestDate: "Cold Room Stored (0-4°C)",
        grade: "Size 45mm+, Low Sugar",
        type: "b2c-b2b",
        verified: true
    },
    {
        id: "PROD-106",
        name: "Shimla Royal Delicious Apples",
        hindiName: "शिमला सेब",
        category: "Fruits",
        emoji: "🍎",
        directPrice: 110,
        mandiPrice: 72,
        retailPrice: 175,
        farmer: "Kinnaur Mountain Orchard",
        location: "Kotkhai, Himachal Pradesh",
        availableQty: 1500,
        unit: "kg",
        harvestDate: "Fresh Orchard Pluck",
        grade: "Grade A Wax-Free",
        type: "b2c-b2b",
        verified: true
    },
    {
        id: "PROD-107",
        name: "Punjab Sharbati Durum Wheat",
        hindiName: "शरबती गेहूँ",
        category: "Grains",
        emoji: "🌾",
        directPrice: 32,
        mandiPrice: 22,
        retailPrice: 48,
        farmer: "Malwa Progressive Farmers",
        location: "Bathinda, Punjab",
        availableQty: 8000,
        unit: "kg",
        harvestDate: "Machine Cleaned Lot",
        grade: "Protein 14.2%, Moisture 10%",
        type: "b2b",
        verified: true
    },
    {
        id: "PROD-108",
        name: "Guntur Sannam Red Chillies",
        hindiName: "गुंटूर लाल मिर्च",
        category: "Spices",
        emoji: "🌶️",
        directPrice: 190,
        mandiPrice: 135,
        retailPrice: 280,
        farmer: "Andhra Spices Syndicate",
        location: "Guntur, Andhra Pradesh",
        availableQty: 950,
        unit: "kg",
        harvestDate: "Sun-dried Natural Lot",
        grade: "SHU 35,000 High Pungency",
        type: "b2c-b2b",
        verified: true
    }
];

const DEFAULT_ORDERS = [
    {
        id: "ORD-1024",
        buyer: "FreshMart Hypermarket",
        farmer: "Ramesh FPO",
        product: "Fresh Hybrid Tomatoes",
        emoji: "🍅",
        qty: "500 kg",
        total: 14000,
        mandiCost: 21000, // what buyer would pay retail/mandi
        farmerGain: 6000, // extra ₹ compared to mandi
        status: "Delivered",
        statusCode: "delivered",
        date: "Today, 10:30 AM",
        destination: "Hyderabad Central Distribution Hub",
        transitTemp: "4.2°C",
        escrowStatus: "Released to Farmer UPI (HDFC)"
    },
    {
        id: "ORD-1023",
        buyer: "Green Foods Corp (Bulk)",
        farmer: "Krishna Valley Agro",
        product: "Traditional Basmati Rice",
        emoji: "🌾",
        qty: "1,200 kg",
        total: 93600,
        mandiCost: 132000,
        farmerGain: 28800,
        status: "In Transit",
        statusCode: "transit",
        date: "Today, 08:15 AM",
        destination: "Bengaluru Whitefield Hub",
        transitTemp: "Ambient Dry (21°C)",
        escrowStatus: "Held in Escrow (Release upon QC)"
    },
    {
        id: "ORD-1022",
        buyer: "City Supermarket Chain",
        farmer: "Sahyadri Farmers FPO",
        product: "Nashik Red Onions",
        emoji: "🧅",
        qty: "800 kg",
        total: 19200,
        mandiCost: 30400,
        farmerGain: 8000,
        status: "QC Inspection",
        statusCode: "pending",
        date: "Yesterday, 04:45 PM",
        destination: "Mumbai APMC Bypass Hub",
        transitTemp: "Ventilated (14°C)",
        escrowStatus: "Assay Verified, Payout Queued"
    },
    {
        id: "ORD-1021",
        buyer: "Sunita Sharma (Consumer Basket)",
        farmer: "Devgad Mango Producers",
        product: "Ratnagiri Alphonso Mango",
        emoji: "🥭",
        qty: "10 kg",
        total: 1400,
        mandiCost: 2200,
        farmerGain: 550,
        status: "Delivered",
        statusCode: "delivered",
        date: "14 Sep 2026",
        destination: "Pune Kothrud Doorstep",
        transitTemp: "Chilled (8°C)",
        escrowStatus: "Released to Farmer UPI"
    }
];

// Seed storage if empty
function seedLocalStorage() {
    if (!localStorage.getItem("agridirect_products")) {
        localStorage.setItem("agridirect_products", JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem("agridirect_orders")) {
        localStorage.setItem("agridirect_orders", JSON.stringify(DEFAULT_ORDERS));
    }
    if (!localStorage.getItem("agridirect_cart")) {
        localStorage.setItem("agridirect_cart", JSON.stringify([]));
    }
    if (!localStorage.getItem("agridirect_lang")) {
        localStorage.setItem("agridirect_lang", "hi");
    }
}

seedLocalStorage();

// Getters
function getProducts() {
    return JSON.parse(localStorage.getItem("agridirect_products")) || DEFAULT_PRODUCTS;
}

function getOrders() {
    return JSON.parse(localStorage.getItem("agridirect_orders")) || DEFAULT_ORDERS;
}

function getCart() {
    return JSON.parse(localStorage.getItem("agridirect_cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("agridirect_cart", JSON.stringify(cart));
    updateCartCountBadge();
}

function updateCartCountBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll(".cart-count");
    badges.forEach(b => {
        b.innerText = totalCount;
        b.style.display = totalCount > 0 ? "grid" : "none";
    });
}

// Toast notification helper
function showToast(message, icon = "✓") {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span style="font-size:18px;">${icon}</span> <span>${message}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}

// =========================================================
// VOICE & SPEECH SYNTHESIS ENGINE (Vernacular Accessibility)
// =========================================================
function speakText(text, lang = "hi-IN") {
    if (!("speechSynthesis" in window)) {
        showToast("Audio: " + text, "🔊");
        return;
    }
    window.speechSynthesis.cancel(); // cancel prior speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = lang;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang && v.lang.startsWith(lang.split('-')[0]));
    if (matchedVoice) utterance.voice = matchedVoice;

    window.speechSynthesis.speak(utterance);
}

// =========================================================
// MULTI-LANGUAGE VERNACULAR ENGINE (9 Indian Languages)
// =========================================================
const SUPPORTED_LANGUAGES = [
    { code: "hi", name: "Hindi", native: "हिंदी", speechCode: "hi-IN" },
    { code: "en", name: "English", native: "English", speechCode: "en-IN" },
    { code: "te", name: "Telugu", native: "తెలుగు", speechCode: "te-IN" },
    { code: "mr", name: "Marathi", native: "मराठी", speechCode: "mr-IN" },
    { code: "ta", name: "Tamil", native: "தமிழ்", speechCode: "ta-IN" },
    { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", speechCode: "kn-IN" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", speechCode: "pa-IN" },
    { code: "bn", name: "Bengali", native: "বাংলা", speechCode: "bn-IN" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી", speechCode: "gu-IN" }
];

let currentGlobalLang = localStorage.getItem("agridirect_lang") || "hi";

const I18N_DICT = {
    hi: {
        audioPill: "आज का भाव सुनें (Audio)",
        saralBtn: "सरल किसान मोड",
        sidebarVoiceTitle: "अनपढ़ / ग्रामीण किसान",
        sidebarVoiceDesc: "बिना पढ़े केवल बोलकर या तस्वीर छूकर फसल बेचें",
        dailySpeech: "नमस्ते किसान भाई! आज का भाव: टमाटर ₹28 प्रति किलो, प्याज़ ₹24, बासमती चावल ₹78. एग्रीडायरेक्ट पर मंडी से 60% ज़्यादा मुनाफा मिल रहा है। बेचने के लिए नीचे बटन दबाएं।",
        langNotice: "भाषा हिंदी चुनी गई है।",
        saralStep1: "1️⃣ फसल चुनें (Select Crop)",
        saralStep2: "2️⃣ बोरी/मात्रा चुनें (Quantity)",
        saralStep3: "3️⃣ पक्का करें (Confirm)",
        saralPrompt1: "नमस्ते! जिस फसल को बेचना चाहते हैं, उस पर अंगूठा लगाएं।",
        saralPrompt2: "अब अपनी फसल की मात्रा या बोरी चुनें।",
        saralPrompt3: "बधाई! जांचें और नीचे हरा बटन दबाकर बिक्री पक्की करें।",
        saralNext: "आगे बढ़ें (Next) ➔",
        saralBack: "⬅ वापस (Back)",
        saralConfirm: "✅ हां, पक्का बेचें! (Confirm Sale)",
        wa: {
            title: "किसान व्हाट्सएप साथी 🌾",
            subtitle: "बोलकर या लिखकर भाव जानें व फसल बेचें",
            welcome: "🙏 राम-राम किसान भाई! मैं एग्रीडायरेक्ट का डिजिटल साथी हूँ।\n\nआप मुझे बोलकर (माइक 🎙️ दबाकर) या नीचे दिए बटन दबाकर बता सकते हैं:",
            chipMandi: "💰 आज का भाव",
            chipSell: "🌾 फसल बेचें (सीधा खरीददार)",
            chipVan: "🚚 पिकअप गाड़ी मंगाएं",
            chipMoney: "💵 मेरा पैसा (UPI खाता)",
            placeholder: "यहाँ लिखें या माइक 🎙️ दबाकर बोलें...",
            listening: "🎙️ आपकी बात सुन रहे हैं... बोलिए...",
            voiceSample: "🎙️ आवाज़ नोट: '500 किलो टमाटर तैयार है, गाड़ी कब आएगी?'",
            voiceReply: "✅ आपकी आवाज़ समझ ली गई है!\n🍅 टमाटर: 500 किग्रा\n💰 आपको मिलेंगे: ₹28/किग्रा (मंडी रेट ₹16 से +₹12 ज़्यादा!)\n🚚 पिकअप गाड़ी: कल सुबह 8:30 बजे आपके खेत/FPO पर पहुंचेगी। क्या पक्का करें?",
            mandiReply: "📊 **आज का लाइव मंडी vs एग्रीडायरेक्ट रेट:**\n🍅 टमाटर: मंडी ₹16 | डायरेक्ट ₹28 (+75%)\n🧅 प्याज़: मंडी ₹14 | डायरेक्ट ₹24 (+71%)\n🌾 बासमती: मंडी ₹54 | डायरेक्ट ₹78 (+44%)\n🥭 आम: मंडी ₹85 | डायरेक्ट ₹140 (+65%)\n\nसीधे बेचने के लिए 'फसल बेचें' दबाएं।"
        }
    },
    en: {
        audioPill: "Listen Daily Rates (Audio)",
        saralBtn: "Easy Farmer Mode",
        sidebarVoiceTitle: "Rural Farmer Voice Help",
        sidebarVoiceDesc: "Sell crops by speaking or tapping photos",
        dailySpeech: "Hello farmer friend! Today's direct price: Tomatoes ₹28 per kg, Onions ₹24, Basmati Rice ₹78. You get 60% more profit than traditional mandis. Press below to sell directly.",
        langNotice: "Language switched to English.",
        saralStep1: "1️⃣ Select Crop",
        saralStep2: "2️⃣ Quantity / Bags",
        saralStep3: "3️⃣ Confirm Sale",
        saralPrompt1: "Hello! Tap the picture of the crop you wish to sell.",
        saralPrompt2: "Now select the number of bags or vehicle load.",
        saralPrompt3: "Great! Review details and press the green button to confirm sale.",
        saralNext: "Next Step ➔",
        saralBack: "⬅ Back",
        saralConfirm: "✅ Confirm Direct Sale",
        wa: {
            title: "Kisan WhatsApp Assistant 🌾",
            subtitle: "Speak or chat to check rates & sell directly",
            welcome: "🙏 Greetings Farmer Friend! I am your AgriDirect AI assistant.\n\nCheck live APMC rates, list standing crops, or book cold transport easily:",
            chipMandi: "💰 Today's Mandi Rates",
            chipSell: "🌾 Sell Crop Directly",
            chipVan: "🚚 Book Pickup Reefer Van",
            chipMoney: "💵 Check Escrow Payout",
            placeholder: "Type here or press mic to speak...",
            listening: "🎙️ Listening... please speak now...",
            voiceSample: "🎙️ Voice Note: 'I have 500kg Tomatoes ready in Kolar'",
            voiceReply: "✅ Voice Note Parsed Successfully!\n🍅 Crop: Fresh Tomatoes (500 kg)\n💰 Direct Price Guaranteed: ₹28/kg (vs Mandi ₹16/kg)\n🚚 Logistics: Cold-chain vehicle dispatched for tomorrow 8:30 AM. Listing published to Marketplace!",
            mandiReply: "📊 **Live APMC Mandi vs Direct Gate Price:**\n🍅 Tomatoes: Mandi ₹16 | Direct ₹28 (+75%)\n🧅 Red Onions: Mandi ₹14 | Direct ₹24 (+71%)\n🌾 Basmati Rice: Mandi ₹54 | Direct ₹78 (+44%)\n🥭 Alphonso: Mandi ₹85 | Direct ₹140 (+65%)"
        }
    },
    te: {
        audioPill: "నేటి మార్కెట్ ధరలు (Audio)",
        saralBtn: "సరళ రైతు మోడ్",
        sidebarVoiceTitle: "రైతు సోదరుల సహాయం",
        sidebarVoiceDesc: "చదవడం రాకపోయినా మాట్లాడి లేదా ఫోటో తాకి పంట అమ్మండి",
        dailySpeech: "నమస్కారం రైతు సోదరా! నేటి ప్రత్యక్ష ధర: టమాటాలు ₹28 కేజీ, ఉల్లిపాయలు ₹24, బాస్మతి బియ్యం ₹78. మండి కంటే 60% ఎక్కువ లాభం పొందండి. నేరుగా అమ్మడానికి కింద నొక్కండి.",
        langNotice: "భాష తెలుగుగా మార్చబడింది.",
        saralStep1: "1️⃣ పంట ఎంచుకోండి",
        saralStep2: "2️⃣ బస్తాల పరిమాణం",
        saralStep3: "3️⃣ నిర్ధారించండి",
        saralPrompt1: "నమస్కారం! మీరు అమ్మాలనుకుంటున్న పంట బొమ్మపై వేలు పెట్టండి.",
        saralPrompt2: "ఇప్పుడు మీ వద్ద ఉన్న బస్తాల సంఖ్యను ఎంచుకోండి.",
        saralPrompt3: "ధన్యవాదాలు! వివరాలు చూసి ఆకుపచ్చ బటన్ నొక్కి అమ్మకం ఖరారు చేయండి.",
        saralNext: "ముందుకు ➔",
        saralBack: "⬅ వెనుకకు",
        saralConfirm: "✅ అమ్మకం ఖరారు చేయండి",
        wa: {
            title: "రైతు వాట్సాప్ మిత్రుడు 🌾",
            subtitle: "మాట్లాడి లేదా టైప్ చేసి రేట్లు తెలుసుకోండి",
            welcome: "🙏 నమస్కారం రైతు సోదరా! నేను అగ్రిడైరెక్ట్ డిజిటల్ అసిస్టెంట్.\n\nమీరు మాట్లాడి లేదా కింది బటన్లు నొక్కి సమాచారం పొందవచ్చు:",
            chipMandi: "💰 నేటి మార్కెట్ రేటు",
            chipSell: "🌾 పంట అమ్మండి",
            chipVan: "🚚 పికప్ వ్యాన్ బుక్ చేయండి",
            chipMoney: "💵 నా ఖాతా బ్యాలెన్స్",
            placeholder: "ఇక్కడ టైప్ చేయండి లేదా మైక్ నొక్కండి...",
            listening: "🎙️ వింటున్నాము... మాట్లాడండి...",
            voiceSample: "🎙️ వాయిస్: 'నా వద్ద 500 కేజీల టమాటాలు ఉన్నాయి'",
            voiceReply: "✅ మీ వాయిస్ నమోదు అయ్యింది!\n🍅 టమాటా: 500 కిలోలు\n💰 మీకు వచ్చే ధర: ₹28/కిలో (మండి ధర కంటే 75% ఎక్కువ)\n🚚 రేపు ఉదయం 8:30 కి పికప్ వ్యాన్ వస్తుంది.",
            mandiReply: "📊 **నేటి లైవ్ ధరలు:**\n🍅 టమాటాలు: మండి ₹16 | డైరెక్ట్ ₹28\n🧅 ఉల్లిపాయలు: మండి ₹14 | డైరెక్ట్ ₹24\n🌾 బాస్మతి: మండి ₹54 | డైరెక్ట్ ₹78"
        }
    },
    mr: {
        audioPill: "आजचे बाजारभाव ऐका (Audio)",
        saralBtn: "सोपा शेतकरी मोड",
        sidebarVoiceTitle: "ग्रामीण शेतकरी बांधवांसाठी",
        sidebarVoiceDesc: "वाचता येत नसेल तरी बोलून किंवा फोटो निवडून पीक विका",
        dailySpeech: "नमस्कार शेतकरी मित्रा! आजचा थेट भाव: टोमॅटो ₹28 किलो, कांदा ₹24, बासमती तांदूळ ₹78. थेट विक्रीतून मंडीपेक्षा 60% जास्त नफा मिळवा. खालील बटण दाबून विक्री करा.",
        langNotice: "भाषा मराठी निवडली आहे.",
        saralStep1: "1️⃣ पीक निवडा",
        saralStep2: "2️⃣ पोती / प्रमाण निवडा",
        saralStep3: "3️⃣ विक्री पक्की करा",
        saralPrompt1: "नमस्कार! ज्या पिकाची विक्री करायची आहे, त्यावर बोट ठेवा.",
        saralPrompt2: "आता आपल्या पिकाची पोती किंवा वजन निवडा.",
        saralPrompt3: "छान! तपशील तपासा आणि हिरवे बटण दाबून विक्री निश्चित करा.",
        saralNext: "पुढे चला ➔",
        saralBack: "⬅ मागे",
        saralConfirm: "✅ होय, थेट विक्री पक्की करा",
        wa: {
            title: "शेतकरी व्हॉट्सॲप मित्र 🌾",
            subtitle: "बोलून किंवा लिहून भाव जाणा व पीक विका",
            welcome: "🙏 राम-राम शेतकरी मित्रा! मी ॲग्रीडायरेक्टचा डिजिटल सहाय्यक आहे.\n\nतुम्ही बोलून (माईक 🎙️ दाबून) किंवा खालील बटणे वापरून थेट व्यवहार करू शकता:",
            chipMandi: "💰 आजचे बाजारभाव",
            chipSell: "🌾 पीक विका (थेट ग्राहक)",
            chipVan: "🚚 वाहतूक गाडी बोलवा",
            chipMoney: "💵 माझे पैसे (UPI खाते)",
            placeholder: "येथे लिहा किंवा माईक 🎙️ दाबा...",
            listening: "🎙️ ऐकत आहोत... बोला...",
            voiceSample: "🎙️ ऑडिओ नोट: '500 किलो टोमॅटो तयार आहे'",
            voiceReply: "✅ तुमचा आवाज नोंदवला गेला आहे!\n🍅 टोमॅटो: 500 किलो\n💰 तुम्हाला मिळतील: ₹28/किलो (मंडीपेक्षा +₹12 जास्त!)\n🚚 गाडी: उद्या सकाळी 8:30 वाजता तुमच्या शेतात पोहोचेल.",
            mandiReply: "📊 **आजचे थेट भाव vs मंडी:**\n🍅 टोमॅटो: मंडी ₹16 | थेट ₹28 (+75%)\n🧅 कांदा: मंडी ₹14 | थेट ₹24 (+71%)\n🌾 बासमती: मंडी ₹54 | थेट ₹78 (+44%)"
        }
    },
    ta: {
        audioPill: "இன்றைய விலை கேட்க (Audio)",
        saralBtn: "எளிய உழவர் பயன்முறை",
        sidebarVoiceTitle: "விவசாயிகளுக்கான உதவி",
        sidebarVoiceDesc: "படிக்கத் தேவையில்லை, பேசியோ படம் தொட்டோ பயிர் விற்கலாம்",
        dailySpeech: "வணக்கம் விவசாய தோழரே! இன்றைய நேரடி விலை: தக்காளி ₹28/கிலோ, வெங்காயம் ₹24, பாசுமதி அரிசி ₹78. இடைத்தரகர்கள் இன்றி 60% கூடுதல் லாபம் பெறுங்கள்.",
        langNotice: "மொழி தமிழாக மாற்றப்பட்டது.",
        saralStep1: "1️⃣ பயிர் தேர்வு",
        saralStep2: "2️⃣ மூட்டை அளவு",
        saralStep3: "3️⃣ உறுதிசெய்",
        saralPrompt1: "வணக்கம்! நீங்கள் விற்க விரும்பும் பயிரைத் தொடவும்.",
        saralPrompt2: "இப்போது உங்கள் மூட்டைகளின் எண்ணிக்கையைத் தேர்ந்தெடுக்கவும்.",
        saralPrompt3: "அருமை! விவரங்களை சரிபார்த்து பச்சை நிற பொத்தானை அழுத்தவும்.",
        saralNext: "அடுத்து ➔",
        saralBack: "⬅ பின்செல்க",
        saralConfirm: "✅ நேரடி விற்பனை உறுதிசெய்",
        wa: {
            title: "உழவர் வாட்ஸ்அப் தோழன் 🌾",
            subtitle: "பேசி அல்லது தட்டச்சு செய்து பயிர் விற்கலாம்",
            welcome: "🙏 வணக்கம் விவசாய தோழரே! நான் அக்ரிடைரக்ட் டிஜிட்டல் உதவியாளர்.\n\nகீழே உள்ள பொத்தான்களை அழுத்தி நேரடி விலை அறியலாம்:",
            chipMandi: "💰 இன்றைய விலை",
            chipSell: "🌾 பயிர் விற்க",
            chipVan: "🚚 வாகனம் பதிவுசெய்",
            chipMoney: "💵 எனது கணக்கு",
            placeholder: "இங்கே தட்டச்சு செய்யவும் அல்லது மைக் அழுத்தவும்...",
            listening: "🎙️ கேட்கிறது... பேசுங்கள்...",
            voiceSample: "🎙️ குரல்: '500 கிலோ தக்காளி விற்பனைக்கு உள்ளது'",
            voiceReply: "✅ குரல் பதிவு செய்யப்பட்டது!\n🍅 தக்காளி: 500 கிலோ\n💰 நேரடி விலை: ₹28/கிலோ (+75% கூடுதல்)\n🚚 வாகனம் நாளை காலை 8:30 மணிக்கு வரும்.",
            mandiReply: "📊 **இன்றைய சந்தை vs நேரடி விலை:**\n🍅 தக்காளி: மண்டி ₹16 | நேரடி ₹28\n🧅 வெங்காயம்: மண்டி ₹14 | நேரடி ₹24"
        }
    },
    kn: {
        audioPill: "ಇಂದಿನ ದರ ಕೇಳಿ (Audio)",
        saralBtn: "ಸರಳ ರೈತ ಮೋಡ್",
        sidebarVoiceTitle: "ಗ್ರಾಮೀಣ ರೈತರ ನೆರವು",
        sidebarVoiceDesc: "ಓದಲು ಬರದಿದ್ದರೂ ಮಾತನಾಡಿ ಅಥವಾ ಚಿತ್ರ ಮುಟ್ಟಿ ಬೆಳೆ ಮಾರಿ",
        dailySpeech: "ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ಇಂದಿನ ನೇರ ದರ: ಟೊಮೆಟೊ ₹28/ಕೆಜಿ, ಈರುಳ್ಳಿ ₹24, ಬಾಸ್ಮತಿ ಅಕ್ಕಿ ₹78. ಮಂಡಿಗಿಂತ 60% ಹೆಚ್ಚು ಲಾಭ ಪಡೆಯಿರಿ.",
        langNotice: "ಭಾಷೆ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.",
        saralStep1: "1️⃣ ಬೆಳೆ ಆಯ್ಕೆ",
        saralStep2: "2️⃣ ಚೀಲಗಳ ಪ್ರಮಾಣ",
        saralStep3: "3️⃣ ಖಚಿತಪಡಿಸಿ",
        saralPrompt1: "ನಮಸ್ಕಾರ! ನೀವು ಮಾರಾಟ ಮಾಡಲು ಬಯಸುವ ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಸ್ಪರ್ಶಿಸಿ.",
        saralPrompt2: "ಈಗ ಚೀಲಗಳ ಸಂಖ್ಯೆ ಅಥವಾ ವಾಹನ ಭಾರ ಆಯ್ಕೆಮಾಡಿ.",
        saralPrompt3: "ಉತ್ತಮ! ವಿವರ ನೋಡಿ ಹಸಿರು ಬಟನ್ ಒತ್ತಿ ಮಾರಾಟ ಖಚಿತಪಡಿಸಿ.",
        saralNext: "ಮುಂದೆ ➔",
        saralBack: "⬅ ಹಿಂದೆ",
        saralConfirm: "✅ ನೇರ ಮಾರಾಟ ಖಚಿತಪಡಿಸಿ",
        wa: {
            title: "ರೈತ ವಾಟ್ಸಾಪ್ ಮಿತ್ರ 🌾",
            subtitle: "ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ ನೇರ ದರ ತಿಳಿಯಿರಿ",
            welcome: "🙏 ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಾನು ಅಗ್ರಿಡೈರೆಕ್ಟ್ ಡಿಜಿಟಲ್ ಸಹಾಯಕ.\n\nಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ ಮಾಹಿತಿ ಪಡೆಯಿರಿ:",
            chipMandi: "💰 ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರ",
            chipSell: "🌾 ಬೆಳೆ ಮಾರಿ (ನೇರ)",
            chipVan: "🚚 ವಾಹನ ಬುಕ್ ಮಾಡಿ",
            chipMoney: "💵 ನನ್ನ ಹಣ (UPI)",
            placeholder: "ಇಲ್ಲಿ ಬರೆಯಿರಿ ಅಥವಾ ಮೈಕ್ ಒತ್ತಿ...",
            listening: "🎙️ ಕೇಳುತ್ತಿದ್ದೇವೆ... ಮಾತನಾಡಿ...",
            voiceSample: "🎙️ ಧ್ವನಿ: '500 ಕೆಜಿ ಟೊಮೆಟೊ ಸಿದ್ಧವಿದೆ'",
            voiceReply: "✅ ನಿಮ್ಮ ಧ್ವನಿ ದಾಖಲಾಗಿದೆ!\n🍅 ಟೊಮೆಟೊ: 500 ಕೆಜಿ\n💰 ಸಿಗುವ ದರ: ₹28/ಕೆಜಿ (+75% ಹೆಚ್ಚು ಲಾಭ)\n🚚 ವಾಹನ ನಾಳೆ ಬೆಳಗ್ಗೆ 8:30 ಕ್ಕೆ ಬರುತ್ತದೆ.",
            mandiReply: "📊 **ನೇರ vs ಮಂಡಿ ದರ:**\n🍅 ಟೊಮೆಟೊ: ಮಂಡಿ ₹16 | ನೇರ ₹28\n🧅 ಈರುಳ್ಳಿ: ಮಂಡಿ ₹14 | ನೇರ ₹24"
        }
    },
    pa: {
        audioPill: "ਅੱਜ ਦਾ ਭਾਅ ਸੁਣੋ (Audio)",
        saralBtn: "ਸਰਲ ਕਿਸਾਨ ਮੋਡ",
        sidebarVoiceTitle: "ਪੇਂਡੂ ਕਿਸਾਨ ਸਹਾਇਤਾ",
        sidebarVoiceDesc: "ਬਿਨਾਂ ਪੜ੍ਹੇ ਸਿਰਫ਼ ਬੋਲ ਕੇ ਜਾਂ ਫ਼ੋਟੋ ਛੂਹ ਕੇ ਫ਼ਸਲ ਵੇਚੋ",
        dailySpeech: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਅੱਜ ਦਾ ਸਿੱਧਾ ਭਾਅ: ਟਮਾਟਰ ₹28/ਕਿਲੋ, ਪਿਆਜ਼ ₹24, ਬਾਸਮਤੀ ਚੌਲ ₹78. ਮੰਡੀ ਨਾਲੋਂ 60% ਵੱਧ ਮੁਨਾਫ਼ਾ ਕਮਾਓ।",
        langNotice: "ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਚੁਣੀ ਗਈ ਹੈ।",
        saralStep1: "1️⃣ ਫ਼ਸਲ ਚੁਣੋ",
        saralStep2: "2️⃣ ਬੋਰੀਆਂ ਦੀ ਗਿਣਤੀ",
        saralStep3: "3️⃣ ਪੱਕਾ ਕਰੋ",
        saralPrompt1: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਜਿਹੜੀ ਫ਼ਸਲ ਵੇਚਣੀ ਹੈ, ਉਸ ਉੱਤੇ ਉਂਗਲੀ ਲਗਾਓ।",
        saralPrompt2: "ਹੁਣ ਆਪਣੀ ਫ਼ਸਲ ਦੀਆਂ ਬੋਰੀਆਂ ਜਾਂ ਮਾਤਰਾ ਚੁਣੋ।",
        saralPrompt3: "ਵਧੀਆ! ਵੇਰਵੇ ਦੇਖੋ ਅਤੇ ਹਰਾ ਬਟਨ ਦਬਾ ਕੇ ਵਿਕਰੀ ਪੱਕੀ ਕਰੋ।",
        saralNext: "ਅੱਗੇ ਵਧੋ ➔",
        saralBack: "⬅ ਪਿੱਛੇ",
        saralConfirm: "✅ ਹਾਂ, ਸਿੱਧੀ ਵਿਕਰੀ ਪੱਕੀ ਕਰੋ",
        wa: {
            title: "ਕਿਸਾਨ ਵਟਸਐਪ ਸਾਥੀ 🌾",
            subtitle: "ਬੋਲ ਕੇ ਜਾਂ ਲਿਖ ਕੇ ਭਾਅ ਜਾਣੋ ਤੇ ਫ਼ਸਲ ਵੇਚੋ",
            welcome: "🙏 ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ ਐਗਰੀਡਾਇਰੈਕਟ ਦਾ ਡਿਜੀਟਲ ਸਾਥੀ ਹਾਂ।\n\nਤੁਸੀਂ ਬੋਲ ਕੇ (ਮਾਈਕ 🎙️ ਦਬਾ ਕੇ) ਜਾਂ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ ਦਬਾ ਕੇ ਦੱਸ ਸਕਦੇ ਹੋ:",
            chipMandi: "💰 ਅੱਜ ਦਾ ਭਾਅ",
            chipSell: "🌾 ਫ਼ਸਲ ਵੇਚੋ (ਸਿੱਧੀ)",
            chipVan: "🚚 ਗੱਡੀ ਮੰਗਵਾਓ",
            chipMoney: "💵 ਮੇਰਾ ਪੈਸਾ (UPI)",
            placeholder: "ਇੱਥੇ ਲਿਖੋ ਜਾਂ ਮਾਈਕ 🎙️ ਦਬਾਓ...",
            listening: "🎙️ ਸੁਣ ਰਹੇ ਹਾਂ... ਬੋਲੋ...",
            voiceSample: "🎙️ ਆਵਾਜ਼: '500 ਕਿਲੋ ਟਮਾਟਰ ਤਿਆਰ ਹੈ'",
            voiceReply: "✅ ਤੁਹਾਡੀ ਆਵਾਜ਼ ਦਰਜ ਹੋ ਗਈ ਹੈ!\n🍅 ਟਮਾਟਰ: 500 ਕਿਲੋ\n💰 ਮਿਲਣਗੇ: ₹28/ਕਿਲੋ (ਮੰਡੀ ਨਾਲੋਂ +₹12 ਵੱਧ!)\n🚚 ਗੱਡੀ ਕੱਲ੍ਹ ਸਵੇਰੇ 8:30 ਵਜੇ ਪਹੁੰਚੇਗੀ।",
            mandiReply: "📊 **ਅੱਜ ਦਾ ਸਿੱਧਾ ਭਾਅ vs ਮੰਡੀ:**\n🍅 ਟਮਾਟਰ: ਮੰਡੀ ₹16 | ਸਿੱਧਾ ₹28 (+75%)\n🧅 ਪਿਆਜ਼: ਮੰਡੀ ₹14 | ਸਿੱਧਾ ₹24"
        }
    },
    bn: {
        audioPill: "আজকের দর শুনুন (Audio)",
        saralBtn: "সহজ কৃষক মোড",
        sidebarVoiceTitle: "গ্রামীণ কৃষক সহায়তা",
        sidebarVoiceDesc: "না পড়েও কেবল মুখে বলে বা ছবি ছুঁয়ে ফসল বিক্রি করুন",
        dailySpeech: "নমস্কার কৃষক ভাই! আজকের সরাসরি দর: টমেটো ₹28/কেজি, পেঁয়াজ ₹24, বাসমতি চাল ₹78. মধ্যস্বত্বভোগী ছাড়া সরাসরি দ্বিগুণ লাভ পান।",
        langNotice: "ভাষা বাংলায় পরিবর্তন করা হয়েছে।",
        saralStep1: "1️⃣ ফসল বাছুন",
        saralStep2: "2️⃣ বস্তার পরিমাণ",
        saralStep3: "3️⃣ নিশ্চিত করুন",
        saralPrompt1: "নমস্কার! যে ফসল বিক্রি করতে চান, সেটির ওপর আঙুল রাখুন।",
        saralPrompt2: "এবার বস্তার সংখ্যা বা গাড়ির পরিমাণ বাছুন।",
        saralPrompt3: "খুব ভালো! তথ্য দেখে নিয়ে সবুজ বোতাম টিপে বিক্রি নিশ্চিত করুন।",
        saralNext: "পরবর্তী ধাপ ➔",
        saralBack: "⬅ পেছনে",
        saralConfirm: "✅ সরাসরি বিক্রি নিশ্চিত করুন",
        wa: {
            title: "কৃষক হোয়াটসঅ্যাপ বন্ধু 🌾",
            subtitle: "মুখে বলে বা লিখে সরাসরি ফসল বিক্রি করুন",
            welcome: "🙏 নমস্কার কৃষক ভাই! আমি এগ্রিডাইরেক্টের ডিজিটাল সহকারী।\n\nনিচের বোতামগুলো ছুঁয়ে তথ্য জানতে পারেন:",
            chipMandi: "💰 আজকের বাজার দর",
            chipSell: "🌾 ফসল বিক্রি",
            chipVan: "🚚 পিকআপ ভ্যান বুকিং",
            chipMoney: "💵 আমার ব্যাংক টাকা",
            placeholder: "এখানে লিখুন বা মাইক 🎙️ টিপুন...",
            listening: "🎙️ শুনছি... বলুন...",
            voiceSample: "🎙️ ভয়েস: 'আমার ৫০০ কেজি টমেটো প্রস্তুত আছে'",
            voiceReply: "✅ আপনার ভয়েস রেকর্ড হয়েছে!\n🍅 টমেটো: ৫০০ কেজি\n💰 সরাসরি দর: ₹28/কেজি (মন্ডির থেকে +₹12 বেশি!)\n🚚 গাড়ি কাল সকাল ৮:৩০ টায় পৌঁছাবে।",
            mandiReply: "📊 **আজকের লাইভ রেট:**\n🍅 টমেটো: মন্ডি ₹16 | ডাইরেক্ট ₹28 (+75%)\n🧅 পেঁয়াজ: মন্ডি ₹14 | ডাইরেক্ট ₹24"
        }
    },
    gu: {
        audioPill: "આજના ભાવ સાંભળો (Audio)",
        saralBtn: "સરળ ખેડૂત મોડ",
        sidebarVoiceTitle: "ગ્રામીણ ખેડૂત સહાય",
        sidebarVoiceDesc: "વાંચ્યા વગર માત્ર બોલીને કે ફોટો અડીને પાક વેચો",
        dailySpeech: "નમસ્તે ખેડૂત મિત્ર! આજના સીધા ભાવ: ટામેટા ₹28/કિલો, ડુંગળી ₹24, બાસમતી ચોખા ₹78. દલાલો વગર સીધો વેપાર કરી 60% વધુ નફો મેળવો.",
        langNotice: "ભાષા ગુજરાતી પસંદ કરેલ છે.",
        saralStep1: "1️⃣ પાક પસંદ કરો",
        saralStep2: "2️⃣ ગુણી / વજન પસંદ કરો",
        saralStep3: "3️⃣ વેચાણ પાકું કરો",
        saralPrompt1: "નમસ્તે! તમે જે પાક વેચવા માંગતા હો તે ચિત્ર પર આંગળી મૂકો.",
        saralPrompt2: "હવે ગુણીની સંખ્યા અથવા વાહનનું વજન પસંદ કરો.",
        saralPrompt3: "સરસ! વિગતો ચકાસી લીલું બટન દબાવી વેચાણ પાકું કરો.",
        saralNext: "આગળ વધો ➔",
        saralBack: "⬅ પાછા જાઓ",
        saralConfirm: "✅ હા, સીધું વેચાણ પાકું કરો",
        wa: {
            title: "ખેડૂત વોટ્સએપ મિત્ર 🌾",
            subtitle: "બોલીને અથવા લખીને ભાવ જાણો અને પાક વેચો",
            welcome: "🙏 રામ રામ ખેડૂત મિત્ર! હું એગ્રીડાયરેક્ટનો ડિજિટલ સાથી છું.\n\nતમે બોલીને (માઇક 🎙️ દબાવીને) અથવા નીચેના બટન વડે માહિતી મેળવી શકો છો:",
            chipMandi: "💰 આજના બજાર ભાવ",
            chipSell: "🌾 પાક વેચો (સીધો)",
            chipVan: "🚚 વાહન બોલાવો",
            chipMoney: "💵 મારા પૈસા (UPI)",
            placeholder: "અહીં લખો અથવા માઇક 🎙️ દબાવો...",
            listening: "🎙️ સાંભળી રહ્યા છીએ... બોલો...",
            voiceSample: "🎙️ અવાજ: '500 કિલો ટામેટા તૈયાર છે'",
            voiceReply: "✅ તમારો અવાજ નોંધાયો છે!\n🍅 ટામેટા: 500 કિલો\n💰 સીધો ભાવ: ₹28/કિલો (મંડી કરતાં +₹12 વધુ!)\n🚚 વાહન કાલે સવારે 8:30 વાગ્યે આવશે.",
            mandiReply: "📊 **આજના સીધા ભાવ vs મંડી:**\n🍅 ટામેટા: મંડી ₹16 | સીધા ₹28 (+75%)\n🧅 ડુંગળી: મંડી ₹14 | સીધા ₹24"
        }
    }
};

function getSpeechLangCode(lang = currentGlobalLang) {
    const found = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    return found ? found.speechCode : "hi-IN";
}

function setGlobalLanguage(lang, announce = true) {
    if (!I18N_DICT[lang]) lang = "hi";
    currentGlobalLang = lang;
    localStorage.setItem("agridirect_lang", lang);

    // Sync all language dropdowns on the page
    const selects = document.querySelectorAll("#globalLangSelect, .lang-select");
    selects.forEach(sel => {
        if (sel) sel.value = lang;
    });

    const dict = I18N_DICT[lang];

    // Update Topbar Audio Pill text
    const audioPillEl = document.querySelector(".audio-guide-pill span:last-child");
    if (audioPillEl) audioPillEl.innerText = `🔊 ${dict.audioPill}`;

    // Update Saral Kisan Buttons
    const saralButtons = document.querySelectorAll(".saral-kisan-btn, #saralBtnTop");
    saralButtons.forEach(btn => {
        if (btn) btn.innerHTML = `🌾 ${dict.saralBtn}`;
    });

    // Update Sidebar Voice Box
    const voiceCardTitle = document.querySelector(".sidebar-voice-card h4");
    if (voiceCardTitle) voiceCardTitle.innerHTML = `🔊 ${dict.sidebarTitle}`;
    const voiceCardDesc = document.querySelector(".sidebar-voice-card p");
    if (voiceCardDesc) voiceCardDesc.innerText = dict.sidebarDesc;

    // Update WhatsApp Bot
    updateWhatsAppLang(lang);

    // Announce via Speech
    if (announce) {
        showToast(`Language set to: ${SUPPORTED_LANGUAGES.find(l => l.code === lang).native}`, "🌐");
        speakText(dict.langNotice, getSpeechLangCode(lang));
    }
}

function playDailyMandiSpeech() {
    const dict = I18N_DICT[currentGlobalLang] || I18N_DICT.hi;
    speakText(dict.dailySpeech, getSpeechLangCode(currentGlobalLang));
}

// =========================================================
// WHATSAPP RURAL KISAN ASSISTANT (Voice & Chat Bot)
// =========================================================
let currentWaLang = currentGlobalLang;

function updateWhatsAppLang(lang) {
    currentWaLang = lang;
    const title = document.getElementById("waTitleText");
    const sub = document.getElementById("waSubtitleText");
    const t = (I18N_DICT[lang] && I18N_DICT[lang].wa) || I18N_DICT.hi.wa;

    if (title) title.innerText = t.title;
    if (sub) sub.innerText = `🟢 ${t.subtitle}`;

    // Highlight pill
    document.querySelectorAll(".wa-lang-pill").forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-lang") === lang);
    });

    renderWaChatInitial();
}

function injectWhatsAppWidget() {
    if (document.getElementById("waChatModal")) return;

    // Floating WhatsApp Button
    const btn = document.createElement("div");
    btn.className = "wa-widget-btn";
    btn.id = "waWidgetBtn";
    btn.title = "WhatsApp AgriBot (Multi-Language Voice & Chat)";
    btn.innerHTML = `
        <span class="wa-pulse-dot"></span>
        <svg viewBox="0 0 32 32">
            <path d="M16 2C8.28 2 2 8.28 2 16c0 2.72.78 5.26 2.14 7.42L2 30l6.76-2.1c2.1 1.26 4.56 1.98 7.24 1.98 7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.56c-2.34 0-4.52-.64-6.38-1.76l-.46-.28-4.22 1.32 1.34-4.12-.3-.48C4.78 20.36 4.2 18.26 4.2 16 4.2 9.5 9.5 4.2 16 4.2S27.8 9.5 27.8 16 22.5 27.56 16 27.56zm7.64-8.66c-.42-.22-2.48-1.22-2.86-1.36-.38-.14-.66-.22-.94.22-.28.42-1.08 1.36-1.32 1.64-.24.28-.48.3-.9.1-.42-.2-1.78-.66-3.4-2.1-1.26-1.12-2.1-2.5-2.34-2.92-.24-.42-.02-.64.18-.86.2-.2.42-.48.64-.72.22-.24.3-.42.44-.7.14-.28.08-.54-.04-.76-.12-.22-.94-2.28-1.3-3.12-.34-.82-.7-.7-.94-.72h-.8c-.28 0-.74.1-1.12.52-.38.42-1.46 1.42-1.46 3.48s1.5 4.04 1.7 4.32c.2.28 2.94 4.5 7.12 6.32 1 .44 1.78.7 2.38.9.98.32 1.88.28 2.58.18.78-.12 2.48-1.02 2.84-2 .36-.98.36-1.82.24-2-.12-.18-.4-.28-.82-.5z"/>
        </svg>
    `;
    btn.onclick = toggleWhatsAppModal;
    document.body.appendChild(btn);

    // Chat Modal Simulator
    const modal = document.createElement("div");
    modal.className = "wa-chat-modal";
    modal.id = "waChatModal";

    const langPillsHtml = SUPPORTED_LANGUAGES.map(l => `
        <button class="wa-lang-pill ${l.code === currentGlobalLang ? 'active' : ''}" data-lang="${l.code}" onclick="setGlobalLanguage('${l.code}')">
            ${l.native}
        </button>
    `).join("");

    modal.innerHTML = `
        <div class="wa-header">
            <div class="wa-avatar">👨‍🌾</div>
            <div class="wa-header-info">
                <h4 id="waTitleText">AgriDirect Kisan Bot 🌾</h4>
                <p id="waSubtitleText">🟢 ऑनलाइन • 24x7 किसान साथी</p>
            </div>
            <button class="wa-close-btn" onclick="toggleWhatsAppModal()">✕</button>
        </div>
        <div class="wa-lang-bar" style="overflow-x:auto; white-space:nowrap; justify-content:flex-start; padding:8px 10px;">
            ${langPillsHtml}
        </div>
        <div class="wa-chat-body" id="waChatBody"></div>
        <div class="wa-quick-actions" id="waQuickActions"></div>
        <div class="wa-input-area">
            <input type="text" id="waInput" placeholder="लिखें या माइक 🎙️ दबाएं..." onkeypress="handleWaEnter(event)">
            <button class="wa-mic-btn" id="waMicBtn" title="बोलकर बात करें (Voice Note)" onclick="handleWaVoiceNote()">🎙️</button>
            <button class="wa-send-btn" onclick="sendWaText()">➤</button>
        </div>
    `;
    document.body.appendChild(modal);

    renderWaChatInitial();
}

function toggleWhatsAppModal() {
    const modal = document.getElementById("waChatModal");
    if (modal) {
        modal.classList.toggle("open");
        if (modal.classList.contains("open")) {
            const body = document.getElementById("waChatBody");
            if (body) body.scrollTop = body.scrollHeight;
        }
    }
}

function renderWaChatInitial() {
    const dict = I18N_DICT[currentGlobalLang] || I18N_DICT.hi;
    const t = dict.wa || I18N_DICT.hi.wa;
    const body = document.getElementById("waChatBody");
    const actions = document.getElementById("waQuickActions");
    const input = document.getElementById("waInput");

    if (input) input.placeholder = t.placeholder;

    if (body) {
        body.innerHTML = `
            <div class="wa-bubble incoming">
                ${t.welcome.replace(/\n/g, "<br>")}
                <span class="wa-bubble-time">10:00 AM</span>
            </div>
            <div class="wa-audio-bubble">
                <button class="wa-audio-play-btn" onclick="speakText('${t.welcome.replace(/\n/g, ' ')}', '${getSpeechLangCode(currentGlobalLang)}')">▶</button>
                <div style="flex:1">
                    <strong style="font-size:12px; display:block;">${currentGlobalLang === 'en' ? 'Listen Voice Note' : 'आवाज़ में सुनें (Voice Note)'}</strong>
                    <div style="height:4px; background:#25d366; border-radius:2px; width:60%; margin-top:4px;"></div>
                </div>
                <small style="color:#888;">0:12</small>
            </div>
        `;
    }

    if (actions) {
        actions.innerHTML = `
            <button class="wa-chip-btn" onclick="sendWaAction('mandi')">${t.chipMandi}</button>
            <button class="wa-chip-btn" onclick="sendWaAction('sell')">${t.chipSell}</button>
            <button class="wa-chip-btn" onclick="sendWaAction('van')">${t.chipVan}</button>
            <button class="wa-chip-btn" onclick="sendWaAction('money')">${t.chipMoney}</button>
        `;
}

function sendWaAction(action) {
    const dict = I18N_DICT[currentGlobalLang] || I18N_DICT.hi;
    const t = dict.wa || I18N_DICT.hi.wa;
    let userMsg = "";
    let replyMsg = "";
    let speakMsg = "";

    if (action === "mandi") {
        userMsg = t.chipMandi;
        replyMsg = t.mandiReply;
        speakMsg = (dict.dailySpeech || "").split('.')[0];
    } else if (action === "sell") {
        userMsg = t.chipSell;
        replyMsg = "🌾 " + t.chipSell + ":\n" + (t.placeholder || "");
        speakMsg = t.chipSell;
    } else if (action === "van") {
        userMsg = t.chipVan;
        replyMsg = "🚚 " + t.chipVan;
        speakMsg = t.chipVan;
    } else if (action === "money") {
        userMsg = t.chipMoney;
        replyMsg = "💵 " + t.chipMoney;
        speakMsg = t.chipMoney;
    }

    appendWaBubble(userMsg, "outgoing");
    setTimeout(() => {
        appendWaBubble(replyMsg.replace(/\n/g, "<br>"), "incoming");
        speakText(speakMsg, getSpeechLangCode(currentGlobalLang));
    }, 600);
}


function handleWaEnter(e) {
    if (e.key === "Enter") sendWaText();
}

function sendWaText() {
    const input = document.getElementById("waInput");
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = "";

    appendWaBubble(text, "outgoing");

    setTimeout(() => {
        const t = WA_TRANSLATIONS[currentWaLang] || WA_TRANSLATIONS.hi;
        let reply = "";
        let speech = "";

        if (text.toLowerCase().includes("tomato") || text.includes("टमाटर") || text.includes("టమాట")) {
            reply = "🍅 **टमाटर भाव:** डायरेक्ट ₹28/किग्रा (मंडी रेट ₹16)। आपका 500 किग्रा लॉट लिस्ट हो गया है!";
            speech = "टमाटर का डायरेक्ट भाव ₹28 है। आपका लॉट लिस्ट हो गया है।";
            // Auto add to products if desired
            createNewHarvestLot("ताज़ा टमाटर (Kisan WhatsApp Lot)", "Vegetables", 28, "Ramesh FPO", "Kolar Cluster", 500, "kg", "🍅");
        } else if (text.toLowerCase().includes("onion") || text.includes("प्यास") || text.includes("प्याज़") || text.includes("ఉల్లి")) {
            reply = "🧅 **लाल प्याज़ भाव:** डायरेक्ट ₹24/किग्रा (मंडी रेट ₹14)। 40% अतिरिक्त कमाई!";
            speech = "प्याज़ का भाव ₹24 है। मंडी से 40 प्रतिशत ज्यादा कमाई।";
            createNewHarvestLot("नाशिक लाल प्याज़ (WhatsApp Lot)", "Vegetables", 24, "Sahyadri FPO", "Nashik Cluster", 800, "kg", "🧅");
        } else {
            reply = "✅ **धन्यवाद किसान भाई!** आपकी जानकारी दर्ज हो गई है। हमारी AI टीम आपको सबसे बेहतरीन खरीददार से सीधे जोड़ रही है।";
            speech = "धन्यवाद किसान भाई! आपकी जानकारी दर्ज हो गई है।";
        }

        appendWaBubble(reply, "incoming");
        speakText(speech, currentWaLang === "hi" ? "hi-IN" : currentWaLang === "te" ? "te-IN" : "en-IN");
    }, 700);
}

function handleWaVoiceNote() {
    const mic = document.getElementById("waMicBtn");
    const t = WA_TRANSLATIONS[currentWaLang] || WA_TRANSLATIONS.hi;

    mic.classList.add("recording");
    showToast(t.listening, "🎙️");

    // Check if Web Speech Recognition exists
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = currentWaLang === "hi" ? "hi-IN" : currentWaLang === "te" ? "te-IN" : "en-IN";
        recognition.start();

        recognition.onresult = function(event) {
            mic.classList.remove("recording");
            const transcript = event.results[0][0].transcript;
            appendWaBubble("🎙️ " + transcript, "outgoing");

            setTimeout(() => {
                appendWaBubble(t.voiceReply.replace(/\n/g, "<br>"), "incoming");
                speakText("आपकी आवाज समझ ली गई है। 500 किलो टमाटर का भाव ₹28 तय हुआ है। पिकअप गाड़ी कल सुबह आएगी।", "hi-IN");
                createNewHarvestLot("टमाटर (Voice Listed)", "Vegetables", 28, "Farmer Voice Gate", "Nashik Gate #4", 500, "kg", "🍅");
            }, 800);
        };

        recognition.onerror = function() {
            simulateVoiceNoteFallback(mic, t);
        };
    } else {
        simulateVoiceNoteFallback(mic, t);
    }
}

function simulateVoiceNoteFallback(mic, t) {
    setTimeout(() => {
        mic.classList.remove("recording");
        appendWaBubble(t.voiceSample, "outgoing");

        setTimeout(() => {
            appendWaBubble(t.voiceReply.replace(/\n/g, "<br>"), "incoming");
            speakText("आपकी आवाज समझ ली गई है। 500 किलो टमाटर का भाव ₹28 तय हुआ है। पिकअप गाड़ी कल सुबह आएगी।", "hi-IN");
            createNewHarvestLot("ताज़ा टमाटर (Voice Note Lot)", "Vegetables", 28, "Village FPO", "Kolar Gate", 500, "kg", "🍅");
        }, 1000);
    }, 2000);
}

function appendWaBubble(html, type) {
    const body = document.getElementById("waChatBody");
    if (!body) return;
    const div = document.createElement("div");
    div.className = `wa-bubble ${type}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    div.innerHTML = `${html} <span class="wa-bubble-time">${timeStr}</span>`;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

// =========================================================
// SARAL KISAN PICTORIAL MODE (Zero-Literacy Visual Wizard)
// =========================================================
let saralSelectedCrop = { name: "टमाटर (Tomatoes)", emoji: "🍅", price: 28 };
let saralSelectedQty = { label: "10 बोरी (500 kg)", kg: 500 };

function injectSaralKisanModal() {
    if (document.getElementById("saralModal")) return;

    const overlay = document.createElement("div");
    overlay.className = "saral-modal-overlay";
    overlay.id = "saralModal";
    overlay.innerHTML = `
        <div class="saral-container">
            <div class="saral-header">
                <h2>🌾 सरल किसान मोड (Zero-Reading Visual Mode)</h2>
                <button style="background:transparent; border:none; color:white; font-size:24px; cursor:pointer;" onclick="closeSaralModal()">✕</button>
            </div>
            <div class="saral-step-indicator">
                <div class="saral-step-pill active" id="saralStepPill1">1️⃣ फसल चुनें (Select Crop)</div>
                <div class="saral-step-pill" id="saralStepPill2">2️⃣ बोरी/मात्रा चुनें (Quantity)</div>
                <div class="saral-step-pill" id="saralStepPill3">3️⃣ पक्का करें (Confirm)</div>
            </div>
            <div class="saral-content">
                <div class="saral-audio-prompt">
                    <span class="saral-audio-text">
                        🔊 <span id="saralAudioPromptText">नमस्ते! जिस फसल को बेचना चाहते हैं, उस पर अंगूठा लगाएं।</span>
                    </span>
                    <button class="primary-btn" style="padding:6px 12px; font-size:12px;" onclick="speakText(document.getElementById('saralAudioPromptText').innerText, 'hi-IN')">
                        🔊 आवाज़ सुनें
                    </button>
                </div>

                <div id="saralStep1">
                    <div class="saral-crop-grid">
                        <div class="saral-crop-card selected" onclick="selectSaralCrop('टमाटर', '🍅', 28, this)">
                            <span class="saral-crop-emoji">🍅</span>
                            <div class="saral-crop-name">टमाटर</div>
                            <div class="saral-crop-price">₹28/kg (मंडी: ₹16)</div>
                        </div>
                        <div class="saral-crop-card" onclick="selectSaralCrop('प्याज़', '🧅', 24, this)">
                            <span class="saral-crop-emoji">🧅</span>
                            <div class="saral-crop-name">लाल प्याज़</div>
                            <div class="saral-crop-price">₹24/kg (मंडी: ₹14)</div>
                        </div>
                        <div class="saral-crop-card" onclick="selectSaralCrop('आलू', '🥔', 22, this)">
                            <span class="saral-crop-emoji">🥔</span>
                            <div class="saral-crop-name">आलू</div>
                            <div class="saral-crop-price">₹22/kg (मंडी: ₹12)</div>
                        </div>
                        <div class="saral-crop-card" onclick="selectSaralCrop('गेहूँ/चावल', '🌾', 35, this)">
                            <span class="saral-crop-emoji">🌾</span>
                            <div class="saral-crop-name">अनाज / गेहूँ</div>
                            <div class="saral-crop-price">₹35/kg (मंडी: ₹22)</div>
                        </div>
                    </div>
                    <button class="saral-big-confirm-btn" onclick="goToSaralStep(2)">
                        आगे बढ़ें (Next) ➔
                    </button>
                </div>

                <div id="saralStep2" style="display:none;">
                    <div class="saral-qty-grid">
                        <div class="saral-qty-card" onclick="selectSaralQty('5 बोरी (250 kg)', 250, this)">
                            <span class="saral-qty-icon">🛍️</span>
                            <div class="saral-qty-label">5 बोरी (250 kg)</div>
                        </div>
                        <div class="saral-qty-card selected" onclick="selectSaralQty('10 बोरी (500 kg)', 500, this)">
                            <span class="saral-qty-icon">📦</span>
                            <div class="saral-qty-label">10 बोरी (500 kg)</div>
                        </div>
                        <div class="saral-qty-card" onclick="selectSaralQty('ट्रैक्टर ट्रॉली (2,000 kg)', 2000, this)">
                            <span class="saral-qty-icon">🚜</span>
                            <div class="saral-qty-label">ट्रॉली (2,000 kg)</div>
                        </div>
                    </div>
                    <div style="display:flex; gap:12px; margin-top:20px;">
                        <button class="secondary-btn" style="flex:1; padding:16px;" onclick="goToSaralStep(1)">⬅ वापस (Back)</button>
                        <button class="saral-big-confirm-btn" style="flex:2; margin-top:0;" onclick="goToSaralStep(3)">आगे बढ़ें ➔</button>
                    </div>
                </div>

                <div id="saralStep3" style="display:none; text-align:center;">
                    <div style="font-size:60px; margin-bottom:12px;" id="saralSummaryEmoji">🍅</div>
                    <h3 style="font-size:24px; margin-bottom:6px;" id="saralSummaryCrop">ताज़ा टमाटर</h3>
                    <p style="font-size:16px; color:#15803d; font-weight:bold;" id="saralSummaryDetails">
                        10 बोरी (500 kg) • कुल अनुमानित भुगतान: ₹14,000
                    </p>
                    <div style="background:#f0fdf4; border:2px dashed #22c55e; border-radius:14px; padding:16px; margin:16px 0; font-size:14px;">
                        🚚 <strong>पिकअप गाड़ी:</strong> कल सुबह 8:30 बजे आपके गांव पहुंचेगी।<br>
                        💵 <strong>सीधा भुगतान:</strong> बैंक खाते/UPI में तुरंत जमा होगा।
                    </div>
                    <button class="saral-big-confirm-btn" onclick="finishSaralOrder()">
                        ✅ हां, पक्का बेचें! (Confirm Sale)
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function openSaralModal() {
    const modal = document.getElementById("saralModal");
    if (modal) {
        modal.classList.add("open");
        goToSaralStep(1);
        speakText("सरल किसान मोड खुला है। जिस फसल को बेचना है, उस पर उंगली रखें।", "hi-IN");
    }
}

function closeSaralModal() {
    const modal = document.getElementById("saralModal");
    if (modal) modal.classList.remove("open");
}

function selectSaralCrop(name, emoji, price, el) {
    saralSelectedCrop = { name, emoji, price };
    document.querySelectorAll(".saral-crop-card").forEach(c => c.classList.remove("selected"));
    if (el) el.classList.add("selected");
    speakText(name + ", भाव अट्ठाइस रुपए किलो", "hi-IN");
}

function selectSaralQty(label, kg, el) {
    saralSelectedQty = { label, kg };
    document.querySelectorAll(".saral-qty-card").forEach(c => c.classList.remove("selected"));
    if (el) el.classList.add("selected");
    speakText(label, "hi-IN");
}

function goToSaralStep(step) {
    document.getElementById("saralStep1").style.display = step === 1 ? "block" : "none";
    document.getElementById("saralStep2").style.display = step === 2 ? "block" : "none";
    document.getElementById("saralStep3").style.display = step === 3 ? "block" : "none";

    document.getElementById("saralStepPill1").className = "saral-step-pill " + (step >= 1 ? "active" : "");
    document.getElementById("saralStepPill2").className = "saral-step-pill " + (step >= 2 ? "active" : "");
    document.getElementById("saralStepPill3").className = "saral-step-pill " + (step >= 3 ? "active" : "");

    const prompt = document.getElementById("saralAudioPromptText");
    if (step === 1) {
        prompt.innerText = "जिस फसल को बेचना चाहते हैं, उस पर अंगूठा लगाएं।";
        speakText(prompt.innerText, "hi-IN");
    } else if (step === 2) {
        prompt.innerText = "अब अपनी फसल की मात्रा या बोरी चुनें।";
        speakText(prompt.innerText, "hi-IN");
    } else if (step === 3) {
        const total = saralSelectedCrop.price * saralSelectedQty.kg;
        document.getElementById("saralSummaryEmoji").innerText = saralSelectedCrop.emoji;
        document.getElementById("saralSummaryCrop").innerText = saralSelectedCrop.name;
        document.getElementById("saralSummaryDetails").innerText = `${saralSelectedQty.label} • कुल भुगतान: ₹${total.toLocaleString('en-IN')}`;
        prompt.innerText = "बधाई! जांचें और नीचे हरा बटन दबाकर बिक्री पक्की करें।";
        speakText(`कुल भुगतान चौदह हज़ार रुपए। पक्का करने के लिए हरा बटन दबाएं।`, "hi-IN");
    }
}

function finishSaralOrder() {
    const total = saralSelectedCrop.price * saralSelectedQty.kg;
    createNewHarvestLot(
        saralSelectedCrop.name + " (सरल किसान लॉट)",
        "Vegetables",
        saralSelectedCrop.price,
        "रामेश्वर किसान (Voice Mitra)",
        "वारंगल क्लस्टर, तेलंगाना",
        saralSelectedQty.kg,
        "kg",
        saralSelectedCrop.emoji
    );
    closeSaralModal();
    showToast("🎉 बधाई! आपकी फसल लिस्ट हो गई है। गाड़ी कल सुबह 8:30 बजे आएगी!", "🌾");
    speakText("बधाई किसान भाई! आपकी फसल सफलतापूर्वक दर्ज हो गई है। पिकअप गाड़ी कल सुबह आएगी!", "hi-IN");
}

function createNewHarvestLot(name, category, directPrice, farmer, location, qty, unit, emoji) {
    const products = getProducts();
    const newProd = {
        id: "PROD-" + (products.length + 101),
        name: name,
        category: category,
        emoji: emoji || "🌾",
        directPrice: directPrice,
        mandiPrice: Math.round(directPrice * 0.62),
        retailPrice: Math.round(directPrice * 1.55),
        farmer: farmer,
        location: location,
        availableQty: qty,
        unit: unit,
        harvestDate: "ताज़ा आज का लॉट",
        grade: "A+ Verified",
        type: "b2c-b2b",
        verified: true
    };
    products.unshift(newProd);
    localStorage.setItem("agridirect_products", JSON.stringify(products));

    // Also dispatch order request in logistics
    const orders = getOrders();
    const newOrd = {
        id: "ORD-" + (orders.length + 1025),
        buyer: "AgriDirect Fulfillment Hub (B2C & B2B Pool)",
        farmer: farmer,
        product: name,
        emoji: emoji || "🌾",
        qty: qty + " " + unit,
        total: directPrice * qty,
        mandiCost: Math.round(directPrice * 1.55 * qty),
        farmerGain: Math.round(directPrice * 0.38 * qty),
        status: "In Transit",
        statusCode: "transit",
        date: "Just Now",
        destination: "Central Cold Hub",
        transitTemp: "4.0°C",
        escrowStatus: "Held in Escrow (Release upon Delivery)"
    };
    orders.unshift(newOrd);
    localStorage.setItem("agridirect_orders", JSON.stringify(orders));
}

// =========================================================
// CART & ESCROW CHECKOUT SYSTEM
// =========================================================
function injectCartDrawer() {
    if (document.getElementById("cartDrawer")) return;

    const overlay = document.createElement("div");
    overlay.className = "cart-drawer-overlay";
    overlay.id = "cartOverlay";
    overlay.onclick = toggleCartDrawer;
    document.body.appendChild(overlay);

    const drawer = document.createElement("div");
    drawer.className = "cart-drawer";
    drawer.id = "cartDrawer";
    drawer.innerHTML = `
        <div class="cart-drawer-header">
            <h3>🛒 Direct Farm Basket</h3>
            <button style="background:transparent; border:none; color:white; font-size:20px; cursor:pointer;" onclick="toggleCartDrawer()">✕</button>
        </div>
        <div class="cart-drawer-body" id="cartDrawerBody"></div>
        <div class="cart-drawer-footer">
            <div class="escrow-shield-badge">
                <span style="font-size:18px;">🛡️</span>
                <span><strong>100% Escrow Protection:</strong> Funds held securely until harvest is delivered and assay approved.</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:16px; font-weight:700;">
                <span>Total Amount:</span>
                <span id="cartTotalAmount">₹0</span>
            </div>
            <button class="primary-btn" style="width:100%; justify-content:center; padding:14px;" onclick="checkoutCart()">
                🔒 Confirm Direct Order & Escrow
            </button>
        </div>
    `;
    document.body.appendChild(drawer);
    renderCart();
}

function toggleCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer && overlay) {
        drawer.classList.toggle("open");
        overlay.classList.toggle("open");
        if (drawer.classList.contains("open")) renderCart();
    }
}

function addToCart(prodId) {
    const products = getProducts();
    const prod = products.find(p => p.id === prodId || p.name === prodId);
    if (!prod) return;

    const cart = getCart();
    const existing = cart.find(item => item.id === prod.id);
    if (existing) {
        existing.qty += 10;
    } else {
        cart.push({
            id: prod.id,
            name: prod.name,
            emoji: prod.emoji,
            price: prod.directPrice,
            unit: prod.unit,
            farmer: prod.farmer,
            qty: 10
        });
    }
    saveCart(cart);
    showToast(`Added 10 ${prod.unit} of ${prod.name} to Cart!`, "🛒");
    renderCart();
}

function updateCartItemQty(prodId, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === prodId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        const idx = cart.indexOf(item);
        cart.splice(idx, 1);
    }
    saveCart(cart);
    renderCart();
}

function renderCart() {
    const body = document.getElementById("cartDrawerBody");
    const totalEl = document.getElementById("cartTotalAmount");
    if (!body || !totalEl) return;

    const cart = getCart();
    if (cart.length === 0) {
        body.innerHTML = `
            <div style="text-align:center; padding:50px 20px; color:#94a3b8;">
                <div style="font-size:50px; margin-bottom:10px;">🧺</div>
                <h4>Your Basket is Empty</h4>
                <p style="font-size:13px; margin-top:6px;">Browse fresh produce directly from farmers & FPOs.</p>
            </div>
        `;
        totalEl.innerText = "₹0";
        return;
    }

    let sum = 0;
    body.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        sum += itemTotal;
        return `
            <div class="cart-item-card">
                <span class="cart-item-icon">${item.emoji}</span>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>🌱 ${item.farmer} • ₹${item.price}/${item.unit}</p>
                    <div class="cart-qty-ctrl">
                        <button onclick="updateCartItemQty('${item.id}', -5)">-</button>
                        <span style="font-size:13px; font-weight:bold;">${item.qty} ${item.unit}</span>
                        <button onclick="updateCartItemQty('${item.id}', 5)">+</button>
                    </div>
                </div>
                <div style="text-align:right;">
                    <strong style="font-size:14px; color:var(--forest-900);">₹${itemTotal.toLocaleString('en-IN')}</strong>
                    <br>
                    <small style="color:var(--emerald-600); font-weight:700;">Zero Middlemen</small>
                </div>
            </div>
        `;
    }).join("");

    totalEl.innerText = `₹${sum.toLocaleString('en-IN')}`;
}

function checkoutCart() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast("Please add items to cart first!", "⚠️");
        return;
    }

    const orders = getOrders();
    cart.forEach(item => {
        const newOrd = {
            id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
            buyer: "Direct Consumer / Store",
            farmer: item.farmer,
            product: item.name,
            emoji: item.emoji,
            qty: `${item.qty} ${item.unit}`,
            total: item.price * item.qty,
            mandiCost: Math.round(item.price * item.qty * 1.5),
            farmerGain: Math.round(item.price * item.qty * 0.4),
            status: "In Transit",
            statusCode: "transit",
            date: "Just Now",
            destination: "Urban Hub Drop",
            transitTemp: "4.2°C Cold Chain",
            escrowStatus: "Protected in Escrow"
        };
        orders.unshift(newOrd);
    });

    localStorage.setItem("agridirect_orders", JSON.stringify(orders));
    saveCart([]);
    toggleCartDrawer();

    showToast("🎉 Order Placed with Escrow Protection! Tracking in Orders page.", "🛡️");
    setTimeout(() => {
        if (window.location.pathname.includes("orders.html")) {
            window.location.reload();
        }
    }, 1500);
}

// =========================================================
// GLOBAL LANGUAGE DROPDOWN INITIALIZER
// =========================================================
function initGlobalLangDropdown() {
    const select = document.getElementById("globalLangSelect");
    if (!select) return;

    // Populate options
    select.innerHTML = SUPPORTED_LANGUAGES.map(l =>
        `<option value="${l.code}">${l.native} (${l.name})</option>`
    ).join("");

    // Set current value
    select.value = currentGlobalLang;

    // Apply language silently (no speech announcement on page load)
    setGlobalLanguage(currentGlobalLang, false);
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
    injectWhatsAppWidget();
    injectSaralKisanModal();
    injectCartDrawer();
    updateCartCountBadge();
    initGlobalLangDropdown();
});
