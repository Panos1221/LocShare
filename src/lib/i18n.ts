import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hero: {
        title: "Share Location",
        subtitle: "Instantly",
        description: "The simplest location sharing app. No accounts, no passwords, no personal data. Just share your location with friends using a passkey or link.",
        getStarted: "Get Started",
        learnMore: "Learn More",
      },
      install: {
        title: "Install as App",
        ios: "Tap the share button and select 'Add to Home Screen'",
        android: "Tap the menu button and select 'Install App'",
        tip: "Access LocShare faster from your home screen"
      },
      landing: {
        activeNow: "Active Now",
        live: "Live",
      },
      features: {
        title: "Why Use LocShare?",
        subtitle: "Simple, private, and built for real-time connection.",
        privacy: {
          title: "Private by Design",
          description: "No accounts, no tracking. Your location data is never stored."
        },
        device: {
          title: "Any Device",
          description: "Works on your phone, tablet, or computer. No app install needed."
        },
        navigation: {
          title: "Smart Navigation",
          description: "Navigate to your friends using Google Maps, Apple Maps, or Waze."
        },
        global: {
          title: "Works Everywhere",
          description: "Share your location across the globe with anyone, anywhere."
        },
        speed: {
          title: "Real-time Sync",
          description: "See movement instantly as it happens on the map."
        },
        secure: {
          title: "Private Groups",
          description: "Only people with your unique secret passkey can join your group."
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
          title: "Configure Your Session",
          description: "Choose a display name. Create a custom passkey or leave it blank to auto-generate a unique one.",
        },
        step2: {
          title: "Share the Access",
          description: "Share the invite link, QR code, or passkey with friends. They can join instantly by scanning or clicking.",
        },
        step3: {
          title: "Real-time Connection",
          description: "Once registered with the same passkey, everyone's location will be visible on the map instantly and securely.",
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
        passkeyHelper: "Optional - Leave blank to auto-generate a unique key",
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
        share: "Share Session",
      },
      share: {
        title: "Invite Friends",
        subtitle: "Share this QR code or link to let others join your session instantly.",
        copyLink: "Copy Invite Link",
        copied: "Copied!",
        scanQR: "Scan QR Code",
        passkey: "Passkey",
        shareVia: "Share via...",
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
        description: "La app más simple para compartir ubicación. Sin cuentas, sin contraseñas, sin datos personales. Solo comparte tu ubicación con amigos usando una clave o enlace.",
        getStarted: "Comenzar",
        learnMore: "Saber Más",
      },
      install: {
        title: "Instalar como App",
        ios: "Toca el botón compartir y selecciona 'Añadir a la pantalla de inicio'",
        android: "Toca el botón de menú y selecciona 'Instalar aplicación'",
        tip: "Accede a LocShare más rápido desde tu pantalla de inicio"
      },
      landing: {
        activeNow: "Activo Ahora",
        live: "En Vivo",
      },
      features: {
        title: "¿Por qué elegir LocShare?",
        subtitle: "Simple, privado y hecho para conectarse en tiempo real.",
        privacy: {
          title: "Privado por diseño",
          description: "Sin cuentas ni rastreo. Tus datos de ubicación nunca se guardan."
        },
        device: {
          title: "Cualquier Dispositivo",
          description: "Funciona en tu móvil, tablet u ordenador. Sin instalar apps."
        },
        navigation: {
          title: "Navegación Inteligente",
          description: "Navega hasta tus amigos con Google Maps, Apple Maps o Waze."
        },
        global: {
          title: "Funciona en Todas Partes",
          description: "Comparte tu ubicación en todo el mundo con quien sea y donde sea."
        },
        speed: {
          title: "Sincronización Real",
          description: "Mira el movimiento al instante mientras sucede en el mapa."
        },
        secure: {
          title: "Grupos Privados",
          description: "Solo personas con tu clave secreta única pueden unirse al grupo."
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
          title: "Configura tu Sesión",
          description: "Elige un nombre. Crea una clave personalizada o déjala en blanco para generar una única automáticamente.",
        },
        step2: {
          title: "Comparte el Acceso",
          description: "Comparte el enlace, código QR o clave con amigos. Pueden unirse al instante escaneando o haciendo clic.",
        },
        step3: {
          title: "Conexión en Tiempo Real",
          description: "Una vez registrados con la misma clave, la ubicación de todos será visible en el mapa de forma instantánea y segura.",
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
        passkeyHelper: "Opcional - Déjalo en blanco para generar una clave única",
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
        share: "Compartir Sesión",
      },
      share: {
        title: "Invitar Amigos",
        subtitle: "Comparte este código QR o enlace para que otros se unan al instante.",
        copyLink: "Copiar Enlace",
        copied: "¡Copiado!",
        scanQR: "Escanear QR",
        passkey: "Clave",
        shareVia: "Compartir vía...",
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
        description: "L'application de partage de position la plus simple. Pas de comptes, pas de mots de passe, pas de données personnelles. Partagez simplement votre position avec vos amis via une clé ou un lien.",
        getStarted: "Commencer",
        learnMore: "En Savoir Plus",
      },
      install: {
        title: "Installer comme App",
        ios: "Appuyez sur le bouton de partage et sélectionnez 'Sur l'écran d'accueil'",
        android: "Appuyez sur le bouton menu et sélectionnez 'Installer l'application'",
        tip: "Accédez à LocShare plus rapidement depuis votre écran d'accueil"
      },
      landing: {
        activeNow: "Actif Maintenant",
        live: "En Direct",
      },
      features: {
        title: "Pourquoi Choisir LocShare?",
        subtitle: "Simple, privé et conçu pour la connexion en temps réel.",
        privacy: {
          title: "Privé par Conception",
          description: "Pas de compte, pas de suivi. Vos données ne sont jamais stockées."
        },
        device: {
          title: "Tout Appareil",
          description: "Fonctionne sur votre téléphone, tablette ou ordinateur. Aucune installation requise."
        },
        navigation: {
          title: "Navigation Inteligente",
          description: "Naviguez vers vos amis avec Google Maps, Apple Maps ou Waze."
        },
        global: {
          title: "Marche Partout",
          description: "Partagez votre position dans le monde entier avec n'importe qui, n'importe où."
        },
        speed: {
          title: "Sync Temps Réel",
          description: "Voyez les mouvements instantanément au fur et à mesure qu'ils se produisent sur la carte."
        },
        secure: {
          title: "Groupes Privés",
          description: "Seules les personnes disposant de votre clé secrète unique peuvent rejoindre votre groupe."
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
          title: "Configurez Votre Session",
          description: "Choisissez un nom. Créez une clé personnalisée ou laissez vide pour en générer une unique automatiquement.",
        },
        step2: {
          title: "Partagez l'Accès",
          description: "Partagez le lien d'invitation, le code QR ou la clé. Ils peuvent rejoindre instantanément en scannant ou en cliquant.",
        },
        step3: {
          title: "Connexion en Temps Réel",
          description: "Une fois inscrits avec la même clé, la position de chacun sera visible instantanément et en toute sécurité sur la carte.",
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
        passkeyHelper: "Facultatif - Laisser vide pour générer une clé unique",
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
        share: "Partager la Session",
      },
      share: {
        title: "Inviter des Amis",
        subtitle: "Partagez ce code QR ou ce lien pour permettre aux autres de rejoindre instantanément.",
        copyLink: "Copier le Lien",
        copied: "Copié !",
        scanQR: "Scanner le QR",
        passkey: "Clé",
        shareVia: "Partager via...",
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
        description: "Die einfachste App zum Teilen des Standorts. Keine Konten, keine Passwörter, keine persönlichen Daten. Teilen Sie einfach Ihren Standort mit Freunden über einen Schlüssel oder Link.",
        getStarted: "Loslegen",
        learnMore: "Mehr erfahren",
      },
      install: {
        title: "Als App installieren",
        ios: "Tippen Sie auf die Teilen-Schaltfläche und wählen Sie 'Zum Home-Bildschirm'",
        android: "Tippen Sie auf die Menü-Schaltfläche und wählen Sie 'App installieren'",
        tip: "Greifen Sie schneller von Ihrem Home-Bildschirm auf LocShare zu"
      },
      landing: {
        activeNow: "Jetzt Aktiv",
        live: "Live",
      },
      features: {
        title: "Warum LocShare?",
        subtitle: "Einfach, privat und für Echtzeit-Verbindungen gebaut.",
        privacy: {
          title: "Privatphäre Design",
          description: "Keine Konten, kein Tracking. Ihre Standortdaten werden nie gespeichert."
        },
        device: {
          title: "Jedes Gerät",
          description: "Funktioniert auf Ihrem Handy, Tablet oder Computer. Keine App-Installation erforderlich."
        },
        navigation: {
          title: "Intelligente Navigation",
          description: "Navigieren Sie zu Ihren Freunden mit Google Maps, Apple Maps oder Waze."
        },
        global: {
          title: "Funktioniert Überall",
          description: "Teilen Sie Ihren Standort weltweit mit jedem und überall."
        },
        speed: {
          title: "Echtzeit-Sync",
          description: "Sehen Sie Bewegungen sofort, während sie auf der Karte passieren."
        },
        secure: {
          title: "Private Gruppen",
          description: "Nur Personen mit Ihrem eindeutigen geheimen Zugangsschlüssel können Ihrer Gruppe beitreten."
        }
      },
      kofi: {
        title: "Entwicklung Unterstützen",
        description: "LocShare ist kostenlos. Unterstützen Sie mich mit einem Kaffee!",
        button: "Kaffee spendieren",
        thankYou: "Jede Spende hilft den Service zu verbessern."
      },
      howItWorks: {
        title: "So funktioniert es",
        step1: {
          title: "Sitzung konfigurieren",
          description: "Wählen Sie einen Namen. Erstellen Sie einen eigenen Schlüssel oder lassen Sie ihn für einen automatischen leer.",
        },
        step2: {
          title: "Zugang Teilen",
          description: "Teilen Sie den Einladungslink, QR-Code oder Schlüssel. Freunde können durch Scannen oder Klicken sofort beitreten.",
        },
        step3: {
          title: "Echtzeit-Verbindung",
          description: "Sobald sie mit demselben Schlüssel registriert sind, wird der Standort aller Teilnehmer sofort und sicher auf der Karte angezeigt.",
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
        passkeyHelper: "Optional - Leer lassen für eindeutigen Auto-Schlüssel",
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
        share: "Sitzung Teilen",
      },
      share: {
        title: "Freunde Einladen",
        subtitle: "Teilen Sie diesen QR-Code oder Link, damit andere sofort beitreten können.",
        copyLink: "Link Kopieren",
        copied: "Kopiert!",
        scanQR: "QR Scannen",
        passkey: "Schlüssel",
        shareVia: "Teilen über...",
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
        description: "L'app più semplice per condividere la posizione. Niente account, password o dati personali. Condividi la tua posizione con gli amici usando una chiave o un link.",
        getStarted: "Inizia",
        learnMore: "Scopri di più",
      },
      install: {
        title: "Installa come App",
        ios: "Tocca il pulsante di condivisione e seleziona 'Aggiungi alla schermata Home'",
        android: "Tocca il pulsante del menu e seleziona 'Installa applicazione'",
        tip: "Accedi a LocShare più velocemente dalla tua schermata Home"
      },
      landing: {
        activeNow: "Attivo Ora",
        live: "Dal Vivo",
      },
      features: {
        title: "Perché LocShare?",
        subtitle: "Semplice, privato e creato per la connessione in tempo reale.",
        privacy: {
          title: "Privacy by Design",
          description: "Niente account, niente tracciamento. I tuoi dati di posizione non vengono mai memorizzati."
        },
        device: {
          title: "Qualsiasi Dispositivo",
          description: "Funziona sul tuo telefono, tablet o computer. Nessuna installazione richiesta."
        },
        navigation: {
          title: "Navigazione Intelligente",
          description: "Naviga verso i tuoi amici usando Google Maps, Apple Maps o Waze."
        },
        global: {
          title: "Funziona Ovunque",
          description: "Condividi la tua posizione in tutto il mondo con chiunque, ovunque."
        },
        speed: {
          title: "Sync Real-time",
          description: "Vedi i movimenti istantaneamente mentre accadono sulla mappa."
        },
        secure: {
          title: "Gruppi Privati",
          description: "Solo le persone con la tua chiave segreta univoca possono unirsi al tuo gruppo."
        }
      },
      kofi: {
        title: "Supporta lo Sviluppo",
        description: "LocShare è gratuito. Se ti piace, offrimi un caffè!",
        button: "Offrimi un Caffè",
        thankYou: "Ogni donazione aiuta a migliorare il servizio."
      },
      howItWorks: {
        title: "Come Funziona",
        step1: {
          title: "Configura la Sessione",
          description: "Scegli un nome. Crea una chiave personalizzata o lascia vuoto per generarne una unica automaticamente.",
        },
        step2: {
          title: "Condividi l'Accesso",
          description: "Condividi il link, codice QR o la chiave. Gli amici possono unirsi istantaneamente scansionando o cliccando.",
        },
        step3: {
          title: "Connessione in Tempo Reale",
          description: "Una volta registrati con la stessa chiave, la posizione di tutti sarà visibile sulla mappa istantaneamente e in modo sicuro.",
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
        passkeyHelper: "Opzionale - Lascia vuoto per generare chiave unica",
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
        share: "Condividi Sessione",
      },
      share: {
        title: "Invita Amici",
        subtitle: "Condividi questo codice QR o link per far unire gli altri istantaneamente.",
        copyLink: "Copia Link",
        copied: "Copiato!",
        scanQR: "Scansiona QR",
        passkey: "Chiave",
        shareVia: "Condividi tramite...",
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
        description: "A app mais simples para partilhar localização. Sem contas, senhas ou dados pessoais. Apenas partilhe com amigos usando uma chave de acesso ou link.",
        getStarted: "Começar",
        learnMore: "Saber Mais",
      },
      install: {
        title: "Instalar como App",
        ios: "Toque no botão de partilha e selecione 'Adicionar ao Ecrã Principal'",
        android: "Toque no botão do menu e selecione 'Instalar aplicação'",
        tip: "Aceda ao LocShare mais rapidamente a partir do seu ecrã principal"
      },
      landing: {
        activeNow: "Ativo Agora",
        live: "Ao Vivo",
      },
      features: {
        title: "Porquê LocShare?",
        subtitle: "Simples, privado e feito para ligação em tempo real.",
        privacy: {
          title: "Privacidade por Design",
          description: "Sem contas, sem rastreio. Os seus dados de localização nunca são guardados."
        },
        device: {
          title: "Qualquer Dispositivo",
          description: "Funciona no seu telemóvel, tablet ou computador. Sem instalação de apps."
        },
        navigation: {
          title: "Navegação Inteligente",
          description: "Navegue para os seus amigos usando Google Maps, Apple Maps ou Waze."
        },
        global: {
          title: "Funciona em Todo o Lado",
          description: "Partilhe a sua localização em todo o mundo com qualquer pessoa, em qualquer lugar."
        },
        speed: {
          title: "Sincronização Real",
          description: "Veja o movimento instantaneamente enquanto acontece no mapa."
        },
        secure: {
          title: "Grupos Privados",
          description: "Apenas pessoas com a sua chave secreta única podem juntar-se ao seu grupo."
        }
      },
      kofi: {
        title: "Apoiar Desenvolvimento",
        description: "LocShare é gratuito. Se gosta, ofereça-me um café!",
        button: "Oferecer um Café",
        thankYou: "Cada doação ajuda a melhorar o serviço."
      },
      howItWorks: {
        title: "Como Funciona",
        step1: {
          title: "Configure a sua Sessão",
          description: "Escolha um nome. Crie uma chave personalizada ou deixe em branco para gerar uma única automaticamente.",
        },
        step2: {
          title: "Partilhe o Acesso",
          description: "Partilhe o link, código QR ou chave. Os amigos podem juntar-se instantaneamente ao digitalizar ou clicar.",
        },
        step3: {
          title: "Ligação em Tempo Real",
          description: "Uma vez registados com a mesma chave, a localização de todos ficará visível no mapa instantaneamente e de forma segura.",
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
        passkeyHelper: "Opcional - Deixe vazio para gerar chave única",
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
        share: "Partilhar Sessão",
      },
      share: {
        title: "Convidar Amigos",
        subtitle: "Partilhe este código QR ou link para outros se juntarem instantaneamente.",
        copyLink: "Copiar Link",
        copied: "Copiado!",
        scanQR: "Digitalizar QR",
        passkey: "Chave",
        shareVia: "Partilhar via...",
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
