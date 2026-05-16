# Kinetic Hangar - Fuel Biocide Calculator ✈️

Sistema de missão crítica para cálculo automatizado, validação estrutural e governança de dosagem de biocida para a frota de jatos executivos e comerciais Embraer. Desenvolvido sob a arquitetura **Aviation-Grade** com foco em resiliência offline, segurança fail-safe e integridade de dados.

---

## 🛠️ Arquitetura do Sistema

O projeto foi construído utilizando **Vanilla JavaScript (padrão ECMAScript Modules - ESM)** e **Tailwind CSS**, eliminando empacotadores complexos (como Webpack/Vite) ou dependências pesadas de frameworks. Isso garante máxima leveza e carregamento instantâneo na linha de voo.

### Recursos Principais:
* **Fail-Safe Operational Validation:** Bloqueio automático e imediato da interface caso o combustível requerido ultrapasse o limite estrutural nominal ($N$) da asa da aeronave ou viole o envelope regulamentar de densidade da ASTM D1655 ($0.775 \text{ a } 0.840 \text{ Kg/L}$).
* **Inflexão de Combustível Remanescente:** Implementação rígida da regra de negócio: se o remanescente na asa *não* estiver aditivado, a dosagem é calculada sobre o volume final total; se *já estiver* aditivado, o cálculo é aplicado estritamente sobre o combustível novo (*Uplift*).
* **Offline-First (PWA):** Integração total com Service Worker (`sw.js`) e manifesto Web (`manifest.json`), permitindo instalação direta no smartphone ou tablet e operação 100% autônoma em pontos cegos de conectividade dentro do hangar ou pátio.
* **Smart Default Persistence:** Persistência automatizada via `localStorage` da última densidade medida no turno, reduzindo a digitação repetitiva e mitigando erros humanos de digitação.
* **Governança & Cloud Sync:** Sincronização em tempo real com o Cloud Firestore para armazenamento descentralizado de auditoria imutável, com suporte a exportação de relatórios em CSV.

---

## 📁 Estrutura de Diretórios

```text
Fuel-Biocide-Calculator/
├── backend/
│   └── firebase-config.js     # Inicialização nativa do SDK do Firebase Cloud Firestore
├── src/
│   ├── data/
│   │   └── fleet.js           # Matriz imutável da frota Embraer (limites de massa KG/LB)
│   └── logic/
│       ├── validator.js       # Gatekeeper de segurança e cross-check estrutural
│       └── engine.js          # Motor matemático de conversão e lógica de aditivação
├── index.html                 # Portal de acesso brutalista (ID do Inspetor & PIN)
├── calculadora.html           # Interface operacional e displays tabulares estáveis
├── dashboard.html             # Painel de auditoria, filtros por prefixo e exportação
├── manifest.json              # Manifesto PWA para instalação mobile
└── sw.js                      # Service Worker para controle de cache offline# Fuel Biocide Calculator

This project calculates the amount of fuel biocide needed for a given volume of fuel. 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Edgones/Fuel-Biocide-Calculator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Fuel-Biocide-Calculator
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Ensure you have a Firebase configuration set up in `firebase-config.js`.
2. Run the backend server:
   ```bash
   node backend/index.js
   ```
3. Open the frontend in your browser to access the calculator.
