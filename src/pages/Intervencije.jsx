import { useState } from 'react'
import CrudTablica from '../components/CrudTablica'
import { STATUSI_INTERVENCIJE, VRSTE, danas, formatDatum, formatMin } from '../constants'
import { useLista } from '../hooks'
import IntervencijaService from '../services/IntervencijaService'
import OpremaService from '../services/OpremaService'

export default function Intervencije({ param }) {

    const intervencije = useLista(IntervencijaService)
    const oprema = useLista(OpremaService)
    const opremaF = param?.startsWith('oprema-') ? Number(param.slice(7)) : 0
    const [status, setStatus] = useState('')

    const uredaj = (s) => oprema.stavke.find((x) => x.sifra === s)
    const prikaz = intervencije.stavke
        .filter((i) => !opremaF || i.oprema === opremaF)
        .filter((i) => !status || (status === 'otvorene' ? i.status !== 'Završeno' : i.status === status))
        .sort((a, b) => b.datum.localeCompare(a.datum) || b.sifra - a.sifra)
    const ukupno = prikaz.reduce((z, i) => z + Number(i.trajanje || 0), 0)

    function validate(v) {
        const g = {}
        const u = uredaj(Number(v.oprema))
        if (u && v.datum < u.datumNabave) g.datum = `Intervencija ne može biti prije nabave uređaja (${formatDatum(u.datumNabave)}).`
        if (Number(v.trajanje) < 0) g.trajanje = 'Trajanje ne može biti negativno.'
        if (v.status === 'Završeno' && !v.radovi.trim()) g.radovi = 'Za završenu intervenciju upišite izvršene radove.'
        return g
    }

    return (
        <CrudTablica
            naslov={opremaF ? `Intervencije uređaja: ${uredaj(opremaF)?.naziv ?? '—'}` : 'Servisne intervencije'}
            novi="Nova intervencija"
            servis={IntervencijaService}
            stavke={prikaz}
            osvjezi={intervencije.osvjezi}
            otvoreno0={param === 'nova'}
            prazno="Nema intervencija za zadane uvjete."
            validate={validate}
            alat={(
                <div className="alat filteri">
                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Sve intervencije</option>
                        <option value="otvorene">Samo nezavršene</option>
                        {STATUSI_INTERVENCIJE.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <span className="prigusen">Utrošeno vrijeme: <b>{formatMin(ukupno)}</b></span>
                </div>
            )}
            fields={[
                { name: 'oprema', label: 'Uređaj', type: 'select', asNumber: true, required: true, default: opremaF || '', options: oprema.stavke.map((o) => ({ value: o.sifra, label: `${o.inventarniBroj} ${o.naziv}` })) },
                { name: 'datum', label: 'Datum intervencije', type: 'date', required: true, default: danas() },
                { name: 'vrsta', label: 'Vrsta intervencije', type: 'select', required: true, default: 'Hardver', options: VRSTE.map((v) => ({ value: v, label: v })) },
                { name: 'status', label: 'Status', type: 'select', required: true, default: 'Otvoreno', options: STATUSI_INTERVENCIJE.map((s) => ({ value: s, label: s })) },
                { name: 'problem', label: 'Opis problema', type: 'textarea', required: true },
                { name: 'radovi', label: 'Izvršeni radovi', type: 'textarea' },
                { name: 'trajanje', label: 'Utrošeno vrijeme (min)', type: 'number', required: true, default: 0 },
                { name: 'napomena', label: 'Napomena', type: 'textarea' },
            ]}
            columns={[
                { render: (i) => formatDatum(i.datum), label: 'Datum' },
                { render: (i) => uredaj(i.oprema)?.naziv ?? '—', label: 'Uređaj' },
                { key: 'vrsta', label: 'Vrsta' },
                { key: 'problem', label: 'Problem' },
                { render: (i) => formatMin(i.trajanje), label: 'Vrijeme' },
                { render: (i) => <span className={i.status === 'Završeno' ? 'oznaka ok' : i.status === 'Otvoreno' ? 'oznaka opasna' : 'oznaka'}>{i.status}</span>, label: 'Status' },
            ]}
        />
    )
}
