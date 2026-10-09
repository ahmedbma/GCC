const GEMINI_API_KEY = "AQ.Ab8RN6KmZrM7ygqSRV4KX6BbPdjXHRM-0KQqll0zqJ-aAd9a_A"; // Actual Gemini API Key

// Common Professions (Expanded)
const PROFESSIONS = {
    en: [
        "Software Engineering", "Data Science", "Product Management", "Project Management", 
        "Cyber Security", "Cloud Architecture", "Marketing & Communications", "Financial Analysis", 
        "Human Resources", "Operations Management", "UI/UX Design", "Business Analysis", 
        "Sales & Business Development", "Accounting", "Investment Banking", "Mechanical Engineering", 
        "Civil Engineering", "Electrical Engineering", "Architecture", "Medicine", 
        "Nursing", "Pharmacy", "Dentistry", "Healthcare Administration", "Law", 
        "Teaching & Education", "Academia", "Graphic Design", "Copywriting", "Content Creation", 
        "Public Relations", "Event Management", "Supply Chain & Logistics", "Quality Assurance", 
        "IT Support", "Database Administration", "Artificial Intelligence", "Blockchain Engineering", 
        "Real Estate", "Hospitality Management", "Retail Management", "Customer Success", 
        "Entrepreneurship", "Venture Capital", "Data Analytics", "DevOps Engineering", 
        "Network Engineering", "Systems Administration", "E-commerce", "Digital Marketing", 
        "SEO Specialization", "Video Production", "Journalism", "Translation & Localization", 
        "Game Development"
    ],
    ar: [
        "هندسة البرمجيات", "علوم البيانات", "إدارة المنتجات", "إدارة المشاريع", 
        "الأمن السيبراني", "هندسة السحابة", "التسويق والاتصالات", "التحليل المالي", 
        "الموارد البشرية", "إدارة العمليات", "تصميم واجهة وتجربة المستخدم", "تحليل الأعمال", 
        "المبيعات وتطوير الأعمال", "المحاسبة", "الصيرفة الاستثمارية", "الهندسة الميكانيكية", 
        "الهندسة المدنية", "الهندسة الكهربائية", "الهندسة المعمارية", "الطب", 
        "التمريض", "الصيدلة", "طب الأسنان", "إدارة الرعاية الصحية", "المحاماة", 
        "التدريس والتعليم", "الأوساط الأكاديمية", "التصميم الجرافيكي", "كتابة الإعلانات", "صناعة المحتوى", 
        "العلاقات العامة", "إدارة الفعاليات", "سلسلة التوريد والخدمات اللوجستية", "ضمان الجودة", 
        "دعم تكنولوجيا المعلومات", "إدارة قواعد البيانات", "الذكاء الاصطناعي", "هندسة البلوك تشين", 
        "العقارات", "إدارة الضيافة", "إدارة التجزئة", "نجاح العملاء", 
        "ريادة الأعمال", "رأس المال الاستثماري", "تحليل البيانات", "هندسة ديف أوبس", 
        "هندسة الشبكات", "إدارة النظم", "التجارة الإلكترونية", "التسويق الرقمي", 
        "تحسين محركات البحث", "إنتاج الفيديو", "الصحافة", "الترجمة والتعريب", 
        "تطوير الألعاب"
    ]
};

