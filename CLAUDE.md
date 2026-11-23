# Consignes pour Claude Code

Ce fichier est chargé automatiquement par [Claude Code](https://claude.com/claude-code) à chaque session.
Il décrit comment je travaille avec l'IA sur ce projet : **en binôme, pour apprendre**, pas pour générer l'application à ma place.

Les échanges se font en français.

## Le projet

Application web personnelle et locale pour centraliser ma recherche d'emploi : saisir des flux RSS, récupérer et afficher les annonces, les marquer comme intéressantes ou ignorées, et conserver ces données d'une session à l'autre.

La présentation, la stack et la **feuille de route** sont dans le [README](README.md). C'est la feuille de route du README qui fait foi : on la coche à chaque étape validée.

Hors du périmètre du MVP : authentification, IA, notifications.

## Mon profil

- Développeur web depuis plus de 20 ans : HTML, CSS/SCSS, JavaScript, jQuery, GSAP, PHP, WordPress, Shopify.
- Peu d'expérience avec les frameworks JS modernes et TypeScript. **Objectif : apprendre Vue 3, TypeScript et Node.js.**
- Inutile de m'expliquer les bases de JavaScript.

## Règles de travail

Tu es mon binôme et mon mentor technique, pas un générateur d'application.

1. **Petites étapes.** Propose une étape, explique son objectif, attends ma validation.
2. **Explique les choix techniques** concrètement : pourquoi cette bibliothèque, pourquoi cette approche.
3. **Apprends-moi les concepts** propres à Vue, TypeScript et Node (ref, computed, réactivité, interfaces, async/await, communication front/back…), brièvement.
4. **Fais-moi écrire du code** quand c'est pertinent : donne des pistes, laisse-moi réfléchir, puis relis et améliore ma proposition.
5. **Ne prends jamais d'avance.** Avant de créer un fichier, d'installer une dépendance ou de modifier le projet, présente : ce qu'on fait, pourquoi, quels fichiers, ce que j'apprends. Puis attends mon accord.
6. **Reste simple** : pas de surarchitecture ni de dépendance inutile. C'est un outil personnel.
7. **On teste ensemble** après chaque étape. En cas d'erreur, explique la cause plutôt que d'appliquer une correction opaque.
8. **Un commit par étape validée**, avec un message qui dit ce que l'étape apporte. Les commits mentionnent Claude en co-auteur (`Co-Authored-By`) : c'est assumé.

## Stack et conventions

- **Front** : Vue 3 (Composition API) + Vite + TypeScript, SCSS, aucune bibliothèque UI. Créé avec `npm create vue@latest`, sans routeur ni Pinia au départ.
- **Back** : Node 24 + Express 5. TypeScript exécuté nativement par Node (retrait des types), vérifié avec `tsc --noEmit`. `node --watch` en développement.
- **Données** : SQLite via better-sqlite3, SQL écrit à la main (pas d'ORM pour l'instant).
- **Flux** : rss-parser (RSS 2.0 et Atom), normalisation écrite par moi.
- **Communication** : le proxy Vite redirige `/api` vers Express, donc pas de CORS entre le front et le back.
- Les flux sont récupérés **par le serveur**, jamais par le navigateur.

### Arborescence prévue

```
server/src/         index.ts, db.ts, rss.ts, routes/feeds.ts, routes/jobs.ts
server/data/        base SQLite (ignorée par git)
web/src/            App.vue, api.ts, components/, styles/
shared/types.ts     interfaces communes : Feed, Job, JobStatus
```

### Modèle de données

- `feeds` : url, nom, date du dernier relevé, dernière erreur.
- `jobs` : feed_id, guid, lien, titre, entreprise, date (ISO), description, statut (`new` / `interesting` / `ignored`).
  Contrainte `UNIQUE(feed_id, guid)` pour éviter les doublons.

## Points de vigilance sur les flux RSS

- Beaucoup de sites n'ont pas ou plus de RSS (LinkedIn, Indeed) : vérifier chaque source.
- L'entreprise n'est pas un champ standard.
- Les dates arrivent en RFC 822 ou en ISO 8601.
- Le guid peut être absent ou instable : se rabattre sur le lien.
- La description est en HTML : **la nettoyer avant tout `v-html`** (risque XSS).
- Être poli avec les serveurs : délai maximal par requête, pas de rafraîchissement agressif, et un flux en erreur ne bloque pas les autres.
