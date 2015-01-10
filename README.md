bugLog 1.0
==========
Fácil instalación y configuración
---------------------------------
Es muy fácil de instalar y configurar. Basta con incluir la librería en el HEAD de la página y una única instrucción:

```html
<script src="js/buglog/buglog-min.js"></script>
```

```javascript
bugLog.init('default', 'console');  // Para depurar a través de consola
bugLog.init('all', 'window');       // Para depurar en una ventana externa
```

Para configurarlo en modo NORMAL o por defecto, como primer parámetro, establecemos el valor <b>default</b>. Para configurarlo en modo FULL o por completo, como primer parámetro, establecemos el valor <b>all</b>.

Depuración selectiva
--------------------
Permite depurar todos,sólo algunos atributos de los elementos, o no depurar determinados elementos de forma muy simple.

```javascript
// Depurar todos
bugLog.mutationAttributesFilter = [];
// Depurar sólo cellspacing y cellspadding
bugLog.mutationAttributesFilter = ['cellspacing', 'cellspadding'];
// No depurar style, class, id y src... el resto si.
bugLog.mutationNotObserverAttributesFilter = ['style', 'class', 'id','src'];
```

Funcionalidad de Deshacer y Rehacer
-----------------------------------
Tiene provee de la lógica necesaria para gestionar de todas las modificaciones que se realizan sobre los campos de texto y desplegables, es decir, que guarda los cambios aunque se recargue la página, por lo que es muy sencillo recuperar los valores antetiores. Sólo se requiere que el elemento tenga el atributo ID definido. Los métodos a utilizar son <b>historyBack</b> para realizar la funcionalidad de UNDO y <b>historyForward</b> para realizar la funcionalidad de REDO.

Un código de ejemplo de como realizar las acciones de UNDO o REDO sería:

```javascript
// Activar la funcionalidad UNDO / REDO
bugLog.enableUndo = true;

$('#idElement').keydown(function(e){
    if ( (e.which == 121 || e.which == 89) && e.ctrlKey ) {
        // Redo
        bugLog.historyForward(e.target.id);
        return false;

    } else if ( (e.which == 122 || e.which == 90) && e.ctrlKey ) {
        // Undo
        bugLog.historyBack(e.target.id);
        return false;
    }
});
```

Histórico Exportable
--------------------
Es fácilmente exportable a fichero ya que se puede guardar como una página web más o a través de la función <b>getHistory</b> que devuelve la historia en formato cadena (String). Para utilizar esta característica sólo se debe activar y llamar a la función de importación.

```javascript
// Activar el histórico
bugLog.enableHistory = true;

// ....
// ... Aciones ...
// ....

// Recuperar el histórico hasta el momento en un string
bugLog.getHistory();
```

Descripciones con selectores de CSS
-----------------------------------
Permite ver, de forma fácil, los elementos que han sido modificados a través de selectores absolutos. Luego estos selectores se puede utilizar para definir nuevas modificaciones en las hojas de estilo CSS. Por ejemplo:

```html
<i>BODY > HEADER > NAV.navbar > DIV.container > DIV.navbar-header > A.navbar-brand > #logo_menu</i>
```

Control de Ajax
---------------
Permite tener un control total sobre todas las llamadas a URL internas y externas de jQuery y Ajax. Controla los eventos de <b>beforeSend</b>, <b>success</b>, <b>complete</b> y <b>error</b>.

Control sobre el Teclado
------------------------
Se puede saber qué combinación de teclas se ha pulsado en todo momento y en qué elemento incluyendo los códigos de tecla. Con esta información luego podemos hacer filtrados como, por ejemplo, INPUTS que permitan únicamente números. Por ejemplo:

```css
Keyboard event received into BODY > DIV.wrapper > SECTION.articles > DIV.container > ARTICLE > #inputText element.
Keys Combination: "Ctrl + X". Keys Combination Code: "17 + 88".
```

Mensajes personalizables
------------------------
Se puede definir mensajes personalizados para cada tipo de evento o mutación.
```javascript
messages:{
    ajaxBeforeSend:'Processing request. Method: &lt;method>. Type: &lt;type>. CrossDomain: &lt;crossDomain>.  File: &lt;url>. Content Type: &lt;contentType>',
    ajaxComplete:'The Ajax processing request FINISHED for the &lt;url> file.',
    ajaxSuccess:'The Ajax request was completed SUCCESSFULLY for the &lt;url> file.',
    ajaxError:'An error occurred into Ajax processing request into &lt;url> file.',
    beforeUnloadPage:'Page request unload',
    unloadPage:'Unloaded page',
    errorPage:'An error occurred into file',
    parsedPage:'Page loaded and parsed.',
    pageChangedStatus:'Page changed status:',
    valueChanged: 'The &lt;selector> changed the value property to &lt;value>.',
    getsFocus: '&lt;selector> gets focus.',
    losesFocus: '&lt;selector> loses focus.',
    click: 'User clicks into &lt;selector>.',
    attributeMutation: 'The &lt;attributeName> attribute has mutated from "&lt;oldValue>" to "&lt;value>" into &lt;selector> element.',
    addedChildren: 'Added children into &lt;selector> element. Total children: &lt;totalChildren>',
    removedChildren: 'Removed children into &lt;selector> element. Total children: &lt;totalChildren>',
    mouseOver: 'The mouse pointer is over the &lt;selector> element.',
    mouseOut: 'The mouse pointer leaves the &lt;selector> element.',
    keyPress: 'Keyboard event received into &lt;selector> element. Keys Combination: "&lt;keys>". Keys Combination Code: "&lt;keysCode>".',
    separator: '&lt;div style="border: 1px solid #333; border-width: 0px 0px 1px 0px; height:5px; width:100%;margin-bottom: 5px;">&nbsp;&lt;/div>'
}
```

Colores personalizables
-----------------------
Se pueden definir distintos colores para cads evento o mutación.
```javascript
colors: {
    added:"#709050",                // Para elementos añadidos en el DOM
    attributeChanged: '#ff00ff',    // Para cambios en attributos en el DOM
    background:"#000000",           // Fondo de la ventana de BUGLOG
    blur:"#907080",                 // Para eventos Blur
    focus:"#9070a0",                // Para eventos Focus
    click:"#909090",                // Para eventos Click
    mouseOver:"#a07090",            // Para eventos Mouse Over
    mouseOut:"#807090",             // Para eventos Mouse Out
    keyPress:"#80a090",             // Para eventos Keypress
    error: '#a02020',               // Para los errores detectados
    headerForeground:"#ffffff",     // Texto de la Cabecera
    headerBackground:"#333",        // Fondo de la Cabecera
    normal:"#606060",               // Para cambios estándar y no registrados
    proccessing:"#8AC007",          // Para Ajax en modo Procesando
    readyState:"#8AC007",           // Para cambios de estado de los Ajax
    removed: "#a01010",             // Para elementos eliminados en el DOM
    sending:"#8AC007",              // Para Ajax en modo Enviando
    updated:"#80a0e0",              // Para Ajax en modo Actualizando
    valueChanged:"#FE2466"          // Para cambios en los atributos value
}</code>
```
