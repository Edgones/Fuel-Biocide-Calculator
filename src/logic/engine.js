/**
 * @file engine.js
 * @description Motor lógico de conversão de unidades e cálculo de dosagem (PPMV).
 * @version 1.0.0
 */
import { SecurityValidator } from './validator.js';

export class FuelEngine {
    /**
     * Converte unidades de massa (KG / LB) para a unidade base volumétrica (Litros)
     * @param {number} value - O valor numérico medido em massa.
     * @param {string} unit - A unidade de entrada ('KG' ou 'LB').
     * @param {number} density - A densidade do lote do dia (kg/l).
     * @returns {number} O volume equivalente em Litros.
     */
    static toBaseLitros(value, unit, density) {
        if (unit === 'LB') {
            // Converte Libras para Quilogramas, depois para Litros baseado na densidade
            return (value / 2.20462262) / density;
        }
        // Converte Quilogramas diretamente para Litros baseado na densidade
        return value / density;
    }

    /**
     * Processa o procedimento completo de abastecimento e define os ml exatos de biocida.
     * @param {number} fobCurrent - Combustível remanescente na asa.
     * @param {number} fobTarget - Combustível total requerido final.
     * @param {number} density - Densidade do lote (kg/l).
     * @param {string} acftId - ID da aeronave selecionada (Ex: 'E55P').
     * @param {string} unit - Unidade master ativa na UI ('KG' ou 'LB').
     * @param {number} ppmv - Concentração do perfil de dosagem (Geralmente 100 ou 200).
     * @param {boolean} isRemanentAditivated - A sua variável de controle de remanescente.
     * @returns {Object} DTO (Data Transfer Object) com os resultados prontos para a interface.
     */
    static calculateProcedure(fobCurrent, fobTarget, density, acftId, unit, ppmv, isRemanentAditivated) {
        // 1. Força o Cross-Check de segurança obrigatório antes de qualquer conta (Fail-Safe)
        SecurityValidator.validate(fobCurrent, fobTarget, density, acftId, unit);

        // 2. Normaliza os valores de massa de entrada para Litros (Unidade Base de Tratamento)
        const currentL = this.toBaseLitros(fobCurrent, unit, density);
        const targetL = this.toBaseLitros(fobTarget, unit, density);
        const upliftL = targetL - currentL;

        // 3. APLICAÇÃO DA SUA REGRA DE INFLEXÃO DE SEGURANÇA:
        // Se o remanescente NÃO está aditivado (false), tratamos o volume TARGET TOTAL na asa.
        // Se já está aditivado (true), aplicamos a química proporcional apenas sobre o combustível novo (Uplift).
        const volumeToTreatL = isRemanentAditivated ? upliftL : targetL;

        // 4. Cálculo final da dosagem química em mililitros (ml)
        // Fórmula industrial: ml = (Volume em Litros * PPMV) / 1000
        const biocideMl = (volumeToTreatL * ppmv) / 1000;

        // 5. Retorna o pacote de dados estruturado e travado para arredondamentos comerciais
        return {
            fuelToUplift: parseFloat((fobTarget - fobCurrent).toFixed(2)),
            biocideMl: Math.round(biocideMl),
            volumeToTreatL: parseFloat(volumeToTreatL.toFixed(2)),
            targetVolumeL: parseFloat(targetL.toFixed(2)),
            timestamp: new Date().toISOString()
        };
    }
}
