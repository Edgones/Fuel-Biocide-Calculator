/**
 * @file sw.js
 * @description Service Worker para gerenciamento de cache e operação Offline-First.
 * @version 1.0.0
 */

const CACHE_NAME = 'kinetic-hangar-v1';

// Lista exata de ativos locais a serem cacheados na instalação
const ASSETS = [
    './',
    './index.html',
    './calculadora.html',
    './dashboard.html',
    './manifest.json',
    './src/data/fleet.js',
    './src/logic/validator.js',
    './src/logic/engine.js'
];

// 1. Evento de Instalação: Abre o armazenamento local e guarda os arquivos estruturados
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Kinetic Hangar: Armazenando arquivos estruturados no cache local.');
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// 2. Evento de Ativação: Limpa versões antigas de cache para evitar conflitos de código
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('Kinetic Hangar: Eliminando cache obsoleto:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. Estratégia Network-First com Fallback para Cache:
// Tenta buscar atualizações na rede (essencial para CDN de Tailwind/Firebase).
// Se falhar (Hangar Offline), consome a estrutura salva localmente instantaneamente.
self.addEventListener('fetch', (event) => {
    // Ignora requisições que não sejam do tipo GET (como gravações do Firestore)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Se a resposta for válida, pode atualizar dinamicamente o cache aqui se necessário
                return response;
            })
            .catch(() => {
                // Se a rede falhar, busca na tabela de cache local
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Tratamento amigável para navegações offline fora do escopo padrão
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});
