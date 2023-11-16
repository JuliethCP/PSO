**Integración de MorphCast SDK con React**
En este docuemento, aprenderás a integrar el MorphCast SDK con una aplicación React  El MorphCast SDK te permite incorporar capacidades de inteligencia artificial en tu aplicación para tareas como reconocimiento de objetos y detección facial. Aquí te guiará a través de los pasos para configurar el SDK y mostrarte cómo interactuar con él en una aplicación React.

Paso 1: Generar una clave de licencia
Primero, genera una clave de licencia para el SDK de MorphCast aquí [Obtener Licencia ](https://www.morphcast.com/sdk-licence-request/)  Luego, inserte la clave en la configuración del SDK ubicada en el archivo src/helpers/ai-sdk/loader.js.

Paso 2: Configuración del SDK
Dentro del archivo src/helpers/ai-sdk/loader.js, encontrarás la configuración del MorphCast SDK. Asegúrese de que la clave de licencia se haya insertado correctamente y ajuste cualquier otra configuración según sus necesidades.

Paso 3: Controlar el SDK desde React
Las funciones start()y stop()para controlar el SDK de MorphCast se encuentran en el archivo src/App.js. Estas funciones permiten iniciar y detener el SDK según sea necesario en tu aplicación React.

Paso 4: Listas de componentes para usar
Encuentra componentes listos para usar que están vinculados a módulos específicos del MorphCast SDK en el directorio src/components/. Estos componentes facilitan la incorporación de funcionalidades específicas del SDK en tu interfaz de usuario.

Paso 5: Ejecutar la Aplicación React
En el directorio del proyecto, ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:

Instrucciones de intalación del Proyecto 

## Instalación

1. **Clona este repositorio:**
    ```bash
    git clone https://github.com/JuliethCP/PSO.git
    ```

2. **Ingresa al directorio del proyecto:**
    ```bash
    cd PSO
    ```

3. **Instala las dependencias:**
    ```bash
    npm install
    ```

## Uso

Inicia la aplicación en modo de desarrollo:



```bash
npm start

```
Esto abrirá la aplicación en tu navegador en http://localhost:3000 . La página se recargará automáticamente cuando realice cambios en el código.

Paso 6: Pruebas y Construcción
Utilice los siguientes comandos para ejecutar pruebas y construir la aplicación para producción:

