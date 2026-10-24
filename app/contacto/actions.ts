"use server"

export async function enviarFormulario(formData: FormData) {
  // Simular un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Aquí iría la lógica real para enviar el formulario, por ejemplo, a una API o base de datos
  console.log("Formulario recibido:", Object.fromEntries(formData))

  // Simular una respuesta exitosa
  return { success: true }
}

