# Kiwi Monthly Invoices

Realiza la ronda mensual de facturación

## Getting Started

Se requiere instalar nodejs en la computadora donde se vayan a ejectuar la facturación.

### Prerequisites

NODEJS >10
IDE o editor de texto

### Installing

Se debe instalar NODEJS y NMP, que se puede descargar del siguiente link.
https://nodejs.org/es/download/


Una vez instalado se debe clonar el repositorio y dentro de la carpeta ejecutar
```
npm install
```

Esto solo se debe realizar la primera vez.

### Inciar el proceso de facturación.

Para iniciarl el proces se debe abrir el documento details.json e indicar el tipo de factuación a relizar
*prepaid*   : _prepago o regular_ \n
*postpaid*  : _post-pago_ \n
*inAdvance* : _facturación adelantada_ \n

Ejemplo
```
{
    "invoicingType"     : "prepaid",
    "dueDate"           : "10-AGO-2019",
    "range"             : "SEP-2019"
}

```
Para iniciar la facturación:

```
node index.js
```

Esperar a que termine y generar el siguiente ciclo.
