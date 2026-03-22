import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phqxrvwrtfhrthxaffqm.supabase.co';
const supabaseKey = 'sb_publishable_aSP4Wvd9G1XmZLVF8PoMsg_amEqveyP';
const supabase = createClient(supabaseUrl, supabaseKey);


// 2. Seleccionar elementos del DOM
const btnCargar = document.getElementById('btn-cargar');
const tbodyProductos = document.getElementById('tbody-productos');

// 3. Función asíncrona para obtener y mostrar los datos
async function cargarDatos() {
  // Cambiar el texto del botón mientras carga para mejor experiencia de usuario
  btnCargar.textContent = 'Cargando datos...';
  btnCargar.disabled = true;

  try {
    // Consultar todos los registros de la tabla 'productos'
    const { data, error } = await supabase
      .from('Productos')
      .select('*');

    // Manejo de errores de la base de datos
    if (error) {
      console.error('Error al obtener datos de Supabase:', error);
      alert('Hubo un error al consultar la base de datos.');
      return;
    }

    // Limpiar el contenido previo de la tabla por si el botón se presiona varias veces
    tbodyProductos.innerHTML = '';

    // 4. Renderizar dinámicamente manipulando el DOM
    data.forEach(producto => {
      // Crear una nueva fila (tr)
      const tr = document.createElement('tr');

      // Insertar las celdas (td) con los datos del producto
      tr.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>${producto.stock}</td>
      `;

      // Agregar la fila completada al cuerpo de la tabla
      tbodyProductos.appendChild(tr);
    });

  } catch (err) {
    console.error('Error inesperado de ejecución:', err);
  } finally {

    btnCargar.textContent = 'Cargar Datos de Supabase';
    btnCargar.disabled = false;
  }
}

btnCargar.addEventListener('click', cargarDatos);