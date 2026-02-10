import { fetchSNSData } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const trumpFeed = document.querySelector('#trump-feed .posts-wrapper');
    const leeFeed = document.querySelector('#lee-feed .posts-wrapper');
    const muskFeed = document.querySelector('#musk-feed .posts-wrapper');

    // Initial load
    loadData();

    // Event listener for refresh button
    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('loading');
        // Add rotation animation to icon if desired via CSS class
        loadData();
    });

    async function loadData() {
        // Show loading state
        setLoading(true);

        try {
            const data = await fetchSNSData();
            renderPosts(trumpFeed, data.trump);
            renderPosts(leeFeed, data.lee);
            renderPosts(muskFeed, data.musk);
        } catch (error) {
            console.error("Failed to load data:", error);
            alert("데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
            refreshBtn.classList.remove('loading');
        }
    }

    function setLoading(isLoading) {
        const spinners = document.querySelectorAll('.loading-spinner');
        if (isLoading) {
            spinners.forEach(s => s.style.display = 'block');
            // Clear existing posts if needed, or keep them until new ones load
            // For this requirement "refresh", let's clear to show the reload effect clearly
            [trumpFeed, leeFeed, muskFeed].forEach(feed => {
                feed.innerHTML = '<div class="loading-spinner"></div>';
            });
        }
    }

    function renderPosts(container, posts) {
        container.innerHTML = ''; // Clear container

        if (posts.length === 0) {
            container.innerHTML = '<p class="no-posts">최근 7일간 게시글이 없습니다.</p>';
            return;
        }

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            card.onclick = () => window.open(post.url, '_blank');

            card.innerHTML = `
                <div class="post-header">
                    <span class="post-date">${post.formattedDate}</span>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="post-footer">
                    <span class="post-likes">❤️ ${post.likes.toLocaleString()}</span>
                </div>
            `;
            container.appendChild(card);
        });
    }
});
