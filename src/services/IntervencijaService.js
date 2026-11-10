import { napraviServis } from './Kolekcija'
import { pomak } from '../constants'

// Entitet 2: Intervencija (servisna intervencija na uređaju). Demo podaci.
export const intervencije = [
    { sifra: 1, oprema: 1, datum: pomak(-12), problem: 'Računalo se ne povezuje na mrežu', radovi: 'Zamijenjen mrežni kabel i podešena IP konfiguracija', vrsta: 'Mreža', status: 'Završeno', trajanje: 30, napomena: '' },
    { sifra: 2, oprema: 3, datum: pomak(-1), problem: 'Pisač ne ispisuje, greška na zaslonu', radovi: '', vrsta: 'Hardver', status: 'Otvoreno', trajanje: 0, napomena: 'Čeka se dio.' },
    { sifra: 3, oprema: 3, datum: pomak(-30), problem: 'Zastoj papira', radovi: 'Očišćen mehanizam za uvlačenje', vrsta: 'Hardver', status: 'Završeno', trajanje: 20, napomena: '' },
    { sifra: 4, oprema: 2, datum: pomak(-5), problem: 'Redovito održavanje i ažuriranja', radovi: 'Instalirana sigurnosna ažuriranja', vrsta: 'Preventivno održavanje', status: 'Završeno', trajanje: 90, napomena: '' },
]

export default napraviServis('it_intervencije', intervencije)
