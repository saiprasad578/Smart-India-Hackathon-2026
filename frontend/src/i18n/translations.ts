export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'mr';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🌾' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🌿' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🌱' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flag: '🚜' }
];

export const translations: Record<Language, {
  brand: string;
  tagline: string;
  nav: {
    home: string;
    market: string;
    forFarmers: string;
    forBuyers: string;
    logistics: string;
    support: string;
    about: string;
    login: string;
    signup: string;
    callSupport: string;
  };
  hero: {
    title: string;
    subtitle: string;
    badge1: string;
    badge2: string;
    badge3: string;
    badge4: string;
    simpleAccess: string;
    waysToUseTitle: string;
    waysToUseSubtitle: string;
    appTitle: string;
    appDesc: string;
    ivrTitle: string;
    ivrDesc: string;
    fpoTitle: string;
    fpoDesc: string;
    voiceTitle: string;
    voiceDesc: string;
  };
  roles: {
    title: string;
    farmerTitle: string;
    farmerDesc: string;
    farmerBtn: string;
    fpoTitle: string;
    fpoDesc: string;
    fpoBtn: string;
    buyerTitle: string;
    buyerDesc: string;
    buyerBtn: string;
    consumerTitle: string;
    consumerDesc: string;
    consumerBtn: string;
    logisticsTitle: string;
    logisticsDesc: string;
    logisticsBtn: string;
  };
  simpleOptions: {
    title: string;
    subtitle: string;
    callTitle: string;
    callDesc: string;
    callBtn: string;
    smsTitle: string;
    smsDesc: string;
    smsBtn: string;
    voiceTitle: string;
    voiceDesc: string;
    voiceBtn: string;
    centerTitle: string;
    centerDesc: string;
    centerBtn: string;
  };
  howItWorks: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
    step7Title: string;
    step7Desc: string;
    statsBadge: string;
    statFarmers: string;
    statBuyers: string;
    statVehicles: string;
    statDistricts: string;
  };
  architecture: {
    title: string;
    usersTitle: string;
    platformTitle: string;
    presentationLayer: string;
    applicationLayer: string;
    aiLayer: string;
    integrationLayer: string;
    dataLayer: string;
    techStackTitle: string;
    inclusionTitle: string;
  };
  footer: {
    values: string;
    slogan: string;
    syntheticNotice: string;
  };
}> = {
  en: {
    brand: "KisanConnect",
    tagline: "Direct from Farm to You",
    nav: {
      home: "Home",
      market: "Market",
      forFarmers: "For Farmers",
      forBuyers: "For Buyers",
      logistics: "Logistics",
      support: "Support",
      about: "About",
      login: "Login",
      signup: "Sign Up",
      callSupport: "1800 123 4567\n(IVR / Call Support)"
    },
    hero: {
      title: "Empowering Farmers\nConnecting Markets",
      subtitle: "A smart and inclusive platform that helps farmers, FPOs, and rural communities sell their produce directly to buyers with AI-powered demand forecasting, fair pricing and optimized logistics.",
      badge1: "Better Prices for Farmers",
      badge2: "Lower Prices for Consumers",
      badge3: "Less Waste More Freshness",
      badge4: "Sustainable Supply Chains",
      simpleAccess: "Simple Access for Everyone",
      waysToUseTitle: "Multiple Ways to Use",
      waysToUseSubtitle: "– For Every Farmer",
      appTitle: "Mobile App",
      appDesc: "(For Smartphone Users)\nSimple UI · Local Language\nVoice Support",
      ivrTitle: "Feature Phone / IVR",
      ivrDesc: "(For Basic Phones)\nCall & Sell · Check Prices\nListen in Local Language",
      fpoTitle: "FPO / Village Center",
      fpoDesc: "(For No Phone / Low Literacy)\nAssisted by Trained Staff\nBulk Registration",
      voiceTitle: "Voice / Chat",
      voiceDesc: "(Multilingual)\nSpeak in Your Language\nGet Instant Help"
    },
    roles: {
      title: "Choose Your Role",
      farmerTitle: "I am a Farmer",
      farmerDesc: "Sell your produce, check prices, track orders and more.",
      farmerBtn: "Get Started →",
      fpoTitle: "I am an FPO / Agent",
      fpoDesc: "Manage multiple farmers, list produce, and coordinate with buyers.",
      fpoBtn: "Continue →",
      buyerTitle: "I am a Buyer",
      buyerDesc: "Source quality produce directly from farmers and FPOs.",
      buyerBtn: "Join Now →",
      consumerTitle: "I am a Consumer",
      consumerDesc: "Get fresh, safe and affordable produce directly from farmers.",
      consumerBtn: "Explore →",
      logisticsTitle: "I am a Logistics Partner",
      logisticsDesc: "Pick up, deliver and optimize routes with our system.",
      logisticsBtn: "Partner Now →"
    },
    simpleOptions: {
      title: "Not Comfortable with Apps?",
      subtitle: "Use our simple options",
      callTitle: "Give a Call",
      callDesc: "Press 1 to sell produce or check prices",
      callBtn: "Call Now",
      smsTitle: "Send SMS",
      smsDesc: "Text your crop, quantity and location",
      smsBtn: "Send SMS",
      voiceTitle: "Use Voice (IVR)",
      voiceDesc: "Talk in your local language and follow prompts",
      voiceBtn: "Call Now",
      centerTitle: "Visit Nearest Center",
      centerDesc: "Get help from FPO or village center",
      centerBtn: "Find Center"
    },
    howItWorks: {
      title: "How It Works (End-to-End Flow)",
      step1Title: "Farmer / FPO",
      step1Desc: "Adds produce details\n• (App / Call / Center)",
      step2Title: "AI Demand Forecasting",
      step2Desc: "Predicts demand\n• Suggests best markets",
      step3Title: "Matching Engine",
      step3Desc: "Matches supply & demand\n• Best price + quantity + quality",
      step4Title: "Logistics Optimization",
      step4Desc: "Creates optimized routes\n• Manages pickups & delivery",
      step5Title: "Buyers / Consumers",
      step5Desc: "Place orders\n• Track delivery",
      step6Title: "Delivery & Payment",
      step6Desc: "Safe delivery\n• Digital / Cash / UPI",
      step7Title: "Happy Farmers & Consumers",
      step7Desc: "Better earnings\n• Lower prices\n• Less waste",
      statsBadge: "From Our Farms To Your Home",
      statFarmers: "Farmers",
      statBuyers: "Buyers",
      statVehicles: "Vehicles",
      statDistricts: "Districts"
    },
    architecture: {
      title: "System Architecture",
      usersTitle: "Users & Access Channels",
      platformTitle: "KisanConnect Platform (Cloud)",
      presentationLayer: "Presentation Layer (User Interfaces)",
      applicationLayer: "Application Layer (Business Logic & Services)",
      aiLayer: "AI & Analytics Layer",
      integrationLayer: "Integration Layer",
      dataLayer: "Data Layer",
      techStackTitle: "Technology Stack",
      inclusionTitle: "Key Features for Rural Inclusion"
    },
    footer: {
      values: "Inclusive • Smart • Sustainable",
      slogan: "Better Farming Brighter Future",
      syntheticNotice: "SIH Prototype — Test Mode & Synthetic Data Model Enabled for Evaluation"
    }
  },
  te: {
    brand: "కిసాన్‌కనెక్ట్",
    tagline: "పొలం నుండి నేరుగా మీ ముందుకు",
    nav: {
      home: "హోమ్",
      market: "మార్కెట్",
      forFarmers: "రైతుల కోసం",
      forBuyers: "కొనుగోలుదారుల కోసం",
      logistics: "రవాణా",
      support: "సహాయం",
      about: "మా గురించి",
      login: "లాగిన్",
      signup: "నమోదు",
      callSupport: "1800 123 4567\n(కాల్ సపోర్ట్)"
    },
    hero: {
      title: "రైతులకు సాధికారత\nమార్కెట్లతో అనుసంధానం",
      subtitle: "రైతులు మరియు ఎఫ్‌పీవోలు తమ పంటను నేరుగా కొనుగోలుదారులకు సరసమైన ధరకు, ఏఐ డిమాండ్ అంచనాలు మరియు సులభ రవాణా ద్వారా విక్రయించడానికి స్మార్ట్ వేదిక.",
      badge1: "రైతులకు మెరుగైన ధర",
      badge2: "వినియోగదారులకు తక్కువ ధర",
      badge3: "తక్కువ వ్యర్థం · ఎక్కువ తాజాదనం",
      badge4: "స్థిరమైన సరఫరా వ్యవస్థ",
      simpleAccess: "అందరికీ సులభ ప్రవేశం",
      waysToUseTitle: "వినియోగించడానికి బహుళ మార్గాలు",
      waysToUseSubtitle: "– ప్రతి రైతు కోసం",
      appTitle: "మొబైల్ యాప్",
      appDesc: "(స్మార్ట్‌ఫోన్ వినియోగదారులకు)\nసులభమైన ఇంటర్‌ఫేస్ · ప్రాంతీయ భాష\nవాయిస్ మద్దతు",
      ivrTitle: "ఫీచర్ ఫోన్ / ఐవిఆర్",
      ivrDesc: "(సాధారణ ఫోన్లకు)\nకాల్ చేసి అమ్మండి · ధరలు తెలుసుకోండి\nప్రాంతీయ భాషలో వినండి",
      fpoTitle: "ఎఫ్‌పీవో / గ్రామ కేంద్రం",
      fpoDesc: "(ఫోన్ లేనివారికి / అవగాహన కోసం)\nశిక్షణ పొందిన సిబ్బంది సహాయం\nబల్క్ రిజిస్ట్రేషన్",
      voiceTitle: "వాయిస్ / చాట్",
      voiceDesc: "(బహుభాషా సదుపాయం)\nమీ భాషలోనే మాట్లాడండి\nతక్షణ సహాయం పొందండి"
    },
    roles: {
      title: "మీ పాత్రను ఎంచుకోండి",
      farmerTitle: "నేను ఒక రైతును",
      farmerDesc: "మీ పంటను అమ్మండి, ధరలను తనిఖీ చేయండి మరియు ఆర్డర్‌లను ట్రాక్ చేయండి.",
      farmerBtn: "ప్రారంభించండి →",
      fpoTitle: "నేను ఎఫ్‌పీవో / ఏజెంట్‌ను",
      fpoDesc: "రైతులను సమన్వయం చేయండి, పంటను జాబితా చేయండి, కొనుగోలుదారులతో కలవండి.",
      fpoBtn: "కొనసాగించండి →",
      buyerTitle: "నేను కొనుగోలుదారుని",
      buyerDesc: "రైతుల నుండి నాణ్యమైన వ్యవసాయ ఉత్పత్తులను నేరుగా పొందండి.",
      buyerBtn: "చేరండి →",
      consumerTitle: "నేను వినియోగదారుని",
      consumerDesc: "తాజా మరియు పరిశుభ్రమైన కూరగాయలను రైతుల నుండి నేరుగా పొందండి.",
      consumerBtn: "అన్వేషించండి →",
      logisticsTitle: "నేను లాజిస్టిక్స్ భాగస్వామిని",
      logisticsDesc: "పంట పికప్ మరియు డెలివరీ కోసం సులభ రూట్‌లతో కనెక్ట్ అవ్వండి.",
      logisticsBtn: "భాగస్వామి అవ్వండి →"
    },
    simpleOptions: {
      title: "యాప్‌లు వాడటం కష్టమా?",
      subtitle: "మా సులభమైన ఎంపికలను ఉపయోగించండి",
      callTitle: "కాల్ చేయండి",
      callDesc: "పంట అమ్మడానికి లేదా ధర కోసం 1 నొక్కండి",
      callBtn: "ఇప్పుడే కాల్ చేయండి",
      smsTitle: "ఎస్ఎంఎస్ పంపండి",
      smsDesc: "పంట, పరిమాణం మరియు గ్రామం పంపండి",
      smsBtn: "ఎస్ఎంఎస్ చేయండి",
      voiceTitle: "వాయిస్ (IVR)",
      voiceDesc: "మీ భాషలో మాట్లాడి సమాధానం పొందండి",
      voiceBtn: "కాల్ చేయండి",
      centerTitle: "సమీప కేంద్రాన్ని సందర్శించండి",
      centerDesc: "ఎఫ్‌పీవో లేదా రైతు సహాయ కేంద్రం వద్ద సహాయం",
      centerBtn: "కేంద్రం చూడండి"
    },
    howItWorks: {
      title: "ఇది ఎలా పనిచేస్తుంది (ఎండ్-టు-ఎండ్ ప్రక్రియ)",
      step1Title: "రైతు / ఎఫ్‌పీవో",
      step1Desc: "పంట వివరాలను నమోదు చేయండి\n• (యాప్ / కాల్ / కేంద్రం)",
      step2Title: "ఏఐ డిమాండ్ అంచనా",
      step2Desc: "మార్కెట్ డిమాండ్ అంచనా\n• ఉత్తమ మార్కెట్లను సూచిస్తుంది",
      step3Title: "మ్యాచింగ్ ఇంజిన్",
      step3Desc: "సప్లై & డిమాండ్ అనుసంధానం\n• సరసమైన ధర + నాణ్యత",
      step4Title: "లాజిస్టిక్స్ ఆప్టిమైజేషన్",
      step4Desc: "ఉమ్మడి రూట్ ప్లానింగ్\n• పికప్ మరియు రవాణా నిర్వహణ",
      step5Title: "కొనుగోలుదారులు / వినియోగదారులు",
      step5Desc: "ఆర్డర్‌లు ఇవ్వడం\n• డెలివరీ ట్రాకింగ్",
      step6Title: "డెలివరీ & చెల్లింపు",
      step6Desc: "సురక్షిత డెలివరీ\n• డిజిటల్ / ఎస్క్రో / UPI",
      step7Title: "సంతృప్తి చెందిన రైతులు & కొనుగోలుదారులు",
      step7Desc: "మంచి ఆదాయం\n• సరసమైన ధర\n• తక్కువ నష్టం",
      statsBadge: "మా పొలాల నుండి మీ ఇంటికి",
      statFarmers: "రైతులు",
      statBuyers: "కొనుగోలుదారులు",
      statVehicles: "వాహనాలు",
      statDistricts: "జిల్లాలు"
    },
    architecture: {
      title: "సిస్టమ్ ఆర్కిటెక్చర్",
      usersTitle: "వినియోగదారులు & ఛానళ్లు",
      platformTitle: "కిసాన్‌కనెక్ట్ క్లౌడ్ ప్లాట్‌ఫారమ్",
      presentationLayer: "ప్రెజెంటేషన్ లేయర్ (యూజర్ ఇంటర్‌ఫేస్)",
      applicationLayer: "అప్లికేషన్ లేయర్ (బిజినెస్ లాజిక్)",
      aiLayer: "ఏఐ & అనలిటిక్స్ లేయర్",
      integrationLayer: "ఇంటిగ్రేషన్ లేయర్ (e-NAM, Maps, UPI)",
      dataLayer: "డేటా లేయర్ (రైతు డేటా, మార్కెట్ ధరలు)",
      techStackTitle: "టెక్నాలజీ స్టాక్",
      inclusionTitle: "గ్రామీణ సమ్మిళిత ఫీచర్లు"
    },
    footer: {
      values: "సమ్మిళితం • స్మార్ట్ • స్థిరమైనది",
      slogan: "మెరుగైన వ్యవసాయం – ఉజ్వల భవిష్యత్తు",
      syntheticNotice: "SIH డెమో ప్రొటోటైప్ — కృత్రిమ డేటా & టెస్ట్ మోడ్ సదుపాయం"
    }
  },
  hi: {
    brand: "किसानकनेक्ट",
    tagline: "सीधे खेत से आप तक",
    nav: {
      home: "होम",
      market: "मंडी / बाज़ार",
      forFarmers: "किसानों के लिए",
      forBuyers: "खरीदारों के लिए",
      logistics: "लॉजिस्टिक्स",
      support: "सहायता",
      about: "हमारे बारे में",
      login: "लॉग इन",
      signup: "साइन अप",
      callSupport: "1800 123 4567\n(आईवीआर सहायता)"
    },
    hero: {
      title: "किसानों का सशक्तिकरण\nबाज़ारों से सीधा जुड़ाव",
      subtitle: "एक स्मार्ट और समावेशी मंच जो किसानों और एफपीओ को एआई मांग पूर्वानुमान, निष्पक्ष मूल्य निर्धारण और पूल्ड लॉजिस्टिक्स के साथ सीधे खरीदारों को उपज बेचने में मदद करता है।",
      badge1: "किसानों को बेहतर दाम",
      badge2: "उपभोक्ताओं को कम कीमत",
      badge3: "कम बर्बादी, अधिक ताज़गी",
      badge4: "टिकाऊ आपूर्ति श्रृंखला",
      simpleAccess: "हर किसी के लिए आसान पहुंच",
      waysToUseTitle: "उपयोग के कई आसान तरीके",
      waysToUseSubtitle: "– हर किसान के लिए",
      appTitle: "मोबाइल ऐप",
      appDesc: "(स्मार्टफोन उपयोगकर्ताओं के लिए)\nसरल यूआई · स्थानीय भाषा\nआवाज़ (Voice) सहायता",
      ivrTitle: "फीचर फोन / आईवीआर",
      ivrDesc: "(साधारण फोन के लिए)\nकॉल करें और बेचें · दाम जानें\nस्थानीय भाषा में सुनें",
      fpoTitle: "एफपीओ / ग्राम केंद्र",
      fpoDesc: "(बिना फोन / कम साक्षरता हेतु)\nप्रशिक्षित कर्मियों द्वारा मदद\nथोक पंजीकरण",
      voiceTitle: "आवाज़ / चैट",
      voiceDesc: "(बहुभाषी सुविधा)\nअपनी भाषा में बोलें\nतुरंत सहायता पाएं"
    },
    roles: {
      title: "अपनी भूमिका चुनें",
      farmerTitle: "मैं एक किसान हूँ",
      farmerDesc: "अपनी उपज बेचें, मंडी भाव देखें और ऑर्डर ट्रैक करें।",
      farmerBtn: "शुरू करें →",
      fpoTitle: "मैं एक एफपीओ / एजेंट हूँ",
      fpoDesc: "कई किसानों को प्रबंधित करें, उपज सूचीबद्ध करें और समन्वय करें।",
      fpoBtn: "आगे बढ़ें →",
      buyerTitle: "मैं एक खरीदार हूँ",
      buyerDesc: "किसानों और एफपीओ से सीधे गुणवत्तापूर्ण उपज खरीदें।",
      buyerBtn: "अभी जुड़ें →",
      consumerTitle: "मैं एक उपभोक्ता हूँ",
      consumerDesc: "खेत से ताज़ा, सुरक्षित और किफायती सब्जियां पाएं।",
      consumerBtn: "देखें →",
      logisticsTitle: "मैं लॉजिस्टिक्स पार्टनर हूँ",
      logisticsDesc: "मार्ग अनुकूलन के साथ डिलीवरी और पिकअप करें।",
      logisticsBtn: "पार्टनर बनें →"
    },
    simpleOptions: {
      title: "ऐप चलाने में परेशानी?",
      subtitle: "हमारे सरल विकल्पों का उपयोग करें",
      callTitle: "कॉल करें",
      callDesc: "उपज बेचने या भाव जानने के लिए 1 दबाएं",
      callBtn: "कॉल करें",
      smsTitle: "एसएमएस भेजें",
      smsDesc: "फसल, मात्रा और स्थान लिखकर भेजें",
      smsBtn: "एसएमएस भेजें",
      voiceTitle: "आईवीआर (वॉइस)",
      voiceDesc: "अपनी भाषा में बोलें और निर्देश सुनें",
      voiceBtn: "कॉल करें",
      centerTitle: "नज़दीकी केंद्र जाएं",
      centerDesc: "एफपीओ या ग्राम केंद्र से मदद प्राप्त करें",
      centerBtn: "केंद्र खोजें"
    },
    howItWorks: {
      title: "यह कैसे काम करता है (शुरुआत से अंत तक)",
      step1Title: "किसान / एफपीओ",
      step1Desc: "उपज का विवरण जोड़ें\n• (ऐप / कॉल / केंद्र)",
      step2Title: "एआई मांग पूर्वानुमान",
      step2Desc: "मांग की भविष्यवाणी\n• सर्वश्रेष्ठ मंडी का सुझाव",
      step3Title: "मैचिंग इंजन",
      step3Desc: "मांग और आपूर्ति का मिलान\n• श्रेष्ठ मूल्य + मात्रा + गुणवत्ता",
      step4Title: "लॉजिस्टिक्स अनुकूलन",
      step4Desc: "सुलभ रूट तैयार करना\n• पिकअप और डिलीवरी प्रबंधन",
      step5Title: "खरीदार / उपभोक्ता",
      step5Desc: "ऑर्डर दें\n• डिलीवरी ट्रैक करें",
      step6Title: "डिलीवरी और भुगतान",
      step6Desc: "सुरक्षित डिलीवरी\n• डिजिटल / एस्क्रो / यूपीआई",
      step7Title: "संतुष्ट किसान और उपभोक्ता",
      step7Desc: "अधिक आमदनी\n• कम कीमत\n• शून्य बर्बादी",
      statsBadge: "हमारे खेतों से आपके घर तक",
      statFarmers: "किसान",
      statBuyers: "खरीदार",
      statVehicles: "वाहन",
      statDistricts: "जिले"
    },
    architecture: {
      title: "सिस्टम आर्किटेक्चर (System Architecture)",
      usersTitle: "उपयोगकर्ता और एक्सेस चैनल",
      platformTitle: "किसानकनेक्ट प्लेटफॉर्म (क्लाउड)",
      presentationLayer: "प्रेजेंटेशन लेयर (यूज़र इंटरफ़ेस)",
      applicationLayer: "एप्लिकेशन लेयर (बिजनेस लॉजिक)",
      aiLayer: "एआई और एनालिटिक्स लेयर",
      integrationLayer: "इंटीग्रेशन लेयर (e-NAM, Google Maps, UPI)",
      dataLayer: "डेटा लेयर (मंडी भाव, फसल डेटा)",
      techStackTitle: "टेक्नोलॉजी स्टैक",
      inclusionTitle: "ग्रामीण समावेशन हेतु प्रमुख विशेषताएं"
    },
    footer: {
      values: "समावेशी • स्मार्ट • टिकाऊ",
      slogan: "उन्नत खेती, सुनहरा भविष्य",
      syntheticNotice: "SIH प्रोटोटाइप — मूल्यांकन हेतु सिमुलेटेड डेटा मॉडल सक्रिय"
    }
  },
  ta: {
    brand: "கிசான்கனெக்ட்",
    tagline: "நேரடியாக பண்ணையிலிருந்து உங்கள் இல்லத்திற்கு",
    nav: {
      home: "முகப்பு",
      market: "சந்தை",
      forFarmers: "விவசாயிகளுக்கு",
      forBuyers: "வாங்குவோருக்கு",
      logistics: "போக்குவரத்து",
      support: "உதவி",
      about: "பற்றி",
      login: "உள்நுழைக",
      signup: "பதிவு செய்க",
      callSupport: "1800 123 4567\n(அழைப்பு உதவி)"
    },
    hero: {
      title: "விவசாயிகள் முன்னேற்றம்\nசந்தைகளுடன் இணைப்பு",
      subtitle: "விவசாயிகள் மற்றும் உழவர் உற்பத்தியாளர் நிறுவனங்கள் தங்கள் விளைபொருட்களை இடைத்தரகர்கள் இன்றி நியாயமான விலையில் விற்க உதவும் நவீன தளம்.",
      badge1: "விவசாயிகளுக்கு சிறந்த விலை",
      badge2: "நுகர்வோருக்கு குறைவான விலை",
      badge3: "குறைந்த விரயம் · அதிக புத்துணர்ச்சி",
      badge4: "நிலையான விநியோகம்",
      simpleAccess: "அனைவருக்கும் எளிய அணுகல்",
      waysToUseTitle: "பயன்படுத்த பல வழிகள்",
      waysToUseSubtitle: "– ஒவ்வொரு விவசாயிக்கும்",
      appTitle: "மொபைல் செயலி",
      appDesc: "(ஸ்மார்ட்போன் பயனர்களுக்கு)\nஎளிய வடிவம் · தமிழ் மொழி\nகுரல் வழி ஆதரவு",
      ivrTitle: "ஃபோன் / IVR",
      ivrDesc: "(சாதாரண தொலைபேசிகளுக்கு)\nஅழைத்து விற்கலாம் · விலை அறியலாம்\nதமிழில் கேட்கலாம்",
      fpoTitle: "உழவர் மையம்",
      fpoDesc: "(கைபேசி இல்லாதோருக்கு)\nபயிற்சி பெற்ற பணியாளர் உதவி\nமொத்த பதிவு",
      voiceTitle: "குரல் / அரட்டை",
      voiceDesc: "(பல மொழிகளில்)\nஉங்கள் தாய்மொழியில் பேசி\nஉடனடி உதவி பெறுங்கள்"
    },
    roles: {
      title: "உங்கள் பங்கைத் தேர்வுசெய்க",
      farmerTitle: "நான் ஒரு விவசாயி",
      farmerDesc: "விளைபொருட்களை விற்கவும், விலை சரிபார்க்கவும்.",
      farmerBtn: "தொடங்குக →",
      fpoTitle: "நான் FPO / முகவர்",
      fpoDesc: "விவசாயிகளை ஒருங்கிணைத்து உற்பத்தியை நிர்வகிக்கவும்.",
      fpoBtn: "தொடர்க →",
      buyerTitle: "நான் ஒரு வாங்குபவர்",
      buyerDesc: "விவசாயிகளிடமிருந்து நேரடியாக தரமான விளைபொருட்களை வாங்குங்கள்.",
      buyerBtn: "இணையுங்கள் →",
      consumerTitle: "நான் ஒரு நுகர்வோர்",
      consumerDesc: "பண்ணையிலிருந்து புதிய காய்கறிகளை நேரடியாகப் பெறுங்கள்.",
      consumerBtn: "ஆராய்க →",
      logisticsTitle: "நான் தளவாட பங்குதாரர்",
      logisticsDesc: "எங்கள் அமைப்புடன் வழிகளை மேம்படுத்தி விநியோகிக்கவும்.",
      logisticsBtn: "இணைந்திடுக →"
    },
    simpleOptions: {
      title: "செயலி பயன்படுத்த கடினமா?",
      subtitle: "எங்கள் எளிய வழிகளைப் பயன்படுத்துங்கள்",
      callTitle: "அழைப்பு விடுங்கள்",
      callDesc: "விற்பனை செய்ய 1 ஐ அழுத்தவும்",
      callBtn: "அழைக்க",
      smsTitle: "SMS அனுப்புங்கள்",
      smsDesc: "பயிர், அளவு மற்றும் ஊர் விபரம் அனுப்பவும்",
      smsBtn: "SMS அனுப்ப",
      voiceTitle: "குரல் சேவை (IVR)",
      voiceDesc: "உங்கள் மொழியில் பேசி வழிகாட்டலைப் பின்பற்றுங்கள்",
      voiceBtn: "அழைக்க",
      centerTitle: "அருகிலுள்ள மையம்",
      centerDesc: "கிராம சேவை மையத்தில் நேரடி உதவி பெறலாம்",
      centerBtn: "மையத்தைக் காண்க"
    },
    howItWorks: {
      title: "இது எவ்வாறு இயங்குகிறது (முழுமையான செயல்முறை)",
      step1Title: "விவசாயி / FPO",
      step1Desc: "விளைபொருள் விவரம் பதிவு\n• (செயலி / அழைப்பு / மையம்)",
      step2Title: "AI தேவை கணிப்பு",
      step2Desc: "தேவை முன்னறிவிப்பு\n• சிறந்த சந்தை பரிந்துரை",
      step3Title: "பொருத்துதல் இயந்திரம்",
      step3Desc: "தேவை மற்றும் வழங்கல் பொருத்தம்\n• சிறந்த விலை + தரம்",
      step4Title: "போக்குவரத்து உகப்பாக்கம்",
      step4Desc: "ஒருங்கிணைந்த பாதை மேலாண்மை\n• சேகரிப்பு மற்றும் விநியோகம்",
      step5Title: "வாங்குவோர் / நுகர்வோர்",
      step5Desc: "ஆர்டர் செய்தல்\n• விநியோக கண்காணிப்பு",
      step6Title: "விநியோகம் & பணம் செலுத்துதல்",
      step6Desc: "பாதுகாப்பான விநியோகம்\n• எஸ்க்ரோ / UPI முறை",
      step7Title: "மகிழ்ச்சியான விவசாயிகள்",
      step7Desc: "அதிக லாபம்\n• குறைந்த விலை\n• விரயமின்மை",
      statsBadge: "எங்கள் பண்ணையிலிருந்து உங்கள் வீட்டிற்கு",
      statFarmers: "விவசாயிகள்",
      statBuyers: "வாங்குவோர்",
      statVehicles: "வாகனங்கள்",
      statDistricts: "மாவட்டங்கள்"
    },
    architecture: {
      title: "கணினி கட்டமைப்பு (System Architecture)",
      usersTitle: "பயனர்கள் மற்றும் அணுகல் வழிகள்",
      platformTitle: "கிசான்கனெக்ட் கிளவுட் தளம்",
      presentationLayer: "விளக்க அடுக்கு (பயனர் இடைமுகங்கள்)",
      applicationLayer: "பயன்பாட்டு அடுக்கு (வணிக தர்க்கம்)",
      aiLayer: "செயற்கை நுண்ணறிவு & பகுப்பாய்வு அடுக்கு",
      integrationLayer: "ஒருங்கிணைப்பு அடுக்கு (e-NAM, வரைபடங்கள், UPI)",
      dataLayer: "தரவு அடுக்கு (மண்டி விலை, பயிர் தரவு)",
      techStackTitle: "தொழில்நுட்ப கட்டமைப்பு",
      inclusionTitle: "கிராமப்புற மக்களுக்கான முக்கிய அம்சங்கள்"
    },
    footer: {
      values: "உள்ளடக்கிய • புத்திசாலித்தனமான • நிலையான",
      slogan: "சிறந்த விவசாயம் - பிரகாசமான எதிர்காலம்",
      syntheticNotice: "SIH மாதிரி — மாதிரி தரவு மற்றும் டெஸ்ட் பயன்முறை இயக்கத்தில் உள்ளது"
    }
  },
  kn: {
    brand: "ಕಿಸಾನ್‌ಕನೆಕ್ಟ್",
    tagline: "ನೇರವಾಗಿ ಹೊಲದಿಂದ ನಿಮ್ಮ ಮನೆಗೆ",
    nav: {
      home: "ಮುಖಪುಟ",
      market: "ಮಾರುಕಟ್ಟೆ",
      forFarmers: "ರೈತರಿಗೆ",
      forBuyers: "ಖರೀದಿದಾರರಿಗೆ",
      logistics: "ಸಾರಿಗೆ",
      support: "ಬೆಂಬಲ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      login: "ಲಾಗಿನ್",
      signup: "ಸೈನ್ ಅಪ್",
      callSupport: "1800 123 4567\n(ಕರೆ ಬೆಂಬಲ)"
    },
    hero: {
      title: "ರೈತರ ಸಬಲೀಕರಣ\nಮಾರುಕಟ್ಟೆಗಳ ಸಂಪರ್ಕ",
      subtitle: "ರೈತರು ಮತ್ತು ಎಫ್‌ಪಿಒಗಳು ತಮ್ಮ ಬೆಳೆಗಳನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರಿಗೆ ಎಐ ಡಿಮಾಂಡ್ ಮುನ್ಸೂಚನೆ, ನ್ಯಾಯಯುತ ಬೆಲೆ ಮತ್ತು ಸುಗಮ ಸಾರಿಗೆಯೊಂದಿಗೆ ಮಾರಾಟ ಮಾಡಲು ಸಹಕಾರಿಯಾದ ವೇದಿಕೆ.",
      badge1: "ರೈತರಿಗೆ ಉತ್ತಮ ಬೆಲೆ",
      badge2: "ಗ್ರಾಹಕರಿಗೆ ಕಡಿಮೆ ದರ",
      badge3: "ಕಡಿಮೆ ನಷ್ಟ · ಹೆಚ್ಚು ತಾಜಾತನ",
      badge4: "ಸುಸ್ಥಿರ ಪೂರೈಕೆ ಸರಪಳಿ",
      simpleAccess: "ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಸುಲಭ ಪ್ರವೇಶ",
      waysToUseTitle: "ಬಳಸಲು ಸುಲಭ ಮಾರ್ಗಗಳು",
      waysToUseSubtitle: "– ಪ್ರತಿಯೊಬ್ಬ ರೈತನಿಗಾಗಿ",
      appTitle: "ಮೊಬೈಲ್ ಆ್ಯಪ್",
      appDesc: "(ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಬಳಕೆದಾರರಿಗೆ)\nಸರಳ ಇಂಟರ್‌ಫೇಸ್ · ಕನ್ನಡ ಭಾಷೆ\nಧ್ವನಿ ಬೆಂಬಲ",
      ivrTitle: "ಫೀಚರ್ ಫೋನ್ / IVR",
      ivrDesc: "(ಸಾಮಾನ್ಯ ಫೋನ್‌ಗಳಿಗಾಗಿ)\nಕರೆ ಮಾಡಿ ಮಾರಾಟ ಮಾಡಿ · ಬೆಲೆ ತಿಳಿಯಿರಿ\nಕನ್ನಡದಲ್ಲಿ ಆಲಿಸಿ",
      fpoTitle: "ಎಫ್‌ಪಿಒ / ಗ್ರಾಮ ಕೇಂದ್ರ",
      fpoDesc: "(ಫೋನ್ ಇಲ್ಲದವರಿಗೆ / ಕಡಿಮೆ ಸಾಕ್ಷರತೆ)\nತರಬೇತಿ ಪಡೆದ ಸಿಬ್ಬಂದಿ ನೆರವು\nಬೃಹತ್ ನೋಂದಣಿ",
      voiceTitle: "ಧ್ವನಿ / ಚಾಟ್",
      voiceDesc: "(ಬಹುಭಾಷಾ ಬೆಂಬಲ)\nನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ\nತಕ್ಷಣದ ಸಹಾಯ ಪಡೆಯಿರಿ"
    },
    roles: {
      title: "ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      farmerTitle: "ನಾನು ಒಬ್ಬ ರೈತ",
      farmerDesc: "ಬೆಳೆ ಮಾರಾಟ ಮಾಡಿ, ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಆರ್ಡರ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
      farmerBtn: "ಪ್ರಾರಂಭಿಸಿ →",
      fpoTitle: "ನಾನು ಎಫ್‌ಪಿಒ / ಏಜೆಂಟ್",
      fpoDesc: "ರೈತರನ್ನು ನಿರ್ವಹಿಸಿ, ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ ಮತ್ತು ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಯೋಜಿಸಿ.",
      fpoBtn: "ಮುಂದುವರಿಯಿರಿ →",
      buyerTitle: "ನಾನು ಖರೀದಿದಾರ",
      buyerDesc: "ರೈತರಿಂದ ನೇರವಾಗಿ ಗುಣಮಟ್ಟದ ಕೃಷಿ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ.",
      buyerBtn: "ಈಗಲೇ ಸೇರಿ →",
      consumerTitle: "ನಾನು ಗ್ರಾಹಕ",
      consumerDesc: "ತಾಜಾ ಮತ್ತು ನೈಸರ್ಗಿಕ ತರಕಾರಿಗಳನ್ನು ನೇರವಾಗಿ ರೈತರಿಂದ ಪಡೆಯಿರಿ.",
      consumerBtn: "ಅನ್ವೇಷಿಸಿ →",
      logisticsTitle: "ನಾನು ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಪಾಲುದಾರ",
      logisticsDesc: "ನಮ್ಮ ಸಿಸ್ಟಮ್‌ನೊಂದಿಗೆ ಮಾರ್ಗಗಳನ್ನು ಆಪ್ಟಿಮೈಸ್ ಮಾಡಿ ಪಿಕಪ್ ಮಾಡಿ.",
      logisticsBtn: "ಪಾಲುದಾರರಾಗಿ →"
    },
    simpleOptions: {
      title: "ಆ್ಯಪ್ ಬಳಸುವುದು ಕಷ್ಟವೆನಿಸುತ್ತಿದೆಯೇ?",
      subtitle: "ನಮ್ಮ ಸುಲಭ ಆಯ್ಕೆಗಳನ್ನು ಬಳಸಿ",
      callTitle: "ಕರೆ ಮಾಡಿ",
      callDesc: "ಬೆಳೆ ಮಾರಾಟಕ್ಕೆ ಅಥವಾ ಬೆಲೆ ತಿಳಿಯಲು 1 ಒತ್ತಿರಿ",
      callBtn: "ಈಗಲೇ ಕರೆ ಮಾಡಿ",
      smsTitle: "SMS ಕಳುಹಿಸಿ",
      smsDesc: "ಬೆಳೆ, ಪ್ರಮಾಣ ಮತ್ತು ಗ್ರಾಮದ ಹೆಸರು ಕಳುಹಿಸಿ",
      smsBtn: "SMS ಕಳುಹಿಸಿ",
      voiceTitle: "ಧ್ವನಿ (IVR)",
      voiceDesc: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ",
      voiceBtn: "ಕರೆ ಮಾಡಿ",
      centerTitle: "ಹತ್ತಿರದ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ",
      centerDesc: "ಎಫ್‌ಪಿಒ ಅಥವಾ ಗ್ರಾಮ ಕೇಂದ್ರದಿಂದ ನೆರವು ಪಡೆಯಿರಿ",
      centerBtn: "ಕೇಂದ್ರ ಹುಡುಕಿ"
    },
    howItWorks: {
      title: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
      step1Title: "ರೈತ / ಎಫ್‌ಪಿಒ",
      step1Desc: "ಬೆಳೆ ವಿವರ ಸೇರಿಸಿ\n• (ಆ್ಯಪ್ / ಕರೆ / ಕೇಂದ್ರ)",
      step2Title: "ಎಐ ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ",
      step2Desc: "ಬೇಡಿಕೆ ಅಂದಾಜು\n• ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ ಸಲಹೆ",
      step3Title: "ಹೊಂದಾಣಿಕೆ ಎಂಜಿನ್",
      step3Desc: "ಬೇಡಿಕೆ ಮತ್ತು ಪೂರೈಕೆ ಜೋಡಣೆ\n• ಉತ್ತಮ ಬೆಲೆ + ಗುಣಮಟ್ಟ",
      step4Title: "ಸಾರಿಗೆ ಆಪ್ಟಿಮೈಸೇಶನ್",
      step4Desc: "ಪೂಲ್ಡ್ ರೂಟಿಂಗ್\n• ಪಿಕಪ್ ಮತ್ತು ವಿತರಣೆ",
      step5Title: "ಖರೀದಿದಾರರು / ಗ್ರಾಹಕರು",
      step5Desc: "ಆರ್ಡರ್ ನೀಡುವುದು\n• ಡೆಲಿವರಿ ಟ್ರ್ಯಾಕಿಂಗ್",
      step6Title: "ವಿತರಣೆ ಮತ್ತು ಪಾವತಿ",
      step6Desc: "ಸುರಕ್ಷಿತ ವಿತರಣೆ\n• ಎಸ್ಕ್ರೋ / UPI ಪಾವತಿ",
      step7Title: "ತೃಪ್ತ ರೈತರು & ಗ್ರಾಹಕರು",
      step7Desc: "ಹೆಚ್ಚಿನ ಆದಾಯ\n• ಕಡಿಮೆ ಬೆಲೆ\n• ಶೂನ್ಯ ನಷ್ಟ",
      statsBadge: "ನಮ್ಮ ಹೊಲಗಳಿಂದ ನಿಮ್ಮ ಮನೆಗೆ",
      statFarmers: "ರೈತರು",
      statBuyers: "ಖರೀದಿದಾರರು",
      statVehicles: "ವಾಹನಗಳು",
      statDistricts: "ಜಿಲ್ಲೆಗಳು"
    },
    architecture: {
      title: "ವ್ಯವಸ್ಥೆಯ ವಾಸ್ತುಶಿಲ್ಪ (System Architecture)",
      usersTitle: "ಬಳಕೆದಾರರು ಮತ್ತು ಪ್ರವೇಶ ಚಾನೆಲ್‌ಗಳು",
      platformTitle: "ಕಿಸಾನ್‌ಕನೆಕ್ಟ್ ಕ್ಲೌಡ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
      presentationLayer: "ಪ್ರಸ್ತುತಿ ಪದರ (ಬಳಕೆದಾರ ಇಂಟರ್‌ಫೇಸ್)",
      applicationLayer: "ಅಪ್ಲಿಕೇಶನ್ ಪದರ (ವ್ಯಾಪಾರ ತರ್ಕ)",
      aiLayer: "ಎಐ & ಅನಾಲಿಟಿಕ್ಸ್ ಪದರ",
      integrationLayer: "ಏಕೀಕರಣ ಪದರ (e-NAM, Maps, UPI)",
      dataLayer: "ಡೇಟಾ ಪದರ (ರೈತರ ಡೇಟಾ, ಮಂಡಿ ಬೆಲೆ)",
      techStackTitle: "ತಂತ್ರಜ್ಞಾನ ವಿಭಾಗ",
      inclusionTitle: "ಗ್ರಾಮೀಣ ಒಳಗೊಳ್ಳುವಿಕೆಯ ವೈಶಿಷ್ಟ್ಯಗಳು"
    },
    footer: {
      values: "ಸಮಗ್ರ • ಸ್ಮಾರ್ಟ್ • ಸುಸ್ಥಿರ",
      slogan: "ಉತ್ತಮ ಕೃಷಿ - ಉಜ್ವಲ ಭವಿಷ್ಯ",
      syntheticNotice: "SIH ಮಾದರಿ — ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಸಿಮ್ಯುಲೇಶನ್ ಡೇಟಾ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ"
    }
  },
  mr: {
    brand: "किसानकनेक्ट",
    tagline: "थेट शेतातून आपल्या घरापर्यंत",
    nav: {
      home: "मुख्यपृष्ठ",
      market: "बाजारपेठ",
      forFarmers: "शेतकऱ्यांसाठी",
      forBuyers: "खरेदीदारांसाठी",
      logistics: "वाहतूक",
      support: "मदत",
      about: "आमच्याबद्दल",
      login: "लॉगिन",
      signup: "साइन अप",
      callSupport: "1800 123 4567\n(कॉल सपोर्ट)"
    },
    hero: {
      title: "शेतकरी सक्षमीकरण\nबाजारपेठांशी थेट जोडणी",
      subtitle: "शेतकरी आणि एफपीओंना थेट खरेदीदारांशी जोडणारे स्मार्ट व्यासपीठ. एआय मागणी अंदाज, रास्त भाव आणि एकत्रित वाहतूक व्यवस्था.",
      badge1: "शेतकऱ्यांसाठी उत्तम भाव",
      badge2: "ग्राहकांसाठी कमी दर",
      badge3: "कमी नासाडी · अधिक ताजेपणा",
      badge4: "शाश्वत पुरवठा साखळी",
      simpleAccess: "सर्वांसाठी सुलभ उपलब्धता",
      waysToUseTitle: "वापरण्याचे अनेक मार्ग",
      waysToUseSubtitle: "– प्रत्येक शेतकऱ्यासाठी",
      appTitle: "मोबाइल ॲप",
      appDesc: "(स्मार्टफोन वापरकर्त्यांसाठी)\nसोपे यूआय · मराठी भाषा\nव्हॉइस सपोर्ट",
      ivrTitle: "फीचर फोन / IVR",
      ivrDesc: "(साध्या फोनसाठी)\nकॉल करा आणि विका · भाव जाणा\nमराठीत ऐका",
      fpoTitle: "एफपीओ / ग्राम केंद्र",
      fpoDesc: "(फोन नसलेल्यांसाठी)\nप्रशिक्षित कर्मचाऱ्यांची मदत\nएकत्रित नोंदणी",
      voiceTitle: "व्हॉइस / चॅट",
      voiceDesc: "(बहुभाषिक सुविधा)\nतुमच्या भाषेत बोला\nत्वरित मदत मिळवा"
    },
    roles: {
      title: "आपली भूमिका निवडा",
      farmerTitle: "मी शेतकरी आहे",
      farmerDesc: "शेतमाल विका, बाजारभाव तपासा आणि ऑर्डर्स ट्रॅक करा.",
      farmerBtn: "सुरू करा →",
      fpoTitle: "मी एफपीओ / एजंट आहे",
      fpoDesc: "शेतकऱ्यांचे व्यवस्थापन करा, शेतमाल नोंदवा आणि समन्वय साधा.",
      fpoBtn: "पुढे जा →",
      buyerTitle: "मी खरेदीदार आहे",
      buyerDesc: "शेतकऱ्यांकडून थेट दर्जेदार शेतमाल खरेदी करा.",
      buyerBtn: "सामील व्हा →",
      consumerTitle: "मी ग्राहक आहे",
      consumerDesc: "शेतातून थेट ताजी, सुरक्षित आणि रास्त दरात भाजीपाला मिळवा.",
      consumerBtn: "शोधा →",
      logisticsTitle: "मी वाहतूकदार (लॉजिस्टिक्स) आहे",
      logisticsDesc: "रूट ऑप्टिमायझेशनसह शेतमाल पिकअप आणि वितरण करा.",
      logisticsBtn: "भागीदार व्हा →"
    },
    simpleOptions: {
      title: "ॲप वापरणे अवघड वाटते?",
      subtitle: "आमचे सोपे पर्याय वापरा",
      callTitle: "कॉल करा",
      callDesc: "शेतमाल विकण्यासाठी किंवा भाव जाणून घेण्यासाठी 1 दाबा",
      callBtn: "आत्ताच कॉल करा",
      smsTitle: "SMS पाठवा",
      smsDesc: "पीक, प्रमाण आणि ठिकाण लिहून पाठवा",
      smsBtn: "SMS पाठवा",
      voiceTitle: "व्हॉइस (IVR)",
      voiceDesc: "आपल्या भाषेत बोला आणि सूचना ऐका",
      voiceBtn: "कॉल करा",
      centerTitle: "जवळच्या केंद्राला भेट द्या",
      centerDesc: "एफपीओ किंवा ग्राम केंद्रातून थेट मदत मिळवा",
      centerBtn: "केंद्र शोधा"
    },
    howItWorks: {
      title: "हे कसे कार्य करते (संपूर्ण प्रक्रिया)",
      step1Title: "शेतकरी / एफपीओ",
      step1Desc: "शेतमालाचा तपशील नोंदवा\n• (ॲप / कॉल / केंद्र)",
      step2Title: "एआय मागणी अंदाज",
      step2Desc: "मागणीचे भाकीत\n• सर्वोत्तम बाजारपेठेचा सल्ला",
      step3Title: "मॅचिंग इंजिन",
      step3Desc: "मागणी आणि पुरवठ्याची सांगड\n• सर्वोत्तम भाव + गुणवत्ता",
      step4Title: "वाहतूक ऑप्टिमायझेशन",
      step4Desc: "एकत्रित मार्ग नियोजन\n• पिकअप आणि वितरण व्यवस्था",
      step5Title: "खरेदीदार / ग्राहक",
      step5Desc: "ऑर्डर देणे\n• वितरणाचा मागोवा",
      step6Title: "वितरण आणि देयक",
      step6Desc: "सुरक्षित वितरण\n• डिजिटल / एस्क्रो / UPI",
      step7Title: "समाधानी शेतकरी आणि ग्राहक",
      step7Desc: "अधिक उत्पन्न\n• रास्त दर\n• शून्य नासाडी",
      statsBadge: "आमच्या शेतातून थेट आपल्या घरी",
      statFarmers: "शेतकरी",
      statBuyers: "खरेदीदार",
      statVehicles: "वाहने",
      statDistricts: "जिल्हे"
    },
    architecture: {
      title: "सिस्टम आर्किटेक्चर (System Architecture)",
      usersTitle: "वापरकर्ते आणि प्रवेश चॅनेल्स",
      platformTitle: "किसानकनेक्ट प्लॅटफॉर्म (क्लाउड)",
      presentationLayer: "प्रेझेंटेशन लेयर (वापरकर्ता इंटरफेस)",
      applicationLayer: "ॲप्लिकेशन लेयर (व्यवसाय तर्क)",
      aiLayer: "एआय आणि ॲनालिटिक्स लेयर",
      integrationLayer: "इंटिग्रेशन लेयर (e-NAM, Google Maps, UPI)",
      dataLayer: "डेटा लेयर (मंडी भाव, पीक डेटा)",
      techStackTitle: "तंत्रज्ञान स्टॅक",
      inclusionTitle: "ग्रामीण समावेशकतेची प्रमुख वैशिष्ट्ये"
    },
    footer: {
      values: "समावेशक • स्मार्ट • शाश्वत",
      slogan: "उन्नत शेती - उज्ज्वल भविष्य",
      syntheticNotice: "SIH प्रोटोटाइप — मूल्यमापनासाठी सिम्युलेटेड डेटा मॉडेल सक्रिय"
    }
  }
};
