bugLow 1.02
==========
Fácil instalación y configuración
---------------------------------
Es muy fácil de instalar y configurar. Basta con incluir la librería en el HEAD de la página y una única instrucción:

Captura de pantalla
-------------------
![ScreenShot](https://github.com/islavisual/dataList/blob/master/screenshot.png)

```html
<script src="js/buglow/buglow-min.js"></script>
```

```javascript
// Para depurar a través de consola
bugLow.init('console');
// Para depurar en una ventana externa
bugLow.init('window');
```

Depuración selectiva
--------------------
BugLow permite depurar selectivamente atributos, tags y eventos de manera independiente o combinada. La forma de especificar qué observar o no es a través de un array de valores que, para los ATRIBUTOS, sería:

```javascript
// Depurar todos
bugLow.mutationAttributesFilter = [];
// Depurar sólo cellspacing y cellspadding
bugLow.mutationAttributesFilter = ['cellspacing', 'cellspadding'];
// No depurar style, class, id y src... el resto si.
bugLow.mutationNotObserverAttributesFilter = ['style', 'class', 'id','src'];
```
Por defecto, <b>attributeFilter</b> esta definido a vacío y <b>excludedAttributeFilter</b> está definido a sólo el atributo <b>style</b>.

Para los TAGS, al igual que los atributos, se pueden especificar uno o varios, todos o ninguno:

```javascript
// Depurar todos
bugLow.selectorFilter = [];
// Depurar sólo cellspacing y cellspadding
bugLow.selectorFilter = ['INPUT', 'SELECT', 'BUTTON'];
// No depurar style, class, id y src... el resto si.
bugLow.excludedSelectorFilter = ['DIV', 'SPAN', 'NAV','LEGEND'];
```
Por defecto, Las propiedades de <b>selectorFilter</b> y <b>excludedSelectorFilter</b> están definidos a vacíos.</p>
Para los EVENTOS, se pueden especificar uno a uno los que se desean observar:</p>

```javascript
// Depurar los ya predefinidos
bugLow.eventsFilter = [];
// Depurar sólo el evento change.
bugLow.eventsFilter = ['change'];
```
La lista de eventos permitidos son, que ya los conocéis todos, <a target="_blank" href="http://api.jquery.com/click/">click</a>, <a target="_blank" href="http://api.jquery.com/mouseover/">mouseover</a>, <a target="_blank" href="http://api.jquery.com/mouseout/">mouseout</a>, <a target="_blank" href="http://api.jquery.com/mouseenter/">mouseenter</a>, <a target="_blank" href="http://api.jquery.com/mouseleave/">mouseleave</a>, <a target="_blank" href="http://api.jquery.com/keydown/">keydown</a>, <a target="_blank" href="http://api.jquery.com/keyup/">keyup</a>, <a target="_blank" href="http://api.jquery.com/keypress/">keypress</a>, <a target="_blank" href="http://api.jquery.com/change/">change</a>, <a target="_blank" href="http://api.jquery.com/focusin/">focusin</a>, <a target="_blank" href="http://api.jquery.com/focusout/">focusout</a>, <a target="_blank" href="http://api.jquery.com/focus/">focus</a> y <a target="_blank" href="http://api.jquery.com/blur/">blur</a> como los definidos en jQuery y JavaScript y, como añadidos, <b>add</b> y <b>remove</b> que, lo que hacen es monitorizar cuando los elementos añaden o eliminan uno o varios hijos.

Por defecto, si el parámetro <b>eventFilter</b> se deja vacío se observarán los eventos de <b>change</b>, <b>click</b>, <b>focusin</b>, <b>focusout</b>, <b>keydown</b>. En lo referente a eventos de teclado yo siempre recomiendo utilizar <b>keydown</b> porque permite controlar las teclas de Ctrl, Alt y Shift (mayúsculas).

Funcionalidad de Deshacer y Rehacer
-----------------------------------
BugLow provee de la lógica necesaria para gestionar de todas las modificaciones que se realizan sobre los campos de texto y desplegables incluso, aunque se recargue la página, por lo que es muy sencillo recuperar los valores anteriores. Sólo se requiere que el elemento tenga el atributo ID definido. Los métodos a utilizar son <b>historyBack</b> para realizar la funcionalidad de UNDO y <b>historyForward</b> para realizar la funcionalidad de REDO.

Un código de ejemplo de como realizar las acciones de UNDO o REDO sería:

```javascript
// Activar la funcionalidad UNDO / REDO
bugLow.enableUndo = true;

$('#idElement').keydown(function(e){
    if ( (e.which == 121 || e.which == 89) && e.ctrlKey ) {
        // Redo
        bugLow.historyForward(e.target.id);
        return false;

    } else if ( (e.which == 122 || e.which == 90) && e.ctrlKey ) {
        // Undo
        bugLow.historyBack(e.target.id);
        return false;
    }
});
```

Histórico Exportable
--------------------
Es fácilmente exportable a fichero ya que se puede guardar como una página web más, desde la ventana externa o, a través de la función <b>getHistory</b> que devuelve la historia en formato cadena (String). Para utilizar esta característica sólo se debe activar y llamar a la función de importación.

```javascript
// Activar el histórico (normalmente, establecido conjuntamente con el método init()) 
bugLow.enableHistory = true;

// ....
// ... Aciones ...
// ....

// Recuperar el histórico hasta el momento en un string
bugLow.getHistory();
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

Parámetros por URL
------------------
BugLow puede configurarse a través de los parámetros de la URL. A continuación se muestran el listado de parámetros configurables a través de la URL. Se pueden utilizar tanto las abreviaturas como los nombres largos.</p>
<table>
    <thead>
    <tr>
        <th>Parámetro abreviado</th>
        <th>Equivale a</th>
    </tr>
    </thead>
    <tbody>
    <tr><td><strong>af</strong></td><td>attributeFilter</td></tr>
    <tr><td><strong>eaf</strong></td><td>excludedAttributeFilter</td></tr>
    <tr><td><strong>sf</strong></td><td>selectorFilter</td></tr>
    <tr><td><strong>esf</strong></td><td>excludedSelectorFilter</td></tr>
    <tr><td><strong>ef</strong></td><td>eventFilter</td></tr>
    <tr><td><strong>h</strong></td><td>enableHistory</td></tr>
    <tr><td><strong>u</strong></td><td>enableUndo</td></tr>
    <tr><td><strong>m</strong></td><td>mode ('default' o 'all')</td></tr>
    <tr><td><strong>t</strong></td><td>target ('console' o 'window')</td></tr>
    </tbody>
</table>

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
    background:"#000000",           // Fondo de la ventana de BUGLOW
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

Para más información sobre diseño y desarrollo web visita <a target="_blank"  href="http://www.islavisual.com/articulos/desarrollo_web/">islavisual.com</a>.