// Translations
const translations = {
    en: {
        title: "Nanhad - Uplevel Your Potential",
        nav_brand: "Nanhad",
        hero_title: "Unlock Your Potential in the GCC",
        hero_subtitle: "Generate customized learning paths and connect with world-class mentors.",
        form_title: "Generate Custom Course Plan",
        label_interests: "What is your profession?",
        label_weaknesses: "What skills do you want to improve?",
        label_goals: "What are your career goals?",
        btn_generate: "Generate Plan",
        mentors_title: "Find Mentors & Experts",
        btn_refresh: "Refresh List",
        mentors_desc: "Connect with internal experts and global leaders (USA, UK, etc.)",
        module_hours: "hours",
        error_msg: "An error occurred. Please check your Gemini API key and try again.",
        type_internal: "Internal",
        type_external: "External"
    },
    ar: {
        title: "ننهض - ارتقِ بإمكاناتك",
        nav_brand: "ننهض",
        hero_title: "أطلق العنان لإمكاناتك في دول مجلس التعاون",
        hero_subtitle: "قم بإنشاء مسارات تعليمية مخصصة وتواصل مع موجهين عالميين.",
        form_title: "إنشاء خطة دورة مخصصة",
        label_interests: "ما هي مهنتك؟",
        label_weaknesses: "ما هي المهارات التي ترغب في تحسينها؟",
        label_goals: "ما هي أهدافك المهنية؟",
        btn_generate: "إنشاء الخطة",
        mentors_title: "ابحث عن الموجهين والخبراء",
        btn_refresh: "تحديث القائمة",
        mentors_desc: "تواصل مع الخبراء الداخليين والقادة العالميين (أمريكا، بريطانيا، إلخ)",
        module_hours: "ساعات",
        error_msg: "حدث خطأ. يرجى التحقق من مفتاح API الخاص بـ Gemini والمحاولة مرة أخرى.",
        type_internal: "داخلي",
        type_external: "خارجي"
    }
};

// Mentors logic
const MENTORS = {
    en: [
        { id: 1, name: "Ahmad Al-Farsi", title: "Senior Data Scientist", type: "Internal", expertise: ["Data Science", "Artificial Intelligence"], region: "GCC" },
        { id: 2, name: "Sarah Jenkins", title: "Principal Product Manager", type: "External", expertise: ["Product Management", "UI/UX Design"], region: "USA" },
        { id: 3, name: "Dr. Thomas Miller", title: "Engineering Director", type: "External", expertise: ["Software Engineering", "Cloud Architecture"], region: "UK" },
        { id: 4, name: "Fatima Al-Sayed", title: "VP of Operations", type: "Internal", expertise: ["Operations Management", "Supply Chain & Logistics"], region: "GCC" },
        { id: 5, name: "Michael Chang", title: "Lead Security Engineer", type: "External", expertise: ["Cyber Security", "DevOps Engineering"], region: "USA" },
        { id: 6, name: "Nour Al-Huda", title: "Marketing Director", type: "Internal", expertise: ["Digital Marketing", "Public Relations"], region: "GCC" },
        { id: 7, name: "David O'Connor", title: "Chief Financial Officer", type: "External", expertise: ["Financial Analysis", "Investment Banking"], region: "UK" },
        { id: 8, name: "Leila Mansour", title: "Head of HR", type: "Internal", expertise: ["Human Resources", "Customer Success"], region: "GCC" },
        { id: 9, name: "James Wilson", title: "Senior Architect", type: "External", expertise: ["Architecture", "Civil Engineering"], region: "USA" },
        { id: 10, name: "Dr. Amira Tariq", title: "Chief Medical Officer", type: "Internal", expertise: ["Medicine", "Healthcare Administration"], region: "GCC" },
        { id: 11, name: "Kenji Sato", title: "Blockchain Architect", type: "External", expertise: ["Blockchain Engineering", "Software Engineering"], region: "Japan" },
        { id: 12, name: "Omar Rashid", title: "E-commerce Director", type: "Internal", expertise: ["E-commerce", "Retail Management"], region: "GCC" },
        { id: 13, name: "Sophia Martinez", title: "Creative Director", type: "External", expertise: ["Graphic Design", "Content Creation"], region: "USA" },
        { id: 14, name: "Ali Hassan", title: "Lead Legal Counsel", type: "Internal", expertise: ["Law", "Business Analysis"], region: "GCC" }
    ],
    ar: [
        { id: 1, name: "أحمد الفارسي", title: "عالم بيانات أول", type: "Internal", expertise: ["علوم البيانات", "الذكاء الاصطناعي"], region: "GCC" },
        { id: 2, name: "سارة جينكينز", title: "مدير منتجات رئيسي", type: "External", expertise: ["إدارة المنتجات", "تصميم واجهة وتجربة المستخدم"], region: "USA" },
        { id: 3, name: "د. توماس ميلر", title: "مدير هندسي", type: "External", expertise: ["هندسة البرمجيات", "هندسة السحابة"], region: "UK" },
        { id: 4, name: "فاطمة السيد", title: "نائب رئيس العمليات", type: "Internal", expertise: ["إدارة العمليات", "سلسلة التوريد والخدمات اللوجستية"], region: "GCC" },
        { id: 5, name: "مايكل تشانغ", title: "كبير مهندسي الأمن", type: "External", expertise: ["الأمن السيبراني", "هندسة ديف أوبس"], region: "USA" },
        { id: 6, name: "نور الهدى", title: "مديرة التسويق", type: "Internal", expertise: ["التسويق الرقمي", "العلاقات العامة"], region: "GCC" },
        { id: 7, name: "ديفيد أوكونور", title: "المدير المالي", type: "External", expertise: ["التحليل المالي", "الصيرفة الاستثمارية"], region: "UK" },
        { id: 8, name: "ليلى منصور", title: "رئيسة الموارد البشرية", type: "Internal", expertise: ["الموارد البشرية", "نجاح العملاء"], region: "GCC" },
        { id: 9, name: "جيمس ويلسون", title: "كبير المهندسين المعماريين", type: "External", expertise: ["الهندسة المعمارية", "الهندسة المدنية"], region: "USA" },
        { id: 10, name: "د. أميرة طارق", title: "المدير الطبي التنفيذي", type: "Internal", expertise: ["الطب", "إدارة الرعاية الصحية"], region: "GCC" },
        { id: 11, name: "كينجي ساتو", title: "مهندس بلوك تشين", type: "External", expertise: ["هندسة البلوك تشين", "هندسة البرمجيات"], region: "Japan" },
        { id: 12, name: "عمر راشد", title: "مدير التجارة الإلكترونية", type: "Internal", expertise: ["التجارة الإلكترونية", "إدارة التجزئة"], region: "GCC" },
        { id: 13, name: "صوفيا مارتينيز", title: "المديرة الإبداعية", type: "External", expertise: ["التصميم الجرافيكي", "صناعة المحتوى"], region: "USA" },
        { id: 14, name: "علي حسن", title: "المستشار القانوني الرئيسي", type: "Internal", expertise: ["المحاماة", "تحليل الأعمال"], region: "GCC" }
    ]
};

