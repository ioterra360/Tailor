# Sito Web Tailor App Studio — SPEC v1

**Data:** 2026-05-08
**Stato:** Approvato per implementazione
**Working dir:** `C:\Users\Angelo\Desktop\Taylor App Studio\Sito Web\`
**Dominio:** `tailorappstudio.it`

---

## 1. Obiettivo e contesto

### Obiettivo primario
**Vetrina di credibilità digitale** per visitatori che arrivano via referral o conoscenza pregressa di Tailor App Studio. NON è un canale di lead generation a freddo.

Il visitatore tipico ha appena sentito parlare di Tailor da un conoscente imprenditore. Visita il sito con UN obiettivo: capire in 30-60 secondi se Tailor sembra serio, capace, e in linea col suo bisogno.

### Successo del sito
- Visitatore qualificato compila il form contatto (lead caldo)
- Il visitatore percepisce il brand come **premium boutique italiano**, non "agenzia tech generica"
- Il sito carica veloce su mobile (target Lighthouse Performance ≥ 90)
- Tempo dal "atterraggio" al "form compilato" < 2 minuti per visitatore convinto

### Non-obiettivi (esplicitamente esclusi)
- SEO organico aggressivo (può essere obiettivo v2)
- Lead gen a freddo
- Blog / contenuti editoriali (può essere v2)
- Vendita o configurazione automatica
- Esposizione pubblica del listino prezzi (decisione #9 — i prezzi NON appaiono mai)
- Esposizione del modello commerciale specifico ("licenza d'uso" — resta in discovery call)
- Caso cliente TLC pubblicato (resta interno per call private)

---

## 2. Audience target

| Persona | Descrizione | Cosa cerca sul sito |
|---|---|---|
| **Marco, 48 anni** | Titolare PMI sarda 10-30 dipendenti, decide lui, non tecnico, arriva da referral | "Sono seri? Hanno fatto cose vere? Capisco cosa fanno?" |
| **Giulia, 35 anni** | Responsabile operativa S.r.l., più tech-aware, può portare Tailor al titolare | Stessa di Marco + un po' più di dettaglio sul "come" |

Non target: developer, founder tech, pubblico italiano fuori PMI tradizionali (effetto collaterale, non obiettivo).

---

## 3. Architettura tecnica

### Stack

| Layer | Scelta |
|---|---|
| Framework | **Astro 5** (SSG) |
| Styling | **Tailwind CSS v4** + design tokens custom Tailor |
| Animazioni | **GSAP** (timeline + ScrollTrigger + DrawSVG) + **Lenis** (smooth scroll) |
| Form backend | **Formspree** free tier (50 invii/mese sufficienti per v1) |
| Hosting | **Cloudflare Pages** (gratis illimitato + CDN globale) |
| Repo | **GitHub** (workflow analogo a IoTerra) |
| DNS | **IONOS** punta A/CNAME a Cloudflare Pages |
| Analytics | **Cloudflare Web Analytics** (privacy-first, no cookie banner) |
| Anti-spam form | Honeypot + **Cloudflare Turnstile** |
| Lingua | IT only v1 |

### Costo a regime: €0 (oltre dominio già pagato)

### Performance target
- Lighthouse Performance ≥ 90 (mobile + desktop)
- Lighthouse Accessibility ≥ 95
- Lighthouse SEO ≥ 95
- LCP < 2.5s su connessione 3G
- TBT < 200ms
- CLS < 0.1

---

## 4. Design system

### Palette

| Token | HEX | Uso |
|---|---|---|
| `bg-primary` | `#0A2540` | Sfondo principale (navy profondo) |
| `bg-secondary` | `#0F2D52` | Sezioni alternate |
| `text-primary` | `#FFFFFF` | Testo headline |
| `text-secondary` | `#B8C7D9` | Testo body, sottotitoli |
| `accent` | `#3B82F6` | Bottoni, link, hover |
| `accent-bright` | `#60A5FA` | Highlights, micro-elementi |
| `divider` | `#1E3A5F` | Linee, bordi sottili |

