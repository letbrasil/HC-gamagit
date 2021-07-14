import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [erro, setErro] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then((response) => {
        const repositories = response.data; // 30 primeiros repos em ordem alfabética
        const repositoriesName = [];
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        setErro(false);
        history.push('/repositories');
      })
      .catch((err) => {
        setErro(true);
      });
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input
          className="usuario-input"
          placeholder="Usuário GitHub"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <S.Button type="button" onClick={handlePesquisa}>
          Pesquisar
        </S.Button>
      </S.Content>
      {erro ? <S.ErrorMsg>Usuário não encontrado. Tente novamente.</S.ErrorMsg> : ''}
    </S.HomeContainer>
  );
}
