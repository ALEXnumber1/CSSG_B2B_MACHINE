const RESEND_API_KEY = "re_bpLzvtv9_3e3chS1vo7JfKT8GfyB56wDB";
const FROM_EMAIL = 'onboarding@resend.dev';

async function sendMail() {
  console.log('Enviando el email hiper-personalizado a globalservices.ven@gmail.com');

  const content = `
    <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a Nicky Rujano,</h2>
    <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Hemos recibido la información de su solicitud en representación de <strong style="color:#0284C7;">su organización</strong>.
    </p>
    <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
      En un entorno empresarial complejo donde la continuidad de operaciones y el blindaje de infraestructura crítica no admiten margen de error, en CSSG tomamos su seguridad con el máximo rigor estratégico.
    </p>

    <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
      <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Lo que esto significa para usted:</p>
      <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
        <li style="margin-bottom:8px;">✔️ Un <strong style="color:#0F172A;">Especialista Senior en Seguridad Corporativa</strong> está revisando sus requerimientos.</li>
        <li style="margin-bottom:8px;">✔️ Le contactaremos en las próximas <strong style="color:#0F172A;">24 horas hábiles</strong> para agendar una sesión explicativa de 15 minutos.</li>
        <li style="margin-bottom:8px;">✔️ Recibirá una <strong style="color:#0284C7;">Auditoría de Vulnerabilidad preliminar</strong> basada en los datos suministrados.</li>
      </ul>
    </div>

    <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
      ¿Por qué confiar en CSSG? Nuestra tasa de éxito es simple: Más de 17 años de experiencia y Cero Incidentes protegiendo embajadas del G7 y corporaciones internacionales en Venezuela.
    </p>

    <div style="text-align:center;margin:32px 0 16px;">
      <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
        Diagnosticar mis vulnerabilidades (ISO 31000)
      </a>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: 'globalservices.ven@gmail.com',
        subject: '[EVALUACIÓN] Solicitud de Seguridad para su organización — Hola Nicky Rujano',
        html: content,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ ¡Email hiper-personalizado enviado exitosamente!');
      console.log('Respuesta de Resend:', JSON.stringify(data, null, 2));
    } else {
      const err = await res.text();
      console.error('Error al enviar el email:', err);
    }
  } catch (err) {
    console.error('Error de red al conectar con Resend:', err);
  }
}

sendMail();
