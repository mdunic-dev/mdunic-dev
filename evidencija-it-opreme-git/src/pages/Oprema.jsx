import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { STATUSI_OPREME, TIPOVI, danas, formatDatum, jeIPv4 } from '../constants'
import { useLista } from '../hooks'
import IntervencijaService from '../services/IntervencijaService'
import OpremaService from '../services/OpremaService'

export default function Oprema({ idi, param }) {

    const oprema = useLista(OpremaService)
    const intervencije = useLista(IntervencijaService)
    const [trazi, setTrazi] = useState('')
    const [status, setStatus] = useState('')

    const broj = (o) => intervencije.stavke.filter((i) => i.oprema === o.sifra).length
    const prikaz = oprema.stavke
        .filter((o) => !status || o.status === status)
        .filter((o) => !trazi || `${o.naziv} ${o.inventarniBroj} ${o.serijskiBroj} ${o.ipAdresa} ${o.korisnik}`.toLowerCase().includes(trazi.toLowerCase()))
        .sort((a, b) => a.naziv.localeCompare(b.naziv, 'hr'))

    function validate(v, uredjuje) {
        const g = {}
        if (oprema.stavke.some((o) => o.inventarniBroj.trim().toLowerCase() === v.inventarniBroj.trim().toLowerCase() && o.sifra !== uredjuje?.sifra)) g.inventarniBroj = 'Taj inventarni broj već postoji.'
        if (v.ipAdresa && !jeIPv4(v.ipAdresa.trim())) g.ipAdresa = 'IP adresa nije ispravna (npr. 192.168.1.25).'
        if (v.datumNabave > danas()) g.datumNabave = 'Datum nabave ne može biti u budućnosti.'
        return g
    }

    return (
        <CrudTablica
            naslov="Oprema"
            novi="Novi uređaj"
            servis={OpremaService}
            stavke={prikaz}
            osvjezi={oprema.osvjezi}
            otvoreno0={param === 'novi'}
            prazno="Nema uređaja za zadane uvjete."
            validate={validate}
            alat={(
                <div className="alat filteri">
                    <input type="search" name="trazi" placeholder="Traži po nazivu, inv. broju, IP-u, korisniku" value={trazi} onChange={(e) => setTrazi(e.target.value)} />
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Svi statusi</option>
                        {STATUSI_OPREME.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            )}
            fields={[
                { name: 'naziv', label: 'Naziv uređaja', required: true },
                { name: 'tip', label: 'Tip uređaja', type: 'select', required: true, default: 'Desktop računalo', options: TIPOVI.map((t) => ({ value: t, label: t })) },
                { name: 'proizvodac', label: 'Proizvođač', required: true },
                { name: 'model', label: 'Model' },
                { name: 'serijskiBroj', label: 'Serijski broj' },
                { name: 'inventarniBroj', label: 'Inventarni broj', required: true },
                { name: 'lokacija', label: 'Lokacija', required: true },
                { name: 'korisnik', label: 'Korisnik uređaja' },
                { name: 'ipAdresa', label: 'IP adresa' },
                { name: 'status', label: 'Status uređaja', type: 'select', required: true, default: 'Aktivno', options: STATUSI_OPREME.map((s) => ({ value: s, label: s })) },
                { name: 'datumNabave', label: 'Datum nabave', type: 'date', required: true, default: danas() },
            ]}
            columns={[
                { key: 'inventarniBroj', label: 'Inv. broj' },
                { key: 'naziv', label: 'Uređaj' },
                { key: 'tip', label: 'Tip' },
                { render: (o) => `${o.proizvodac} ${o.model}`, label: 'Proizvođač i model' },
                { key: 'lokacija', label: 'Lokacija' },
                { render: (o) => <code>{o.ipAdresa || '—'}</code>, label: 'IP adresa' },
                { render: (o) => <span className={o.status === 'Aktivno' ? 'oznaka ok' : o.status === 'Neispravno' ? 'oznaka opasna' : 'oznaka'}>{o.status}</span>, label: 'Status' },
                { render: (o) => formatDatum(o.datumNabave), label: 'Nabava' },
                { render: (o) => <button className="veza" onClick={() => idi('intervencije', `oprema-${o.sifra}`)}>{broj(o)} interv.</button>, label: 'Intervencije' },
            ]}
            blokirajBrisanje={(o) => (broj(o) > 0 ? 'Uređaj ima servisne intervencije. Prvo obrišite njegove intervencije.' : null)}
        />
    )
}
