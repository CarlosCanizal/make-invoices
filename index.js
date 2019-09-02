const Parse = require('parse/node').Parse;
const q  = require("q");
const delay  = require("delay");
const asyncEach = require("./each-series");
const details = require("./details");

Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize("evDT2lYItdWafYh4i6QeGqXuGjcmliKZ3aYy8HJC", "nhEaWrCi2AlnoUYBUHsG3NFAUZVqAh1YAG1gPlhe" , "UcnWpyvMN91TkKDx98uVOVAXFLyYNFemSrUePRXQ");

let servicesCatalog = {
    "10gb": {
      "localId": "10Gb",
      "name": "10Gb",
      "description": "Internet Dedicado 10Gbps/10Gbps"
    },
    "1gb": {
      "localId": "1Gb",
      "name": "1Gb",
      "description": "Internet Dedicado 1Gbs/1Gbps"
    },
    "2gb": {
      "localId": "2Gb",
      "name": "2Gb",
      "description": "Internet Dedicado 2Gbps/2Gbps"
    },
    "b10": {
      "localId": "B10",
      "name": "B10",
      "description": "Internet Empresarial de Hasta 10Mbps/10Mps"
    },
    "b100": {
      "localId": "B100",
      "name": "B100",
      "description": "Internet Empresarial de Hasta 100Mbps/100Mps"
    },
    "b20": {
      "localId": "B20",
      "name": "B20",
      "description": "Internet Empresarial de Hasta 20Mbps/20Mps"
    },
    "b50": {
      "localId": "B50",
      "name": "B50",
      "description": "Internet Empresarial de Hasta 50Mbps/50Mps"
    },
    "b500": {
      "localId": "B500",
      "name": "B500",
      "description": "Internet Empresarial de Hasta 500Mbps/500Mps"
    },
    "centromayor - loc - b500": {
      "localId": "CentroMayor - Loc - B500",
      "name": "CentroMayor - Loc - B500",
      "description": "Internet Empresarial de Hasta 500Mbps/500Mps"
    },
    "centromayor - ofi - b500": {
      "localId": "CentroMayor - Ofi - B500",
      "name": "CentroMayor - Ofi - B500",
      "description": "Internet Empresarial de Hasta 500Mbps/500Mps"
    },
    "cloud dvr": {
      "localId": "Cloud DVR",
      "name": "Cloud DVR",
      "description": "Grabadora de Videovigilancia en la Nube"
    },
    "d5": {
      "localId": "D5",
      "name": "D5",
      "description": "Internet Dedicado 5Mbps/5Mbps"
    },
    "d10": {
      "localId": "D10",
      "name": "D10",
      "description": "Internet Dedicado 10Mbps/10Mbps"
    },
    "d100": {
      "localId": "D100",
      "name": "D100",
      "description": "Internet Dedicado 100Mbps/100Mbps"
    },
    "d1000": {
      "localId": "D1000",
      "name": "D1000",
      "description": "Internet Dedicado 1000Mbps/1000Mbps"
    },
    "d15": {
      "localId": "D15",
      "name": "D15",
      "description": "Internet Dedicado 15Mbps/15Mbps"
    },
    "d150": {
      "localId": "D150",
      "name": "D150",
      "description": "Internet Dedicado 150Mbps/150Mbps"
    },
    "d2": {
      "localId": "D2",
      "name": "D2",
      "description": "Internet Dedicado 2Mbps/2Mbps"
    },
    "d20": {
      "localId": "D20",
      "name": "D20",
      "description": "Internet Dedicado 20Mbps/20Mbps"
    },
    "d200": {
      "localId": "D200",
      "name": "D200",
      "description": "Internet Dedicado 200Mbps/200Mbps"
    },
    "d250": {
      "localId": "D250",
      "name": "D250",
      "description": "Internet Dedicado 250Mbps/250Mbps"
    },
    "d30": {
      "localId": "D30",
      "name": "D30",
      "description": "Internet Dedicado 30Mbps/30Mbps"
    },
    "d300": {
      "localId": "D300",
      "name": "D300",
      "description": "Internet Dedicado 300Mbps/300Mbps"
    },
    "d4": {
      "localId": "D4",
      "name": "D4",
      "description": "Internet Dedicado 4Mbps/4Mbps"
    },
    "d50": {
      "localId": "D50",
      "name": "D50",
      "description": "Internet Dedicado 50Mbps/50Mbps"
    },
    "d500": {
      "localId": "D500",
      "name": "D500",
      "description": "Internet Dedicado 500Mbps/500Mbps"
    },
    "d6": {
      "localId": "D6",
      "name": "D6",
      "description": "Internet Dedicado 6Mbps/6Mbps"
    },
    "d60": {
      "localId": "D60",
      "name": "D60",
      "description": "Internet Dedicado 60Mbps/60Mbps"
    },
    "ip segment /27": {
      "localId": "IP Segment /27",
      "name": "IP Segment /27",
      "description": "Segmento Adicional de IP /27"
    },
    "ip segment /28": {
      "localId": "IP Segment /28",
      "name": "IP Segment /28",
      "description": "Segmento Adicional de IP /28"
    },
    "ip segment /29": {
      "localId": "IP Segment /29",
      "name": "IP Segment /29",
      "description": "Segmento Adicional de IP /29"
    },
    "ip segment /30": {
      "localId": "IP Segment /30",
      "name": "IP Segment /30",
      "description": "Segmento Adicional de IP /30"
    },
    "kiwicam (hardware)": {
      "localId": "KiwiCam (Hardware)",
      "name": "KiwiCam (Hardware)",
      "description": "Servicio de Hardware para Videovigilancia"
    },
    "la vista rb50": {
      "localId": "La Vista RB50",
      "name": "La Vista RB50",
      "description": "Internet Residencial de Hasta 50Mbps/50Mps"
    },
    "lmts 100": {
      "localId": "LMTS 100",
      "name": "LMTS 100",
      "description": "Internet Dedicado por Ubicación para Metro Mesh 100Mbps/100Mbps"
    },
    "lmts 50": {
      "localId": "LMTS 50",
      "name": "LMTS 50",
      "description": "Internet Dedicado por Ubicación para Metro Mesh 50Mbps/50Mbps"
    },
    "lmts 650": {
      "localId": "LMTS 650",
      "name": "LMTS 650",
      "description": "Internet Dedicado por Ubicación para Metro Mesh 650Mbps/650Mbps"
    },
    "metro mesh": {
      "localId": "Metro Mesh",
      "name": "Metro Mesh",
      "description": "Internet Dedicado para Redes Metropolitanas"
    },
    "open pipe": {
      "localId": "Open Pipe",
      "name": "Open Pipe",
      "description": "Servicio de Consumo Bajo Demanda"
    },
    "residential b50": {
      "localId": "Residential B50",
      "name": "Residential B50",
      "description": "Internet Residencial de Hasta 50Mbps/50Mps"
    },
    "residential b500": {
      "localId": "Residential B500",
      "name": "Residential B500",
      "description": "Internet Residencial de Hasta 500Mbps/500Mps"
    },
    "restaurant project": {
      "localId": "Restaurant Project",
      "name": "Restaurant Project",
      "description": "Internet Empresarial RP de Hasta 50Mbps/50Mps"
    },
    "server collocation": {
      "localId": "Server Collocation",
      "name": "Server Collocation",
      "description": "Coubicación de Servidor"
    },
    "burst 100% - d10": {
      "localId": "Burst 100% - D10",
      "name": "Burst 100% - D10",
      "description": "Internet Dedicado 10Mbps/10Mbps Burst 100%"
    },
    "burst 100% - d100": {
      "localId": "Burst 100% - D100",
      "name": "Burst 100% - D100",
      "description": "Internet Dedicado 100Mbps/100Mbps Burst 100%"
    },
    "burst 100% - d20": {
      "localId": "Burst 100% - D20",
      "name": "Burst 100% - D20",
      "description": "Internet Dedicado 20Mbps/20Mbps Burst 100%"
    },
    "burst 100% - d4": {
      "localId": "Burst 100% - D4",
      "name": "Burst 100% - D4",
      "description": "Internet Dedicado 4Mbps/4Mbps Burst 100%"
    },
    "burst 100% - d50": {
      "localId": "Burst 100% - D50",
      "name": "Burst 100% - D50",
      "description": "Internet Dedicado 50Mbps/50Mbps Burst 100%"
    },
    "burst 25% - d10": {
      "localId": "Burst 25% - D10",
      "name": "Burst 25% - D10",
      "description": "Internet Dedicado 10Mbps/10Mbps Burst 25%"
    },
    "burst 25% - d100": {
      "localId": "Burst 25% - D100",
      "name": "Burst 25% - D100",
      "description": "Internet Dedicado 100Mbps/100Mbps Burst 25%"
    },
    "burst 25% - d20": {
      "localId": "Burst 25% - D20",
      "name": "Burst 25% - D20",
      "description": "Internet Dedicado 20Mbps/20Mbps Burst 25%"
    },
    "burst 25% - d4": {
      "localId": "Burst 25% - D4",
      "name": "Burst 25% - D4",
      "description": "Internet Dedicado 4Mbps/4Mbps Burst 25%"
    },
    "burst 25% - d50": {
      "localId": "Burst 25% - D50",
      "name": "Burst 25% - D50",
      "description": "Internet Dedicado 50Mbps/50Mbps Burst 25%"
    },
    "burst 50% - d10": {
      "localId": "Burst 50% - D10",
      "name": "Burst 50% - D10",
      "description": "Internet Dedicado 10Mbps/10Mbps Burst 50%"
    },
    "burst 50% - d100": {
      "localId": "Burst 50% - D100",
      "name": "Burst 50% - D100",
      "description": "Internet Dedicado 100Mbps/100Mbps Burst 50%"
    },
    "burst 50% - d20": {
      "localId": "Burst 50% - D20",
      "name": "Burst 50% - D20",
      "description": "Internet Dedicado 20Mbps/20Mbps Burst 50%"
    },
    "burst 50% - d4": {
      "localId": "Burst 50% - D4",
      "name": "Burst 50% - D4",
      "description": "Internet Dedicado 4Mbps/4Mbps Burst 50%"
    },
    "burst 50% - d50": {
      "localId": "Burst 50% - D50",
      "name": "Burst 50% - D50",
      "description": "Internet Dedicado 50Mbps/50Mbps Burst 50%"
    },
    "jv1 - b200": {
      "localId": "JV1 - B200",
      "name": "JV1 - B200",
      "description": "Internet Residencial de Hasta 200Mbps/200Mps"
    },
    "jv2 - b200": {
      "localId": "JV2 - B200",
      "name": "JV2 - B200",
      "description": "Internet Residencial de Hasta 200Mbps/200Mps"
    },
    "jv3 - b200": {
      "localId": "JV3 - B200",
      "name": "JV3 - B200",
      "description": "Internet Residencial de Hasta 200Mbps/200Mps"
    },
    "jvj - b200": {
      "localId": "JVJ - B200",
      "name": "JVJ - B200",
      "description": "Internet Residencial de Hasta 200Mbps/200Mps"
    },
    "kec - almacenamiento por gb": {
      "localId": "KEC-ALMGB",
      "name": "KEC - Almacenamiento Por Gb",
      "description": "KEC - Almacenamiento Por Gb"
    },
    "kec - balanceador de carga virtual kemp": {
      "localId": "KEC-BCV",
      "name": "KEC - Balanceador De Carga Virtual Kemp",
      "description": "KEC - Balanceador De Carga Virtual Kemp"
    },
    "kec - certificado ssl anual": {
      "localId": "KEC-SSLA",
      "name": "KEC - Certificado Ssl Anual",
      "description": "KEC - Certificado Ssl Anual"
    },
    "kec - enlace dedicado privado": {
      "localId": "KEC-EDP",
      "name": "KEC - Enlace Dedicado Privado",
      "description": "KEC - Enlace Dedicado Privado"
    },
    "kec - firewall virtual": {
      "localId": "KEC-FWV",
      "name": "KEC - Firewall Virtual",
      "description": "KEC - Firewall Virtual"
    },
    "kec - nube privada de archivos": {
      "localId": "KEC-NPA",
      "name": "KEC - Nube Privada De Archivos",
      "description": "KEC - Nube Privada De Archivos"
    },
    "kec - servicio de escritorio remoto": {
      "localId": "KEC-ERM",
      "name": "KEC - Servicio De Escritorio Remoto",
      "description": "KEC - Servicio De Escritorio Remoto"
    },
    "kec - servicio de respaldo administrado": {
      "localId": "KEC-RAD",
      "name": "KEC - Servicio De Respaldo Administrado",
      "description": "KEC - Servicio De Respaldo Administrado"
    },
    "kec - servicio privado de odoo": {
      "localId": "KEC-SPO",
      "name": "KEC - Servicio Privado De Odoo",
      "description": "KEC - Servicio Privado De Odoo"
    },
    "kec - servidor privado de openkm": {
      "localId": "KEC-SPOP",
      "name": "KEC - Servidor Privado De Openkm",
      "description": "KEC - Servidor Privado De Openkm"
    },
    "kec - servidor privado de zoneminder": {
      "localId": "KEC-SPZM",
      "name": "KEC - Servidor Privado De Zoneminder",
      "description": "KEC - Servidor Privado De Zoneminder"
    },
    "kec - hosting y renovación de dominio anual": {
      "localId": "KEC-HOS",
      "name": "KEC - Hosting Y Renovación De Dominio Anual",
      "description": "KEC - Hosting Y Renovación De Dominio Anual"
    },
    "kec - central telefónica ip 3cx": {
      "localId": "KEC-PBX",
      "name": "KEC - Central Telefónica Ip 3cx",
      "description": "KEC - Central Telefónica Ip 3cx"
    },
    "kec - servicio de troncal sip": {
      "localId": "KEC-STS",
      "name": "KEC - Servicio de Troncal Sip",
      "description": "KEC - Servicio de Troncal Sip"
    },
    "kec - servidor privado virtual": {
      "localId": "KEC-WSPV",
      "name": "KEC - Servidor Privado Virtual",
      "description": "KEC - Servidor Privado Virtual"
    },
    "kec - servidor dedicado": {
      "localId": "KEC-WSD",
      "name": "KEC - Servidor Dedicado",
      "description": "KEC - Servidor Dedicado"
    },
    "kec - servidor privado windows": {
      "localId": "KEC-WSPW",
      "name": "KEC - Servidor Privado Windows",
      "description": "KEC - Servidor Privado Windows"
    },
    "kec - vps": {
      "localId": "KEC-VPS",
      "name": "KEC - VPS",
      "description": "KEC - VPS"
    },
    "kiwicam": {
      "localId": "KiwiCam",
      "name": "KiwiCam",
      "description": "Servicio de Hardware para Videovigilancia"
    },
    "lmts 100 - installation fee": {
      "localId": "LMTS 100 - Installation Fee",
      "name": "LMTS 100 - Installation Fee",
      "description": "Instalación para Internet Dedicado por Ubicación para Metro Mesh 100Mbps/100Mbps"
    },
    "lmts 50 - installation fee": {
      "localId": "LMTS 50 - Installation Fee",
      "name": "LMTS 50 - Installation Fee",
      "description": "Instalación para Internet Dedicado por Ubicación para Metro Mesh 50Mbps/50Mbps"
    },
    "lmts 650 - installation fee": {
      "localId": "LMTS 650 - Installation Fee",
      "name": "LMTS 650 - Installation Fee",
      "description": "Instalación para Internet Dedicado por Ubicación para Metro Mesh 650Mbps/650Mbps"
    },
    "local dvr": {
      "localId": "Local DVR",
      "name": "Local DVR",
      "description": "Servicio de Grabador de Videovigilancia"
    },
    "op 100": {
      "localId": "OP 100",
      "name": "OP 100",
      "description": "Servicio de Consumo Bajo Demanda Hasta 100Mbps/100Mbps"
    },
    "op 2000": {
      "localId": "OP 2000",
      "name": "OP 2000",
      "description": "Servicio de Consumo Bajo Demanda Hasta 2000Mbps/2000Mbps"
    },
    "op 250": {
      "localId": "OP 250",
      "name": "OP 250",
      "description": "Servicio de Consumo Bajo Demanda Hasta 250Mbps/200Mbps"
    },
    "op 600": {
      "localId": "OP 600",
      "name": "OP 600",
      "description": "Servicio de Consumo Bajo Demanda Hasta 600Mbps/600Mbps"
    },
    "activación del servicio": {
      "localId": "KWACT",
      "name": "ACTIVACIÓN DEL SERVICIO",
      "description": "Activación del Servicio"
    },
    "activación express del servicio": {
      "localId": "KWACTEXP",
      "name": "ACTIVACIÓN EXPRESS DEL SERVICIO",
      "description": "Activación Express del Servicio"
    },
    "coubicación de equipo": {
      "localId": "KWCOEQ",
      "name": "COUBICACIÓN DE EQUIPO",
      "description": "Coubicación de Equipo"
    },
    "coubicación cbd-1703-000 pue cti fuertes": {
      "localId": "KWCOTM",
      "name": "Coubicación CBD-1703-000 Pue CTI Fuertes",
      "description": "Coubicación CBD-1703-000 Pue CTI Fuertes"
    },
    "reactivación de servicio": {
      "localId": "KWREACT",
      "name": "REACTIVACIÓN DE SERVICIO",
      "description": "Reactivación del Servicio"
    },
    "instalación equipo y material": {
      "localId": "INSTEQMAT",
      "name": "INSTALACIÓN EQUIPO Y MATERIAL",
      "description": "Instalación , Equipo y Material"
    },
    "redundancia": {
      "localId": "RED",
      "name": "REDUNDANCIA",
      "description": "Redundancia"
    },
    "cuota de exclusividad": {
      "localId": "CE",
      "name": "CUOTA DE EXCLUSIVIDAD",
      "description": "Cuota de Exclusividad"
    }
  };

