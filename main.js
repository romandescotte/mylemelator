let $valorUnidad = document.querySelector("#valor-unidad"); 
let $porcentajeAdelanto = document.querySelector("#porcentaje-adelanto");
let $porcentajeCuotasObra = document.querySelector("#porcentaje-cuota-obra");
let $porcentajePosesion = document.querySelector("#porcentaje-posesion");
let $porcentajeCuotasPostEntrega = document.querySelector("#porcentaje-cuotas-post-entrega");
let $alerta = document.querySelector(".alerta.post-entrega");
let $valorCuotasFinanciamiento = document.querySelector("#valor-cuotas-financiamiento");
const INTERES = 8 / 100 / 12;
const NUMERO_PERIODOS = 40;

$valorUnidad.addEventListener('input', mostrarValores);
$porcentajeAdelanto.addEventListener('input', mostrarValores);
$porcentajeCuotasObra.addEventListener('input', mostrarValores);
$porcentajePosesion.addEventListener('input', mostrarValores);
$porcentajeCuotasPostEntrega.addEventListener('input', mostrarValores);

function mostrarValores() {
  
  let valorUnidad = Number($valorUnidad.value);
  let porcentajeAdelanto = Number($porcentajeAdelanto.value) / 100;
  let $valorAdelanto = document.querySelector("#valor-adelanto");
  $valorAdelanto.value = valorUnidad * porcentajeAdelanto;

  let cantidadCuotasObra = Number(document.querySelector("#cantidad-cuotas-obra").placeholder);
  let $valorCuotaObra =  document.querySelector("#valor-cuota-obra");
  let porcentajeCuotasObra = Number($porcentajeCuotasObra.value) / 100;
  let $importeTotalCuotasObra =  document.querySelector("#importe-total-cuotas-obra");

  $importeTotalCuotasObra.value = porcentajeCuotasObra * valorUnidad;
  $valorCuotaObra.value = $importeTotalCuotasObra.value / cantidadCuotasObra;

  let $importePosesion = document.querySelector("#importe-posesion");
  let porcentajePosesion = Number($porcentajePosesion.value) / 100;
  if(porcentajePosesion > 0.1) {
    $porcentajePosesion.value = 10
    porcentajePosesion = 0.1;
  }     
  $importePosesion.value = valorUnidad * porcentajePosesion;

  let $totalPosesion = document.querySelector("#total-posesion");
  $totalPosesion.value = Number($valorAdelanto.value) + Number($importeTotalCuotasObra.value) + Number($importePosesion.value);

  $porcentajeCuotasPostEntrega.value = 100 - porcentajeAdelanto * 100 -  porcentajeCuotasObra * 100 - porcentajePosesion * 100;

  
  let $saldoAFinanciar = document.querySelector("#saldo-a-financiar"); 
  if($porcentajeCuotasPostEntrega.value > 40) {
    if($porcentajePosesion.value !== '' && $porcentajeAdelanto.value !== '' && $porcentajeCuotasObra.value !== '') {
      $alerta.style.display = 'inline';
      $porcentajeCuotasPostEntrega.style.outline = '1px solid red';
      $porcentajeAdelanto.style.outline = '1px solid red';
      $porcentajeCuotasObra.style.outline = '1px solid red';
    }    
    $saldoAFinanciar.value = "";
  } else {   
    if($porcentajePosesion.value !== '' && $porcentajeAdelanto.value !== '' && $porcentajeCuotasObra.value !== '') {
      $alerta.style.display = 'none';
      $porcentajeCuotasPostEntrega.style.outline = 'initial';
      $porcentajeAdelanto.style.outline = 'initial';
      $porcentajeCuotasObra.style.outline = 'initial';
    }
    $saldoAFinanciar.value = valorUnidad - Number($valorAdelanto.value) - Number($importeTotalCuotasObra.value) - Number($importePosesion.value);
  }   
  let valorCuotas = Math.floor((INTERES * Number($saldoAFinanciar.value)) / (1 - Math.pow((1 + INTERES), - NUMERO_PERIODOS)));

  $valorCuotasFinanciamiento.value = valorCuotas;

  




  



}



let $btnLimpiar = document.querySelector("#btn-limpiar");
$btnLimpiar.addEventListener('click', function() {
  let inputs = document.querySelectorAll(".limpiar");
  $alerta.style.display = 'none';
  $porcentajeCuotasPostEntrega.style.outline = 'initial';
  $porcentajeAdelanto.style.outline = 'initial';
  $porcentajeCuotasObra.style.outline = 'initial';
  for(i of inputs) {
    i.value = '';
  }
});

//     let inversionInicial = 52000;
// let interes = 0.08 / 12;
// let numeroPeriodos = 40;

// 