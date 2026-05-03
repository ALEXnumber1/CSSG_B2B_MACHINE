import i18n from 'i18next';

const esRRHH = {
  "hero": {
    "badge": "Reclutamiento y Selección de Élite"
  }
};

const resources = {
  es: {
    translation: {
      nav: { inicio: 'Inicio' },
      rrhh: esRRHH
    },
    rrhh: esRRHH
  }
};

i18n.init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  defaultNS: 'translation',
  ns: ['translation', 'rrhh']
}).then(() => {
  console.log('Test defaultNS + prefix:', i18n.t('rrhh.hero.badge'));
  console.log('Test direct namespace:', i18n.t('rrhh:hero.badge'));
});
