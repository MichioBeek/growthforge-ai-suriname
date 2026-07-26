import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import Footer from '../components/Footer.jsx'

const LAST_UPDATED = '26 juli 2026'

function Section({ id, number, title, children }) {
  return (
    <section id={id} className="border-t border-platinum/10 pt-10 mt-10 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="font-sora text-xl md:text-2xl font-semibold tracking-[-0.01em] text-ice">
        <span className="mono-label mr-2 text-ion">{number}.</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] md:text-base leading-relaxed text-platinum">
        {children}
      </div>
    </section>
  )
}

function Bold({ children }) {
  return <strong className="font-semibold text-ice">{children}</strong>
}

export default function Voorwaarden() {
  useEffect(() => {
    document.title = 'Algemene Voorwaarden — GrowthForge AI'
  }, [])

  return (
    <div className="relative min-h-screen bg-void">
      {/* Simple static header — orientation only, not the full animated Navbar */}
      <header className="border-b border-platinum/10 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-sora font-semibold text-ice text-[15px] md:text-base tracking-[-0.02em] whitespace-nowrap"
          >
            <Logo className="h-7 w-7 md:h-8 md:w-8 rounded-[12px] shadow-ion-glow" />
            GrowthForge AI
          </Link>

          <Link to="/" className="link-lift mono-label text-[12px] text-platinum md:text-[13px]">
            &larr; Terug naar home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Page hero */}
          <div className="mb-14 md:mb-16">
            <p className="mono-label text-ion text-[13px] md:text-[14px] uppercase">Juridisch</p>
            <h1 className="mt-3 font-sora font-bold text-ice text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em]">
              Algemene Voorwaarden
            </h1>
            <p className="mt-3 text-[15px] text-platinum opacity-90">
              <Bold>Laatst bijgewerkt:</Bold> {LAST_UPDATED}
            </p>

            <p className="mt-8 text-[15px] md:text-base leading-relaxed text-platinum">
              Deze Algemene Voorwaarden ("Voorwaarden") zijn van toepassing op uw toegang tot en
              gebruik van de website{' '}
              <Bold>https://growthforgeai.org</Bold> (de "Website") en de diensten van GrowthForge
              AI ("GrowthForge AI", "wij", "ons" of "onze"), een eenmanszaak gedreven door Michio
              Beek, gevestigd te Paramaribo, Suriname.
            </p>
            <p className="mt-4 text-[15px] md:text-base leading-relaxed text-platinum">
              Door de Website te gebruiken, een demo in te plannen of onze diensten (de
              "Diensten") aan te schaffen of te gebruiken, gaat u ("u", de "Klant") akkoord met
              deze Voorwaarden. Bent u het er niet mee eens, gebruik dan de Website of Diensten
              niet.
            </p>
          </div>

          {/* 1. De Diensten */}
          <Section number={1} title="De Diensten">
            <p>
              GrowthForge AI levert AI-automatiseringsdiensten voor bedrijven, waaronder:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-ion">
              <li>
                <Bold>AI-telefoniste</Bold> — het beantwoorden van gemiste, na-uur- of
                overloopoproepen en het inplannen van afspraken;
              </li>
              <li>
                <Bold>AI-reviewverzoeken</Bold> — geautomatiseerde berichten die klanten
                uitnodigen een review achter te laten;
              </li>
              <li>
                <Bold>AI-reactivatie</Bold> — geautomatiseerde berichten om oude klanten opnieuw
                te benaderen;
              </li>
              <li>
                <Bold>AI-chat</Bold> — geautomatiseerde antwoorden op vragen via de website of
                berichtenapps.
              </li>
            </ul>
            <p>
              De specifieke Diensten, omvang en prijs per opdracht worden vóór de installatie met
              u afgesproken. Wij kunnen functies in de loop van de tijd verbeteren, wijzigen of
              stopzetten; wij geven redelijke voorafgaande kennisgeving van wezenlijke wijzigingen
              die een betaalde Dienst raken.
            </p>
          </Section>

          {/* 2. Toegang en geschiktheid */}
          <Section number={2} title="Toegang en geschiktheid">
            <p>
              U dient <Bold>ten minste 18 jaar oud</Bold> te zijn en de Diensten{' '}
              <Bold>voor zakelijke doeleinden</Bold> te gebruiken. De Diensten zijn niet bedoeld
              voor persoonlijk of consumentengebruik. Door ze te gebruiken bevestigt u dat u
              bevoegd bent om deze Voorwaarden namens uw bedrijf aan te gaan.
            </p>
          </Section>

          {/* 3. Proefperiode en terugbetaling */}
          <Section number={3} title="Proefperiode en terugbetaling">
            <ul className="list-disc space-y-3 pl-5 marker:text-ion">
              <li>
                Wij kunnen voor in aanmerking komende Diensten een{' '}
                <Bold>gratis proefperiode van 14 dagen</Bold> aanbieden. Besluit u tijdens de
                proefperiode dat de Dienst niet bij u past, dan kunt u opzeggen en, indien u
                kosten in rekening zijn gebracht,{' '}
                <Bold>terugbetaling verzoeken van de voor die proefperiode betaalde bedragen</Bold>
                .
              </li>
              <li>
                Na de proefperiode zijn abonnementskosten{' '}
                <Bold>niet-restitueerbaar, behalve waar de wet dit vereist</Bold> of schriftelijk
                uitdrukkelijk anders is overeengekomen. Opzeggen stopt toekomstige kosten, maar
                geeft geen recht op terugbetaling van reeds verschuldigde kosten voor de lopende
                periode.
              </li>
              <li>
                Installatiekosten dekken uitgevoerd werk en zijn niet-restitueerbaar zodra de
                installatie is begonnen, behalve tijdens de proefperiode zoals hierboven
                beschreven.
              </li>
            </ul>
            <p>
              Wij behouden ons het recht voor om proefperiodes te beperken of in te trekken, of te
              weigeren wanneer wij redelijkerwijs misbruik vermoeden.
            </p>
          </Section>

          {/* 4. Kosten, facturatie en opzegging */}
          <Section number={4} title="Kosten, facturatie en opzegging">
            <ul className="list-disc space-y-3 pl-5 marker:text-ion">
              <li>
                De Diensten worden geleverd op basis van een{' '}
                <Bold>installatiebedrag plus een terugkerend abonnement</Bold>, zoals met u
                overeengekomen.
              </li>
              <li>
                Abonnementskosten worden vooraf en terugkerend gefactureerd totdat wordt
                opgezegd. Betalingen worden verwerkt door onze externe betaaldienstverlener
                (bijv. PayPal / Whop); door te betalen gaat u tevens akkoord met de voorwaarden
                van die dienstverlener.
              </li>
              <li>
                U bent verantwoordelijk voor het geldig houden van uw betaalgegevens. Late of
                mislukte betaling kan leiden tot opschorting van de Diensten.
              </li>
              <li>
                U kunt <Bold>op elk moment opzeggen</Bold>, met ingang van het einde van uw
                lopende factuurperiode. Reeds betaalde kosten voor de lopende periode worden niet
                terugbetaald (met inachtneming van artikel 3).
              </li>
              <li>
                Wij kunnen onze tarieven wijzigen met redelijke voorafgaande kennisgeving;
                wijzigingen gelden vanaf uw volgende factuurperiode.
              </li>
            </ul>
          </Section>

          {/* 5. Verantwoordelijkheden van de Klant en aanvaardbaar gebruik */}
          <Section number={5} title="Verantwoordelijkheden van de Klant en aanvaardbaar gebruik">
            <p>
              U stemt ermee in de Diensten rechtmatig en verantwoordelijk te gebruiken. In het
              bijzonder stemt u ermee in <Bold>niet</Bold>:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-ion">
              <li>
                de Diensten te gebruiken om spam te versturen, of om berichten, oproepen of
                reviewverzoeken te sturen naar personen die niet de volgens de toepasselijke wet
                vereiste toestemming hebben gegeven;
              </li>
              <li>
                de Diensten te gebruiken voor onrechtmatige, frauduleuze, misleidende,
                intimiderende of beledigende doeleinden;
              </li>
              <li>
                de Diensten <Bold>door te verkopen, in sublicentie te geven of te herdistribueren</Bold>
                , of ze als uw eigen dienst aan derden aan te bieden, zonder onze schriftelijke
                toestemming;
              </li>
              <li>
                te proberen onze systemen, sjablonen, workflows of software te kopiëren,
                te reverse-engineeren of onrechtmatig toe te eigenen;
              </li>
              <li>
                de Diensten of de bijbehorende infrastructuur te verstoren, te overbelasten of te
                proberen er ongeoorloofd toegang toe te krijgen;
              </li>
              <li>
                valse informatie te verstrekken of zich voor te doen als een andere persoon of
                onderneming.
              </li>
            </ul>
            <p>
              <Bold>Naleving en toestemming zijn uw verantwoordelijkheid.</Bold> U bent als enige
              verantwoordelijk voor het verkrijgen van alle van uw klanten vereiste toestemmingen
              — waaronder toestemming om gesprekken op te nemen en geautomatiseerde berichten te
              versturen — en voor de naleving van alle op uw bedrijf toepasselijke wetgeving,
              waaronder wetgeving inzake gegevensbescherming, telemarketing en anti-spam.
            </p>
            <p>
              U bent verantwoordelijk voor de juistheid van de informatie en inhoud die u ons
              verstrekt voor gebruik in de Diensten.
            </p>
          </Section>

          {/* 6. Gegevens en privacy */}
          <Section number={6} title="Gegevens en privacy">
            <p>
              Hoe wij omgaan met persoonsgegevens is beschreven in ons{' '}
              <Link to="/privacy" className="link-lift text-ion font-semibold">
                Privacybeleid
              </Link>
              , dat deel uitmaakt van deze Voorwaarden. Wanneer wij persoonsgegevens van uw
              klanten verwerken om de Diensten te leveren, treden wij op als{' '}
              <Bold>verwerker</Bold> namens u, en treedt u op als verwerkingsverantwoordelijke met
              de in het Privacybeleid beschreven verantwoordelijkheden.{' '}
              <Bold>
                Wij gebruiken uw gegevens of die van uw klanten niet om AI-modellen te trainen.
              </Bold>
            </p>
          </Section>

          {/* 7. Intellectueel eigendom */}
          <Section number={7} title="Intellectueel eigendom">
            <ul className="list-disc space-y-3 pl-5 marker:text-ion">
              <li>
                <Bold>Ons IE.</Bold> Alle systemen, software, sjablonen, prompts, workflows,
                configuraties en materialen die wij gebruiken of ontwikkelen om de Diensten te
                leveren — en de Website zelf — blijven ons exclusieve eigendom. Niets in deze
                Voorwaarden draagt de eigendom daarvan aan u over. Wij verlenen u een beperkt,
                niet-exclusief en niet-overdraagbaar recht om de Diensten tijdens uw abonnement te
                gebruiken.
              </li>
              <li>
                <Bold>Uw inhoud.</Bold> U behoudt de eigendom van de inhoud, gegevens en
                materialen die u ons verstrekt ("Klantinhoud"). U verleent ons de licentie die
                nodig is om de Klantinhoud te gebruiken voor het leveren van de Diensten.
              </li>
              <li>
                <Bold>AI-uitkomsten.</Bold> Tussen u en ons{' '}
                <Bold>
                  bent u eigenaar van de uitkomsten die via de Diensten voor uw bedrijf worden
                  gegenereerd
                </Bold>{' '}
                (bijvoorbeeld de berichten die naar uw klanten worden gestuurd of de aangemaakte
                afspraken), mits u deze Voorwaarden naleeft en de verschuldigde kosten betaalt.
                Deze eigendom strekt zich niet uit tot onze onderliggende systemen, modellen of
                sjablonen, die van ons blijven.
              </li>
            </ul>
          </Section>

          {/* 8. AI-disclaimers */}
          <Section number={8} title="AI-disclaimers">
            <p>U erkent en gaat ermee akkoord dat:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-ion">
              <li>
                AI-systemen{' '}
                <Bold>niet perfect zijn en fouten, omissies of onverwachte uitkomsten kunnen produceren.</Bold>{' '}
                De Diensten worden geleverd ter ondersteuning van uw bedrijf, niet ter vervanging
                van menselijk oordeel.
              </li>
              <li>
                Wij <Bold>geen enkel specifiek resultaat garanderen</Bold>, zoals een bepaald
                aantal boekingen, reviews, beantwoorde oproepen of omzet.
              </li>
              <li>AI-uitkomsten geen professioneel, juridisch, medisch of financieel advies vormen.</li>
              <li>
                U verantwoordelijk bent voor het beoordelen en toezicht houden op de Diensten voor
                zover passend voor uw bedrijf, en voor beslissingen of communicatie die met
                behulp daarvan tot stand komen.
              </li>
            </ul>
          </Section>

          {/* 9. Diensten van derden */}
          <Section number={9} title="Diensten van derden">
            <p>
              De Diensten steunen op platforms en dienstverleners van derden (bijvoorbeeld
              hosting, automatisering, telefonie en betaaldienstverleners). Wij zijn niet
              verantwoordelijk voor het handelen, nalaten, de beschikbaarheid of de voorwaarden
              van die derden. Onderbrekingen of wijzigingen bij een dienst van derden kunnen de
              Diensten beïnvloeden, en wij zijn niet aansprakelijk voor problemen die daaruit
              voortvloeien.
            </p>
          </Section>

          {/* 10. Opschorting en beëindiging */}
          <Section number={10} title="Opschorting en beëindiging">
            <ul className="list-disc space-y-3 pl-5 marker:text-ion">
              <li>
                Wij kunnen uw toegang tot de Diensten{' '}
                <Bold>opschorten of beëindigen</Bold>, met of zonder kennisgeving, indien u deze
                Voorwaarden schendt, niet betaalt, de Diensten misbruikt, of waar de wet ons
                daartoe verplicht.
              </li>
              <li>U kunt beëindigen door uw abonnement op te zeggen zoals beschreven in artikel 4.</li>
              <li>
                Bij beëindiging eindigt uw recht om de Diensten te gebruiken. Wij kunnen de aan uw
                account gekoppelde gegevens na een redelijke periode verwijderen, met
                inachtneming van het Privacybeleid en de toepasselijke wet. Bepalingen die naar
                hun aard van kracht behoren te blijven (waaronder IE, disclaimers,
                aansprakelijkheidsbeperking en toepasselijk recht) blijven na beëindiging van
                kracht.
              </li>
            </ul>
          </Section>

          {/* 11. Disclaimers */}
          <Section number={11} title="Disclaimers">
            <p>
              De Diensten en Website worden geleverd{' '}
              <Bold>"zoals ze zijn" en "zoals beschikbaar", zonder enige garantie</Bold>, expliciet
              of impliciet, waaronder impliciete garanties van verkoopbaarheid, geschiktheid voor
              een bepaald doel en niet-inbreuk. Wij garanderen niet dat de Diensten ononderbroken,
              foutloos of veilig zullen zijn, of dat ze aan uw specifieke eisen zullen voldoen.
            </p>
          </Section>

          {/* 12. Beperking van aansprakelijkheid */}
          <Section number={12} title="Beperking van aansprakelijkheid">
            <p>Voor zover maximaal toegestaan door de wet:</p>
            <ul className="list-disc space-y-3 pl-5 marker:text-ion">
              <li>
                Wij zijn niet aansprakelijk voor enige indirecte, incidentele, bijzondere,
                gevolg- of punitieve schade, noch voor verlies van winst, omzet, gegevens, zaken
                of goodwill, voortvloeiend uit of verband houdend met de Diensten.
              </li>
              <li>
                Onze totale gezamenlijke aansprakelijkheid voor enige vordering die voortvloeit
                uit of verband houdt met de Diensten of deze Voorwaarden bedraagt niet meer dan{' '}
                <Bold>
                  het totale bedrag dat u ons voor de Diensten heeft betaald in de drie (3)
                  maanden onmiddellijk voorafgaand aan de gebeurtenis die tot de vordering leidt.
                </Bold>
              </li>
            </ul>
            <p>
              Sommige rechtsgebieden staan bepaalde beperkingen niet toe, waardoor het
              bovenstaande mogelijk niet volledig op u van toepassing is.
            </p>
          </Section>

          {/* 13. Vrijwaring */}
          <Section number={13} title="Vrijwaring">
            <p>
              U stemt ermee in GrowthForge AI en de eigenaar te vrijwaren en schadeloos te stellen
              voor alle vorderingen, schade, verliezen of kosten (waaronder redelijke juridische
              kosten) die voortvloeien uit uw gebruik van de Diensten, uw Klantinhoud, uw
              schending van deze Voorwaarden, of uw nalaten om vereiste toestemmingen te
              verkrijgen of om op uw bedrijf toepasselijke wetgeving na te leven.
            </p>
          </Section>

          {/* 14. Wijzigingen van deze Voorwaarden */}
          <Section number={14} title="Wijzigingen van deze Voorwaarden">
            <p>
              Wij kunnen deze Voorwaarden van tijd tot tijd bijwerken. De datum "Laatst
              bijgewerkt" geeft de huidige versie weer, en wezenlijke wijzigingen worden op deze
              pagina geplaatst. Uw voortgezet gebruik van de Diensten nadat wijzigingen van
              kracht zijn geworden, geldt als aanvaarding van de bijgewerkte Voorwaarden.
            </p>
          </Section>

          {/* 15. Toepasselijk recht en geschillen */}
          <Section number={15} title="Toepasselijk recht en geschillen">
            <p>
              Op deze Voorwaarden is het recht van <Bold>Suriname</Bold> van toepassing, zonder
              inachtneming van conflictregels. U stemt ermee in dat elk geschil dat voortvloeit
              uit of verband houdt met deze Voorwaarden of de Diensten onderworpen is aan de{' '}
              <Bold>exclusieve bevoegdheid van de bevoegde rechter in Suriname</Bold>, tenzij
              dwingend recht in uw rechtsgebied anders bepaalt. Voordat een formele procedure
              wordt gestart, komen beide partijen overeen eerst te goeder trouw te proberen het
              geschil op te lossen door contact op te nemen met de andere partij.
            </p>
          </Section>

          {/* 16. Contact */}
          <Section number={16} title="Contact">
            <p className="text-ice font-semibold">GrowthForge AI</p>
            <p>
              Michio Beek, eenmanszaak
              <br />
              Tasistraat 2, Paramaribo, Suriname
              <br />
              E-mail:{' '}
              <a
                href="mailto:Beekmichio8@gmail.com"
                className="link-lift text-ion font-semibold"
              >
                Beekmichio8@gmail.com
              </a>
              <br />
              Website:{' '}
              <a
                href="https://growthforgeai.org"
                target="_blank"
                rel="noreferrer"
                className="link-lift text-ion font-semibold"
              >
                https://growthforgeai.org
              </a>
            </p>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
