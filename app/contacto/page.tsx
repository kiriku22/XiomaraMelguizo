const publicBasePath =
  process.env.NODE_ENV === "production" ? "/XiomaraMelguizo" : ""

export default function Contacto() {
  const bookingUrl = `${publicBasePath}/#agendar`

  return (
    <main>
      <meta httpEquiv="refresh" content={`0;url=${bookingUrl}`} />
      <p>
        Redirigiendo al formulario de agendamiento.{" "}
        <a href={bookingUrl}>Ir a agendar una cita</a>
      </p>
    </main>
  )
}
