import { napraviServis } from './Kolekcija'

// Entitet 1: Oprema. Početni podaci su izmišljeni (demo).
export const oprema = [
    { sifra: 1, naziv: 'Računalo ured 12 (demo)', tip: 'Desktop računalo', proizvodac: 'Dell', model: 'OptiPlex 7010', serijskiBroj: 'ABC12345', inventarniBroj: 'INV-0245', lokacija: 'Ured 12', korisnik: 'Ivan Horvat', ipAdresa: '192.168.1.25', status: 'Aktivno', datumNabave: '2024-05-15' },
    { sifra: 2, naziv: 'Poslužitelj datoteka (demo)', tip: 'Poslužitelj', proizvodac: 'HP', model: 'ProLiant ML350', serijskiBroj: 'SRV98765', inventarniBroj: 'INV-0101', lokacija: 'Server soba', korisnik: 'Odjel', ipAdresa: '192.168.1.5', status: 'Aktivno', datumNabave: '2022-03-10' },
    { sifra: 3, naziv: 'Pisač hodnik (demo)', tip: 'Pisač', proizvodac: 'Canon', model: 'i-SENSYS MF445', serijskiBroj: 'PRN55501', inventarniBroj: 'INV-0310', lokacija: 'Hodnik 1. kat', korisnik: 'Zajednički', ipAdresa: '192.168.1.40', status: 'Neispravno', datumNabave: '2023-09-01' },
]

export default napraviServis('it_oprema', oprema)
