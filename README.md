   ## Hacker News - Dynamic Feed

Un'applicazione web moderna e performante che si interfaccia con le API ufficiali di Hacker News per mostrare in tempo reale le ultime notizie pubblicate. Il progetto è sviluppato in JavaScript puro (ES6+), strutturato secondo standard architetturali professionali, ottimizzato per il caricamento progressivo dei dati e interamente testato.

---

## Demo Online
L'applicazione è accessibile e funzionante online al seguente indirizzo:
Netlify: **https://giuliasenes-hacker-news.netlify.app/** 

Github : **https://github.com/GiuliaSenes/Progetto-JavaScript-Advanced-di-Giulia-Senes** 

---

##  Architettura e Design Pattern

Per garantire la separazione delle responsabilità e facilitare la manutenzione e il testing del codice, è stato implementato il **Repository Pattern**:

* **`repository.js`:** Isola completamente la logica delle chiamate HTTP (gestite tramite *Axios*). Si occupa esclusivamente di contattare gli endpoint di Hacker News e restituire i dati.
* **`app.js`:** Gestisce lo stato dell'applicazione, la manipolazione del DOM per il rendering delle card e i listener degli eventi dell'utente.

---

## ⚡ Performance e Gestione dei Dati

L'endpoint principale delle news fornisce circa 500 ID alla volta. Per evitare rallentamenti dell'interfaccia e garantire un'ottima esperienza utente:
1. All'avvio vengono recuperati tutti gli ID, ma vengono scaricati i dettagli e renderizzate solo le **prime 10 notizie**.
2. Le chiamate per i dettagli dei singoli item vengono effettuate in parallelo sfruttando `Promise.all`.
3. Tramite il pulsante **"Load more"**, l'utente può caricare progressivamente blocchi successivi di 10 notizie (impaginazione lato client).
---

## 💻 Tecnologie Utilizzate

* **JavaScript (ES6+)** 
* **Vite** 
* **Axios** 
* **Vitest & JSDOM** 
* **HTML5 & CSS3** 
---

