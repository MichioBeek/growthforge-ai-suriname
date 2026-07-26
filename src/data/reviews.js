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
export const REVIEWS = []