function createInvoices(serviceGroup, services, client, details){
    let parse_promise = q.defer();
    let imp5Millar = false;
    if(details && details.imp5Millar && details.imp5Millar == true)
      imp5Millar = true;
    if(serviceGroup && services.length > 1){
      let items = [];
      let tags = [];
      let total = 0;
      asyncEach(services, function(service, i, next){
        let rating = service.get("rating");
        let subtotal = service.get('amount');
        let allowedRating = ["Active", "Reactivate", "Overdue Payment", "Suspended Service - Force Term Agreement"];
        if(subtotal > 0 && allowedRating.includes(rating)){
          let amount = parseFloat((subtotal*1.16).toFixed(2));
  
          total +=subtotal;
  
          let localId = "KI-GEN";
          let description = "Servicio de Internet Kiwi Networks";
          let notes = false;
          if(service.get('notes'))
            notes =  service.get('notes');
  
          let serviceRequested1 = service.get('serviceRequested1');
          if(serviceRequested1)
            serviceRequested1 = serviceRequested1.toLowerCase();
          let serviceRequested2 = service.get('serviceRequested2');
          if(serviceRequested2)
            serviceRequested2 = serviceRequested2.toLowerCase();
  
          /*reglas*/
  
          if(serviceRequested2 && servicesCatalog[serviceRequested2]){
            localId = servicesCatalog[serviceRequested2].localId;
            description = servicesCatalog[serviceRequested2].description;
          }
          else{
  
            if(serviceRequested1 && servicesCatalog[serviceRequested1]){
              localId = servicesCatalog[serviceRequested1].localId;
              description = servicesCatalog[serviceRequested1].description;
            }
          }
  
          //Se guarda en la factura el valor zohoId del potencial
          let potentialId = service.get("zohoId");
          potentialId = potentialId? potentialId:"N/A";
          //end 
  
          //Se guarda en la factura el valor de Location del potencial
          let location = service.get("location");
          location = location? location:"N/A";
          //end 
  
          /*reglas*/
          if(notes)
            description = description +" - "+notes;
  
  
          items.push({
            "claveSAT"      :"81112100",
            "claveLocal"    : localId,
            "cantidad"      : "1",
            "claveUnidad"   : "E48",
            "unidad"        :"Servicio",
            "descripcion"   : description,
            "valorUnitario" : subtotal,
            "potentialId"   : potentialId,
            "location"      : location
          });
  
          if(potentialId)
            tags.push(potentialId);
        }
  
        next();
      },function(){
        let Invoice = Parse.Object.extend("Invoice");
        let invoice = new Invoice();
        // invoice.set('subtotal', subtotalInvoices);
  
        let emails = [];
        let email = client.get('email');
        let ccInvoice = client.get('ccInvoice');
        if(email)
          emails.push(email);
  
        if(ccInvoice && ccInvoice.length > 0){
          emails = emails.concat(ccInvoice);
        }
  
        invoice.set('emails', emails);
        invoice.set('client', client);
        invoice.set('applyAdvance', true);
        invoice.set('applyOutcome', false);
        invoice.set('paid', false);
        invoice.set('imp5Millar', imp5Millar);
        invoice.set('subtotal', total);
        
          
        if(details){
          if(details.dueDate)
            invoice.set('dueDate', details.dueDate);
          if(details.range)
            invoice.set('range', details.range);
        }
  
        let address = client.get("fiscalAddress");
        if(address && address.zip)
          invoice.set('serviceZip', address.zip);
        if(client.get('notes'))
          invoice.set('notes', client.get('notes'));
  
        invoice.set('items', items);
        invoice.set('tags', tags);
  
        let usoCFDI = "G03";
  
        if(client.get("usoCFDI"))
          usoCFDI = client.get('usoCFDI');
  
        invoice.set('usoCFDI', usoCFDI);
  
  
        invoice.save().then(function(){
          return delay(300);
        }).then(function(){
          parse_promise.resolve(false);
        },function(){
          parse_promise.resolve(false);
        });
        // console.log('')
      });
    }else{
      asyncEach(services, function(service, i, next){
        let tags =[];
        let rating = service.get("rating");
        let allowedRating = ["Active", "Reactivate", "Overdue Payment", "Suspended Service - Force Term Agreement"];
        let subtotal = service.get('amount');
        if(subtotal > 0 && allowedRating.includes(rating)){
          let amount = parseFloat((subtotal*1.16).toFixed(2));
  
          let Invoice = Parse.Object.extend("Invoice");
          let invoice = new Invoice();
          let notes = service.get('notes');
          let serviceZip = service.get('serviceZip');
          let location = service.get('location');
          let potentialId = service.get("zohoId");
          potentialId = potentialId? potentialId:"N/A";
  
  
          let localId = "KI-GEN";
          let description = "Servicio de Internet Kiwi Networks";
  
          let serviceRequested1 = service.get('serviceRequested1');
          if(serviceRequested1)
            serviceRequested1 = serviceRequested1.toLowerCase();
          let serviceRequested2 = service.get('serviceRequested2');
          if(serviceRequested2)
            serviceRequested2 = serviceRequested2.toLowerCase();
  
          /*reglas*/
  
          if(serviceRequested2 && servicesCatalog[serviceRequested2]){
            localId = servicesCatalog[serviceRequested2].localId;
            description = servicesCatalog[serviceRequested2].description;
          }
          else{
  
            if(serviceRequested1 && servicesCatalog[serviceRequested1]){
              localId = servicesCatalog[serviceRequested1].localId;
              description = servicesCatalog[serviceRequested1].description;
            }
          }
  
          if(notes)
            description = description +" - "+notes;
  
          let location = service.get("location");
          if(location)
            location = location.toUpperCase();
          else
            location =  "N/A";
  
          let items = [{
                        "claveSAT":"81112100",
                        "claveLocal": localId,
                        "cantidad": "1",
                        "claveUnidad": "E48",
                        "unidad":"Servicio",
                        "descripcion": description,
                        "valorUnitario": subtotal, 
                        "totalE": amount,
                        "location": location
                      }];
          if(potentialId){
            tags.push(potentialId);
            items[0].potentialId =  potentialId;
          }
  
          let emails = [];
          if(service.get("invoiceEmail") && service.get("invoiceEmail").length > 0){
            emails = service.get("invoiceEmail");
          }else{
            let email = client.get('email');
            let ccInvoice = client.get('ccInvoice');
            if(email)
              emails.push(email);
            if(ccInvoice && ccInvoice.length > 0){
              emails = emails.concat(ccInvoice);
            }
          }
  
          let usoCFDI = "G03";
  
          if(service.get('usoCFDI')){
            usoCFDI = service.get("usoCFDI");
          }
          else{
            if(client.get('usoCFDI'))
              usoCFDI = client.get('usoCFDI');
          }
  
  
          invoice.set('emails', emails);
          invoice.set('subtotal', subtotal);
          invoice.set('client', client);
          invoice.set('applyAdvance', true);
          invoice.set('applyOutcome', false);
          invoice.set('paid', false);
          invoice.set('imp5Millar', imp5Millar);
          invoice.set('notes', notes);
          invoice.set('serviceZip', serviceZip);
          invoice.set('location', location);
          invoice.set('items', items);
          invoice.set('usoCFDI', usoCFDI);
          invoice.set('tags', tags);

          if(details){
            if(details.dueDate)
              invoice.set('dueDate', details.dueDate);
            if(details.range)
              invoice.set('range', details.range);
          }
  
          
  
          invoice.save().then(function(){
            return delay(300);
          }).then(function(){
              next();
          },function(err){
              console.log(err)
              next();
          });
        }else{
          next();
        } 
      },function(){
        parse_promise.resolve(false);
      });
    }
  
    return parse_promise.promise;
  }

