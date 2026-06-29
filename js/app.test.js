import { describe, it, expect } from 'vitest';
import { getNextBatchOfIds } from './app.js';

describe('Logica di Paginazione delle Storie', () => {
    it('dovrebbe estrarre correttamente i primi 10 ID', () => {
        const fintiId = Array.from({ length: 50 }, (_, i) => i + 100); // Array da 100 a 149
        const risultato = getNextBatchOfIds(fintiId, 0, 10);
        
        expect(risultato).toHaveLength(10);
        expect(risultato[0]).toBe(100);
        expect(risultato[9]).toBe(109);
    });

    it('dovrebbe estrarre il blocco successivo (da 10 a 20)', () => {
        const fintiId = Array.from({ length: 50 }, (_, i) => i + 100);
        const risultato = getNextBatchOfIds(fintiId, 10, 10);
        
        expect(risultato).toHaveLength(10);
        expect(risultato[0]).toBe(110);
    });
});