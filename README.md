# Job Radar

Assistant personnel de recherche d'emploi : une application web locale qui centralise les offres de plusieurs sources et permet de les trier et de suivre ses candidatures.

> 🚧 **En cours de développement**, étape par étape. Voir la [feuille de route](#feuille-de-route).

## Pourquoi ce projet

- **Un besoin réel** : arrêter de consulter dix sites d'emploi différents, et garder une trace de ce qui a déjà été vu, retenu ou écarté.
- **Un terrain d'apprentissage** : développeur web depuis plus de 20 ans (HTML, SCSS, JavaScript, PHP, WordPress, Shopify), j'utilise ce projet pour me former à une stack JavaScript moderne, sur un cas concret plutôt qu'avec des tutoriels.

## Stack

| Couche | Technologie | Pourquoi |
|---|---|---|
| Interface | [Vue 3](https://vuejs.org/) (Composition API) | Framework réactif répandu, progressif et lisible |
| Langage | [TypeScript](https://www.typescriptlang.org/) | Typage partagé entre le front et le back : une erreur de structure est détectée avant l'exécution |
| Outillage front | [Vite](https://vite.dev/) | Serveur de développement instantané, proxy vers l'API |
| Styles | SCSS | Variables et organisation, sans bibliothèque UI |
| Serveur | [Node.js](https://nodejs.org/) 24 + [Express 5](https://expressjs.com/) | Le standard de l'écosystème pour une API HTTP |
| Données | SQLite via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) | Une base complète dans un seul fichier local, sans serveur à administrer |
| Flux | [rss-parser](https://github.com/rbren/rss-parser) | Lecture unifiée des formats RSS 2.0 et Atom |

### Architecture

```
Navigateur (Vue 3)  ──HTTP /api──▶  Serveur Node (Express)  ──▶  Flux RSS
                                           │
                                           ▼
                                    SQLite (fichier local)
```

Les flux sont récupérés **par le serveur** et non par le navigateur : la plupart des sites d'emploi n'autorisent pas les requêtes cross-origin (CORS), une règle qui s'applique au navigateur mais pas à Node.

## Feuille de route

### MVP

- [x] **0.** Initialisation du dépôt
- [ ] **1.** Serveur minimal (Express + TypeScript)
- [ ] **2.** Lecture et normalisation d'un flux RSS
- [ ] **3.** Persistance SQLite, sans doublons
- [ ] **4.** API REST : flux et annonces
- [ ] **5.** Interface Vue : liste des annonces
- [ ] **6.** Gestion des flux depuis l'interface
- [ ] **7.** Statuts « intéressante » / « ignorée » et filtres
- [ ] **8.** Mise en page responsive, états vides et erreurs

### Plus tard

- Détection des doublons entre sources
- Filtres : mots-clés, localisation, salaire, télétravail
- Suivi des candidatures (à examiner, envoyée, entretien, refus…)
- Récapitulatif quotidien des nouvelles offres
- Analyse des annonces par rapport à mon profil, aide à la rédaction (IA)

## Prérequis

- Node.js 24 ou plus récent

Les instructions d'installation et de lancement arriveront avec les premières étapes.
