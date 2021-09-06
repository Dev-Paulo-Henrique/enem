export function List() {
  return (
    <nav>
      <div className="together">
        <h1>Meus envios</h1>
        <div className="content">
          <div className="background one"></div>
          <a href="/matter/ciencias-da-natureza">
            Ciências da Natureza
          </a>
        </div>
        <div className="content">
          <div className="background three"></div>
          <a href="/matter/liguagens-codigos-e-suas-tecnologias">
            Liguagens, Códigos e suas Tecnologias
          </a>
        </div>
        <div className="content">
          <div className="background two"></div>
          <a href="/matter/ciencias-humana">
            Ciências Humanas
          </a>
        </div>
        <div className="content">
          <div className="background four"></div>
          <a href="/matter/matematica-e-suas-tecnologias">
            Matemática e suas tecnologias
          </a>
        </div>
        <div className="content">
          <div className="background five"></div>
          <a href="/matter/redacao">
            Redação
          </a>
        </div>
      </div>
    </nav>
  )
}