/**
 * Mock API for fetching SNS data
 * Simulates a server response with a delay
 */

const TRUMP_POSTS = [
    "MAKE AMERICA GREAT AGAIN!",
    "The economy is doing better than ever before. Jobs, jobs, jobs!",
    "Fake news media is at it again. Sad!",
    "We are building the wall and it will be beautiful.",
    "Just had a great meeting with world leaders. America is respected again.",
    "The radical left wants to destroy our country. We won't let them!",
    "Stock market hit an all-time high today. Congratulations everyone!",
    "Thank you for your support! We are winning big.",
    "Unbelievable crowds at the rally tonight. Thank you Florida!",
    "Borders are secure. Crime is down. We are doing great work."
];

const LEE_POSTS = [
    "국민이 주인인 나라, 함께 만들어갑시다.",
    "기본소득은 미래 사회의 필수적인 경제 정책입니다.",
    "민생이 최우선입니다. 골목상권을 살려야 경제가 삽니다.",
    "억강부약, 대동세상의 꿈을 위해 멈추지 않겠습니다.",
    "청년들에게 기회가 넘치는 대한민국을 만들겠습니다.",
    "정치는 국민의 삶을 바꾸는 도구여야 합니다.",
    "공정한 사회, 기회가 균등한 나라를 위해 일하겠습니다.",
    "오늘 현장에서 많은 시민분들을 만났습니다. 그들의 목소리를 잊지 않겠습니다.",
    "변화는 두려운 것이 아니라 새로운 기회입니다.",
    "함께 사는 세상, 모두가 행복한 나라를 꿈꿉니다."
];

const MUSK_POSTS = [
    "To Mars! 🚀",
    "Tesla Cybertruck production is ramping up.",
    "Free speech is the bedrock of a functioning democracy.",
    "X is the everything app.",
    "Starship launch soon. Excitement guaranteed!",
    "AI will change everything. fast.",
    "Doge to the moon 🌙",
    "Working on Optimus robot. Progress is good.",
    "Comedy is now legal on X.",
    "Humanity must become multi-planetary."
];

/**
 * Generates a random date within the last n days
 */
function getRandomDate(daysBack) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    // Random time
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    return date;
}

/**
 * Generates mock posts for a specific persona
 */
function generateMockPosts(name, handle, templates, count = 5) {
    return Array.from({ length: count }, (_, i) => {
        const date = getRandomDate(7); // Last 7 days
        return {
            id: `${name}-${i}-${Date.now()}`,
            name: name,
            handle: handle,
            content: templates[Math.floor(Math.random() * templates.length)],
            date: date.toISOString(),
            formattedDate: date.toLocaleString('ko-KR', { 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            likes: Math.floor(Math.random() * 50000) + 1000,
            url: getProfileUrl(handle)
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
}

function getProfileUrl(handle) {
    if (handle.includes('Trump')) return 'https://twitter.com/realDonaldTrump'; // Or Truth Social URL if preferred, keeping twitter for simplicity/example
    if (handle.includes('Lee')) return 'https://twitter.com/Jaemyung_Lee'; // Example URL
    if (handle.includes('elon')) return 'https://twitter.com/elonmusk';
    return '#';
}

/**
 * Fetch mock data
 */
export async function fetchSNSData() {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve({
                trump: generateMockPosts("Donald Trump", "@realDonaldTrump", TRUMP_POSTS, 5),
                lee: generateMockPosts("이재명", "@Jaemyung_Lee", LEE_POSTS, 5),
                musk: generateMockPosts("Elon Musk", "@elonmusk", MUSK_POSTS, 5)
            });
        }, 800); // 0.8s load time
    });
}
