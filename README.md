# teste
Teste Desafio

Servidor VPS - DigitalOcean - Linux - Banco MySql

A API do POST: http://134.209.64.239:3000/API

Exemplo de chamada:
{
“codigo_amostra”: “02383322” // maximo 8 numeros.
“Cocaína”: 0,678,
“Anfetamina”: 0,1,
“Metanfetamina”: 0.1,
“MDA”: 0.1,
“MDMA”: 0,
“THC”: 0.1,
“Morfina”: 0.1,
“Codeína”: 0.1,
“Heroína”: 0.1,
“Benzoilecgonina”: 0,
“Cocaetileno”: 0,
“Norcocaína”: 0,
}

A API do GET: http://134.209.64.239:3000/APIConsulta/02383322

[{"codigo_amostra":"02383322","droga_nome":"THC","laudo":"positivo"},{"codigo_amostra":"02383322","droga_nome":"Norcocaína","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"Morfina","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"Metanfetamina","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"MDMA","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"MDA","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"Heroína","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"Codeína","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"Cocaína","laudo":"positivo"},{"codigo_amostra":"02383322","droga_nome":"Cocaetileno","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"Benzoilecgonina","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"Anfetamina","laudo":"negativo"},{"codigo_amostra":"02383322","droga_nome":"","laudo":"Resultado da Amostra (02383322) é positivo"}]
