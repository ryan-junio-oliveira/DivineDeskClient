import React from 'react';

const ProtectedPage: React.FC = () => {
  return (
    <div>
      <h2>Página Protegida</h2>
      <p>Este conteúdo só deve ser acessado por usuários autenticados.</p>
    </div>
  );
};

export default ProtectedPage;
