import React from "react";
type props = {
  resultFinal : boolean
}
const Header: React.FC<props> = ({
  resultFinal
}) => {
  return (
    <div className="heading">
        <div className="heading__center">
        <h2>Campeonato de Filmes</h2>
        <h1>{!resultFinal ? 'Fase Seleção' : 'Resultado Final'}</h1>
        <span></span>
        <p>
            {!resultFinal && `Selecione os filmes que voce deseja que entrem na competição e depois pressione o botão "Gerar meu Campeonato" para prosseguir.`}
            {resultFinal && `Veja o resultado final do Campeonato de filmes de forma simples e rápida`}
        </p>
        </div>
    </div>
  );
};

export default Header;
