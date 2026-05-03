const RESEND_API_KEY = "re_bpLzvtv9_3e3chS1vo7JfKT8GfyB56wDB";
const FROM_EMAIL = 'onboarding@resend.dev';

async function sendMail() {
  console.log('Enviando email con logo dorado a globalservices.ven@gmail.com');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <!-- Header con Logo Dorado -->
    <div style="text-align:center;margin-bottom:32px;">
      <img src="https://cssg-b2b-machine.vercel.app/logo.png" alt="CSSG - Company Of Security And Service Global" style="width:120px;height:auto;margin-bottom:8px;" />
      <p style="color:#64748B;font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-top:4px;margin-bottom:0;">RIF: J-29782024-8</p>
    </div>
    
    <!-- Content -->
    <div style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;padding:32px;margin-bottom:24px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
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
          <li style="margin-bottom:8px;">Un <strong style="color:#0F172A;">Especialista Senior en Seguridad Corporativa</strong> está revisando sus requerimientos.</li>
          <li style="margin-bottom:8px;">Le contactaremos en las próximas <strong style="color:#0F172A;">24 horas hábiles</strong> para agendar una sesión explicativa de 15 minutos.</li>
          <li style="margin-bottom:8px;">Recibirá una <strong style="color:#0284C7;">Auditoría de Vulnerabilidad preliminar</strong> basada en los datos suministrados.</li>
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
    </div>
    
    <!-- Footer -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid #E2E8F0;">
      <p style="color:#475569;font-size:12px;margin:0;font-weight:600;">Company Of Security and Service Global</p>
      <p style="color:#64748B;font-size:11px;margin:4px 0 0;">Caracas, Venezuela · ISO 9001 · +17 años de experiencia</p>
      <p style="color:#64748B;font-size:10px;margin:16px 0 0;">
        <a href="https://globalservices-ven.com" style="color:#0284C7;text-decoration:none;font-weight:600;">globalservices-ven.com</a> · 
        Si no desea recibir más correos, responda a este email con "CANCELAR"
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: 'globalservices.ven@gmail.com',
        subject: '[EVALUACIÓN] Solicitud de Seguridad para su organización — Hola Nicky Rujano',
        html: html,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ ¡Email con logo dorado enviado exitosamente!');
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
