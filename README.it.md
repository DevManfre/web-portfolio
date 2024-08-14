<div align="center">
    <img src="./src/images/icon.png" />
    <br />
    <h1>web-portfolio</h1>
    La seconda versione del mio web curriculum, creato utilizzando <a href="https://www.gatsbyjs.com/docs">Gatsby</a>, <a href="https://react.dev/">React</a> e hostato su <a href="https://www.netlify.com/">Netlify</a>.
    <br /><br />
    <a href="https://devmanfre.netlify.app/">
        <img src="https://api.netlify.com/api/v1/badges/0174fb4a-773e-4152-a29e-6c676289f514/deploy-status" />
    </a>
    <p>
        <a href="./README.md">🇬🇧</a>
    </p>
</div>
<br />

# 🫀 Introduzione
Repository del sito che uso per presentarmi alle aziende. Il sito è costruito utilizzando React come framework frontend e Gatsby per l'ottenimento dei dati.

# 🔧 Installazione su Locale
## Setup 
1. Installare la CLI di Gatsby
    ```
    npm install -g gatsby-cli
    ```
2. Installare le dipendenze del repository
    ```
    npm install
    ```
3. Eseguire il server di sviluppo
    ```
    npm run start
    ```
## Build
1. Generare la build statica
    ```
    npm run build
    ```
2. Per eseguire la build eseguire il seguente comando
    ```
    npm run serve
    ```

# 🎨 Colori
Tutti i colori usati all'interno del sito sono visualizzabili all'interno dell'omonimo file nella cartella css.

| Color | Hex |
| ----- | --- |
| Background | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Selection Background | ![#233554](https://via.placeholder.com/10/233554?text=+) `#233554` |
| Main | ![#64FFDA](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |
| Subtitle | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Title | ![#b1ccf1](https://via.placeholder.com/10/b1ccf1?text=+) `#b1ccf1` |
| Link | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |

# 🚨 Crediti
Il design del sito è creato da [Brittany Chiang](https://github.com/bchiang7), ma il codice è stato riscritto da zero. I cambiamenti sono i seguenti.
| Brittany Version | My Version |
| --- | --- |
| Scritto soltanto in JS | Codice diviso tra JS e CSS (SCSS) |
| Senza i18n | Con i18n |
| Multipagina (home e archivio dei progetti) | Pagina singola (soltanto homepage) |
| Pagina 404 semplice | Pagina 404 più curata esteticamente |

# 📝 Note
## Codice
Il sito è stato scritto in modo tale che sia facilmente personalizzabile ed espandibile.

### Informazioni personali
La maggior parte delle informazioni personali sono configurabili all'interno del file `gatsby-config.js` (nome, titolo pagina, progetti e esperienze lavorative...).

### Lingua
Le lingue attualmente configurate sono inglese e italiano. Per aggiungerne di nuove basta semplicemente aggiungerle al file `gatsby-config.js` e aggiungere il file con le traduzioni all'interno di `/locales/`. <br />
<b>NB</b>: il selettore di lingue all'interno del sito è configurato per permettere la scelta di due lingue. In caso si vogliano aggiungere più di due lingue, va modificato di conseguenza il selettore.

### Stile
Tutto lo style è gestito all'interno della cartella `/src/styles/` da file scss. Lo style dei font ed i colori sono gestiti da file appositi e basta modificare quelle variabili per cambiare tutti i colori del sito. Ogni componente ha il suo file di stile con le sue variabili e basta modificare quelle principalmente. I file scss sono scritti in modo che le loro variabili siano visibili anche ai file js, quindi basta modificarle lì per renderle effettive in tutto il progetto.

### Homepage
La homepage non è altro che una pagina composta da tanti componenti Section, così da renderla più modulare. Se si vuole modificare basta creare componenti personalizzati che utilizzano al loro interno `/src/components/Section.jsx` per poi inserirli all'interno di `/src/pages/index.js`.

### Componenti Custom
#### Experience Section
Per aggiungere esperienze lavorative bisogna:
1. Aggiungere una nuova voce nel file `gatsby-config.js` sotto companies (vedere le altre companies come esempio);
2. Aggiugnere all'interno del file di traduzione inerente le label che si vogliono visualizzare utilizzando come chiave `company-[companyName]-date` per il tempo all'interno della azienda e `company-[companyName]-[id]` per le varie label che si vogliono inserire dentro la scheda dell'azienda. 

#### Work Section
Per aggiungere nuovi progetti bisogna aggiungere una nuova voce nel file `gatsby-config.js` sotto project (vedere le altre companies come esempio). Per aggiungere icone nuove basta inserirle all'interno di `/src/utils/svgIcons.js`. Per titolo e descrizione bisogna inserire l'id della label per poi tradurla all'interno dei file appositi.