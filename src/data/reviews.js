// Dedicated spot for real Google reviews. This array is intentionally empty
// until actual clients leave reviews — the Reviews section renders an honest
// "no reviews yet" state when it's empty, and switches to real review cards
// the moment entries are added here. Never fill this with invented reviews.
//
// Add entries in this shape as real Google reviews come in:
// {
//   name: 'Voornaam Achternaam',   // reviewer's name as shown on Google
//   business: 'Bedrijfsnaam',      // the client's business name
//   rating: 5,                     // 1-5, whole number, as given on Google
//   quote: 'Exacte tekst van de review, woord voor woord.',
//   date: '2026-08-01',            // ISO date the review was posted
// }
export const REVIEWS = [
  {
    name: 'Rachiano Karijodimedjo',
    business: 'Rowandie Barbershop',
    rating: 5,
    quote:
      'Heel goede website. Wat ik vooral mooi vind, is dat je eerst alle informatie kunt lezen en het werk kunt bekijken voordat je een afspraak maakt. Zo krijg je een goed beeld van de persoon en de diensten. Zeker een aanrader. Keep up the good work. \u{1F44C}',
    date: '2026-07-29',
  },
  {
    name: 'Raimil George',
    business: 'R Flow Plumbing Solutions',
    rating: 5,
    quote: 'Ik ben zeer tevreden over de service. Snel en professioneel \u{1F4AF}.',
    date: '2026-08-02',
  },
  {
    name: 'Dvon',
    business: 'Reminisce Photography',
    rating: 4,
    quote:
      'Vanaf het eerste contact had ik een goed gevoel. Ik werd professioneel geholpen en serieus genomen. Er werd aandacht besteed aan mijn wensen en ik ben tevreden met het eindresultaat. Bedankt voor de fijne samenwerking en de uitstekende service. Ik kan dit bedrijf zeker aanbevelen.',
    date: '2026-08-05',
  },
  {
    name: 'Gesje',
    business: 'OGPictures',
    rating: 5,
    quote:
      'Ik ben super tevreden met de website die Growth Forge AI voor OGPictures heeft gemaakt. Het ontwerp ziet er modern, professioneel en strak uit. Alles werkt soepel en er is goed geluisterd naar mijn wensen. De communicatie was prettig en het eindresultaat heeft mijn verwachtingen overtroffen.',
    date: '2026-08-05',
  },
  {
    name: 'Shervin Jagroep',
    business: 'SJ Photography',
    rating: 5,
    quote:
      'Mijn ervaring met Growth Forge AI is vanaf het begin uitstekend geweest. Wat mij direct opviel, was de professionele aanpak en de heldere communicatie. Er werd goed geluisterd naar mijn wensen en actief meegedacht om een website te ontwikkelen die perfect aansluit bij mijn bedrijf. Het hele proces verliep soepel en iedere stap werd duidelijk uitgelegd. Het eindresultaat is een moderne, snelle en gebruiksvriendelijke website die niet alleen professioneel oogt, maar ook vertrouwen uitstraalt. Daarnaast stond het team altijd open voor feedback en werden aanpassingen snel en zorgvuldig doorgevoerd. Wat Growth Forge AI onderscheidt, is de combinatie van technische kennis, creativiteit en een klantgerichte aanpak. Je merkt dat kwaliteit voorop staat en dat ze pas tevreden zijn wanneer jij dat ook bent. Ik kan Growth Forge AI dan ook van harte aanbevelen aan iedereen die op zoek is naar een betrouwbare partner voor een professionele website of digitale oplossing. Een samenwerking waar je met vertrouwen aan kunt beginnen.',
    date: '2026-08-07',
  },
  {
    name: 'Sen Studios',
    business: 'Sen Studios',
    rating: 5,
    quote: 'Very good service. En wist heel goed in te spelen op de "wants and needs" van mijn onderneming',
    date: '2026-08-10',
  },
]
