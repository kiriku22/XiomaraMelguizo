"use client"

import { FormEvent, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HardHat,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Route,
} from "lucide-react"

const whatsappNumber = "573137572292"
const contactEmail = "xhmmddamlm@gmail.com"
const linkedinUrl = "https://www.linkedin.com/in/xiomara-melguizo-91151735"
const publicBasePath =
  process.env.NODE_ENV === "production" ? "/XiomaraMelguizo" : ""

// Esta lista alimenta las tarjetas de servicios y el selector de agendamiento.
const services = [
  {
    title: "Residencia y supervisión de obra",
    description:
      "Seguimiento en campo, coordinación de actividades, control de calidad y verificación de procesos constructivos.",
    icon: HardHat,
  },
  {
    title: "Interventoría de obras y vías",
    description:
      "Acompañamiento técnico y administrativo para obras viales, urbanismo, espacio público y edificaciones.",
    icon: Route,
  },
  {
    title: "Cantidades, presupuestos y APU",
    description:
      "Cuantificación de materiales, revisión de cantidades, análisis de precios unitarios y cortes de obra.",
    icon: Calculator,
  },
  {
    title: "Programación y control de obra",
    description:
      "Planeación de actividades, seguimiento a cronogramas, costos, avances e informes de obra.",
    icon: CalendarDays,
  },
  {
    title: "Calidad y materiales",
    description:
      "Verificación de especificaciones, calidad de materiales, registros de obra y documentación de procesos.",
    icon: ClipboardCheck,
  },
  {
    title: "Acompañamiento en licencias",
    description:
      "Orientación técnico-normativa y apoyo en la revisión y gestión de licencias de construcción.",
    icon: FileText,
  },
]

// La última hora inicia a las 4:30 p. m. y finaliza al cierre de las 5:00 p. m.
const timeSlots = Array.from({ length: 20 }, (_, index) => {
  const totalMinutes = 7 * 60 + index * 30
  const hour = Math.floor(totalMinutes / 60)
  const minute = totalMinutes % 60
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
})

type FormErrors = Partial<
  Record<
    "name" | "phone" | "email" | "service" | "date" | "time" | "modality",
    string
  >
>

// Usa la zona de Medellín para mantener estable la fecha mínima en el navegador.
function getLocalDateString() {
  const now = new Date()
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now)
  const year = dateParts.find((part) => part.type === "year")?.value
  const month = dateParts.find((part) => part.type === "month")?.value
  const day = dateParts.find((part) => part.type === "day")?.value
  return `${year}-${month}-${day}`
}

