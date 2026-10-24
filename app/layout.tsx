import "./globals.css"

export const metadata = {
  title: "Xiomara Hercilia Melguizo Martínez | Ingeniera Civil en Medellín",
  description:
    "Ingeniera civil con más de 15 años de experiencia en dirección de obras e interventoría de proyectos civiles, vías e infraestructura en Medellín y Antioquia.",
  keywords: [
    "ingeniera civil",
    "dirección de obra",
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
