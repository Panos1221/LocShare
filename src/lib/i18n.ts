import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hero: {
        title: "Share Location",
        subtitle: "Instantly",
        description: "The simplest location sharing app. No accounts, no passwords, no personal data. Just share your location with friends using a passkey.",
        getStarted: "Get Started",
        learnMore: "Learn More",
      },
      landing: {
        activeNow: "Active Now",
        live: "Live",
      },
      features: {
        title: "Why Choose LocShare?",
        subtitle: "Built for privacy, speed, and ease of use.",
        privacy: {
          title: "Private by Design",
          description: "Tracking is disabled. No data collection."
        },
        device: {
          title: "Any Device",
          description: "Works on iOS, Android, and Desktop. No app install needed."
        },
        battery: {
          title: "Battery Efficient",
          description: "Optimized to use minimal battery while keeping you connected."
        },
        global: {
          title: "Works Everywhere",
          description: "Share your location across the globe with low latency."
        },
        speed: {
          title: "Real-time Sync",
          description: "See updates instantly as they happen."
        },
        secure: {
          title: "Secure Groups",
          description: "Only people with your unique passkey can join."
        }
      },
      kofi: {
        title: "Support Development",
        description: "LocShare is free and open source. If you find it useful, consider buying me a coffee to help keep the servers running!",
        button: "Buy me a Coffee",
        thankYou: "Every donation helps improve the service."
      },
      howItWorks: {
        title: "How It Works",
        step1: {
          title: "Enter Your Details",
          description: "Choose a name, create a passkey for your group, and pick your marker color.",
        },
        step2: {
          title: "Share the Passkey",
          description: "Send the passkey to your friends. It's case-sensitive, so 'test' differs from 'Test'.",
        },
        step3: {
          title: "See Each Other",
          description: "Everyone with the same passkey sees each other's location in real-time on the map.",
        },
      },
      privacy: {
        title: "Your Privacy Matters",
        description: "Privacy is a core priority. Here's how protection is ensured:",
        noStorage: "No permanent data storage",
        voluntary: "Location sharing is completely voluntary",
        ephemeral: "Data deleted when you disconnect",
        noAccounts: "No accounts or passwords required",
      },
      register: {
        title: "Join a Group",
        subtitle: "Enter your details to start sharing your location",
        name: "Your Name",
        namePlaceholder: "Enter a unique name",
        nameHelper: "Choose a unique name within your group",
        passkey: "Group Passkey",
        passkeyPlaceholder: "Enter your group's passkey",
        passkeyHelper: "Case sensitive - share this with your group",
        color: "Marker Color",
        colorHelper: "Your pin color on the map",
        submit: "Start Sharing",
        back: "Back to Home",
      },
      map: {
        title: "Group Map",
        connected: "Connected",
        disconnected: "Disconnected",
        members: "members",
        leave: "Leave Group",
        you: "You",
        lastSeen: "Last seen",
        sharingLocation: "Sharing your location...",
        stopSharing: "Stop Sharing",
        startSharing: "Start Sharing",
        enterToken: "Enter Mapbox Token",
        tokenPlaceholder: "Your Mapbox public token",
        tokenHelper: "Get your token from mapbox.com",
        confirm: "Confirm",
        mapStyle: "Map Style",
        locateMe: "Locate Me",
        resetBearing: "Reset Bearing",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        error: "Geolocation Error",
      },
      common: {
        loading: "Loading...",
        error: "Something went wrong",
        retry: "Try Again",
      },
      footer: {
        madeBy: "Made by",
        privacy: "Privacy First",
      },
    },
  },
  es: {
    translation: {
      hero: {
        title: "Comparte Ubicación",
        subtitle: "Al Instante",
        description: "La app más simple para compartir ubicación. Sin cuentas, sin contraseñas, sin datos personales. Solo comparte tu ubicación con amigos usando una clave.",
        getStarted: "Comenzar",
        learnMore: "Saber Más",
      },
      landing: {
        activeNow: "Activo Ahora",
        live: "En Vivo",
      },
      features: {
        title: "¿Por qué elegir LocShare?",
        subtitle: "Creado para privacidad, velocidad y facilidad de uso.",
        privacy: {
          title: "Privado por diseño",
          description: "Tus datos de ubicación están encriptados y son efímeros."
        },
        device: {
          title: "Cualquier Dispositivo",
          description: "Funciona en iOS, Android y PC. Sin instalar apps."
        },
        battery: {
          title: "Batería Eficiente",
          description: "Optimizado para usar mínima batería mientras te mantiene conectado."
        },
        global: {
          title: "Funciona en Todas Partes",
          description: "Comparte tu ubicación en todo el mundo con baja latencia."
        },
        speed: {
          title: "Sincronización Real",
          description: "Ver actualizaciones al instante."
        },
        secure: {
          title: "Grupos Seguros",
          description: "Solo personas con tu clave única pueden unirse."
        }
      },
      kofi: {
        title: "Apoya el Desarrollo",
        description: "LocShare es gratuito y de código abierto. Si te es útil, ¡considera invitarme un café para mantener los servidores!",
        button: "Invítame un Café",
        thankYou: "Cada donación ayuda a mejorar el servicio."
      },
      howItWorks: {
        title: "Cómo Funciona",
        step1: {
          title: "Ingresa tus Datos",
          description: "Elige un nombre, crea una clave para tu grupo y selecciona el color de tu marcador.",
        },
        step2: {
          title: "Comparte la Clave",
          description: "Envía la clave a tus amigos. Distingue mayúsculas, 'test' es diferente de 'Test'.",
        },
        step3: {
          title: "Véanse",
          description: "Todos con la misma clave ven la ubicación de los demás en tiempo real en el mapa.",
        },
      },
      privacy: {
        title: "Tu Privacidad Importa",
        description: "La privacidad es una prioridad. Así se garantiza la protección:",
        noStorage: "Sin almacenamiento permanente",
        voluntary: "Compartir ubicación es voluntario",
        ephemeral: "Datos eliminados al desconectarte",
        noAccounts: "Sin cuentas ni contraseñas",
      },
      register: {
        title: "Únete a un Grupo",
        subtitle: "Ingresa tus datos para comenzar a compartir tu ubicación",
        name: "Tu Nombre",
        namePlaceholder: "Ingresa un nombre único",
        nameHelper: "Elige un nombre único en tu grupo",
        passkey: "Clave del Grupo",
        passkeyPlaceholder: "Ingresa la clave de tu grupo",
        passkeyHelper: "Distingue mayúsculas - compártela con tu grupo",
        color: "Color del Marcador",
        colorHelper: "Tu color de pin en el mapa",
        submit: "Comenzar a Compartir",
        back: "Volver al Inicio",
      },
      map: {
        title: "Mapa del Grupo",
        connected: "Conectado",
        disconnected: "Desconectado",
        members: "miembros",
        leave: "Salir del Grupo",
        you: "Tú",
        lastSeen: "Visto",
        sharingLocation: "Compartiendo tu ubicación...",
        stopSharing: "Dejar de compartir",
        startSharing: "Empezar a compartir",
        enterToken: "Ingresa Token de Mapbox",
        tokenPlaceholder: "Tu token público de Mapbox",
        tokenHelper: "Obtén tu token en mapbox.com",
        confirm: "Confirmar",
        mapStyle: "Estilo del Mapa",
        locateMe: "Ubícame",
        resetBearing: "Restablecer Orientación",
        zoomIn: "Acercar",
        zoomOut: "Alejar",
        error: "Error de Geolocalización",
      },
      common: {
        loading: "Cargando...",
        error: "Algo salió mal",
        retry: "Reintentar",
      },
      footer: {
        madeBy: "Hecho por",
        privacy: "Privacidad Primero",
      },
    },
  },
  fr: {
    translation: {
      hero: {
        title: "Partagez Votre",
        subtitle: "Position",
        description: "L'application de partage de position la plus simple. Pas de comptes, pas de mots de passe, pas de données personnelles. Partagez simplement votre position avec vos amis via une clé.",
        getStarted: "Commencer",
        learnMore: "En Savoir Plus",
      },
      landing: {
        activeNow: "Actif Maintenant",
        live: "En Direct",
      },
      features: {
        title: "Pourquoi Choisir LocShare?",
        subtitle: "Conçu pour la confidentialité, la vitesse et la simplicité.",
        privacy: {
          title: "Privé par Conception",
          description: "Vos données de location sont cryptées et éphémères."
        },
        device: {
          title: "Tout Appareil",
          description: "Marche sur iOS, Android et PC. Pas d'installation requise."
        },
        battery: {
          title: "Batterie Efficace",
          description: "Optimisé pour minimiser l'usage de la batterie."
        },
        global: {
          title: "Marche Partout",
          description: "Partagez votre position partout dans le monde."
        },
        speed: {
          title: "Sync Temps Réel",
          description: "Voyez les mises à jour instantanément."
        },
        secure: {
          title: "Groupes Sécurisés",
          description: "Seuls les détenteurs de la clé peuvent rejoindre."
        }
      },
      kofi: {
        title: "Soutenir le Développement",
        description: "LocShare est gratuit. Si vous aimez, offrez-moi un café pour aider !",
        button: "M'offrir un Café",
        thankYou: "Chaque don aide à améliorer le service."
      },
      howItWorks: {
        title: "Comment Ça Marche",
        step1: {
          title: "Entrez Vos Infos",
          description: "Choisissez un nom, créez une clé pour votre groupe et sélectionnez la couleur de votre marqueur.",
        },
        step2: {
          title: "Partagez la Clé",
          description: "Envoyez la clé à vos amis. Elle est sensible à la casse, 'test' diffère de 'Test'.",
        },
        step3: {
          title: "Voyez-Vous",
          description: "Tous ceux avec la même clé voient la position des autres en temps réel sur la carte.",
        },
      },
      privacy: {
        title: "Votre Vie Privée Compte",
        description: "La vie privée est une priorité. Voici comment la protection est assurée :",
        noStorage: "Pas de stockage permanent",
        voluntary: "Partage de position volontaire",
        ephemeral: "Données supprimées à la déconnexion",
        noAccounts: "Pas de comptes ni mots de passe",
      },
      register: {
        title: "Rejoindre un Groupe",
        subtitle: "Entrez vos informations pour commencer à partager votre position",
        name: "Votre Nom",
        namePlaceholder: "Entrez un nom unique",
        nameHelper: "Choisissez un nom unique dans votre groupe",
        passkey: "Clé du Groupe",
        passkeyPlaceholder: "Entrez la clé de votre groupe",
        passkeyHelper: "Sensible à la casse - partagez avec votre groupe",
        color: "Couleur du Marqueur",
        colorHelper: "Votre couleur de pin sur la carte",
        submit: "Commencer le Partage",
        back: "Retour à l'Accueil",
      },
      map: {
        title: "Carte du Groupe",
        connected: "Connecté",
        disconnected: "Déconnecté",
        members: "membres",
        leave: "Quitter le Groupe",
        you: "Vous",
        lastSeen: "Vu",
        sharingLocation: "Partage de votre position...",
        stopSharing: "Arrêter le partage",
        startSharing: "Commencer à partager",
        enterToken: "Entrez le Token Mapbox",
        tokenPlaceholder: "Votre token public Mapbox",
        tokenHelper: "Obtenez votre token sur mapbox.com",
        confirm: "Confirmer",
        mapStyle: "Style de Carte",
        locateMe: "Me Localiser",
        resetBearing: "Réinitialiser l'Orientation",
        zoomIn: "Zoom Avant",
        zoomOut: "Zoom Arrière",
        error: "Erreur de Géolocalisation",
      },
      common: {
        loading: "Chargement...",
        error: "Une erreur est survenue",
        retry: "Réessayer",
      },
      footer: {
        madeBy: "Fait par",
        privacy: "Confidentialité d'Abord",
      },
    },
  },
  de: {
    translation: {
      hero: {
        title: "Standort Teilen",
        subtitle: "Sofort",
        description: "Die einfachste App zum Teilen des Standorts. Keine Konten, keine Passwörter, keine persönlichen Daten. Teilen Sie einfach Ihren Standort mit Freunden über einen Zugangsschlüssel.",
        getStarted: "Loslegen",
        learnMore: "Mehr erfahren",
      },
      landing: {
        activeNow: "Jetzt Aktiv",
        live: "Live",
      },
      features: {
        title: "Warum LocShare?",
        subtitle: "Gebaut für Privatsphäre, Geschwindigkeit und Einfachheit.",
        privacy: {
          title: "Privatphäre Design",
          description: "Ihre Standortdaten sind verschlüsselt und flüchtig."
        },
        device: {
          title: "Jedes Gerät",
          description: "Funktioniert auf iOS, Android und Desktop. Keine Installation."
        },
        battery: {
          title: "Batterieeffizient",
          description: "Optimiert für minimalen Batterieverbrauch."
        },
        global: {
          title: "Funktioniert Überall",
          description: "Teilen Sie Ihren Standort weltweit."
        },
        speed: {
          title: "Echtzeit-Sync",
          description: "Sehen Sie Updates sofort."
        },
        secure: {
          title: "Sichere Gruppen",
          description: "Nur Personen mit Ihrem Schlüssel können beitreten."
        }
      },
      kofi: {
        title: "Entwicklung Unterstützen",
        description: "LocShare ist kostenlos. Unterstützen Sie mich mit einem Kaffee!",
        button: "Kaffee spendieren",
        thankYou: "Jede Spende hilft den Service zu verbessern."
      },
      howItWorks: {
        title: "Wie es funktioniert",
        step1: {
          title: "Details eingeben",
          description: "Wählen Sie einen Namen, erstellen Sie einen Zugangsschlüssel für Ihre Gruppe und wählen Sie Ihre Markierungsfarbe.",
        },
        step2: {
          title: "Schlüssel teilen",
          description: "Senden Sie den Schlüssel an Freunde. Er unterscheidet Groß-/Kleinschreibung ('test' ≠ 'Test').",
        },
        step3: {
          title: "Sich gegenseitig sehen",
          description: "Alle mit demselben Schlüssel sehen sich gegenseitig in Echtzeit auf der Karte.",
        },
      },
      privacy: {
        title: "Ihre Privatsphäre zählt",
        description: "Datenschutz hat Priorität. So wird Ihr Schutz gewährleistet:",
        noStorage: "Keine dauerhafte Speicherung",
        voluntary: "Standortfreigabe ist freiwillig",
        ephemeral: "Daten werden beim Trennen gelöscht",
        noAccounts: "Keine Konten oder Passwörter",
      },
      register: {
        title: "Gruppe beitreten",
        subtitle: "Geben Sie Ihre Daten ein, um Ihren Standort zu teilen",
        name: "Ihr Name",
        namePlaceholder: "Eindeutigen Namen eingeben",
        nameHelper: "Wählen Sie einen eindeutigen Namen in Ihrer Gruppe",
        passkey: "Gruppenschlüssel",
        passkeyPlaceholder: "Geben Sie Ihren Gruppenschlüssel ein",
        passkeyHelper: "Groß-/Kleinschreibung beachten",
        color: "Markierungsfarbe",
        colorHelper: "Ihre Pin-Farbe auf der Karte",
        submit: "Teilen starten",
        back: "Zurück zur Startseite",
      },
      map: {
        title: "Gruppenkarte",
        connected: "Verbunden",
        disconnected: "Getrennt",
        members: "Mitglieder",
        leave: "Gruppe verlassen",
        you: "Sie",
        lastSeen: "Zuletzt gesehen",
        sharingLocation: "Standort wird geteilt...",
        stopSharing: "Nicht mehr teilen",
        startSharing: "Teilen starten",
        enterToken: "Mapbox Token eingeben",
        tokenPlaceholder: "Ihr öffentlicher Mapbox Token",
        tokenHelper: "Token von mapbox.com erhalten",
        confirm: "Bestätigen",
        mapStyle: "Kartenstil",
        locateMe: "Mein Standort",
        resetBearing: "Ausrichtung zurücksetzen",
        zoomIn: "Vergrößern",
        zoomOut: "Verkleinern",
        error: "Geolocation-Fehler",
      },
      common: {
        loading: "Laden...",
        error: "Etwas ist schief gelaufen",
        retry: "Erneut versuchen",
      },
      footer: {
        madeBy: "Gemacht von",
        privacy: "Privatsphäre zuerst",
      },
    },
  },
  it: {
    translation: {
      hero: {
        title: "Condividi Posizione",
        subtitle: "Istantaneamente",
        description: "L'app più semplice per condividere la posizione. Niente account, password o dati personali. Condividi la tua posizione con gli amici usando una chiave di accesso.",
        getStarted: "Inizia",
        learnMore: "Scopri di più",
      },
      landing: {
        activeNow: "Attivo Ora",
        live: "Dal Vivo",
      },
      features: {
        title: "Perché LocShare?",
        subtitle: "Costruito per privacy, velocità e semplicità.",
        privacy: {
          title: "Privacy by Design",
          description: "I tuoi dati sono crittografati ed effimeri."
        },
        device: {
          title: "Qualsiasi Dispositivo",
          description: "Funziona su iOS, Android e Desktop. Nessuna installazione."
        },
        battery: {
          title: "Batteria Efficiente",
          description: "Ottimizzato per un consumo minimo della batteria."
        },
        global: {
          title: "Funziona Ovunque",
          description: "Condividi la tua posizione in tutto il mondo."
        },
        speed: {
          title: "Sync Real-time",
          description: "Vedi gli aggiornamenti istantaneamente."
        },
        secure: {
          title: "Gruppi Sicuri",
          description: "Solo chi ha la chiave può unirsi."
        }
      },
      kofi: {
        title: "Supporta lo Sviluppo",
        description: "LocShare è gratuito. Se ti piace, offrimi un caffè!",
        button: "Offrimi un Caffè",
        thankYou: "Ogni donazione aiuta a migliorare il servizio."
      },
      howItWorks: {
        title: "Come funziona",
        step1: {
          title: "Inserisci i tuoi dati",
          description: "Scegli un nome, crea una chiave per il tuo gruppo e scegli il colore del marcatore.",
        },
        step2: {
          title: "Condividi la chiave",
          description: "Invia la chiave agli amici. Fa distinzione tra maiuscole e minuscole ('test' ≠ 'Test').",
        },
        step3: {
          title: "Vedetevi a vicenda",
          description: "Tutti coloro con la stessa chiave si vedono in tempo reale sulla mappa.",
        },
      },
      privacy: {
        title: "La tua privacy conta",
        description: "La privacy è una priorità. Ecco come viene garantita la protezione:",
        noStorage: "Nessuna archiviazione permanente",
        voluntary: "Condivisione volontaria",
        ephemeral: "Dati eliminati alla disconnessione",
        noAccounts: "Niente account o password",
      },
      register: {
        title: "Unisciti a un gruppo",
        subtitle: "Inserisci i tuoi dati per iniziare a condividere",
        name: "Il tuo nome",
        namePlaceholder: "Inserisci un nome univoco",
        nameHelper: "Scegli un nome univoco nel gruppo",
        passkey: "Chiave del gruppo",
        passkeyPlaceholder: "Inserisci la chiave del gruppo",
        passkeyHelper: "Distingue maiuscole e minuscole",
        color: "Colore marcatore",
        colorHelper: "Il tuo colore sulla mappa",
        submit: "Condividi ora",
        back: "Torna alla Home",
      },
      map: {
        title: "Mappa Gruppo",
        connected: "Connesso",
        disconnected: "Disconnesso",
        members: "membri",
        leave: "Lascia Gruppo",
        you: "Tu",
        lastSeen: "Ultimo accesso",
        sharingLocation: "Condividendo la posizione...",
        stopSharing: "Interrompi condivisione",
        startSharing: "Inizia a condividere",
        enterToken: "Inserisci Token Mapbox",
        tokenPlaceholder: "Il tuo token pubblico Mapbox",
        tokenHelper: "Ottieni token su mapbox.com",
        confirm: "Conferma",
        mapStyle: "Stile Mappa",
        locateMe: "Trovami",
        resetBearing: "Reimposta orientamento",
        zoomIn: "Zoom avanti",
        zoomOut: "Zoom indietro",
        error: "Errore di Geolocalizzazione",
      },
      common: {
        loading: "Caricamento...",
        error: "Qualcosa è andato storto",
        retry: "Riprova",
      },
      footer: {
        madeBy: "Fatto da",
        privacy: "Privacy Prima di Tutto",
      },
    },
  },
  pt: {
    translation: {
      hero: {
        title: "Partilhar Localização",
        subtitle: "Instantaneamente",
        description: "A app mais simples para partilhar localização. Sem contas, senhas ou dados pessoais. Apenas partilhe com amigos usando uma chave de acesso.",
        getStarted: "Começar",
        learnMore: "Saber Mais",
      },
      landing: {
        activeNow: "Ativo Agora",
        live: "Ao Vivo",
      },
      features: {
        title: "Porquê LocShare?",
        subtitle: "Construído para privacidade, velocidade e facilidade.",
        privacy: {
          title: "Privacidade por Design",
          description: "Os seus dados são encriptados e efémeros."
        },
        device: {
          title: "Qualquer Dispositivo",
          description: "Funciona em iOS, Android e Desktop. Sem instalação."
        },
        battery: {
          title: "Bateria Eficiente",
          description: "Otimizado para consumo mínimo de bateria."
        },
        global: {
          title: "Funciona em Todo o Lado",
          description: "Partilhe a sua localização globalmente."
        },
        speed: {
          title: "Sincronização Real",
          description: "Veja atualizações instantaneamente."
        },
        secure: {
          title: "Grupos Seguros",
          description: "Apenas pessoas com a chave podem entrar."
        }
      },
      kofi: {
        title: "Apoiar Desenvolvimento",
        description: "LocShare é gratuito. Se gosta, ofereça-me um café!",
        button: "Oferecer um Café",
        thankYou: "Cada doação ajuda a melhorar o serviço."
      },
      howItWorks: {
        title: "Como funciona",
        step1: {
          title: "Insira os seus dados",
          description: "Escolha um nome, crie uma chave para o seu grupo e escolha a cor do marcador.",
        },
        step2: {
          title: "Partilhe a chave",
          description: "Envie a chave aos amigos. Diferencia maiúsculas de minúsculas ('test' ≠ 'Test').",
        },
        step3: {
          title: "Vejam-se",
          description: "Todos com a mesma chave veem-se em tempo real no mapa.",
        },
      },
      privacy: {
        title: "A sua privacidade importa",
        description: "A privacidade é uma prioridade. Como a proteção é garantida:",
        noStorage: "Sem armazenamento permanente",
        voluntary: "Partilha voluntária",
        ephemeral: "Dados apagados ao desconectar",
        noAccounts: "Sem contas ou senhas",
      },
      register: {
        title: "Juntar-se a um grupo",
        subtitle: "Insira os seus dados para começar a partilhar",
        name: "O seu nome",
        namePlaceholder: "Insira um nome único",
        nameHelper: "Escolha um nome único no grupo",
        passkey: "Chave do grupo",
        passkeyPlaceholder: "Insira a chave do grupo",
        passkeyHelper: "Diferencia maiúsculas de minúsculas",
        color: "Cor do marcador",
        colorHelper: "A sua cor no mapa",
        submit: "Começar a Partilhar",
        back: "Voltar ao Início",
      },
      map: {
        title: "Mapa de Grupo",
        connected: "Conectado",
        disconnected: "Desconectado",
        members: "membros",
        leave: "Sair do Grupo",
        you: "Você",
        lastSeen: "Visto por último",
        sharingLocation: "A partilhar localização...",
        stopSharing: "Parar Partilha",
        startSharing: "Começar a Partilhar",
        enterToken: "Inserir Token Mapbox",
        tokenPlaceholder: "O seu token público Mapbox",
        tokenHelper: "Obtenha o token em mapbox.com",
        confirm: "Confirmar",
        mapStyle: "Estilo do Mapa",
        locateMe: "Localizar-me",
        resetBearing: "Repor Orientação",
        zoomIn: "Aumentar Zoom",
        zoomOut: "Diminuir Zoom",
        error: "Erro de Geolocalização",
      },
      common: {
        loading: "A carregar...",
        error: "Algo correu mal",
        retry: "Tentar Novamente",
      },
      footer: {
        madeBy: "Feito por",
        privacy: "Privacidade Primeiro",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: navigator.language.split('-')[0] || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
