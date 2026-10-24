import "./globals.css"

export const metadata = {
  title: "Xiomara Hercilia Melguizo Martínez | Ingeniera Civil en Medellín",
  description:
    "Soy ingeniera civil con más de 15 años de experiencia como directora de obra y residente de interventoría en proyectos de construcción civil, vías e infraestructura en Medellín y Antioquia.",
  keywords: [
    "ingeniera civil",
    "dirección de obra",
    "residente de interventoría",
    "interventoría",
    "obras viales",
    "Medellín",
    "Antioquia",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