let currentLang = 'en';

function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    if (lang === 'ar') {
        document.body.classList.add('font-arabic');
        document.getElementById('interests').placeholder = "اختر أو اكتب مهنة...";
    } else {
        document.body.classList.remove('font-arabic');
        document.getElementById('interests').placeholder = "Select or type a profession...";
    }

    // Populate Datalist
    const datalist = document.getElementById('professions');
    datalist.innerHTML = '';
    PROFESSIONS[lang].forEach(prof => {
        const option = document.createElement('option');
        option.value = prof;
        datalist.appendChild(option);
    });
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    // Clear input so translation swap doesn't keep old language text
    document.getElementById('interests').value = '';
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyTranslations(currentLang);
    loadMentors(); // Reload to translate UI bits
});

// Initial translation
applyTranslations(currentLang);

// Form submission
document.getElementById('course-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const interests = document.getElementById('interests').value;
    const weaknesses = document.getElementById('weaknesses').value;
    const goals = document.getElementById('goals').value;
    
    const btnText = document.getElementById('btn-text');
    const spinner = document.getElementById('loading-spinner');
    
    // UI state
    btnText.textContent = currentLang === 'en' ? 'Generating...' : 'جاري الإنشاء...';
    spinner.classList.remove('hidden');
    
    try {
        let promptText = `
        You are an expert career coach and curriculum designer. 
        A professional in the GCC region has the following profile:
        - Profession: ${interests}
        - Weaknesses to improve: ${weaknesses}
        - Career Goals: ${goals}
        
        Create a custom, step-by-step course plan to help them uplevel their skills.
        Provide the response as a valid JSON object with the following structure:
        {
            "title": "Name of the Custom Learning Path",
            "description": "Short description of the path",
            "modules": [
                {
                    "module_name": "Name of module",
                    "topics": ["Topic 1", "Topic 2"],
                    "estimated_hours": 10
                }
            ]
        }
        
        IMPORTANT: Provide the content strictly in JSON format. Do not use markdown wrappers like \`\`\`json.
        `;

        if (currentLang === 'ar') {
            promptText += " Ensure the content inside the JSON values is entirely translated to Arabic.";
        }

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptText }]
                }]
            })
        });
        
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        
        // Clean JSON formatting from Gemini if any
        let cleanJson = textResponse.trim();
        if (cleanJson.startsWith('```json')) cleanJson = cleanJson.substring(7);
        if (cleanJson.startsWith('```')) cleanJson = cleanJson.substring(3);
        if (cleanJson.endsWith('```')) cleanJson = cleanJson.substring(0, cleanJson.length - 3);

        const course = JSON.parse(cleanJson);
        displayCourse(course);

    } catch (err) {
        alert(translations[currentLang].error_msg);
        console.error(err);
    } finally {
        btnText.textContent = translations[currentLang].btn_generate;
        spinner.classList.add('hidden');
    }
});

