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
]
