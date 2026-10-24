import "./globals.css"

export const metadata = {
  title: "Xiomara Melguizo | Ingeniera Civil en Medellín",
  description:
    "Ingeniera civil con más de 15 años de experiencia como directora y residente de obra, y directora y residente de interventoría en proyectos civiles en Medellín y Antioquia.",
  keywords: [
    "ingeniera civil",
    "dirección de obra",
    "residente de obra",
    "dirección de interventoría",
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
