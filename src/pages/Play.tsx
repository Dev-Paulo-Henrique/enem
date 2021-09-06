import '../styles/play.scss'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'

export function Play() {
  const { user } = useAuth()

  return (
    <>
      <div id="page-play">
        <header>
          <div className="content">
            <div className="form-footer">
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : ('')}
            </div>
            <div className="play">Pular</div>
          </div>
        </header>
        <main>
          <p> Brasil, Alemanha, Japão e Índia pedem reforma do Conselho de Segurança

            Os representantes do G4 (Brasil, Alemanha, Índia e Japão) reiteraram, em setembro  de 2018, a defesa pela ampliação do Conselho de Segurança da Organização das  Nações Unidas (ONU) durante reunião em Nova York (Estados Unidos). Em declaração conjunta, de dez itens, os chanceleres destacaram que o órgão, no formato em que está, com apenas cinco membros permanentes e dez rotativos, não reflete o século 21.   “A reforma do Conselho de Segurança é essencial para enfrentar os desafios complexos de hoje. Como aspirantes a novos membros permanentes de um conselho reformado, os ministros reiteraram seu compromisso de trabalhar para fortalecer o funcionamento da ONU e da ordem multilateral global, bem como seu apoio às respectivas candidaturas”, afirma a declaração conjunta.

            Os países mencionados no texto justificam sua pretensão com base na seguinte característica comum:</p>
          <div className="alt">
            <div className="a">
              <input type="radio" name="alt" id="a" />
              <label htmlFor="">Extensividade de área territorial.</label>
            </div>
            <div className="b">
              <input type="radio" name="alt" id="b" />
              <label htmlFor="">Protagonismo em escala regional.</label>
            </div>
            <div className="c">
              <input type="radio" name="alt" id="c" />
              <label htmlFor="">Investimento em tecnologia militar.</label>
            </div>
            <div className="d">
              <input type="radio" name="alt" id="d" />
              <label htmlFor=""> Desenvolvimento de energia nuclear.</label>
            </div>
            <div className="e">
              <input type="radio" name="alt" id="e" />
              <label htmlFor="">Disponibilidade de recursos minerais.</label>
            </div>
            <Button>Enviar</Button>
          </div>
        </main>
      </div>

    </>
  );
}