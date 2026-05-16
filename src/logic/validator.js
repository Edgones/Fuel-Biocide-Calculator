/**
 * @file validator.js
 * @description Camada de segurança (Fail-Safe) para validação dos envelopes operacionais.
 * @version 1.0.0
 */
import { AIRCRAFT_DB } from '../data/fleet.js';

export class SecurityValidator {
    /**
     * Intercepta e valida as entradas de dados antes de permitir qualquer cálculo químico.
     * @param {number} fobCurrent - Combustível Remanescente na asa.
     * @param {number} fobTarget - Combustível Total Requerido final.
     * @param {number} density - Densidade real informada pelo lote do dia.
     * @param {string} acftId - Código de identificação composto da aeronave (Ex: 'E55P').
     * @param {string} unit - Unidade master operacional selecionada ('KG' ou 'LB').
     * @returns {boolean} true se os dados estiverem estritamente dentro do envelope de segurança.
     */
    static validate(fobCurrent, fobTarget, density, acftId, unit) {
        const aircraft = AIRCRAFT_DB[acftId];
        
        // 1. Validação de Existência da Célula
        if (!aircraft) {
            throw new Error("ERR_ACFT_INVALID: Célula de aeronave não cadastrada na base de dados da frota.");
        }

        // 2. Validação do Envelope Físico de Densidade Comercial (ASTM D1655 / Padrão Embraer)
        // Fixado no código para simplificação e segurança da planilha de frota
        const MIN_DENSITY = 0.775;
        const MAX_DENSITY = 0.840;
        if (density < MIN_DENSITY || density > MAX_DENSITY) {
            throw new Error(`ERR_DENSITY_OUT_OF_RANGE: Densidade fora do envelope regulamentar permitido (${MIN_DENSITY} a ${MAX_DENSITY} kg/l).`);
        }

        // 3. Validação de Sanidade Numérica e Sinais
        if (isNaN(fobCurrent) || fobCurrent < 0) {
            throw new Error("ERR_INVALID_CURRENT_FOB: O valor inserido para o combustível remanescente é inválido.");
        }

        if (isNaN(fobTarget) || fobTarget <= 0) {
            throw new Error("ERR_INVALID_TARGET_FOB: O valor do combustível requerido deve ser maior que zero.");
        }

        if (fobTarget < fobCurrent) {
            throw new Error("ERR_TARGET_LESS_THAN_CURRENT: O combustível requerido final não pode ser menor que o remanescente atual na asa.");
        }

        // 4. Cross-Check de Limite Estrutural de Massa (A sua variável N da planilha)
        // O sistema seleciona dinamicamente a propriedade correta com base na unidade ativa na UI
        const maxLimit = unit === 'LB' ? aircraft.maxFuelLb : aircraft.maxFuelKg;

        if (fobTarget > maxLimit) {
            throw new Error(`ERR_MAX_CAPACITY_EXCEEDED: O volume requerido (${fobTarget.toLocaleString('pt-BR')} ${unit}) excede a capacidade máxima estrutural do tanque da aeronave ${aircraft.modelName} (${maxLimit.toLocaleString('pt-BR')} ${unit}).`);
        }

        return true;
    }
}