### Tipografia

- Font: **Sora** (Google Fonts), pesi 400 (regular) e 700 (bold)
- Headline grandi: Sora Bold, sizing fluid (clamp 32-72px)
- Body: Sora Regular, 16-18px, line-height 1.6
- Small: Sora Regular, 14px

### Spaziatura

- Mobile-first responsive
- Container max-width 1280px
- Sezioni: padding verticale 96-160px (clamp)
- Whitespace abbondante (stile editoriale premium)

---

## 5. Struttura sezioni

### 5.1 Header (fisso, minimale)

- Logo Tailor (T isometrica) a sinistra, ~40px altezza
- Link rapidi a destra: `Modello` `Lavoro` `Valori` `Contatto` (anchor link interni)
- Sfondo trasparente che diventa `bg-primary` con backdrop blur al scroll
- Mobile: hamburger menu

### 5.2 HERO (100vh)

**Visual centrale:** "T" isometrica grande (SVG vettoriale), animata in entrata.
- Animation: 3 facce della T si compongono sequenzialmente (3 sec, GSAP timeline)
- Successivamente: respiro leggero perpetuo (scale 1 → 1.02 ciclo 4s, easing)

**Headline (sotto la T, fluid sizing 56-88px):**
> Cuciamo applicazioni
> su misura per il tuo business.

**Sub-headline (24px regular):**
> Modello a canone, manutenzione inclusa.
> Made in Sardegna.

**CTA primario:** bottone bianco con border navy `Scrivici →` (scroll a sezione contatto)
**CTA secondario:** scritta piccola `↓ scopri di più` (scroll a sezione modello)

### 5.3 MODELLO

**H2:** "Cosa c'è dentro il canone."

3 cards orizzontali, allineamento responsive (3 cols desktop / 1 col mobile). Animazione: scroll-driven, ogni card si rivela con fade + translate-y.

| Card | Titolo | Descrizione |
|---|---|---|
| 1 | **Sviluppo + manutenzione + aggiornamenti, in un canone** | Costruiamo il tuo software e lo manteniamo vivo nel tempo. Sicurezza, aggiornamenti, supporto: tutto compreso ogni mese. |
| 2 | **Inizia con una caparra contenuta** | Il progetto parte con una piccola caparra che si scala sulle prime mensilità di canone, dopo la pubblicazione. Niente investimento iniziale fuori scala. |
| 3 | **Tecnologie sempre aggiornate, a costo zero per te** | iOS, Android, normative, integrazioni: ce ne occupiamo noi. Tu pensi al tuo business, il software resta moderno e in regola. |

**NESSUNA menzione di:**
- Importi specifici (decisione #9)
- "Licenza d'uso vs cessione" (decisione del 2026-05-08, comunicato in call)
- Confronti con competitor

### 5.4 COME LAVORIAMO

**H2:** "Dal primo 'buongiorno' al lancio."

Timeline scroll-driven a 6 step. Animazione: ogni step si rivela on-scroll, una linea SVG (filo da cucito stilizzato) si "cuce" tra uno step e il successivo.

| # | Step | Descrizione breve |
|---|---|---|
| 1 | **Discovery call gratuita** | 30 minuti per capire il tuo processo. Senza impegno. |
| 2 | **Proposta scritta** | Perimetro, tempi, costi. Tutto chiaro prima della firma. |
| 3 | **Firma + caparra di partenza** | Si parte. Lo sviluppo è già coperto. |
| 4 | **Sviluppo (4-16 settimane)** | Costruiamo il tuo software con check periodici. |
| 5 | **Pubblicazione online** | App sui store / web live. Da qui inizia il canone. |
| 6 | **Manutenzione, aggiornamenti, supporto** | Ogni mese, ogni anno, finché lo vorrai. |

### 5.5 VALORI

**H2:** "I quattro fili che usiamo."

4 valori del brand visualizzati come fili intrecciati (SVG animato con DrawSVG GSAP):
1. **Sicurezza** — i tuoi dati e quelli dei tuoi clienti, sempre protetti.
2. **Innovazione** — tecnologie aggiornate, AI come strumento, zero scorciatoie.
3. **Affidabilità** — SLA scritto, manutenzione inclusa, presenza costante.
4. **Modularità** — software che cresce con il tuo business.

Layout: 4 cards in griglia 2x2 (desktop) / 1 col (mobile). Ogni card ha un'icona stilizzata (filo che disegna l'iniziale del valore) + titolo + 1 frase.

