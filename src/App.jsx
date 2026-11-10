import { AUTOR, IME_APLIKACIJE, STRANICE } from './constants'
import { useRuta } from './hooks'
import Pocetna from './pages/Pocetna'
import Oprema from './pages/Oprema'
import Intervencije from './pages/Intervencije'

function App() {
  const { stranica, param, idi } = useRuta(STRANICE)

  return (
    <>
      <header className="zaglavlje">
        <button className="logo" onClick={() => idi('pocetna')}>
          {IME_APLIKACIJE}
          <span className="autor">{AUTOR}</span>
        </button>
        <nav className="izbornik">
          {STRANICE.filter((s) => s.izbornik).map((s) => (
            <button key={s.id} className={s.id === stranica ? 'aktivna' : ''} onClick={() => idi(s.id)}>
              {s.naziv}
            </button>
          ))}
        </nav>
      </header>

      <main className="sadrzaj">
        {stranica === 'oprema' ? <Oprema key={param} idi={idi} param={param} />
          : stranica === 'intervencije' ? <Intervencije key={param} param={param} />
          : <Pocetna idi={idi} />}
      </main>

      <footer className="podnozje">&copy; {IME_APLIKACIJE}</footer>
    </>
  )
}

export default App
