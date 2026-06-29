import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const repository = {
    /*
      Recupera la lista di tutti gli ID delle nuove storie
     */
    async getNewStoryIds() {
        const response = await axios.get(`${BASE_URL}/newstories.json`);
        return response.data;
    },

    /*
      Recupera il dettaglio di un singolo item tramite ID
     */
    async getItemDetails(id) {
        try {
            const response = await axios.get(`${BASE_URL}/item/${id}.json`);
            return response.data;
        } catch (error) {
            console.error(`Errore nel recupero dell'item ${id}:`, error);
            return null;
        }
    }
};