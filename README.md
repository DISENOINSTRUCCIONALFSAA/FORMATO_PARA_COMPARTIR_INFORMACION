# FORMATO PARA COMPARTIR INFORMACION

En este repositorio se encuentra el código fuente y la documentación de cómo realizar mantenimiento de la página de FORMATO PARA COMPARTIR INFORMACION. A continuación se muestran detalles del uso de la aplicación y el funcionamiento del código.

## CÓMO FUNCIONA

Esta implementación cuenta con dos componentes: el formulario de Google Forms y el código que permite crear nuevas carpetas y trasladar los archivos desde la carpeta raíz a sus carpetas correspondientes. Entonces la primera interface que visualizará el usuario es lo que se muestra a continuación:

![image](https://github.com/DISENOINSTRUCCIONALFSAA/FORMATO_PARA_COMPARTIR_INFORMACION/assets/144281326/d1eb0fd6-19a9-4619-9b64-c15776222de6)

Los pasos a seguir para poder subir archivos al Formulario se encuentra en el Procedimiento de Actualización del Repositorio Digital. 

### ACERCA DEL CÓDIGO

El código esta conformado por dos archivos con nombres Código.gs y setUp.gs que permitirán activar los triggers necesarios para que se realice la distribución de la información a las carpetas pertinentes. 

![image](https://github.com/DISENOINSTRUCCIONALFSAA/FORMATO_PARA_COMPARTIR_INFORMACION/assets/144281326/20c11df5-ec22-4251-9ef4-a3f4c1773c73)

Para poder realizar el reseto de los triggers del código se debe seleccionar la opción de removeTriggersAndScriptPropierties del archivo setUp.gs, para posteriormente proceder a reinstalar todos los triggers necesarios ejecutando la función de setUp.gs; ambas funciones se muestran en el orden indicado a continuación:

![image](https://github.com/DISENOINSTRUCCIONALFSAA/FORMATO_PARA_COMPARTIR_INFORMACION/assets/144281326/817e6ad3-c1ef-4d42-9305-6839d4913982)

![image](https://github.com/DISENOINSTRUCCIONALFSAA/FORMATO_PARA_COMPARTIR_INFORMACION/assets/144281326/1cea339f-a685-42f2-b823-942afc15d451)

Finalmente, ninguna otra línea de código debe ser cambiada porque no existe nigún otro tipo de requerimiento para la implementación. Si en caso se desea editar los correos a los cuáles debe llgar la información programada, se deben editar la líneas desde la 124 hasta la 126 del archivo Código.gs, como se muestra a continuación.

![image](https://github.com/DISENOINSTRUCCIONALFSAA/FORMATO_PARA_COMPARTIR_INFORMACION/assets/144281326/0f32a87a-8113-4db1-95cc-7ab3e9515125)



