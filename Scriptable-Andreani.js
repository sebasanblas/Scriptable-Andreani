// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: truck;

// Autor: @sebasanblas
// Fecha: 21/04/2021
// Descripción: Widget para ver el estado del paquete, entregado por Andreani. 

/**************
Version 1.0.0

Changelog:
    v1.0.0:
            - Versión inicial

IMPORTANTE: este widget fue elaborado con fines totalmente didácticos, no comerciales.
No hay una intencionalidad de perjudicar a Andreani. La empresa no participó en ninguna 
instancia del proceso. Es un proyecto individual.
**************/

const sin_numero = "No hay número de seguimiento";

if (!args.widgetParameter) {
    numero_seguimiento = sin_numero
} else {
    numero_seguimiento = args.widgetParameter
}

let widget = new ListWidget();
await createWidget();
Script.setWidget(widget);
Script.complete();

if (config.runsInApp) {
    widget.presentSmall();
  }

async function createWidget(items) {

// Gradiente de fondo
let gradient = new LinearGradient();
gradient.locations = [0, 1];
gradient.colors = [
  new Color("#e4e4e4")
]
widget.backgroundGradient = gradient

// Título
var header_stack = widget.addStack();
header_stack.centerAlignContent();
header_stack.addSpacer();
var title = header_stack.addText("Andreani");
title.font = Font.boldRoundedSystemFont(15);
title.textColor = new Color ("#D71920");
header_stack.addSpacer();
var symbol = SFSymbol.named('cube.box').image;  
header_stack.centerAlignContent()
var symbol_image = header_stack.addImage(symbol);
symbol_image.imageSize = new Size(20,20);
symbol_image.tintColor = new Color ("#D71920");
header_stack.addSpacer();

// Space
var space_1 = widget.addStack();
var space_1_space = space_1.addText("");

// Estado
var estado = widget.addStack();
estado.centerAlignContent();
estado.addSpacer();
var estado_title = estado.addText("Estado");
estado_title.font = Font.boldRoundedSystemFont(8);
estado_title.textColor = Color.black();
estado.addSpacer();

//Valor
var valor = widget.addStack();
valor.centerAlignContent();
valor.addSpacer();
const valor_value = (await status(numero_seguimiento));
let valor_txt = valor.addText(valor_value);
valor_txt.textColor =  new Color("#D71920");
valor_txt.font = Font.boldMonospacedSystemFont(11);
valor.addSpacer();

// Space
var space_2 = widget.addStack();
var space_2_space = space_2.addText("");

//Valor
var valor_trazas = widget.addStack();
valor_trazas.centerAlignContent();
valor_trazas.addStack();
const valor_trazas_value = (await status_trazas(numero_seguimiento));
let valor_trazas_txt = valor_trazas.addText(valor_trazas_value);
valor_trazas_txt.textColor =  new Color("#D71920");
valor_trazas_txt.font = Font.boldMonospacedSystemFont(7);
valor_trazas.addStack();

// Space
var space_3 = widget.addStack();
var space_3_space = space_3.addText("");

//Fecha
var fecha = widget.addStack();
fecha.centerAlignContent();
fecha.addSpacer();
const fecha_value = ((await fecha_fc(numero_seguimiento)).dia) + " - " + ((await fecha_fc(numero_seguimiento)).hora);
let fecha_txt = fecha.addText(fecha_value);
fecha_txt.textColor =  new Color("#000000");
fecha_txt.font = Font.boldMonospacedSystemFont(8);
fecha.addSpacer();

// Return
return widget;

}

// Funciones
async function status(item){

  if (item === sin_numero) {
    return item;
  } else {
    let url = `https://apidestinatarios.andreani.com/api/envios/${item}`

    let API__URL = url ;
  
    let API__REQ = new Request(API__URL);
    
    let API__RES = await API__REQ.loadJSON();
  
    return API__RES.estado;
  }

}

async function status_trazas(item){
  if (item === sin_numero) {
    return item;
  } else {
    let url = `https://apidestinatarios.andreani.com/api/envios/${item}/trazas`

    let API__URL = url ;
  
    let API__REQ = new Request(API__URL);
    
    let API__RES = await API__REQ.loadJSON();
  
    return API__RES[0].estado;
  }

}

async function fecha_fc(item){

  if (item === sin_numero) {
    return item;
  } else {
    let url = `https://apidestinatarios.andreani.com/api/envios/${item}/trazas`

    let API__URL = url ;
  
    let API__REQ = new Request(API__URL);
    
    let API__RES = await API__REQ.loadJSON();
  
    return API__RES[0].fecha;
  }

}