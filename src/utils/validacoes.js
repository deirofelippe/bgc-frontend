export const validar_preco = (valor) => {
   valor = valor.toString()
   const pattern = /^[\d]*[.,]?[\d]+$/g
   return pattern.test(valor)
}

export const validar_numero = (valor) => {
   valor = valor.toString()
   const pattern = /^[\d]+$/g
   return pattern.test(valor)
}

export const validar_nome = (valor) => {
   valor = valor.toString()
   const pattern = /^[\w]{2,}[\w .]*$/gi
   return pattern.test(valor)
}

export const validar_email = (valor) => {
   valor = valor.toString()
   const pattern = /^[\w\d]+[\w\d._]*[@]{1}[\w\d]+[\w\d.]*$/gi
   return pattern.test(valor)
}