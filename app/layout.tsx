import "./globals.css"

export const metadata = {
  title: "Xiomara Hercilia Melguizo Martínez | Ingeniera Civil en Medellín",
  description:
    "Ingeniera civil con más de 15 años de experiencia en residencia, dirección e interventoría de obras, vías y proyectos de infraestructura en Medellín y Antioquia.",
  keywords: [
    "ingeniera civil",
    "residencia de obra",
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
