export const IME_APLIKACIJE = 'Evidencija IT opreme'
export const AUTOR = 'Mario Dunić'

export const STRANICE = [
    { id: 'pocetna', naziv: 'Nadzorna ploča', izbornik: true },
    { id: 'oprema', naziv: 'Oprema', izbornik: true },
    { id: 'intervencije', naziv: 'Intervencije', izbornik: true },
]

export const TIPOVI = ['Desktop računalo', 'Prijenosno računalo', 'Poslužitelj', 'Pisač', 'Mrežni uređaj', 'Monitor', 'Ostalo']
export const STATUSI_OPREME = ['Aktivno', 'U servisu', 'Neispravno', 'Otpisano']
export const VRSTE = ['Hardver', 'Softver', 'Mreža', 'Preventivno održavanje', 'Ostalo']
export const STATUSI_INTERVENCIJE = ['Otvoreno', 'U tijeku', 'Završeno']

export const formatDatum = (d) => (d ? d.split('-').reverse().join('. ') + '.' : '')
export const jeIPv4 = (s) => /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/.test(s)
export const formatMin = (m) => (Number(m) >= 60 ? `${Math.floor(m / 60)} h ${Number(m) % 60} min` : `${m} min`)

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
export const danas = () => iso(new Date())
export const pomak = (dana) => { const d = new Date(); d.setDate(d.getDate() + dana); return iso(d) }
