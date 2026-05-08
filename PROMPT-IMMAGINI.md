# Prompt ChatGPT per le immagini del sito

**Tema visivo unificato:** macchine da cucire + smartphone + fili che cuciono — su palette blu navy Tailor.

**Workflow per ogni immagine:**
1. Apri ChatGPT (GPT-4o / GPT-5 image gen)
2. Carica come reference il logo `Logo.png` (così l'AI conosce il brand)
3. Incolla il prompt corrispondente
4. Salva l'immagine generata col nome esatto indicato in:
 `C:\Users\Angelo\Desktop\Taylor App Studio\Sito Web\public\img\<nome>.png`
5. Refresh del browser → la vedi inserita nel sito

**Convenzione naming:** già configurata nei componenti. Salva con il nome esatto.

---

## 1. `processo-hero.png` — Hero della sezione "Come lavoriamo"

**Aspect ratio:** orizzontale 16:7 (es. 1600x700)

```
Crea un'immagine editoriale orizzontale, formato 16:7, stile fotografico premium da rivista di design.

SOGGETTO PRINCIPALE: una macchina da cucire vintage in metallo cromato, vista frontale leggermente diagonale, posizionata sulla destra dell'immagine. La macchina sta cucendo un filo blu navy luminoso che parte da destra e attraversa orizzontalmente l'immagine fino a sinistra, dove il filo termina disegnando il contorno di uno smartphone moderno (iPhone-style) visto frontalmente.

SFONDO: sfondo blu navy profondo #0A2540 uniforme con leggera texture editoriale, illuminazione direzionale soft da sinistra-alto, vignetting elegante.

STILE: photographic editorial, premium, "quiet luxury", composizione cinematografica, atmosfera notturna sofisticata. Luce blu accent #3B82F6 che illumina sottilmente la cucitura del filo.

NIENTE: persone, niente testo, niente loghi, niente decorazioni floreali.
```

---

## 2. `modello-macchina-cucire.png` — Card 1 del Modello

**Aspect ratio:** 4:3 (es. 1200x900)

```
Immagine editoriale 4:3, vista dall'alto (top-down) di una macchina da cucire moderna minimalista in colore bianco perlato, posizionata centralmente. Sotto la macchina scorre un tessuto blu navy con una linea di cucitura precisa e regolare in filo bianco.

Sfondo: piano da lavoro in marmo bianco caldo. Illuminazione laterale soft, ombra elegante della macchina che si proietta a destra. Composizione geometrica, simmetrica, da catalogo di design industriale.

Stile premium minimalista, palette: bianco caldo + blu navy. Niente testo, niente persone.
```

---

## 3. `modello-ago-filo.png` — Card 2 del Modello

**Aspect ratio:** 4:3

```
Immagine editoriale 4:3, close-up macro di un ago da sarto cromato e un filo blu acceso (#3B82F6) che attraversa l'occhio dell'ago. Il filo serpeggia elegantemente verso il basso terminando con un piccolo nodo perfetto.

Sfondo: tessuto bianco testurato (lino o cotone fine) con leggera texture visibile, illuminazione direzionale soft.

Atmosfera: editoriale premium, calma, contemplativa. Profondità di campo ridotta, focus sull'ago e sul nodo del filo. Niente persone, niente testo, niente sfondi colorati.
```

---

## 4. `modello-smartphone-cucitura.png` — Card 3 del Modello

**Aspect ratio:** 4:3

```
Immagine editoriale 4:3, smartphone moderno (stile iPhone Pro, colore titanio scuro) visto frontalmente in piedi su un piano bianco. Lo schermo è acceso e mostra un'interfaccia minimalista blu navy con elementi UI puliti (no testo leggibile).

Attorno allo smartphone, un filo blu (#3B82F6) lo "cuce" creando una cornice elegante: il filo entra da un angolo, gira intorno al telefono con piccole cuciture decorative, e termina nell'angolo opposto.

Sfondo: bianco caldo, illuminazione direzionale soft, leggera ombra del telefono a 45°. Stile premium minimalista, palette bianco + blu navy. Niente testo, niente persone, niente loghi.
```

---

## 5. `valori-sicurezza.png` — Valore "Sicurezza"

**Aspect ratio:** quadrato 1:1 (es. 800x800)

```
Immagine quadrata 1:1, smartphone moderno visto frontalmente con uno schermo nero su cui è disegnato — interamente cucito con filo blu acceso #3B82F6 — un piccolo lucchetto stilizzato. Le cuciture del lucchetto sono visibili come punti regolari.

Sfondo: blu navy profondo #0A2540 uniforme. Illuminazione laterale soft. Stile editoriale minimalista, "quiet luxury".

Niente testo, niente UI dello smartphone, solo il lucchetto cucito al centro dello schermo.
```

---

## 6. `valori-innovazione.png` — Valore "Innovazione"

**Aspect ratio:** 1:1

```
Immagine quadrata 1:1, smartphone moderno visto frontalmente con uno schermo nero su cui è cucito (con filo blu acceso #3B82F6) un piccolo cervello stilizzato in stile geometrico minimalista (come un'icona AI moderna). Le cuciture sono visibili come punti regolari sui contorni.

Sfondo: blu navy profondo #0A2540 uniforme. Illuminazione laterale soft. Stile editoriale minimalista. Niente testo, solo il cervello cucito al centro dello schermo.
```

---

## 7. `valori-affidabilita.png` — Valore "Affidabilità"

**Aspect ratio:** 1:1

```
Immagine quadrata 1:1, macchina da cucire vintage in ottone e metallo brunito, vista da angolazione 3/4, mentre cuce ininterrottamente una linea perfettamente regolare di filo blu acceso #3B82F6 su un tessuto navy.

Sfondo: blu navy profondo #0A2540 uniforme. Illuminazione warm da destra. Stile editoriale premium, evocativo di artigianato di alta gamma. Niente persone, niente testo.
```

---

## 8. `valori-modularita.png` — Valore "Modularità"

**Aspect ratio:** 1:1

```
Immagine quadrata 1:1, smartphone moderno visto frontalmente. Lo schermo nero è coperto da quattro mattoncini stile LEGO blu acceso #3B82F6 disposti in una griglia 2x2, ognuno cucito al successivo da fili visibili (cuciture stilizzate).

Sfondo: blu navy profondo #0A2540 uniforme. Illuminazione laterale soft. Stile editoriale minimalista. Niente testo, solo i moduli cuciti al centro dello schermo.
```

---

## Note operative

- **Se ChatGPT genera una variante con testo dentro per errore**, rispondi:
 *"Rifai senza alcun testo nell'immagine, solo il soggetto descritto."*
- **Se il blu non corrisponde al brand**, rispondi:
 *"Usa esattamente il blu navy #0A2540 per lo sfondo e il blu accent #3B82F6 per il filo."*
- **Risoluzione:** ChatGPT genera 1024x1024 o 1024x1536. Va bene per il sito (Astro ottimizzerà). Se vuoi più risoluzione passa a Midjourney v8 in seconda battuta.
- **Coerenza visiva tra le 8 immagini:** sono già unificate dalla palette + tema "filo blu che cuce". Per maggiore coerenza puoi dire a ChatGPT *"questa è la 6° di 8 immagini per la stessa serie editoriale, mantieni lo stile coerente con le precedenti"*.

## Fallback se non vuoi farne tutte e 8

Le 3 più importanti (priorità):
1. `processo-hero.png` — è l'immagine grande in alto della sezione processo, quella più visibile
2. `modello-macchina-cucire.png` — la prima card del modello, quella che si vede subito scrollando
3. `valori-sicurezza.png` — la prima card dei valori

Se generi solo queste 3 il sito è già visivamente ricco. Le altre 5 puoi farle in seconda passata.
