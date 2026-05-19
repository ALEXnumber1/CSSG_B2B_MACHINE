import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Cargar .env.local de forma manual
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[key] = value.trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://vqisebdthsowhpfpugrb.supabase.co';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
const resendApiKey = env.VITE_RESEND_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixAndSend() {
  console.log("=== Corrigiendo correo del lead ===");
  
  // 1. Corregir el correo en la base de datos
  const { data: updatedLeads, error: updateError } = await supabase
    .from('leads')
    .update({ correo: 'steeventianguillen@gmail.com' })
    .eq('id', '37983793-5bd9-4402-a02e-17de015078e7')
    .select();

  if (updateError) {
    console.error("Error al actualizar lead:", updateError);
    return;
  }

  console.log("Lead corregido:", updatedLeads);

  // 2. Enviar el email de Escudo Diplomático usando Resend directamente
  if (resendApiKey) {
    console.log("\n=== Enviando correo de confirmación de Escudo Diplomático ===");
    
    const FROM_EMAIL = 'CSSG <operaciones@cssg-global.com>';
    const to = 'steeventianguillen@gmail.com';
    const nombre = 'sebastian guillen';
    const empresa = updatedLeads[0].empresa;

    const htmlContent = `
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
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hemos recibido su solicitud de calificación para el servicio exclusivo de **Escudo Diplomático** de CSSG${empresa ? ` en representación de <strong style="color:#D4AF37;">${empresa}</strong>` : ''}.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Debido a los rigurosos estándares y al carácter confidencial de este servicio (diseñado originalmente bajo parámetros G7 para delegaciones internacionales y directivos de élite), el acceso a nuestro esquema de protección está limitado y sujeto a una evaluación de seguridad preliminar.
      </p>

      <div style="background-color:#FFFDF5;border:1px solid #F3E5AB;border-radius:12px;padding:24px;margin:24px 0;border-left:4px solid #D4AF37;">
        <p style="color:#856404;font-size:16px;margin:0 0 12px;font-weight:700;">Próximos pasos en su calificación:</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ Nuestro <strong>Comité de Evaluación Táctica</strong> revisará los datos suministrados de forma estrictamente confidencial.</li>
          <li style="margin-bottom:8px;">✔️ Un <strong>Consultor Especialista Senior</strong> se pondrá en contacto con usted a través de los canales seguros proporcionados en un plazo de <strong>12 a 24 horas</strong>.</li>
          <li style="margin-bottom:8px;">✔️ Si cumple con el perfil requerido, programaremos una entrevista presencial o virtual cifrada.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        Si desea acelerar el proceso o requiere asistencia inmediata para una situación de riesgo inminente, puede contactar directamente a nuestra central de operaciones 24/7.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="tel:+5804241782091" style="display:inline-block;background-color:#D4AF37;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(212, 175, 55, 0.4);">
          Llamar a Central Operativa B2B
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid #E2E8F0;">
      <p style="color:#475569;font-size:12px;margin:0;font-weight:600;">Company Of Security and Service Global</p>
      <p style="color:#64748B;font-size:11px;margin:4px 0 0;">Caracas, Venezuela · ISO 9001 · +17 años de experiencia</p>
      <p style="color:#64748B;font-size:10px;margin:16px 0 0;">
        <a href="https://globalservices-ven.com" style="color:#0284C7;text-decoration:none;font-weight:600;">globalservices-ven.com</a>
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
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to,
          subject: `🔒 Solicitud de Evaluación: Escudo Diplomático CSSG — Hola ${nombre}`,
          html: htmlContent,
        }),
      });

      if (res.ok) {
        console.log("¡Correo enviado con éxito a steeventianguillen@gmail.com!");
        
        // Registrar en email_sequences
        await supabase.from('email_sequences').insert([{
          lead_id: '37983793-5bd9-4402-a02e-17de015078e7',
          template_key: 'escudo_diplomatico_1',
          enviado_at: new Date().toISOString(),
          status: 'sent'
        }]);
        
        // Actualizar el lead a emails_enviados = 1
        await supabase.from('leads').update({ emails_enviados: 1 }).eq('id', '37983793-5bd9-4402-a02e-17de015078e7');
      } else {
        const errText = await res.text();
        console.error("Error de Resend:", errText);
      }
    } catch (e) {
      console.error("Error al enviar email:", e);
    }
  } else {
    console.log("No hay API Key de Resend configurada en .env.local");
  }
}

fixAndSend();
