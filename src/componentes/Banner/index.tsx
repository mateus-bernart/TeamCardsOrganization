import "./banner.css";
import React from "react";

interface BannerProps {
  enderecoImagem: string;
  textoAlternativo: string;
}

const Banner = ({ enderecoImagem, textoAlternativo }: BannerProps) => {
  return (
    <header className="cabecalho">
      <img src={enderecoImagem} alt={textoAlternativo} />
    </header>
  );
};

export default Banner;
