const RESEND_API_KEY = "re_bpLzvtv9_3e3chS1vo7JfKT8GfyB56wDB";
const FROM_EMAIL = 'onboarding@resend.dev';

async function sendMail() {
  console.log('Enviando el primer email con el diseño premium a globalservices.ven@gmail.com');

  const content = `
    <h2 style="color:#FFFFFF;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a Nicky Rujano,</h2>
    <p style="color:#9CA3AF;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Recibimos sus datos con éxito. En un entorno corporativo donde la continuidad de la operación y el blindaje de activos son prioridades críticas, valoramos la confianza depositada en CSSG.
    </p>
    <div style="background-color:#0EA5E910;border:1px solid #0EA5E930;border-radius:12px;padding:24px;margin:24px 0;">
      <p style="color:#E2E8F0;font-size:15px;margin:0 0 8px;font-weight:600;">¿Qué sucede a continuación?</p>
      <ul style="color:#9CA3AF;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
        <li>Un <strong style="color:#0EA5E9;">Analista Senior de Riesgos</strong> evaluará la información de su solicitud.</li>
        <li>Le contactaremos en las próximas <strong style="color:#E2E8F0;">24 horas hábiles</strong> para agendar una sesión explicativa de 15 minutos.</li>
        <li>Diseñaremos un plan estratégico a medida según sus vulnerabilidades específicas.</li>
      </ul>
    </div>
    <p style="color:#E2E8F0;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
      Nuestra misión es simple: Más de 17 años de experiencia y Cero Incidentes en Embajadas y Corporaciones de Alto Nivel.
    </p>
    <div style="text-align:center;">
      <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 14px 0 rgba(14, 165, 233, 0.4);">
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
        subject: 'Su solicitud y diagnóstico de seguridad están siendo procesados — CSSG',
        html: content,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ ¡Email premium enviado exitosamente!');
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
