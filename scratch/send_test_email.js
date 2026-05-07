const RESEND_API_KEY = 're_bpLzvtv9_3e3chS1vo7JfKT8GfyB56wDB';
const FROM_EMAIL = 'onboarding@resend.dev';
const TO_EMAIL = 'globalservices.ven@gmail.com';

function baseTemplate(content) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <img src="https://cssg-b2b-machine.vercel.app/logo.png" alt="CSSG - Company Of Security And Service Global" style="width:120px;height:auto;margin-bottom:8px;" />
      <p style="color:#64748B;font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-top:4px;margin-bottom:0;">RIF: J-29782024-8</p>
    </div>
    
    <!-- Content -->
    <div style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;padding:32px;margin-bottom:24px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
      ${content}
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
}

const htmlContent = baseTemplate(`
  <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Hola Royner (Prueba de Lead),</h2>
  <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0- 16px;">
    El informe preliminar de vulnerabilidades ha sido generado exitosamente.
  </p>
  <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
    Nuestros analistas han procesado las variables ingresadas y el sistema ha generado su diagnóstico inicial. Si su score presenta áreas críticas, cada minuto cuenta para corregir vulnerabilidades en el perímetro, protección física o seguridad de la información.
  </p>

  <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
    <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Próximos pasos recomendados:</p>
    <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
      <li style="margin-bottom:8px;">✔️ Revise el PDF generado para entender sus brechas de seguridad.</li>
      <li style="margin-bottom:8px;">✔️ Agende una sesión gratuita de 15 minutos para interpretar los resultados a profundidad.</li>
      <li style="margin-bottom:8px;">✔️ Conozca cómo nuestro plan estratégico puede reducir hasta un 40% sus costos actuales en seguridad.</li>
    </ul>
  </div>

  <div style="text-align:center;margin:32px 0 16px;">
    <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
      Agendar Sesión de Consulta Gratuita
    </a>
  </div>
`);

async function sendEmail() {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: '📋 [TEST] Informe de vulnerabilidades listo para Royner — CSSG',
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Error de Resend:', err);
    } else {
      console.log('✅ Email enviado exitosamente a globalservices.ven@gmail.com');
    }
  } catch (err) {
    console.error('Error de red:', err);
  }
}

sendEmail();
