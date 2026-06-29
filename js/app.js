import { repository } from './api/repository.js';

// Elementi del DOM
const newsContainer = document.getElementById('news-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadingElement = document.getElementById('loading');

// Stato dell'applicazione
export const state = {
    allIds: [],
    currentIndex: 0,
    itemsPerPage: 10
};

// Funzione helper per estrarre la porzione di ID successiva
export function getNextBatchOfIds(ids, index, perPage) {
    return ids.slice(index, index + perPage);
}

async function initApp() {
    toggleLoading(true);
    try {
        state.allIds = await repository.getNewStoryIds();
        await loadNextStories();
        loadMoreBtn.classList.remove('hidden');
    } catch (error) {
        newsContainer.innerHTML = '<p>Errore di connessione alle API.</p>';
    } finally {
        toggleLoading(false);
    }
}

async function loadNextStories() {
    toggleLoading(true);
    
    const nextIds = getNextBatchOfIds(state.allIds, state.currentIndex, state.itemsPerPage);
    
    // Chiamate in parallelo per le performance
    const promises = nextIds.map(id => repository.getItemDetails(id));
    const stories = await Promise.all(promises);
    
    state.currentIndex += state.itemsPerPage;
    renderStories(stories);
    
    if (state.currentIndex >= state.allIds.length) {
        loadMoreBtn.classList.add('hidden');
    }
    toggleLoading(false);
}

function renderStories(stories) {
    stories.forEach(story => {
        if (story && story.title) {
            const date = new Date(story.time * 1000).toLocaleDateString('it-IT');
            const url = story.url || `https://news.ycombinator.com/item?id=${story.id}`;
            
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <h3><a href="${url}" target="_blank">${story.title}</a></h3>
                <div class="news-meta">Pubblicato il: ${date} | Autore: ${story.by}</div>
            `;
            newsContainer.appendChild(card);
        }
    });
}

function toggleLoading(isLoading) {
    loadingElement.classList.toggle('hidden', !isLoading);
}

loadMoreBtn.addEventListener('click', loadNextStories);
document.addEventListener('DOMContentLoaded', initApp);