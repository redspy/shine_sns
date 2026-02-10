/**
 * Mock API for fetching SNS data
 * Uses REAL content from 2025-2026 but simulates "recent" dates for the 7-day window.
 */

// Real quotes/posts from search results (2025-2026 context)
const TRUMP_DATA = [
    {
        content: "Truth Social is the best. There is nothing even close!!! WE ARE WINNING BIG LEAGUES.",
        originalDate: "2025-12-02"
    },
    {
        content: "This is a GREAT time to move your COMPANY into the United States of America. ZERO TARIFFS! NO Environmental Delays. DON'T WAIT, DO IT NOW!",
        originalDate: "2025-04-09"
    },
    {
        content: "SEDITIOUS BEHAVIOR by the radical left! We must protect our military and intelligence community. MAGA!",
        originalDate: "2025-11-15"
    },
    {
        content: "Soybean market is soaring! Promises Made. Promises Kept. The economy is stronger than ever.",
        originalDate: "2025-12-05"
    },
    {
        content: "The One Big Beautiful Bill Act will save our country. We are building a future that is bright and glorious.",
        originalDate: "2025-06-01"
    }
];

const LEE_DATA = [
    {
        content: "가짜 뉴스가 우리 사회를 병들게 하고 있습니다. 부유세 관련 엑소더스 주장은 명백한 허위 사실입니다. 팩트에 기반한 건전한 토론이 필요합니다.",
        originalDate: "2026-01-15"
    },
    {
        content: "과학기술이 곧 국가 경쟁력입니다. 대전에서 만난 연구원들과 소상공인 여러분의 목소리를 깊이 새기겠습니다. 함께 잘 사는 대한민국을 만듭니다.",
        originalDate: "2025-07-20"
    },
    {
        content: "제80차 유엔총회에서 전 세계 지도자들에게 한반도 평화와 기후 위기 대응을 위한 우리의 비전을 명확히 전달했습니다.",
        originalDate: "2025-09-25"
    },
    {
        content: "국민 여러분, 통합은 선택이 아닌 필수입니다. 우리는 갈등을 넘어 미래로 나아가야 합니다. 대동세상을 향해 뚜벅뚜벅 걸어가겠습니다.",
        originalDate: "2025-06-04"
    },
    {
        content: "경제 회복의 온기가 골목골목 퍼질 때까지 멈추지 않겠습니다. 소상공인 채무 부담 완화를 위한 정책을 조속히 시행하겠습니다.",
        originalDate: "2025-07-22"
    }
];

const MUSK_DATA = [
    {
        content: "Grok feels like artificial general intelligence now. The improvement curve is vertical.",
        originalDate: "2025-07-21"
    },
    {
        content: "2025 is looking good. Humanity creates its own destiny. 🚀",
        originalDate: "2025-01-07"
    },
    {
        content: "To Mars! Starship is ready for the next big leap. Excitement guaranteed.",
        originalDate: "2025-03-15"
    },
    {
        content: "Comedy is now legal on X. Free speech is the bedrock of democracy.",
        originalDate: "2025-02-10"
    },
    {
        content: "Tesla Cybertruck production is ramping up significantly. Optimus robot progress is also good.",
        originalDate: "2025-07-22"
    }
];

/**
 * Assigns a date relative to "now" to make it appear recent (within 7 days)
 * Deterministic based on index to ensure consistency across reloads if desired,
 * OR random but persistent for the session?
 * User complained about inconsistency. Let's make it deterministic based on day index.
 */
function getRecentDate(index) {
    const date = new Date();
    // Spread posts over the last 5 days based on their array index
    // index 0 = 2 hours ago
    // index 1 = 1 day ago
    // index 2 = 2 days ago...
    date.setDate(date.getDate() - index);
    date.setHours(date.getHours() - (index * 2)); // slight time offset
    return date;
}

/**
 * Generates mock posts with REAL content
 */
function generateRealPosts(name, handle, sourceData) {
    return sourceData.map((item, index) => {
        const date = getRecentDate(index);
        return {
            id: `${name}-${index}`, // Stable ID
            name: name,
            handle: handle,
            content: item.content,
            date: date.toISOString(),
            formattedDate: date.toLocaleString('ko-KR', {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            likes: 1000 + (index * 532) + (item.content.length * 10), // Deterministic pseudo-random likes
            url: getProfileUrl(handle)
        };
    }); // No sort needed if getRecentDate follows index order (0 is newest)
}

function getProfileUrl(handle) {
    if (handle.includes('Trump')) return 'https://truthsocial.com/@realDonaldTrump'; // Updated to Truth Social per 2025 context
    if (handle.includes('Lee')) return 'https://twitter.com/Jaemyung_Lee';
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
                trump: generateRealPosts("Donald Trump", "@realDonaldTrump", TRUMP_DATA),
                lee: generateRealPosts("이재명", "@Jaemyung_Lee", LEE_DATA),
                musk: generateRealPosts("Elon Musk", "@elonmusk", MUSK_DATA)
            });
        }, 600);
    });
}
