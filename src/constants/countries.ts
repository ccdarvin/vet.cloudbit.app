import { Metadata } from 'libphonenumber-js/core'
import min from 'libphonenumber-js/min/metadata'
import { CountryCode } from 'libphonenumber-js/types'
// all countries but the name is in spanish
export const countries: {
    name:string,
    code:string
}[] = [
    { name: 'Argentina', code: 'AR' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Brasil', code: 'BR' },
    { name: 'Chile', code: 'CL' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Guayana Francesa', code: 'GF' },
    { name: 'Granada', code: 'GD' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guayana', code: 'GY' },
    { name: 'Haití', code: 'HT' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'México', code: 'MX' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Panamá', code: 'PA' },
    { name: 'Perú', code: 'PE' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'República Dominicana', code: 'DO' },
    { name: 'Surinam', code: 'SR' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Estados Unidos', code: 'US' },
    { name: 'España', code: 'ES' },
    { name: 'Francia', code: 'FR' },
]

export const currencies: {
    code:string,
    name:string, 
    symbol:string
}[] = [
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
    { code: 'BOB', name: 'Boliviano', symbol: '$b' },
    { code: 'BRL', name: 'Real', symbol: 'R$' },
    { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
    { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
    { code: 'CRC', name: 'Colón Costarricense', symbol: '₡' },
    { code: 'CUP', name: 'Peso Cubano', symbol: '$' },
    { code: 'DOP', name: 'Peso Dominicano', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GTQ', name: 'Quetzal', symbol: 'Q' },
    { code: 'HNL', name: 'Lempira', symbol: 'L' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
    { code: 'NIO', name: 'Córdoba', symbol: 'C$' },
    { code: 'PAB', name: 'Balboa', symbol: 'B/.' },
    { code: 'PEN', name: 'Sol', symbol: 'S/.' },
    { code: 'PYG', name: 'Guaraní', symbol: '₲' },
    { code: 'USD', name: 'Dólar', symbol: '$' },
    { code: 'UYU', name: 'Peso Uruguayo', symbol: '$' },
    { code: 'VEF', name: 'Bolívar', symbol: 'Bs' }
] 