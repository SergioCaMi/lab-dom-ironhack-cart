Aquí tienes la traducción del archivo MD:

![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | Carrito de Ironhack

![giphy (2)](https://user-images.githubusercontent.com/76580/167435963-34b5ddf0-e318-446a-b59f-2edeed3eb030.gif)

<details>
  <summary>
   <h2>Objetivos de Aprendizaje</h2>
  </summary>

   Este ejercicio te permite practicar y aplicar los conceptos y técnicas enseñados en clase.

  Al completar este ejercicio, podrás:

- Seleccionar elementos HTML usando métodos y propiedades del DOM

  > `querySelector()`, `querySelectorAll()`, `getElementsByClassName()`, `getElementById()`, `element.currentTarget`, `element.parentNode`

- Acceder y modificar *el contenido de los elementos HTML* usando propiedades de elementos HTML

  > `element.textContent`, `element.innerHTML`

- Agregar o eliminar *elementos HTML* del DOM usando métodos del DOM de JavaScript

  > `document.createElement()`, `element.append()` , `element.appendChild()`, `element.removeChild()`

- Agregar o eliminar *escuchadores de eventos* para responder a las acciones del usuario, como clics en botones

  > `element.addEventListener()`, `element.removeEventListener()`

- Pasar funciones como argumentos a otras funciones (callbacks)

- Iterar sobre *listas de elementos HTML* y realizar acciones en cada uno, como acceder a valores, agregar o eliminar eventos, etc.

- Acceder y modificar propiedades, valores y atributos de elementos HTML

  > `element.setAttribute()`, `element.getAttribute()`, `element.classList.add()`, `element.classList.remove()`, `classList`, `style`, `value`, `type`

  <br>
  <hr>

</details>

## Introducción

El comercio electrónico ha demostrado ser un gran cambio en la economía del siglo XXI. Como uno de los canales de ventas más grandes, solo superado por el comercio minorista físico, se espera que el comercio electrónico sea responsable de 6.3 billones de USD en ventas mundiales para el año 2024.

El comercio electrónico es un negocio altamente competitivo, y construir una experiencia de usuario positiva es crucial para retener a los clientes y mejorar las conversiones. Como resultado, es común que las empresas inviertan significativamente en optimizar el flujo de compra en sus plataformas de comercio electrónico.

Uno de los componentes más significativos de esta experiencia es **el carrito de compras**.

En este laboratorio, construiremos el **IronCart**, un carrito de compras para la tienda de merchandising no oficial de Ironhack. Los visitantes deben poder agregar y eliminar productos del carrito de compras y modificar la cantidad (cantidad) de artículos que desean comprar. Además, los usuarios deben poder ver los precios subtotales y totales de los artículos que han agregado.

## Requisitos

- Haz un fork de este repositorio.
- Clónalo en tu máquina.

## Envío

- Una vez completado, ejecuta los siguientes comandos:

```bash
git add .
git commit -m "Lab resuelto"
git push origin master
```

- Crea una Pull Request para que tus TAs puedan revisar tu trabajo.

## Instrucciones

Harás la mayor parte de tu trabajo en el archivo `src/index.js`. Hemos agregado el marcado inicial en `index.html` y algunos estilos básicos. Durante el desarrollo, asegúrate de usar los mismos nombres de clases que ya se usan (y están disponibles en el archivo CSS) para que nuestro carrito de compras quede limpio y ordenado.

¡Vamos!

<br>

### Iteración 1: `updateSubtotal`

Abre el archivo `index.html` en tu navegador. Como puedes ver, solo hay una fila en la tabla que representa un producto. En esta primera iteración, te enfocarás solo en ese producto, y más adelante te ayudaremos a pensar en formas de actualizar para tener múltiples productos.

Echemos un vistazo al código HTML proporcionado. Tenemos la **etiqueta de tabla con el id `#cart`**, como se muestra a continuación:

```html
<table id="cart">
  <thead>
    <tr>
      <th>Nombre del Producto</th>
      <th>Precio Unitario</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
      <th>Acción</th>
    </tr>
  </thead>
  <tbody>
    <tr class="product">
      <!-- ... -->
    </tr>
  </tbody>
  <!-- ... -->
</table>
```

<br>

![](https://i.imgur.com/zCWQYg2.png)

<br>

El único producto que actualmente tenemos en nuestro `#cart` está colocado en la fila `tr` con la clase `product` (**que va dentro de `tbody`**):

```html
<tr class="product">
  <td class="name">
    <span>Pato de Hule Ironhack</span>
  </td>
  <td class="price">$<span>25.00</span></td>
  <td class="quantity">
    <input type="number" value="0" min="0" placeholder="Cantidad" />
  </td>
  <td class="subtotal">$<span>0</span></td>
  <td class="action">
    <button class="btn btn-remove">Eliminar</button>
  </td>
</tr>
```

El producto tiene un **precio** y una **cantidad** (donde la cantidad representa cuántos artículos de un producto específico ha agregado un usuario al carrito). En el código proporcionado, vemos que también hay un **precio subtotal**. El precio subtotal será el resultado de la *multiplicación* de esos valores.

Tu objetivo es calcular el precio subtotal, pero abordémoslo gradualmente. Desglosémoslo en un par de pasos:

- **Paso 0**: En este paso, nuestro objetivo es ayudarte a entender el código proporcionado en `src/index.js`. Gracias al código proporcionado, el botón `Calcular Precios` ya tiene alguna funcionalidad. Usando la manipulación del DOM, obtuvimos el elemento con el `id="calculate"` y le agregamos un escuchador de eventos `click`. Este botón ejecutará la función `calculateAll()` cuando se haga clic. El siguiente fragmento de código hace exactamente lo que explicamos:

```javascript
// src/index.js

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
});
```

No te confundas con el método [.addEventListener()](https://www.w3schools.com/jsref/met_document_addeventlistener.asp), hace exactamente lo mismo que [onclick()](https://www.w3schools.com/tags/ev_onclick.asp), con algunas diferencias sobre las cuales puedes encontrar más [aquí](https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick). En este laboratorio, puedes usar cualquiera de los métodos que prefieras.

Ok, pasemos a la función `calculateAll()`. Usamos `querySelector` en esta función para obtener el primer (y actualmente el único) elemento DOM con la clase `product`. Este elemento (que guardamos en la variable llamada `singleProduct`) se pasa como argumento a la función `updateSubtotal()`. Como puedes encontrar en los comentarios, el fragmento de código proporcionado se usa solo para fines de prueba dentro de la iteración 1.

```js
function calculateAll() {
  // el código en las siguientes dos líneas se agrega solo para fines de prueba.
  // se ejecuta cuando solo se completa la iteración 1. en un punto posterior, se puede eliminar.
  const singleProduct = document.querySelector('.product');
  updateSubtotal(singleProduct);
  // fin de la prueba

  // ITERACIÓN 2
  //...
  // ITERACIÓN 3
  //...
}
```

Y finalmente, comenzamos la función `updateSubtotal(product)`. Por ahora, esta función solo está alertando `Calculate Prices clicked!` cuando se hace clic en el botón *Calcular Precios*.

<br>

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_e50868b669d962f3ddb26802e5a16638.gif)

<br>

Comencemos:

- **Paso 1**: Dentro de `updateSubtotal()`, crea dos variables (sugerimos nombrarlas `price` y `quantity`) y usa tus recién adquiridas habilidades de manipulación del DOM para OBTENER los elementos DOM que contienen el precio y la cantidad. Para darte un impulso, podrías usar el siguiente código para obtener el elemento DOM que contiene el `price`:

```js
// src/index.js
function updateSubtotal(product) {
  const price = product.querySelector('.price span');
  // ... tu código va aquí
}
```

- **Paso 2**: Ahora, cuando hayas obtenido los elementos DOM mencionados anteriormente, tu siguiente paso debería ser extraer los valores específicos de ellos. *Pista*: tal vez `innerHTML` te suene familiar. En caso de que te interese encontrar otras formas de lograr el mismo resultado, puedes comenzar verificando [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) y [`innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) en Google. Además, puedes extraer el valor de un input accediendo a la [propiedad `value` del elemento de entrada](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). Sin embargo, no te distraigas aquí, que esto sea tu *lectura adicional* cuando completes el laboratorio.

- **Paso 3**: Usa los valores que extrajiste de los elementos DOM mencionados anteriormente para calcular el precio subtotal. Puedes crear una nueva variable, y su valor será igual al producto de estos valores. Ej. Si un usuario eligió 3 Patos de Hule Ironhack, debería ver que el subtotal es de 75 dólares ($25 \* 3 = $75).

- **Paso 4**: Ahora, cuando te estás convirtiendo en un ninja de la manipulación del DOM, usa tus habilidades una vez más para obtener el elemento DOM que debe contener el subtotal. *Pista*: es el elemento con la clase `subtotal`.

- **Paso 5**: En el paso 3, calculaste el precio subtotal, y en el paso 4, obtuviste el elemento DOM que debería haber mostrado este precio. En este paso, tu objetivo es establecer el precio subtotal en el elemento DOM correspondiente. Además, asegúrate de que esta función devuelva el valor del subtotal para que puedas usarlo más tarde cuando sea necesario.

En esta iteración, has completado la creación de la función `updateSubtotal` que **calcula el subtotal** para este producto específico, **actualiza el valor subtotal** para ese mismo producto en el DOM y devuelve el **valor subtotal**.

Como un solo argumento, la función debe tomar un **nodo DOM** que corresponde a un solo elemento `tr` con una clase `product`. En el código de ejemplo incluido, lo llamamos `product`.

```js
function updateSubtotal(product) {
  // ...
}
```

:bulb: *Pista*: Asegúrate de que tu función `calculateAll()` tenga el código de prueba que mencionamos anteriormente. Si el código está en su lugar después de que hayas completado con éxito la función `updateSubtotal()`, deberías ver las actualizaciones correspondientes en el campo `Subtotal` de la tabla.

Consulta [aquí](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_30b87c596b79954f63b3482d2f320fe4.gif) el resultado esperado.

<hr>

### Iteración 2: `calculateAll()`

Nuestro código actual funciona perfectamente para un producto, pero esperamos tener más de un producto en nuestro carrito. Como tal, usaremos `calculateAll` para activar la actualización de subtotales para cada producto.

Completa la función llamada `calculateAll()`. Su propósito es llamar a la función `updateSubtotal` con cada nodo DOM `tr.product` en la tabla `#cart`.

Para comenzar, elimina o comenta el código existente dentro de `calculateAll()` (el código que usamos para fines de prueba). También, agreguemos un nuevo producto a nuestro archivo `index.html`. Duplica la fila `tr` con la clase `product`, renombra el producto dentro y cambia el precio del producto.

![](https://i.imgur.com/Pv4NmR8.png)

:bulb: *Pista*: Comienza obteniendo los nodos DOM para cada fila de producto. Actualmente, tenemos dos productos; por lo tanto, tenemos dos filas con la clase `product`. Tal vez usar [getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) podría servir bien aquí.

```js
function calculateAll() {
  // ...
}
```

El resultado final debería verse así:

<br>

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_0efb56fc0e5717469417e806fa7cde12.gif)

<hr>

### Iteración 3: Total

Nuestra funcionalidad de cálculo aún está incompleta. El subtotal para cada producto se está actualizando, pero el valor total permanece sin cambios.

Al final de la función `calculateAll()`, reutiliza el valor total que acabas de calcular en la iteración anterior y actualiza el elemento DOM correspondiente. Calcula el precio total de los productos en tu carrito sumando todos los subtotales devueltos por `updateSubtotal()` cuando se llamó con cada producto.

Finalmente, muestra ese valor en tu DOM.

<br>

![](https://i.imgur.com/SCtdzMd.png)

<hr>

## Iteraciones de Bonificación

### Iteración 4: Eliminar un producto

Los usuarios deben poder eliminar productos de sus carritos. Para este propósito, cada fila de producto en nuestra tabla tiene un botón "Eliminar" al final.

Pero intentemos resolver nuestro problema paso a paso. Dentro de la función existente que estás pasando a `window.addEventListener()`, comienza consultando el documento para todos los botones "Eliminar", itera a través de ellos y agrega un escuchador de eventos `click` a cada uno, pasando una función nombrada `removeProduct` como el argumento de devolución de llamada. Si necesitas una pista sobre cómo hacerlo, mira cómo lo hicimos agregando un escuchador de eventos en el `calculatePricesBtn`.

Ya declaramos `removeProduct(event)` y agregamos algo de código inicial. Después de terminar de consultar los botones de eliminar y agregar el escuchador de eventos `click` a ellos, abre la consola y haz clic en cualquier botón `Eliminar`.

Como podemos ver, `removeProduct(event)` espera el evento como un solo argumento, y eso va a activar la eliminación del producto correspondiente del carrito.

:bulb: Consejo: Para acceder al elemento en el que se activó un evento, puedes hacer referencia a `event.currentTarget`. Para eliminar un nodo del DOM, necesitas acceder a su nodo padre y llamar a [`removeChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) en él. Puedes acceder al padre de un nodo DOM desde su propiedad `parentNode`.

Asegúrate de que el precio se actualice cuando elimines productos del carrito de compras.

Haz clic [aquí](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_17b1e9e4d2606239163dddbc5b2a3d9f.gif) para ver el resultado esperado.

<hr>

### Iteración 5: Crear nuevos productos

Para terminar, permitiremos a los usuarios agregar un producto personalizado a su carrito.

Descomenta el elemento `tfoot` y sus hijos del archivo `index.html`:

```html
<table>
  <tbody>
    <!-- ... -->
  </tbody>
  <!-- <tfoot>
    <tr class="create-product">
      <td>
        <input type="text" placeholder="Nombre del Producto" />
      </td>
      <td>
        <input type="number" min="0" value="0" placeholder="Precio del Producto" />
      </td>
      <td></td>
      <td></td>
      <td>
        <button id="create" class="btn">Crear Producto</button>
      </td>
    </tr>
  </tfoot> -->
</table>
```

![](https://i.imgur.com/J8aserm.png)

Los dos inputs dentro de `tfoot` representan el nombre del nuevo producto y el precio unitario, respectivamente. Cuando se active, el botón "Crear Producto" debe agregar un nuevo producto al carrito.

Agrega un manejador de eventos `click` al "Crear Producto" que tomará una función llamada `createProduct` como devolución de llamada.

En `createProduct`, debes seleccionar los nodos DOM de entrada de nombre y precio unitario, extraer sus valores, agregar una nueva fila a la tabla con el nombre del producto y el precio unitario, así como la entrada de cantidad y el botón "Eliminar", y asegurarte de que toda la funcionalidad funcione como se espera.

Recuerda, el nuevo producto debe verse indistinguible y comportarse como cualquiera de los productos previamente incluidos en el carrito. Como tal, uno debe poder calcular su subtotal cuando se hace clic en el botón "Calcular Todo" y eliminar el producto.

Cuando se finalice la creación del producto, por favor, limpia los campos de entrada en el formulario de creación.

Haz clic [aquí](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_00abbd15326ec24d93147196024458f6.gif) para ver el resultado esperado.

<br>

**¡Feliz codificación!** :heart:

## Preguntas Frecuentes

<br>

<details>
  <summary>Estoy atascado en el ejercicio y no sé cómo resolver el problema o por dónde empezar.</summary>
  <br>

  Si estás atascado en tu código y no sabes cómo resolver el problema o por dónde empezar, debes dar un paso atrás e intentar formular una pregunta clara sobre el problema específico que estás enfrentando. Esto te ayudará a reducir el problema y desarrollar posibles soluciones.

  Por ejemplo, ¿es un concepto que no entiendes, o estás recibiendo un mensaje de error que no sabes cómo solucionar? Generalmente, es útil tratar de declarar el problema de la manera más clara posible, incluidos cualquier mensaje de error que estés recibiendo. Esto puede ayudarte a comunicar el problema a otros y posiblemente obtener ayuda de compañeros de clase o recursos en línea.

  Una vez que tengas una comprensión clara del problema, podrás comenzar a trabajar hacia la solución.

  [Volver al inicio](#faqs)
</details>

<details>
  <summary>¿Cómo itero sobre una matriz usando el método <code>forEach()</code>?</summary>
  <br>

  El método `forEach()` ejecuta una función proporcionada una vez para cada elemento de la matriz. No devuelve una nueva matriz, sino que ejecuta la función en cada elemento de la matriz.

  La sintaxis del método `forEach()` es la siguiente:

  ```js
  array.forEach( function(element) {
    // código a ejecutar para cada elemento
  });
  ```

  Aquí tienes un ejemplo que usa el método `forEach()` para registrar cada elemento y su índice en una matriz en la consola:

  ```js
  const fruits = ['apple', 'banana', 'cherry'];

  fruits.forEach( function(element, index) {
    console.log(`${index}: ${element}`);
  });
  ```

  También puedes usar una función de flecha como la función de devolución de llamada para `forEach()`:

  ```js
  fruits.forEach((element, index) => {
    console.log(`${index}: ${element}`);
  });
  ```

  [Volver al inicio](#faqs)
</details>

<details>
  <summary>¿Cómo puedo agregar un nuevo elemento DOM a uno existente?</summary>
  <br>

  Para agregar un nuevo elemento DOM a uno existente en JavaScript, puedes usar el método `appendChild()`.

  **Ejemplo:**

  ```js
  // Obtén el elemento padre
  var parentElement = document.getElementById("parent");

  // Crea el nuevo elemento
  var newElement = document.createElement("p");

  // Establece el contenido de texto del nuevo elemento
  newElement.textContent = "Este es un nuevo párrafo.";

  // Agrega el nuevo elemento al elemento padre
  parentElement.appendChild(newElement);
  ```

  Esto creará un nuevo elemento `p` con el texto `"Este es un nuevo párrafo."` y lo agregará al elemento con el ID `parent`.

[Volver al inicio](#faqs)

</details>

<details>
  <summary>¿Por qué algunos valores de elementos DOM deben convertirse a números cuando ya parecen ser números?</summary>
  <br>

  Esto se debe a que todos los valores en HTML son cadenas y todos los valores de atributos son cadenas. Por lo tanto, los valores de los elementos DOM se devuelven como cadenas incluso si contienen valores numéricos.

  Si deseas usar un valor de un elemento DOM como un número, deberás convertirlo a un tipo de número.

  Aquí tienes un ejemplo de cómo acceder y convertir el valor del elemento `price` a un número usando JavaScript:

  ```js
  // Obtén el elemento de entrada
  const input = item.querySelector('input');

  // Convierte el valor de cadena del elemento de entrada a un número
  const value = Number(input.value);
  ```

  [Volver al inicio](#faqs)

</details>

<details>
  <summary>Sigo obteniendo el resultado <code>NaN</code> en mi programa. ¿Cómo puedo solucionarlo?</summary>
  <br>

  En JavaScript, `NaN` significa "No es un Número". Es un valor especial que representa un problema con una operación numérica o una coerción de tipo fallida. Hay varias razones por las que podrías obtener `NaN` como resultado en tu código JavaScript:

  1. **Dividir un número por `0`**: Cualquier operación que implique dividir un número por `0` (cero) resultará en `NaN`. Ejemplo:

   ```js
   const result = 10 / 0;

   console.log(result); // NaN
   ```

   <br>

  2. **Analizar un número no válido**: Si intentas analizar `undefined` o una cadena que no se puede representar como un número usando las funciones `parseInt()` y `parseFloat()`, obtendrás `NaN` como resultado.
   <br>

   Ejemplo de analizar un valor no válido con `parseInt()`:

   ```js
   const result1 = parseInt("ironhack");
   const result2 = parseInt(undefined);

   console.log(result1); // NaN
   console.log(result2); // NaN
   ```

   <br>Ejemplo de analizar un valor no válido con `parseFloat()`:

   ```js
   const result1 = parseFloat("ironhack");
   const result2 = parseFloat(undefined);

   console.log(result1); // NaN
   console.log(result2); // NaN
   ```

   <br>Ejemplo de analizar un valor no válido con `Number()`:

   ```js
   const result1 = Number("ironhack");
   const result2 = Number(undefined);

   console.log(result1); // NaN
   console.log(result2); // NaN
   ```

   <br>

  Para solucionar el problema `NaN` en tu código, puedes intentar un par de cosas:

  - Verifica si estás intentando dividir un número por `0`.
  - Asegúrate de que las cadenas que estás intentando analizar como números sean representaciones válidas de números. Puedes usar `console.log()` para verificar los valores de tus variables y ver si este es el problema.

  [Volver al inicio](#faqs)

</details>

<details>
  <summary>¿Cómo agrego un escuchador de eventos?</summary>
  <br>

  Usa el método `addEventListener()` para agregar un escuchador de eventos. Este método toma dos argumentos: el *tipo de evento* y la *función de manejador de eventos* que se llamará cuando ocurra el evento.

  Aquí tienes un ejemplo de cómo agregar un escuchador de eventos `click` a un elemento de botón:

  ```js
  const button = document.querySelector('button');

  function handleClick() {
    console.log('Se hizo clic en el botón');
  }

  button.addEventListener('click', handleClick);
  ```

  Esto agregará un escuchador de eventos `click` al elemento `button`, que llamará a la función `handleClick()` cada vez que se haga clic en el botón.

  Para obtener más información, consulta: [MDN - addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

  [Volver al inicio](#faqs)

</details>

<details>
  <summary>¿Cómo elimino un escuchador de eventos?</summary>
  <br>

  Usa el método `removeEventListener()` para eliminar un escuchador de eventos. Este método toma dos argumentos: el *tipo de evento* y la *función de manejador de eventos* que se asignó originalmente al agregar el escuchador de eventos.

  Por ejemplo, supongamos que has agregado el siguiente escuchador de eventos:

  ```js
  button.addEventListener('click', handleClick);
  ```

  Para eliminar este escuchador de eventos, puedes usar el siguiente código:

  ```js
  button.removeEventListener('click', handleClick);
  ```

  Para obtener más información, consulta: [MDN - removeEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

  [Volver al inicio](#faqs)

</details>

<details>
  <summary>¿Por qué obtengo <code>null</code> cuando intento acceder a un elemento HTML?</summary>
  <br>

  Hay un par de razones posibles por las que podrías obtener un valor `null` al intentar acceder a un elemento DOM en JavaScript:

  1. **Estás usando el selector incorrecto o escribiendo mal el nombre**: Asegúrate de estar usando el selector correcto y la ortografía para acceder al elemento. Si estás usando un selector incorrecto o escribiendo mal el nombre, obtendrás un valor `null` cuando intentes acceder al elemento.

  2. **El elemento aún no se ha cargado**: Si intentas acceder a un elemento que aún no se ha cargado en el DOM (por ejemplo, un elemento que se define en un script que se carga al final de la página), obtendrás un valor `null` cuando intentes acceder a él. Puedes solucionar esto envolviendo tu código en un manejador de eventos `window.onload`, que asegurará que el elemento esté disponible antes de que se ejecute tu código:

   ```js
   window.addEventListener("load", function (event) {
     const element = document.querySelector('#my-element');
     // ahora puedes acceder al elemento de manera segura
   };
   ```

  [Volver al inicio](#faqs)

</details>

<details>
  <summary>No puedo enviar cambios al repositorio. ¿Qué debo hacer?</summary>
  <br>

Hay un par de razones posibles por las que podrías no poder *enviar* cambios a un repositorio Git:

1. **No has confirmado tus cambios:** Antes de poder enviar tus cambios al repositorio, debes confirmarlos usando el comando `git commit`. Asegúrate de haber confirmado tus cambios e intenta enviarlos nuevamente. Para hacerlo, ejecuta los siguientes comandos de terminal desde la carpeta del proyecto:
  ```bash
  git add .
  git commit -m "Tu mensaje de confirmación"
  git push
  ```
2. **No tienes permiso para enviar al repositorio:** Si has clonado el repositorio directamente desde el repositorio principal de Ironhack sin hacer un *Fork* primero, no tienes permiso de escritura en el repositorio.
Para verificar a qué repositorio remoto has clonado, ejecuta el siguiente comando de terminal desde la carpeta del proyecto:
  ```bash
  git remote -v
  ```
Si el enlace mostrado es el mismo que el repositorio principal de Ironhack, debes hacer un fork del repositorio a tu cuenta de GitHub primero y luego clonar tu fork a tu máquina local para poder enviar los cambios.

**Nota**: Debes hacer una copia de tu código local para evitar perderlo en el proceso.

  ](#faqs)

</details>[Volver al inicio