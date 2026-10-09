// Translations
const translations = {
    en: {
        title: "GCC Skills Hub - Uplevel Your Potential",
        nav_brand: "GCC Skills Hub",
        hero_title: "Unlock Your Potential in the GCC",
        hero_subtitle: "Generate customized learning paths and connect with world-class mentors.",
        form_title: "Generate Custom Course Plan",
        label_interests: "What are your professional interests?",
        label_weaknesses: "What skills do you want to improve?",
        label_goals: "What are your career goals?",
        btn_generate: "Generate Plan",
        mentors_title: "Find Mentors & SMEs",
        btn_refresh: "Refresh List",
        mentors_desc: "Connect with internal experts and global leaders (USA, UK, etc.)",
        module_hours: "hours",
        error_msg: "An error occurred. Please make sure the Gemini API key is configured.",
        type_internal: "Internal",
        type_external: "External"
    },
    ar: {
        title: "منصة مهارات الخليج - ارتقِ بإمكاناتك",
        nav_brand: "منصة مهارات الخليج",
        hero_title: "أطلق العنان لإمكاناتك في دول مجلس التعاون",
        hero_subtitle: "قم بإنشاء مسارات تعليمية مخصصة وتواصل مع موجهين عالميين.",
        form_title: "إنشاء خطة دورة مخصصة",
        label_interests: "ما هي اهتماماتك المهنية؟",
        label_weaknesses: "ما هي المهارات التي ترغب في تحسينها؟",
        label_goals: "ما هي أهدافك المهنية؟",
        btn_generate: "إنشاء الخطة",
        mentors_title: "ابحث عن الموجهين والخبراء",
        btn_refresh: "تحديث القائمة",
        mentors_desc: "تواصل مع الخبراء الداخليين والقادة العالميين (أمريكا، بريطانيا، إلخ)",
        module_hours: "ساعات",
        error_msg: "حدث خطأ. يرجى التأكد من تكوين مفتاح API الخاص بـ Gemini.",
        type_internal: "داخلي",
        type_external: "خارجي"
    }
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
    } else {
        document.body.classList.remove('font-arabic');
    }
}

document.getElementById('lang-toggle').addEventListener('click', () => {
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
        const res = await fetch('/api/generate_courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ interests, weaknesses, goals, language: currentLang })
        });
        
        const data = await res.json();
        
        if (data.success) {
            displayCourse(data.course);
        } else {
            alert(data.error || translations[currentLang].error_msg);
        }
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
                <p class="text-xs text-indigo-600 mt-1 font-semibold">${mod.estimated_hours} ${hoursText}</p>
                ${topicsHtml}
            `;
            modulesContainer.appendChild(div);
        });
    }
}

// Mentors logic
async function loadMentors() {
    try {
        const res = await fetch('/api/mentors');
        const data = await res.json();
        
        if (data.success) {
            const container = document.getElementById('mentors-list');
            container.innerHTML = '';
            
            data.mentors.forEach(m => {
                const typeText = m.type === 'Internal' ? translations[currentLang].type_internal : translations[currentLang].type_external;
                const typeClass = m.type === 'Internal' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
                
                const div = document.createElement('div');
                div.className = 'flex items-center justify-between p-4 border rounded hover:bg-gray-50 transition';
                
                div.innerHTML = `
                    <div>
                        <h4 class="font-bold text-gray-900">${m.name} <span class="text-xs font-normal ml-2 mr-2 px-2 py-0.5 rounded ${typeClass}">${typeText}</span></h4>
                        <p class="text-sm text-gray-600">${m.title} | ${m.region}</p>
                        <p class="text-xs text-gray-500 mt-1">Expertise: ${m.expertise.join(', ')}</p>
                    </div>
                    <button class="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">Connect</button>
                `;
                container.appendChild(div);
            });
        }
    } catch (err) {
        console.error(err);
    }
}

document.getElementById('load-mentors').addEventListener('click', loadMentors);

// Initial load
loadMentors();