### 5.6 CONTATTO

**H2:** "Cuciamo qualcosa anche per te?"
**Sub:** "Scrivici. Risposta entro 24h lavorative. Discovery call gratuita di 30 minuti senza impegno."

**Form:**
| Campo | Tipo | Obbligatorio |
|---|---|---|
| Nome e cognome | text | sì |
| Azienda | text | no |
| Email | email | sì |
| Messaggio (cosa vorresti automatizzare/digitalizzare?) | textarea (200-500 char) | sì |
| Honeypot anti-bot | hidden | — |
| Cloudflare Turnstile | challenge | sì |

**Submit:** POST a Formspree → email a `info@tailorappstudio.it` + redirect a `/grazie` (pagina semplice di conferma + link "torna alla home").

**Validazione:** lato client (HTML5) + Formspree validation.

**Note legali sotto al form:** breve frase + link a privacy policy.

### 5.7 Footer

```
Tailor App Studio
Applicazioni cucite su misura per il tuo business.

[colonna 1]                    [colonna 2]
Sezioni                        Contatti
- Modello                      info@tailorappstudio.it
- Come lavoriamo               PEC: a.casula@conafpec.it
- Valori                       Sassari · Sardegna · Italia
- Contatto

[colonna 3]
Legale
- Privacy Policy
- Cookie Policy
- Note legali

————————————————————————————————————————————
Angelo Casula · P.IVA 03034130900
Regime forfettario ex L. 190/2014
© 2026 Tailor App Studio
```

---

## 6. Animazioni cinematic — priorità

| # | Sezione | Effetto | Tool |
|---|---|---|---|
| 1 | Hero | T isometrica si compone in 3s all'apertura | GSAP timeline + SVG path |
| 2 | Hero | Respiro perpetuo della T | GSAP infinite tween |
| 3 | Globale | Smooth scroll con momentum | Lenis |
| 4 | Modello | Cards fade-in scroll-triggered | GSAP ScrollTrigger |
| 5 | Come lavoriamo | Linea filo che si "cuce" tra gli step | GSAP DrawSVG plugin |
| 6 | Come lavoriamo | Step che si rivelano sequenziali | GSAP ScrollTrigger stagger |
| 7 | Valori | 4 fili SVG che si intrecciano | GSAP DrawSVG plugin |
| 8 | Globale | Hover micro-interazioni (link, bottoni) | CSS transitions |
| 9 | Contatto | Form fields con focus animation | CSS transitions |

**Performance budget:** tutte le animazioni usano `transform` e `opacity` (GPU-accelerated). Niente `top/left` animati. `will-change` solo dove necessario. `prefers-reduced-motion` rispettato (animazioni ridotte/disabilitate per chi le richiede).

---

## 7. Responsive

- **Mobile-first:** breakpoints 640 / 768 / 1024 / 1280 / 1536
- **Hero:** sizing fluid clamp, T grande mobile (anche se meno animata per performance)
- **Cards modello:** stack 1 col su mobile, 3 col da 1024+
- **Timeline come lavoriamo:** verticale su mobile, orizzontale da 1024+
- **Valori:** 1 col mobile / 2x2 da 768+
- **Animazioni:** ridotte automaticamente su mobile (scroll-trigger semplificato, no DrawSVG su connessioni lente — fallback a fade-in)

---

## 8. Accessibilità

