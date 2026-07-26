import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Footer from '../components/Footer.jsx'

const LAST_UPDATED = '26 juli 2026'

function Section({ title, children }) {
  return (
    <section className="border-t border-platinum/10 pt-8">
      <h2 className="font-sora text-xl font-semibold tracking-[-0.01em] text-ice md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-platinum md:text-base">
        {children}
      </div>
    </section>
  )
}

function SubHeading({ children }) {
  return <p className="font-sora font-semibold text-ice">{children}</p>
}

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacybeleid — GrowthForge AI'
  }, [])

  return (
    <div className="relative min-h-screen bg-void">
      <div
        className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
      />

      {/* Simple static header — not the full animated marketing Navbar */}
      <header className="relative border-b border-platinum/10 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-sora text-[15px] font-semibold tracking-[-0.02em] text-ice md:text-base"
          >
            <Logo className="h-7 w-7 rounded-[12px] shadow-ion-glow md:h-8 md:w-8" />
            GrowthForge AI
          </Link>

          <Link
            to="/"
            className="link-lift inline-flex items-center gap-1.5 text-[14px] font-medium text-platinum opacity-95 md:text-[15px]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Terug naar home
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="relative px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mono-label text-[12px] text-ion md:text-[13px]">PRIVACYBELEID</p>
          <h1 className="mt-4 font-sora text-3xl font-bold tracking-[-0.02em] text-ice md:text-4xl">
            Privacybeleid — GrowthForge AI
          </h1>
          <p className="mt-3 text-[15px] text-platinum opacity-90">
            <span className="font-semibold text-ice">Laatst bijgewerkt:</span> {LAST_UPDATED}
          </p>

          <p className="mt-8 text-[15px] leading-relaxed text-platinum md:text-base">
            GrowthForge AI ("GrowthForge AI", "wij", "ons" of "onze") is een AI-automatiseringsbureau,
            gedreven als eenmanszaak door Michio Beek. Wij leveren AI-diensten — waaronder een
            AI-telefoniste, geautomatiseerde Google-reviewverzoeken, reactivatieberichten voor
            klanten en AI-chat — aan bedrijven.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-platinum md:text-base">
            Dit Privacybeleid legt uit hoe wij persoonsgegevens verzamelen, gebruiken, delen en
            beschermen via onze website{' '}
            <a
              href="https://growthforgeai.org"
              className="link-lift text-ion"
            >
              https://growthforgeai.org
            </a>{' '}
            (de "Website") en bij het leveren van onze diensten (de "Diensten"). Lees het
            aandachtig door. Bent u het er niet mee eens, gebruik dan de Website of de Diensten
            niet.
          </p>

          <div className="mt-12 space-y-10">
            <Section title="1. Wie verantwoordelijk is voor uw gegevens (verwerkingsverantwoordelijke vs. verwerker)">
              <p>Onze rol hangt af van wiens gegevens het betreft:</p>
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-semibold text-ice">
                    Wanneer u onze Website bezoekt of contact met ons opneemt
                  </span>{' '}
                  (bijvoorbeeld via een formulier of het inplannen van een demo), treden wij op als{' '}
                  <span className="font-semibold text-ice">verwerkingsverantwoordelijke</span> —
                  wij bepalen hoe en waarom uw gegevens worden gebruikt.
                </li>
                <li>
                  <span className="font-semibold text-ice">
                    Wanneer wij Diensten leveren aan een zakelijke klant
                  </span>{' '}
                  en daarbij gegevens verwerken over de klanten <em>van die klant</em> (bijvoorbeeld
                  gespreksopnames, telefoonnummers of berichten), treden wij op als{' '}
                  <span className="font-semibold text-ice">verwerker</span> namens dat bedrijf, dat
                  de verwerkingsverantwoordelijke is. In dat geval geldt het privacybeleid van dat
                  bedrijf en verwerken wij de gegevens uitsluitend volgens hun instructies. Zie
                  artikel 10.
                </li>
              </ul>
            </Section>

            <Section title="2. Welke gegevens wij verzamelen">
              <div>
                <SubHeading>a. Gegevens die u ons rechtstreeks verstrekt</SubHeading>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    Contact- en identificatiegegevens die u invult via formulieren, ons
                    boekingssysteem, e-mail of berichtenapps — zoals uw naam, bedrijfsnaam,
                    e-mailadres en telefoonnummer.
                  </li>
                  <li>De inhoud van uw communicatie met ons.</li>
                </ul>
              </div>

              <div>
                <SubHeading>b. Boekings- en planningsgegevens</SubHeading>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    Wanneer u via ons planningssysteem een gesprek of demo inplant, ontvangen wij
                    de gegevens die u opgeeft (naam, e-mailadres, gekozen tijd en eventuele
                    opmerkingen).
                  </li>
                </ul>
              </div>

              <div>
                <SubHeading>c. Cookies en analysegegevens</SubHeading>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    Wanneer u onze Website gebruikt, kunnen wij en onze dienstverleners
                    automatisch technische informatie verzamelen, zoals uw IP-adres, browsertype,
                    apparaatgegevens, bekeken pagina's en hoe u met de site omgaat. Wij gebruiken
                    dit om de site te laten werken en de prestaties te begrijpen en te verbeteren.
                    Zie artikel 6 (Cookies).
                  </li>
                </ul>
              </div>

              <div>
                <SubHeading>d. Gegevens die wij verwerken namens onze klanten (als verwerker)</SubHeading>
                <p className="mt-2">
                  Bij het leveren van de Diensten kunnen wij persoonsgegevens verwerken die
                  toebehoren aan de klanten van onze klanten, waaronder:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-ice">
                      Gespreksopnames en/of transcripties
                    </span>{' '}
                    die door de AI-telefoniste worden vastgelegd;
                  </li>
                  <li>Telefoonnummers en contactgegevens;</li>
                  <li>
                    De inhoud van berichten die worden verzonden of ontvangen via geautomatiseerde
                    review-, reactivatie- en chatstromen.
                  </li>
                </ul>
                <p className="mt-2">
                  Wij verwerken deze gegevens uitsluitend om de Diensten te leveren en alleen
                  volgens de instructies van de klant. Zie artikel 10.
                </p>
              </div>
            </Section>

            <Section title="3. Hoe wij uw gegevens gebruiken">
              <p>Wij gebruiken persoonsgegevens om:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>de Website en Diensten te leveren, te laten werken en te onderhouden;</li>
                <li>
                  op uw vragen te reageren en demo's en gesprekken in te plannen en te voeren;
                </li>
                <li>
                  de Diensten voor onze klanten in te richten, te leveren en te ondersteunen;
                </li>
                <li>
                  u servicegerelateerde berichten te sturen en — waar toegestaan — relevante
                  marketing (u kunt zich hier altijd voor afmelden);
                </li>
                <li>betalingen te verwerken en facturatie te beheren;</li>
                <li>
                  onze Website en Diensten te verbeteren, te beveiligen en problemen op te
                  lossen;
                </li>
                <li>te voldoen aan onze wettelijke verplichtingen en onze overeenkomsten na te leven.</li>
              </ul>
              <p className="font-semibold text-ice">
                Wij verkopen uw persoonsgegevens niet.
              </p>
            </Section>

            <Section title="4. AI en geautomatiseerde verwerking">
              <p>
                Omdat wij een AI-bureau zijn, willen wij expliciet zijn over hoe AI wordt ingezet:
              </p>
              <ul className="list-disc space-y-3 pl-5">
                <li>
                  <span className="font-semibold text-ice">Geen training met uw gegevens.</span>{' '}
                  Wij gebruiken de gegevens van onze klanten, en de persoonsgegevens van hún
                  klanten, <span className="font-semibold text-ice">niet</span> om AI- of
                  machine-learningmodellen te trainen, te hertrainen of te verbeteren. Gegevens
                  worden uitsluitend gebruikt om de Dienst te leveren waarvoor ze zijn verzameld.
                </li>
                <li>
                  <span className="font-semibold text-ice">Geautomatiseerde interacties.</span>{' '}
                  Sommige interacties worden door AI afgehandeld — bijvoorbeeld de telefoniste die
                  een oproep beantwoordt of de chatbot die een bericht beantwoordt. Deze systemen
                  voeren routinetaken uit (zoals vragen beantwoorden en afspraken inplannen). Zij
                  nemen geen juridische of vergelijkbaar ingrijpende beslissingen over personen
                  zonder menselijke tussenkomst.
                </li>
                <li>
                  <span className="font-semibold text-ice">Nauwkeurigheid.</span> Door AI
                  gegenereerde uitkomsten kunnen fouten bevatten. Belangrijke handelingen moeten
                  altijd door een mens worden gecontroleerd.
                </li>
              </ul>
            </Section>

            <Section title="5. Rechtsgronden voor de verwerking (AVG/GDPR)">
              <p>
                Waar de Europese/Britse Algemene Verordening Gegevensbescherming (AVG/GDPR) van
                toepassing is, baseren wij ons op de volgende rechtsgronden:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-ice">Toestemming</span> — bijv. voor
                  optionele cookies en bepaalde marketing;
                </li>
                <li>
                  <span className="font-semibold text-ice">Uitvoering van een overeenkomst</span>{' '}
                  — om Diensten te leveren die u of uw bedrijf heeft aangevraagd;
                </li>
                <li>
                  <span className="font-semibold text-ice">Gerechtvaardigd belang</span> — om onze
                  onderneming te runnen, te beveiligen en te verbeteren, voor zover uw rechten
                  niet zwaarder wegen;
                </li>
                <li>
                  <span className="font-semibold text-ice">Wettelijke verplichting</span> — om te
                  voldoen aan toepasselijke wetgeving.
                </li>
              </ul>
              <p>
                Waar de verwerking op toestemming berust, kunt u deze te allen tijde intrekken.
              </p>
            </Section>

            <Section title="6. Cookies en vergelijkbare technologieën">
              <p>
                Onze Website kan cookies en vergelijkbare technologieën gebruiken voor essentiële
                functionaliteit, analyse en prestaties. Essentiële cookies zijn noodzakelijk om de
                site te laten werken. Niet-essentiële cookies (bijv. analyse) worden gebruikt waar
                toegestaan of met uw toestemming. U kunt cookies beheren via uw
                browserinstellingen; het uitschakelen van sommige kan de werking van de site
                beïnvloeden.
              </p>
            </Section>

            <Section title="7. Diensten van derden die wij gebruiken">
              <p>
                Wij maken gebruik van betrouwbare externe dienstverleners ("subverwerkers") om
                onze onderneming te runnen en de Diensten te leveren. Afhankelijk van de Dienst
                kunnen dit dienstverleners zijn voor:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Platform en automatisering (bijv. GoHighLevel, Make.com);</li>
                <li>AI-agent- en chattools (bijv. buildmyagent.io);</li>
                <li>Spraak en telefonie;</li>
                <li>Planning en boeking;</li>
                <li>Betalingsverwerking (bijv. PayPal / Whop);</li>
                <li>Websiteanalyse en hosting.</li>
              </ul>
              <p>
                Deze dienstverleners kunnen persoonsgegevens namens ons verwerken en zijn verplicht
                deze te beschermen en uitsluitend te gebruiken voor de door ons aangegeven
                doeleinden. Wij zijn niet verantwoordelijk voor het onafhankelijke privacybeleid
                van websites van derden die u via links kunt bereiken.
              </p>
            </Section>

            <Section title="8. Delen van gegevens en internationale doorgifte">
              <p>Wij delen persoonsgegevens uitsluitend:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>met de hierboven beschreven subverwerkers, om de Diensten te leveren;</li>
                <li>met onze zakelijke klanten, wanneer wij gegevens namens hen verwerken;</li>
                <li>
                  wanneer de wet dit vereist, of om onze rechten, gebruikers of het publiek te
                  beschermen.
                </li>
              </ul>
              <p>
                Omdat wij en onze dienstverleners internationaal opereren, kunnen uw gegevens
                worden opgeslagen of verwerkt{' '}
                <span className="font-semibold text-ice">
                  buiten uw land, waaronder buiten Suriname en de EU
                </span>
                . Waar de wet dit vereist (bijv. de AVG), treffen wij passende waarborgen voor
                dergelijke doorgiften, zoals modelcontractbepalingen of doorgifte naar landen die
                worden erkend als landen met een passend beschermingsniveau.
              </p>
            </Section>

            <Section title="9. Bewaartermijn">
              <p>
                Wij bewaren persoonsgegevens{' '}
                <span className="font-semibold text-ice">
                  uitsluitend zolang dat nodig is om de Diensten te leveren
                </span>{' '}
                en om de in dit beleid beschreven doeleinden te vervullen; daarna worden ze
                verwijderd of geanonimiseerd. Wij kunnen bepaalde gegevens langer bewaren waar dat
                nodig is om te voldoen aan wettelijke verplichtingen, geschillen op te lossen of
                onze overeenkomsten na te leven. Wanneer wij gegevens namens een klant verwerken,
                bewaren en verwijderen wij deze volgens de instructies van die klant.
              </p>
            </Section>

            <Section title="10. Gegevens van de klanten van onze klanten">
              <p>
                Wanneer wij persoonsgegevens verwerken die toebehoren aan de klanten van een klant
                (zoals gespreksopnames, telefoonnummers of berichtinhoud), doen wij dit{' '}
                <span className="font-semibold text-ice">uitsluitend als verwerker</span>, namens
                en volgens de instructies van die klant.
              </p>
              <p>
                Onze zakelijke klanten zijn, als verwerkingsverantwoordelijke, verantwoordelijk
                voor:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  het hebben van een rechtsgrond om de gegevens van hun klanten te verzamelen en
                  te verwerken;
                </li>
                <li>het verstrekken van passende privacyverklaringen aan hun klanten;</li>
                <li>
                  <span className="font-semibold text-ice">
                    het verkrijgen van eventueel wettelijk vereiste toestemming
                  </span>{' '}
                  — waaronder, indien van toepassing, toestemming om gesprekken op te nemen en
                  geautomatiseerde berichten te versturen (zoals reviewverzoeken of
                  reactivatie-aanbiedingen).
                </li>
              </ul>
              <p>
                Bent u klant van een van onze klanten en heeft u vragen over uw gegevens, neem dan
                rechtstreeks contact op met dat bedrijf, of neem contact met ons op en wij
                verwijzen uw verzoek door.
              </p>
            </Section>

            <Section title="11. Uw rechten">
              <p>
                Afhankelijk van het toepasselijke recht (waaronder de AVG en de CCPA) kunt u de
                volgende rechten hebben:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-semibold text-ice">Inzage</span> in de persoonsgegevens
                  die wij over u bewaren;
                </li>
                <li>
                  <span className="font-semibold text-ice">Rectificatie</span> van onjuiste of
                  onvolledige gegevens;
                </li>
                <li>
                  <span className="font-semibold text-ice">Verwijdering</span> van uw gegevens
                  ("recht op vergetelheid");
                </li>
                <li>
                  <span className="font-semibold text-ice">
                    Beperking van of bezwaar tegen
                  </span>{' '}
                  bepaalde verwerkingen;
                </li>
                <li>
                  <span className="font-semibold text-ice">Overdraagbaarheid</span> — het
                  ontvangen van uw gegevens in een overdraagbaar formaat;
                </li>
                <li>
                  <span className="font-semibold text-ice">Intrekking van toestemming</span> op
                  elk moment;
                </li>
                <li>
                  <span className="font-semibold text-ice">Afmelding</span> voor
                  marketingcommunicatie;
                </li>
                <li>
                  Voor inwoners van Californië: het recht om te weten, te verwijderen en zich af
                  te melden voor de "verkoop" of "deling" van persoonsgegevens, en het recht{' '}
                  <span className="font-semibold text-ice">niet te worden gediscrimineerd</span>{' '}
                  voor het uitoefenen van deze rechten. Wij verkopen geen persoonsgegevens.
                </li>
              </ul>
              <p>
                Om een recht uit te oefenen, neemt u contact met ons op via de gegevens in artikel
                14. Wij reageren binnen de wettelijk vereiste termijn. Wanneer wij als verwerker
                optreden, sturen wij uw verzoek door naar de betreffende klant.
              </p>
            </Section>

            <Section title="12. Beveiliging">
              <p>
                Wij nemen redelijke technische en organisatorische maatregelen om
                persoonsgegevens te beschermen tegen verlies, misbruik en ongeoorloofde toegang —
                waaronder toegangscontroles, het gebruik van betrouwbare dienstverleners en het
                beperken van wie toegang heeft tot gegevens. Geen enkele methode van verzending of
                opslag is echter volledig veilig, en wij kunnen absolute veiligheid niet
                garanderen.
              </p>
            </Section>

            <Section title="13. Privacy van kinderen">
              <p>
                De Website en Diensten zijn bedoeld voor bedrijven en richten zich niet op
                kinderen. Wij verzamelen niet bewust persoonsgegevens van kinderen jonger dan 16
                jaar. Denkt u dat een kind ons gegevens heeft verstrekt, neem dan contact met ons
                op en wij verwijderen deze.
              </p>
            </Section>

            <Section title="14. Wijzigingen en contact">
              <p>
                Wij kunnen dit Privacybeleid van tijd tot tijd bijwerken. De datum "Laatst
                bijgewerkt" toont de meest recente versie, en wezenlijke wijzigingen worden op
                deze pagina geplaatst.
              </p>
              <p>Voor privacyvragen of om uw rechten uit te oefenen, neemt u contact op met:</p>
              <p className="rounded-2xl border border-platinum/10 bg-carbon p-5 leading-relaxed">
                <span className="font-semibold text-ice">GrowthForge AI</span>
                <br />
                Michio Beek, eenmanszaak
                <br />
                Tasistraat 2, Paramaribo, Suriname
                <br />
                E-mail:{' '}
                <a
                  href="mailto:Beekmichio8@gmail.com"
                  className="link-lift font-semibold text-ion"
                >
                  Beekmichio8@gmail.com
                </a>
                <br />
                Website:{' '}
                <a href="https://growthforgeai.org" className="link-lift text-ion">
                  https://growthforgeai.org
                </a>
              </p>
            </Section>

            <Section title="15. Toepasselijk recht">
              <p>
                Op dit Privacybeleid is het recht van{' '}
                <span className="font-semibold text-ice">Suriname</span> van toepassing. Waar u
                wordt beschermd door dwingend recht van een ander rechtsgebied (zoals de AVG in de
                EU/VK of de CCPA in Californië), blijft die bescherming op u van toepassing.
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
