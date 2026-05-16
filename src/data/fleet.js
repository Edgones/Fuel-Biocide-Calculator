/**
 * @file fleet.js
 * @description Base de dados imutável, consolidada e ajustada da frota Embraer.
 * @version 1.0.0
 */

export const AIRCRAFT_DB = Object.freeze({
    // Família Phenom
    "E50P": {
        modelName: "Phenom 100 (EMB-500)",
        maxFuelKg: 1273,
        maxFuelLb: 2804
    },
    "E55P": {
        modelName: "Phenom 300 (EMB-505)",
        maxFuelKg: 2428,
        maxFuelLb: 5353
    },

    // Família ERJ-135 / ERJ-145
    "E135_ER": {
        modelName: "EMB-135ER",
        maxFuelKg: 4173,
        maxFuelLb: 9200
    },
    "E135_LR": {
        modelName: "EMB-135LR",
        maxFuelKg: 5187,
        maxFuelLb: 11434.9
    },
    "E145_LR": {
        modelName: "ERJ-145LR",
        maxFuelKg: 5187,
        maxFuelLb: 11434.9
    },
    "E145_LU": {
        modelName: "ERJ-145LU",
        maxFuelKg: 5187,
        maxFuelLb: 11434.9
    },

    // Família Legacy / Praetor (Médios)
    "E545_L450": {
        modelName: "Legacy 450 (EMB-545)",
        maxFuelKg: 5409,
        maxFuelLb: 11920
    },
    "E545_P500": {
        modelName: "Praetor 500 (EMB-545)",
        maxFuelKg: 5920,
        maxFuelLb: 13050
    },
    "E550_L500": {
        modelName: "Legacy 500 (EMB-550)",
        maxFuelKg: 5920,
        maxFuelLb: 13050
    },
    "E550_P600": {
        modelName: "Praetor 600 (EMB-550)",
        maxFuelKg: 7320,
        maxFuelLb: 16136
    },

    // Grandes Jatos Executivos (Legacy Séries)
    "E35L_LEGACY": {
        modelName: "Legacy (EMB-135BJ)",
        maxFuelKg: 8094,
        maxFuelLb: 17848
    },
    "E35L_L600": {
        modelName: "Legacy 600 (EMB-135BJ)",
        maxFuelKg: 8314,
        maxFuelLb: 18332
    },
    "E35L_L650": {
        modelName: "Legacy 650 (EMB-135BJ)",
        maxFuelKg: 9405,
        maxFuelLb: 20730
    },

    // E-Jets e E-Jets E2 (Comerciais e Lineage)
    "E190_100": {
        modelName: "ERJ-190-100",
        maxFuelKg: 13105,
        maxFuelLb: 28884
    },
    "E195_200": {
        modelName: "ERJ-190-200 (E195)",
        maxFuelKg: 13105,
        maxFuelLb: 28884
    },
    "E290_300": {
        modelName: "ERJ-190-300 (E190-E2)",
        maxFuelKg: 13690,
        maxFuelLb: 30176
    },
    "E295_400": {
        modelName: "ERJ-190-400 (E195-E2)",
        maxFuelKg: 13690,
        maxFuelLb: 30176
    },
    "E190_PR": {
        modelName: "Embraer 190PR",
        maxFuelKg: 16173,
        maxFuelLb: 35660
    },
    "E190_LINEAGE": {
        modelName: "Lineage 1000 (ERJ-190 ECJ)",
        maxFuelKg: 21866,
        maxFuelLb: 48200
    }
});
