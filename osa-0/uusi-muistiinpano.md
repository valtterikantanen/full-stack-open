```mermaid
sequenceDiagram
    participant Selain
    participant Palvelin

    Note over Selain: Käyttäjä kirjoittaa uuden muistiinpanon<br/>tekstikenttään ja painaa Tallenna-painiketta
    Selain->>Palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Palvelin
    Palvelin-->>Selain: Palvelin tallentaa muistiinpanon, vastaa tilakoodilla 302 ja<br/>kehottaa selainta lähettämään GET-pyynnön vastauksen<br/> otsikosta ilmenevään osoitteeseen (location: /exampleapp/notes)
    deactivate Palvelin
    
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Palvelin
    Palvelin-->>Selain: HTML-tiedosto
    deactivate Palvelin
    
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Palvelin
    Palvelin-->>Selain: CSS-tyylitiedosto
    deactivate Palvelin

    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Palvelin
    Palvelin-->>Selain: JavaScript-tiedosto
    deactivate Palvelin
    
    Note over Selain: Selain alkaa suorittaa JavaScript-koodia,<br/>joka tekee GET-pyynnön muistiinpanot<br/>JSON-muotoisena palauttavaan osoitteseen 
    
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Palvelin
    Palvelin-->>Selain: [{ "content": "HTML on helppoa", "date": "2023-02-09T13:15:02.748Z" }, ...]
    deactivate Palvelin    

    Note over Selain: Selain suorittaa tapahtumankäsittelijän,<br/>joka lisää muistiinpanot sivulle
```