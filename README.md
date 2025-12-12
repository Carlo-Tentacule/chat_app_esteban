# Chat App

Application de chat en temps réel développée avec **React Native (Expo)** pour le frontend et **Node.js / Express** pour le backend.

---

## Technologies
- Frontend : React Native (Expo), TypeScript
- Backend : Node.js, Express
- Base de données : MongoDB
- Temps réel : Socket.IO

---

## Lancer le projet

### Backend
```bash
cd backend
npm install
npm run start
```

### Frontend
```bash
cd frontend
npm install
npx expo start
```

### Configuration API (important)

Pour que le frontend puisse communiquer avec le backend sur mobile, il faut renseigner l’adresse IPv4 de votre machine.

fichier : frontend/src/api/
const API_BASE = "http://192.168.x.xx:3000";

## Auteur
Projet réalisé par Houillon Esteban
Dans le cadre d’un projet de développement mobile.