- Contrasto WCAG AA su tutti i testi
- Skip link a inizio pagina
- Heading hierarchy corretta (H1 hero, H2 sezioni, H3 cards)
- Focus visibile su tutti gli elementi interattivi
- Form con label associate, error messages chiari, ARIA-live regions
- `prefers-reduced-motion` rispettato per le animazioni
- `alt` text su tutte le immagini significative
- Lang attribute corretto (`lang="it"`)

---

## 9. SEO base

- Meta title: "Tailor App Studio · Applicazioni su misura per il tuo business"
- Meta description: 1 frase 155 char focus su modello + Sardegna
- Open Graph + Twitter card configurati (immagine 1200x630 generata con la "T" + tagline)
- `robots.txt` permissivo
- Sitemap.xml generato da Astro
- Schema.org `Organization` markup nel footer
- Niente blog/articoli per v1 (no content marketing v1)

---

## 10. Privacy / GDPR

- **Privacy Policy** (pagina dedicata `/privacy`): chi siamo, dati raccolti dal form, base legale (consenso/contratto), diritti GDPR, contatti
- **Cookie Policy** (pagina dedicata `/cookie`): minimal — solo CF Web Analytics (privacy-first, no cookie tracking) + Turnstile (challenge anti-bot, no profilazione). NESSUN cookie banner richiesto perché non ci sono cookie di profilazione/marketing
- **Form submission**: salvataggio email a IONOS (`info@`), Formspree come processor (privacy policy Formspree linked)
- Dichiarare Formspree + Cloudflare come sub-processor nella privacy policy

---

## 11. Asset richiesti (da preparare prima dell'implementazione)

- [ ] **Logo Tailor SVG** vettoriale per animazione hero (ricavato dal `Brand.png` o ricreato — la "T" isometrica come paths SVG)
- [ ] **Favicon** 32x32 + Apple touch 180x180 + maskable 512x512
- [ ] **OG image** 1200x630 (T + tagline, generabile con content-composer adattato)
- [ ] **Font Sora** files (già scaricati in `Tools/content-composer/brands/tailor/fonts/`)
- [ ] **SVG fili** per animazione "Come lavoriamo" e "Valori" (paths custom, da disegnare)

---

## 12. Out of scope v1 (futuro)

- Blog / insights / articoli
- Caso cliente TLC pubblicato
- Versione inglese (EN)
- Page case study generica
- Newsletter signup
- Pagina pricing
- Live chat / chatbot
- Calendly inline (sostituirà form quando attivi numero/calendario)
- WhatsApp Business CTA (quando numero attivo)
- Pagina FAQ

---

## 13. Definition of Done v1

- [ ] Repo GitHub `tailor-app-studio/website` creato e pushato
- [ ] Astro project con tutte le sezioni implementate
- [ ] Animazioni GSAP funzionanti (priorità 1-7 della tabella sezione 6)
- [ ] Form contatto integrato con Formspree, test invio funzionante
- [ ] Privacy + Cookie policy + pagina `/grazie` pubblicate
- [ ] Lighthouse Performance ≥ 90 mobile
- [ ] Cloudflare Pages deploy attivo
- [ ] DNS IONOS configurato → `tailorappstudio.it` punta a CF Pages
- [ ] HTTPS attivo (CF gestisce automaticamente)
- [ ] CF Web Analytics configurato
- [ ] OG image visibile su preview social
- [ ] Test su Chrome, Safari iOS, Firefox, Edge
- [ ] Form submission test E2E (compili → ricevi email)
- [ ] `prefers-reduced-motion` rispettato
- [ ] Accessibilità WCAG AA verificata

---

## 14. Decisioni di brainstorming registrate

(Riferimento: `Brainstorming/03-DECISIONI-LOG.md`, decisioni #20-23)

- **#20** — Scope v1: one-page senza caso TLC sul sito
- **#21** — CTA: form contatto classico, niente menzione "non vendiamo / licenza d'uso"
- **#22** — Feeling: cinematic / wow factor con GSAP
- **#23** — Stack: Astro + Tailwind + GSAP + Lenis, repo GitHub, hosting Cloudflare Pages, costo €0