function displayCourse(course) {
    document.getElementById('course-result').classList.remove('hidden');
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-desc').textContent = course.description;
    
    const modulesContainer = document.getElementById('course-modules');
    modulesContainer.innerHTML = '';
    
    if (course.modules && course.modules.length > 0) {
        course.modules.forEach((mod, index) => {
            const div = document.createElement('div');
            div.className = 'p-4 bg-gray-100 rounded border border-gray-200';
            
            const hoursText = translations[currentLang].module_hours;
            
            let topicsHtml = '';
            if (mod.topics) {
                topicsHtml = `<ul class="list-disc list-inside mt-2 text-sm text-gray-700">
                    ${mod.topics.map(t => `<li>${t}</li>`).join('')}
                </ul>`;
            }

            div.innerHTML = `
                <h4 class="font-bold text-gray-800">${index + 1}. ${mod.module_name}</h4>
                <p class="text-xs text-green-600 mt-1 font-semibold">${mod.estimated_hours} ${hoursText}</p>
                ${topicsHtml}
            `;
            modulesContainer.appendChild(div);
        });
    }
}

function loadMentors() {
    const container = document.getElementById('mentors-list');
    container.innerHTML = '';
    
    // Shuffle mentors for variety when refresh is clicked, but always take 6 at random
    const shuffled = [...MENTORS[currentLang]].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    
    selected.forEach(m => {
        const typeText = m.type === 'Internal' ? translations[currentLang].type_internal : translations[currentLang].type_external;
        const typeClass = m.type === 'Internal' ? 'bg-green-100 text-green-800' : 'bg-emerald-100 text-emerald-800';
        
        const div = document.createElement('div');
        div.className = 'flex items-center justify-between p-4 border rounded hover:bg-gray-50 transition';
        
        div.innerHTML = `
            <div>
                <h4 class="font-bold text-gray-900">${m.name} <span class="text-xs font-normal ml-2 mr-2 px-2 py-0.5 rounded ${typeClass}">${typeText}</span></h4>
                <p class="text-sm text-gray-600">${m.title} | ${m.region}</p>
                <p class="text-xs text-gray-500 mt-1">Expertise: ${m.expertise.join(', ')}</p>
            </div>
            <button class="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">Connect</button>
        `;
        container.appendChild(div);
    });
}

document.getElementById('load-mentors').addEventListener('click', loadMentors);

// Initial load
loadMentors();
