/**
 * @file firebase-config.js
 * @description Configuração e inicialização oficial do Firebase SDK (Padrão ESM).
 */

// 1. Importações dos módulos oficiais do Firebase via CDN (Dispensa instalação de pacotes)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Objeto de configuração (As chaves reais serão lidas do seu ambiente seguro)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 3. Inicializa o Firebase e o Banco de Dados Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Exporta a instância do banco para ser usada pelo nosso AuditLogger
export { db };