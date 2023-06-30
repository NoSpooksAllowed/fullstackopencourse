sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: one note's JSON
    deactivate server
    JS transform this object into html object
    and add this html object into last element into list of other objects
    and render it into DOM