let loopClients = function(skip, limit, details){
    let Client = Parse.Object.extend("Client");
    let query = new Parse.Query(Client);
    query.equalTo('invoice', true);
    query.ascending("createdAt");
    if(details && details.invoicingType){
      if(details.invoicingType == "inAdvance"){
        query.equalTo('inAdvance', true); 
      }
      else if(details.invoicingType == "prepaid"){
        query.equalTo('prepaid', true);
        query.equalTo('inAdvance', false);
      }else if(details.invoicingType == "postpaid"){
        query.equalTo('prepaid', false);
        query.equalTo('inAdvance', false);
      }else{
        console.log("Invalid invoice process");
        return;
      }
    }
  

    query.skip(skip);
    query.limit(limit);
    
    let deferred = q.defer();
    query.find().then(function(clients){
      if(clients && clients.length > 0){
        skip += limit;
  
        asyncEach(clients, function(client, i, next){
            console.log(i+(skip-limit));
            console.log(client.get('name'))
            console.log(client.get('clientId'))
            console.log(client.id)
          if(i+(skip-limit) <= 1066){
            let serviceGroup = client.get('serviceGroup');
            let Service = Parse.Object.extend("Service");
            let query = new Parse.Query(Service);
            query.equalTo('client',client);
            query.equalTo('invoice',true);
            query.find().then(function(services){
              console.log(services.length);
              if(services){
                // services = services;
                return delay(300).then(function(){
                  return createInvoices(serviceGroup, services, client, details);
                });
              }else{
                let parse_promise = q.defer();
                parse_promise.resolve(false);
                return parse_promise.promise;
              }
            }).then(function(res){
              return delay(300);
            }).then(function(){
              next();
            },function(err){
              console.log(err);
              next();
            });
          }else{
            console.log("No facturado...")
            next();
          }
        },function(){
          loopClients(skip, limit, details).then(function(res){
            deferred.resolve(res);
          },function(err){
            console.log(err);
            deferred.resolve(err);
          });
        })
      }else{
        deferred.resolve('done');
      }
    });
  
    return deferred.promise;
  }


let skip = 0;
let limit = 100;

loopClients(skip, limit, details).then(function(res){
    console.log(res);
}, function(err){
    console.log(err);
})