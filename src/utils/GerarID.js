export default function gerarID(){
   const data = new Date()
   const ano = data.getFullYear().toString()
   const mes = data.getMonth().toString()
   const dia = data.getDay().toString()
   const hora = data.getHours().toString()
   const minuto = data.getMinutes().toString()
   const milisegundos = data.getMilliseconds().toString()
   const id = ano + mes + dia + hora + minuto + milisegundos
   
   return id;
}