// Evalúa el día elegido en UTC para evitar cambios por la zona horaria del dispositivo.
function isUnavailableDay(date: string) {
  const day = new Date(`${date}T12:00:00Z`).getUTCDay()
  return day === 0
}

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [confirmation, setConfirmation] = useState("")

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    if (!input.value) {
      setErrors((current) => ({ ...current, date: undefined }))
      return
    }

    if (input.value < getLocalDateString()) {
      input.value = ""
      setErrors((current) => ({
        ...current,
        date: "Elige una fecha de hoy en adelante.",
      }))
      return
    }

    if (isUnavailableDay(input.value)) {
      input.value = ""
      setErrors((current) => ({
        ...current,
        date: "La atención es de lunes a sábado. Elige otro día.",
      }))
      return
    }

    setErrors((current) => ({ ...current, date: undefined }))
  }

  // Valida el formulario y prepara la solicitud solo cuando todos los datos son válidos.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const service = String(formData.get("service") ?? "")
    const date = String(formData.get("date") ?? "")
    const time = String(formData.get("time") ?? "")
    const modality = String(formData.get("modality") ?? "")
    const project = String(formData.get("project") ?? "").trim()
    const nextErrors: FormErrors = {}

    if (!name) nextErrors.name = "Escribe tu nombre completo."
    if (!phone) nextErrors.phone = "Escribe un número de teléfono."
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Escribe un correo electrónico válido."
    }
    if (!service) nextErrors.service = "Selecciona un servicio de interés."
    if (!date) {
      nextErrors.date = "Selecciona una fecha para la cita."
    } else if (date < getLocalDateString()) {
      nextErrors.date = "Elige una fecha de hoy en adelante."
    } else if (isUnavailableDay(date)) {
      nextErrors.date = "La atención es de lunes a sábado. Elige otro día."
    }
    if (!time) nextErrors.time = "Selecciona una hora disponible."
    if (!modality) nextErrors.modality = "Selecciona la modalidad de la cita."

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const readableDate = new Date(`${date}T12:00:00Z`).toLocaleDateString(
      "es-CO",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "America/Bogota",
      },
    )
    const message = [
      "Hola, quiero agendar una cita.",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Correo: ${email || "No indicado"}`,
      `Servicio: ${service}`,
      `Fecha: ${readableDate}`,
      `Hora: ${time}`,
      `Modalidad: ${modality}`,
      `Proyecto: ${project || "Por definir"}`,
    ].join("\n")

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    )
    setConfirmation(
      "Tu solicitud está lista en WhatsApp. La cita queda sujeta a confirmación por ese medio.",
    )
    form.reset()
  }

  return (
    <>
      {/* Estilos de la página junto al marcado y la lógica para facilitar su edición. */}
      <style jsx global>{`
        :root {
          --ink: #172b37;
          --muted: #5e7078;
          --paper: #f7f8f5;
          --white: #ffffff;
          --navy: #123344;
          --navy-deep: #0a2734;
          --teal: #2b7975;
          --teal-light: #e6f1ee;
          --line: #dce5e1;
          --gold: #d6a95d;
          --danger: #a83c36;
          --shadow: 0 24px 70px rgba(19, 48, 61, 0.1);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 110px;
        }

        body {
          margin: 0;
          background: var(--paper);
          color: var(--ink);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          line-height: 1.65;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button,
        a,
        input,
        select,
        textarea {
          -webkit-tap-highlight-color: transparent;
        }

        :focus-visible {
          outline: 3px solid var(--gold);
          outline-offset: 3px;
        }

        .site-shell {
          overflow: hidden;
        }

        .container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid rgba(220, 229, 225, 0.9);
          backdrop-filter: blur(12px);
        }

        .header-inner {
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          flex: 0 0 auto;
          color: var(--navy);
          font-size: 0.94rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        .brand small {
          display: block;
          margin-top: 5px;
          color: var(--muted);
          font-size: 0.69rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .main-nav {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 23px;
          color: #41545c;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .main-nav a {
          transition: color 160ms ease;
          white-space: nowrap;
        }

        .main-nav a:hover {
          color: var(--teal);
        }

        .main-nav .nav-cta {
          border-radius: 999px;
          background: var(--navy);
          color: white;
          padding: 10px 16px;
        }

        .main-nav .nav-cta:hover {
          background: var(--teal);
          color: white;
        }

        .hero {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 590px;
          padding: 88px 0 82px;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 84% 25%, rgba(93, 154, 142, 0.22), transparent 34%),
            linear-gradient(118deg, var(--navy-deep) 0%, #123b4b 70%, #245a62 100%);
          color: white;
        }

        .hero::after {
          position: absolute;
          right: -120px;
          bottom: -310px;
          width: 620px;
          height: 620px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 50%;
          box-shadow: 0 0 0 55px rgba(255, 255, 255, 0.025), 0 0 0 110px rgba(255, 255, 255, 0.02);
          content: "";
          pointer-events: none;
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 290px;
          align-items: center;
          gap: 64px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #b6d4ce;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .eyebrow::before {
          width: 28px;
          height: 2px;
          background: var(--gold);
          content: "";
        }

        .hero h1 {
          max-width: 700px;
          margin: 20px 0 12px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.7rem, 6vw, 5.2rem);
          font-weight: 500;
          letter-spacing: -0.06em;
          line-height: 1.02;
        }

        .hero-title {
          margin: 0;
          color: #d4e4e1;
          font-size: clamp(1rem, 2vw, 1.28rem);
          font-weight: 600;
        }

        .hero-copy {
          max-width: 610px;
          margin: 22px 0 30px;
          color: #cfdddc;
          font-size: 1.05rem;
        }

        .button-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px;
        }

        .button {
          display: inline-flex;
          min-height: 50px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid transparent;
          border-radius: 7px;
          padding: 0 21px;
          font-size: 0.92rem;
          font-weight: 800;
          transition:
            transform 160ms ease,
            background 160ms ease,
            border-color 160ms ease;
        }

        .button:hover {
          transform: translateY(-2px);
        }

        .button-gold {
          background: var(--gold);
          color: var(--navy-deep);
        }

        .button-gold:hover {
          background: #e3bb76;
        }

        .button-outline {
          border-color: rgba(255, 255, 255, 0.42);
          color: white;
        }

        .button-outline:hover {
          border-color: white;
          background: rgba(255, 255, 255, 0.08);
        }

        .hero-card {
          position: relative;
          padding: 27px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.14);
          backdrop-filter: blur(10px);
        }

        .hero-card-label {
          margin: 0 0 21px;
          color: #bdd3cf;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-stat {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 4px;
        }

        .hero-stat strong {
          color: var(--gold);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 3.3rem;
          font-weight: 500;
          line-height: 1;
        }

        .hero-stat span {
          color: #e4efed;
          font-size: 0.94rem;
          font-weight: 700;
        }

        .hero-card-copy {
          margin: 11px 0 0;
          color: #d0dfdc;
          font-size: 0.88rem;
        }

        .hero-card-divider {
          height: 1px;
          margin: 22px 0;
          background: rgba(255, 255, 255, 0.2);
        }

        .hero-detail {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #e1ecea;
          font-size: 0.88rem;
        }

        .hero-detail + .hero-detail {
          margin-top: 12px;
        }

        .hero-detail :global(svg) {
          color: #b6d4ce;
        }

        .section {
          padding: 94px 0;
        }

        .section-white {
          background: var(--white);
        }

        .section-heading {
          max-width: 660px;
          margin-bottom: 42px;
        }

        .section-kicker {
          display: block;
          margin-bottom: 10px;
          color: var(--teal);
          font-size: 0.73rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .section-heading h2,
        .recruiter-copy h2 {
          margin: 0;
          color: var(--navy);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1.12;
        }

        .section-heading p {
          margin: 16px 0 0;
          color: var(--muted);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          align-items: center;
          gap: 70px;
        }

        .photo-frame {
          position: relative;
          min-height: 410px;
          overflow: hidden;
          border-radius: 12px;
          background:
            linear-gradient(145deg, rgba(18, 51, 68, 0.12), rgba(43, 121, 117, 0.2)),
            #dfe9e5;
        }

        .photo-frame::before,
        .photo-frame::after {
          position: absolute;
          z-index: 1;
          width: 230px;
          height: 230px;
          border: 1px solid rgba(18, 51, 68, 0.12);
          border-radius: 50%;
          content: "";
          pointer-events: none;
        }

        .photo-frame::after {
          width: 300px;
          height: 300px;
        }

        .profile-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 24%;
        }

        .profile-copy h2 {
          margin: 0 0 16px;
          color: var(--navy);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.9rem, 3.4vw, 2.8rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1.15;
        }

        .profile-copy > p {
          margin: 0 0 17px;
          color: var(--muted);
        }

        .credential-list {
          display: grid;
          gap: 12px;
          margin: 25px 0 0;
          padding: 0;
          list-style: none;
        }

        .credential-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #334b54;
          font-size: 0.92rem;
        }

        .credential-list :global(svg) {
          flex: 0 0 auto;
          margin-top: 3px;
          color: var(--teal);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .service-card {
          min-height: 235px;
          padding: 26px 23px;
          border: 1px solid var(--line);
          border-radius: 9px;
          background: #fff;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease;
        }

        .service-card:hover {
          transform: translateY(-4px);
          border-color: #a9c8c1;
          box-shadow: 0 18px 42px rgba(19, 48, 61, 0.08);
        }

        .service-icon {
          display: flex;
          width: 46px;
          height: 46px;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border-radius: 8px;
          background: var(--teal-light);
          color: var(--teal);
        }

        .service-card h3 {
          margin: 0 0 8px;
          color: var(--navy);
          font-size: 1rem;
          line-height: 1.35;
        }

        .service-card p {
          margin: 0;
          color: var(--muted);
          font-size: 0.88rem;
        }

        .timeline {
          position: relative;
          display: grid;
          gap: 0;
          margin-left: 8px;
        }

        .timeline::before {
          position: absolute;
          top: 8px;
          bottom: 10px;
          left: 0;
          width: 1px;
          background: #c7d8d2;
          content: "";
        }

        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: 155px minmax(0, 1fr);
          gap: 32px;
          padding: 0 0 35px 30px;
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-item::before {
          position: absolute;
          top: 5px;
          left: -5px;
          width: 11px;
          height: 11px;
          border: 3px solid var(--paper);
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 1px var(--teal);
          content: "";
        }

        .timeline-date {
          color: var(--teal);
          font-size: 0.82rem;
          font-weight: 800;
        }

        .timeline-content {
          padding-bottom: 26px;
          border-bottom: 1px solid var(--line);
        }

        .timeline-item:last-child .timeline-content {
          border-bottom: 0;
        }

        .timeline-content h3 {
          margin: 0 0 5px;
          color: var(--navy);
          font-size: 1.12rem;
          line-height: 1.4;
        }

        .timeline-content .timeline-role {
          margin: 0 0 10px;
          color: var(--muted);
          font-size: 0.88rem;
          font-weight: 700;
        }

        .timeline-content p:last-child {
          margin: 0;
          color: #576b73;
          font-size: 0.92rem;
        }

        .credentials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 45px;
        }

        .credential-panel {
          padding: 29px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: white;
        }

        .credential-panel h3 {
          display: flex;
          align-items: center;
          gap: 11px;
          margin: 0 0 22px;
          color: var(--navy);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.55rem;
          font-weight: 500;
        }

        .credential-panel h3 :global(svg) {
          color: var(--teal);
        }

        .education-entry + .education-entry {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
        }

        .education-entry strong {
          display: block;
          color: var(--navy);
          font-size: 0.98rem;
        }

        .education-entry span {
          display: block;
          margin-top: 4px;
          color: var(--muted);
          font-size: 0.87rem;
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .tag-list li {
          border: 1px solid #d4e2dc;
          border-radius: 999px;
          background: #f5f9f7;
          color: #37545b;
          padding: 7px 12px;
          font-size: 0.81rem;
          font-weight: 700;
        }

        .credential-subtitle {
          margin: 24px 0 12px;
          color: #415a62;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .recruiter-section {
          padding: 68px 0;
          background: #e8f0ed;
        }

        .recruiter-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 35px;
        }

        .recruiter-copy {
          max-width: 700px;
        }

        .recruiter-copy h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
        }

        .recruiter-copy p {
          margin: 12px 0 0;
          color: var(--muted);
        }

        .button-navy {
          flex: 0 0 auto;
          background: var(--navy);
          color: white;
        }

        .button-navy:hover {
          background: var(--teal);
        }

        .booking-section {
          background:
            radial-gradient(ellipse at 100% 0%, rgba(43, 121, 117, 0.09), transparent 36%),
            #f8faf8;
        }

        .booking-grid {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          align-items: start;
          gap: 55px;
        }

        .booking-aside {
          position: sticky;
          top: 115px;
        }

        .booking-aside .section-heading {
          margin-bottom: 26px;
        }

        .booking-note {
          display: flex;
          gap: 13px;
          margin-top: 15px;
          padding: 16px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: white;
          color: var(--muted);
          font-size: 0.87rem;
        }

        .booking-note :global(svg) {
          flex: 0 0 auto;
          margin-top: 2px;
          color: var(--teal);
        }

        .booking-note strong {
          display: block;
          margin-bottom: 2px;
          color: var(--navy);
        }

        .booking-form {
          padding: 31px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: white;
          box-shadow: var(--shadow);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 15px;
        }

        .form-field {
          min-width: 0;
        }

        .form-field-full {
          grid-column: 1 / -1;
        }

        .form-field label {
          display: block;
          margin-bottom: 7px;
          color: #2e4650;
          font-size: 0.83rem;
          font-weight: 800;
        }

        .optional-label {
          margin-left: 5px;
          color: #7a898e;
          font-size: 0.74rem;
          font-weight: 500;
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          display: block;
          width: 100%;
          min-height: 47px;
          border: 1px solid #cbd8d4;
          border-radius: 6px;
          background: white;
          color: var(--ink);
          padding: 10px 12px;
          font-size: 0.9rem;
        }

        .form-field textarea {
          min-height: 108px;
          resize: vertical;
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: #87959a;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          border-color: var(--teal);
          outline: 3px solid rgba(43, 121, 117, 0.13);
        }

        .form-field [aria-invalid="true"] {
          border-color: var(--danger);
        }

        .field-error {
          display: block;
          margin-top: 5px;
          color: var(--danger);
          font-size: 0.77rem;
          font-weight: 700;
        }

        .booking-submit {
          width: 100%;
          margin-top: 20px;
          border: 0;
          cursor: pointer;
        }

        .form-footnote {
          margin: 13px 0 0;
          color: #75858a;
          font-size: 0.76rem;
          text-align: center;
        }

        .confirmation {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 18px;
          border: 1px solid #b9d9ce;
          border-radius: 7px;
          background: #eff8f3;
          color: #245e4e;
          padding: 13px 14px;
          font-size: 0.88rem;
        }

        .confirmation :global(svg) {
          flex: 0 0 auto;
          margin-top: 2px;
        }

        .site-footer {
          padding: 48px 0 24px;
          background: var(--navy-deep);
          color: #d5e0df;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 35px;
          padding-bottom: 35px;
        }

        .footer-brand {
          color: white;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.45rem;
        }

        .footer-copy {
          max-width: 300px;
          margin: 10px 0 0;
          color: #b5c6c5;
          font-size: 0.85rem;
        }

        .footer-title {
          margin: 0 0 13px;
          color: #a9c7c1;
          font-size: 0.73rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .footer-link {
          display: flex;
          width: fit-content;
          align-items: center;
          gap: 9px;
          margin: 8px 0;
          color: #e3ecea;
          font-size: 0.87rem;
        }

        .footer-link:hover {
          color: var(--gold);
        }

        .footer-link :global(svg) {
          color: #9fc6bb;
        }

        .footer-bottom {
          padding-top: 19px;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          color: #a9bcbb;
          font-size: 0.77rem;
        }

        .whatsapp-float {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 30;
          display: flex;
          width: 58px;
          height: 58px;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          border-radius: 50%;
          background: #16845b;
          color: white;
          box-shadow: 0 7px 24px rgba(10, 39, 52, 0.25);
          transition: transform 160ms ease;
        }

        .whatsapp-float:hover {
          transform: translateY(-3px);
          background: #0f704c;
        }

        @media (max-width: 980px) {
          .header-inner {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
            padding-top: 14px;
            padding-bottom: 12px;
          }

          .main-nav {
            width: 100%;
            justify-content: flex-start;
            gap: 18px;
            overflow-x: auto;
            padding: 3px 2px 6px;
          }

          .hero-grid {
            grid-template-columns: minmax(0, 1fr) 245px;
            gap: 30px;
          }

          .profile-grid {
            gap: 40px;
          }

          .booking-grid {
            gap: 35px;
          }
        }

        @media (max-width: 720px) {
          html {
            scroll-padding-top: 130px;
          }

          .container {
            width: min(100% - 32px, 560px);
          }

          .main-nav {
            gap: 17px;
            font-size: 0.77rem;
            flex-wrap: wrap;
            overflow: visible;
          }

          .main-nav .nav-cta {
            padding: 8px 12px;
          }

          .hero {
            min-height: 0;
            padding: 66px 0 58px;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .hero h1 {
            font-size: clamp(2.65rem, 12vw, 4rem);
          }

          .hero-card {
            max-width: 380px;
          }

          .section {
            padding: 68px 0;
          }

          .section-heading {
            margin-bottom: 30px;
          }

          .profile-grid,
          .booking-grid,
          .credentials-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .photo-frame {
            min-height: 300px;
          }

          .services-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .service-card {
            min-height: 0;
            padding: 20px 17px;
          }

          .service-card h3 {
            font-size: 0.92rem;
          }

          .service-card p {
            font-size: 0.82rem;
          }

          .timeline-item {
            grid-template-columns: 1fr;
            gap: 7px;
            padding-bottom: 25px;
          }

          .timeline-content {
            padding-bottom: 22px;
          }

          .credential-panel {
            padding: 23px 20px;
          }

          .recruiter-inner {
            align-items: flex-start;
            flex-direction: column;
            gap: 22px;
          }

          .booking-aside {
            position: static;
          }

          .booking-form {
            padding: 23px 18px;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 18px;
          }

          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }

          .whatsapp-float {
            right: 15px;
            bottom: 15px;
            width: 54px;
            height: 54px;
          }
        }

        @media (max-width: 420px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-field-full {
            grid-column: auto;
          }

          .button-row {
            align-items: stretch;
            flex-direction: column;
          }

          .button-row .button {
            width: 100%;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid > div:first-child {
            grid-column: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="site-shell">
        <header className="site-header">
          <div className="container header-inner">
            <a className="brand" href="#inicio" aria-label="Ir al inicio">
              Xiomara Hercilia Melguizo Martínez
              <small>Ingeniera civil · Medellín</small>
            </a>
            <nav className="main-nav" aria-label="Navegación principal">
              <a href="#inicio">Inicio</a>
              <a href="#perfil">Perfil</a>
              <a href="#servicios">Servicios</a>
              <a href="#experiencia">Experiencia</a>
              <a href="#contratacion">Contratación</a>
              <a className="nav-cta" href="#agendar">
                Agendar cita
              </a>
            </nav>
          </div>
        </header>

        <main>
          <section className="hero" id="inicio">
            <div className="container hero-grid">
              <div>
                <span className="eyebrow">Ingeniería civil · Medellín</span>
                <h1>Xiomara Hercilia Melguizo Martínez</h1>
                <p className="hero-title">
                  Ingeniera civil · Matrícula profesional 05202155471ANT
                </p>
                <p className="hero-copy">
                  Acompañamiento técnico y responsable para convertir proyectos
                  de infraestructura, vías y edificación en obras bien
                  planeadas, supervisadas y ejecutadas.
                </p>
                <div className="button-row">
                  <a className="button button-gold" href="#agendar">
                    Agendar cita <ArrowRight size={17} aria-hidden="true" />
                  </a>
                  <a className="button button-outline" href="#servicios">
                    Conocer servicios
                  </a>
                </div>
              </div>
              <aside className="hero-card" aria-label="Resumen profesional">
                <p className="hero-card-label">Experiencia en obra</p>
                <div className="hero-stat">
                  <strong>15+</strong>
                  <span>años de experiencia</span>
                </div>
                <p className="hero-card-copy">
                  En residencia, dirección e interventoría de proyectos civiles.
                </p>
                <div className="hero-card-divider" />
                <div className="hero-detail">
                  <MapPin size={17} aria-hidden="true" />
                  Medellín y Antioquia
                </div>
                <div className="hero-detail">
                  <BadgeCheck size={17} aria-hidden="true" />
                  Matrícula profesional registrada
                </div>
              </aside>
            </div>
          </section>

          <section className="section section-white" id="perfil">
            <div className="container profile-grid">
              <div className="photo-frame">
                <Image
                  className="profile-photo"
                  src={`${publicBasePath}/assets/perfilfoto.jpeg`}
                  alt="Fotografía profesional de Xiomara Hercilia Melguizo Martínez"
                  width={389}
                  height={584}
                />
              </div>
              <div className="profile-copy">
                <span className="section-kicker">Perfil profesional</span>
                <h2>Experiencia técnica, gestión y trabajo en equipo.</h2>
                <p>
                  Xiomara es ingeniera civil de la Universidad Nacional de
                  Colombia, con más de 15 años de experiencia en residencia,
                  dirección e interventoría de obras. Ha participado en
                  proyectos de vías, urbanismo, edificaciones y redes, desde la
                  planeación y el presupuesto hasta el seguimiento en campo.
                </p>
                <p>
                  Su trabajo combina control de cantidades y costos, revisión
                  de calidad, coordinación de equipos e informes claros para
                  facilitar decisiones oportunas durante cada etapa del
                  proyecto.
                </p>
                <ul className="credential-list">
                  <li>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    Ingeniera civil · Universidad Nacional de Colombia
                  </li>
                  <li>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    Matrícula profesional 05202155471ANT
                  </li>
                  <li>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    Inglés nivel A2 · disponibilidad para viajar
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="section" id="servicios">
            <div className="container">
              <div className="section-heading">
                <span className="section-kicker">Servicios</span>
                <h2>Apoyo profesional para cada etapa de la obra.</h2>
                <p>
                  Servicios definidos a partir de su experiencia comprobable en
                  proyectos públicos y privados.
                </p>
              </div>
              <div className="services-grid">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <article className="service-card" key={service.title}>
                      <div className="service-icon">
                        <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="section section-white" id="experiencia">
            <div className="container">
              <div className="section-heading">
                <span className="section-kicker">Experiencia y proyectos</span>
                <h2>Obras y equipos que han marcado su trayectoria.</h2>
                <p>
                  Una selección de proyectos y responsabilidades descritos en
                  su hoja de vida.
                </p>
              </div>
              <div className="timeline">
                <article className="timeline-item">
                  <div className="timeline-date">2025–2026</div>
                  <div className="timeline-content">
                    <h3>Parque Biblioteca Zona Nororiental, Medellín</h3>
                    <p className="timeline-role">
                      Residente de obra · DIRTECO S. A. S.
                    </p>
                    <p>
                      Cuantificación de obra, supervisión técnica y de calidad
                      en varias áreas del proyecto, seguimiento de procesos,
                      bitácora e informes mensuales.
                    </p>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-date">2025</div>
                  <div className="timeline-content">
                    <h3>
                      Renovación de subestación eléctrica, sede ISA Medellín
                    </h3>
                    <p className="timeline-role">
                      Residente de obra · COINSI S. A. S. BIC
                    </p>
                    <p>
                      Apoyo a la ejecución de trabajos en la subestación de
                      media tensión, con cuantificación de cantidades,
                      supervisión técnica y verificación de calidad.
                    </p>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-date">2022–2024</div>
                  <div className="timeline-content">
                    <h3>
                      Obras viales, señalización y espacio público en Antioquia
                    </h3>
                    <p className="timeline-role">
                      Residencia e interventoría · Medellín y municipios de
                      Antioquia
                    </p>
                    <p>
                      Seguimiento de mejoramientos viales, obras
                      complementarias, andenes y señalización; control de
                      cantidades, programación, calidad e informes de campo.
                    </p>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-date">2017–2021</div>
                  <div className="timeline-content">
                    <h3>
                      Edificaciones, urbanismo y mejoramiento vial
                    </h3>
                    <p className="timeline-role">
                      Dirección, residencia e interventoría · Antioquia
                    </p>
                    <p>
                      Participación en edificios de hasta 20 niveles, una
                      bodega de 35 × 25 × 14 m y una casa finca de 400 m²,
                      además del mejoramiento vial en El Chagualo, Medellín.
                      Incluyó presupuestos, control de costos, cronogramas y
                      supervisión constructiva.
                    </p>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-date">2007–2016</div>
                  <div className="timeline-content">
                    <h3>Vías, redes y proyectos de vivienda</h3>
                    <p className="timeline-role">
                      Residencia e interventoría · Medellín y Antioquia
                    </p>
                    <p>
                      Participación en urbanizaciones con 81 y 63 viviendas,
                      conjuntos residenciales con torres de hasta 26 niveles y
                      un puente vehicular postensado de 30 m. También apoyó
                      procesos de licencias y revisión técnico-normativa.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="section" id="formacion">
            <div className="container">
              <div className="section-heading">
                <span className="section-kicker">
                  Formación profesional y herramientas
                </span>
                <h2>Conocimiento para planear, revisar y hacer seguimiento.</h2>
              </div>
              <div className="credentials-grid">
                <div className="credential-panel">
                  <h3>
                    <Building2 size={22} aria-hidden="true" />
                    Formación profesional
                  </h3>
                  <div className="education-entry">
                    <strong>Ingeniería Civil</strong>
                    <span>
                      Universidad Nacional de Colombia · Medellín · 2007
                    </span>
                  </div>
                </div>
                <div className="credential-panel">
                  <h3>
                    <BadgeCheck size={22} aria-hidden="true" />
                    Software e idiomas
                  </h3>
                  <p className="credential-subtitle">Diseño y programación</p>
                  <ul className="tag-list" aria-label="Software de diseño y programación">
                    <li>AutoCAD</li>
                    <li>ETABS</li>
                    <li>MS Project</li>
                    <li>SAP</li>
                  </ul>
                  <p className="credential-subtitle">
                    Control de costos y productividad
                  </p>
                  <ul className="tag-list" aria-label="Software de control de costos">
                    <li>CIO Milenio</li>
                    <li>SAO</li>
                    <li>PACO</li>
                    <li>SINCO</li>
                    <li>Construdata</li>
                    <li>Excel</li>
                    <li>Power BI</li>
                  </ul>
                  <p className="credential-subtitle">Idiomas</p>
                  <ul className="tag-list" aria-label="Idiomas">
                    <li>Español</li>
                    <li>Inglés A2</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="recruiter-section" id="contratacion">
            <div className="container recruiter-inner">
              <div className="recruiter-copy">
                <span className="section-kicker">Para empresas y reclutadores</span>
                <h2>¿Buscas experiencia en obra e interventoría?</h2>
                <p>
                  Para oportunidades laborales, procesos de selección o
                  contratación de servicios profesionales, puedes comunicarte
                  directamente por correo o WhatsApp.
                </p>
              </div>
              <a
                className="button button-navy"
                href={`mailto:${contactEmail}?subject=${encodeURIComponent("Oportunidad profesional")}`}
              >
                Contactar para contratación{" "}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="section booking-section" id="agendar">
            <div className="container booking-grid">
              <div className="booking-aside">
                <div className="section-heading">
                  <span className="section-kicker">Agendamiento</span>
                  <h2>Conversemos sobre tu proyecto.</h2>
                  <p>
                    Cuéntame qué necesitas y selecciona el momento que te
                    convenga. La solicitud se prepara para enviarse por
                    WhatsApp.
                  </p>
                </div>
                <div className="booking-note">
                  <CalendarDays size={19} aria-hidden="true" />
                  <div>
                    <strong>Horario de atención</strong>
                    Lunes a sábado, de 7:00 a. m. a 5:00 p. m. · Citas cada 30
                    minutos.
                  </div>
                </div>
                <div className="booking-note">
                  <MessageCircle size={19} aria-hidden="true" />
                  <div>
                    <strong>Confirmación por WhatsApp</strong>
                    La fecha y hora quedan sujetas a confirmación por ese
                    medio.
                  </div>
                </div>
              </div>

              <form
                className="booking-form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="name">Nombre completo *</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <span className="field-error" id="name-error" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Teléfono *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <span className="field-error" id="phone-error" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className="form-field form-field-full">
                    <label htmlFor="email">
                      Correo electrónico
                      <span className="optional-label">(opcional)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <span className="field-error" id="email-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="form-field form-field-full">
                    <label htmlFor="service">Servicio de interés *</label>
                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      required
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "service-error" : undefined}
                    >
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>
                      {services.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <span className="field-error" id="service-error" role="alert">
                        {errors.service}
                      </span>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="date">Fecha deseada *</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={getLocalDateString()}
                      onChange={handleDateChange}
                      required
                      aria-invalid={Boolean(errors.date)}
                      aria-describedby={errors.date ? "date-error" : undefined}
                    />
                    {errors.date && (
                      <span className="field-error" id="date-error" role="alert">
                        {errors.date}
                      </span>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="time">Hora deseada *</label>
                    <select
                      id="time"
                      name="time"
                      defaultValue=""
                      required
                      aria-invalid={Boolean(errors.time)}
                      aria-describedby={errors.time ? "time-error" : undefined}
                    >
                      <option value="" disabled>
                        Selecciona una hora
                      </option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <span className="field-error" id="time-error" role="alert">
                        {errors.time}
                      </span>
                    )}
                  </div>
                  <div className="form-field form-field-full">
                    <label htmlFor="modality">Modalidad *</label>
                    <select
                      id="modality"
                      name="modality"
                      defaultValue=""
                      required
                      aria-invalid={Boolean(errors.modality)}
                      aria-describedby={
                        errors.modality ? "modality-error" : undefined
                      }
                    >
                      <option value="" disabled>
                        Selecciona la modalidad
                      </option>
                      <option value="Presencial">Presencial</option>
                      <option value="Virtual">Virtual</option>
                    </select>
                    {errors.modality && (
                      <span
                        className="field-error"
                        id="modality-error"
                        role="alert"
                      >
                        {errors.modality}
                      </span>
                    )}
                  </div>
                  <div className="form-field form-field-full">
                    <label htmlFor="project">
                      Descripción breve del proyecto
                      <span className="optional-label">(opcional)</span>
                    </label>
                    <textarea
                      id="project"
                      name="project"
                      rows={4}
                      placeholder="Cuéntame brevemente en qué consiste tu proyecto."
                    />
                  </div>
                </div>
                <button className="button button-gold booking-submit" type="submit">
                  Preparar solicitud en WhatsApp{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <p className="form-footnote">
                  Los campos marcados con * son obligatorios.
                </p>
                {confirmation && (
                  <div className="confirmation" role="status" aria-live="polite">
                    <CheckCircle2 size={19} aria-hidden="true" />
                    <span>{confirmation}</span>
                  </div>
                )}
              </form>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div className="footer-brand">
                  Xiomara Hercilia Melguizo Martínez
                </div>
                <p className="footer-copy">
                  Ingeniera civil con experiencia en dirección, residencia e
                  interventoría de proyectos en Medellín y Antioquia.
                </p>
              </div>
              <div>
                <p className="footer-title">Contacto</p>
                <a className="footer-link" href={`mailto:${contactEmail}`}>
                  <Mail size={16} aria-hidden="true" />
                  {contactEmail}
                </a>
                <a className="footer-link" href="tel:+573137572292">
                  <Phone size={16} aria-hidden="true" />
                  +57 313 757 2292
                </a>
                <span className="footer-link">
                  <MapPin size={16} aria-hidden="true" />
                  Medellín, Colombia
                </span>
              </div>
              <div>
                <p className="footer-title">Red profesional</p>
                <a
                  className="footer-link"
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  LinkedIn
                </a>
                <a className="footer-link" href="#agendar">
                  <CalendarDays size={16} aria-hidden="true" />
                  Agendar una cita
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              © {new Date().getFullYear()} Xiomara Melguizo Martínez. Todos los
              derechos reservados.
            </div>
          </div>
        </footer>

        <a
          className="whatsapp-float"
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, vi tu página web y quiero más información sobre tus servicios.")}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribir por WhatsApp para solicitar información sobre los servicios"
        >
          <MessageCircle size={26} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </>
  )
}
