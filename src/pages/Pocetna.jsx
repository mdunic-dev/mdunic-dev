import { formatDatum } from '../constants'
import { useLista } from '../hooks'
import IntervencijaService from '../services/IntervencijaService'
import OpremaService from '../services/OpremaService'

export default function Pocetna({ idi }) {

    const oprema = useLista(OpremaService)
    const intervencije = useLista(IntervencijaService)

    const uredaj = (s) => oprema.stavke.find((x) => x.sifra === s)
    const otvorene = intervencije.stavke.filter((i) => i.status !== 'Završeno').length
    const zadnje = [...intervencije.stavke].sort((a, b) => b.datum.localeCompare(a.datum) || b.sifra - a.sifra).slice(0, 5)
    const kvarovi = oprema.stavke
        .map((o) => ({ o, n: intervencije.stavke.filter((i) => i.oprema === o.sifra && i.vrsta !== 'Preventivno održavanje').length }))
        .filter((x) => x.n > 0)
        .sort((a, b) => b.n - a.n)
        .slice(0, 5)

    return (
        <>
            <div className="naslovnica">
                <h1>Nadzorna ploča</h1>
                <p className="prigusen">Stanje IT opreme i servisnih intervencija.</p>
            </div>

            <div className="kutije">
                <button className="kutija statistika" onClick={() => idi('oprema')}><b>{oprema.stavke.length}</b><span>Ukupno uređaja</span></button>
                <button className="kutija statistika" onClick={() => idi('oprema')}><b>{oprema.stavke.filter((o) => o.status === 'Aktivno').length}</b><span>Aktivnih uređaja</span></button>
                <button className="kutija statistika" onClick={() => idi('oprema')}><b className={oprema.stavke.some((o) => o.status === 'Neispravno') ? 'kasni' : ''}>{oprema.stavke.filter((o) => o.status === 'Neispravno').length}</b><span>Neispravnih uređaja</span></button>
                <button className="kutija statistika" onClick={() => idi('intervencije')}><b>{otvorene}</b><span>Otvorenih intervencija</span></button>
            </div>

            <div className="glava">
                <h2>Posljednje servisne intervencije</h2>
                <div className="alat bez-razmaka">
                    <button className="gumb" onClick={() => idi('intervencije', 'nova')}>+ Nova intervencija</button>
                    <button className="gumb sporedni" onClick={() => idi('oprema', 'novi')}>+ Novi uređaj</button>
                </div>
            </div>
            <div className="kutija tablica-omot">
                {zadnje.length === 0 ? <p className="prigusen popuna">Još nema intervencija.</p> : (
                    <table>
                        <thead><tr><th>Datum</th><th>Uređaj</th><th>Problem</th><th>Status</th></tr></thead>
                        <tbody>
                            {zadnje.map((i) => (
                                <tr key={i.sifra}>
                                    <td>{formatDatum(i.datum)}</td>
                                    <td>{uredaj(i.oprema)?.naziv ?? '—'}</td>
                                    <td>{i.problem}</td>
                                    <td><span className={i.status === 'Završeno' ? 'oznaka ok' : i.status === 'Otvoreno' ? 'oznaka opasna' : 'oznaka'}>{i.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <h2>Uređaji s najviše kvarova</h2>
            <div className="kutija tablica-omot">
                {kvarovi.length === 0 ? <p className="prigusen popuna">Nema evidentiranih kvarova.</p> : (
                    <table>
                        <thead><tr><th>Uređaj</th><th>Lokacija</th><th>Broj kvarova</th></tr></thead>
                        <tbody>
                            {kvarovi.map(({ o, n }) => (
                                <tr key={o.sifra}>
                                    <td><button className="veza" onClick={() => idi('intervencije', `oprema-${o.sifra}`)}>{o.naziv}</button></td>
                                    <td>{o.lokacija}</td>
                                    <td><b>{n}</b></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
