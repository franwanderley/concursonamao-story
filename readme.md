<div style="display: flex; flex:1; align-items:center">
   <h1 style="text-align: center; display: flex; flex-direction: row; align-items: center;">
      <img src="./assets/favicon.png" style="margin-right: 2%" alt="Logo">
      Concursos na Mão 
   </h1>
   <p>
      Uma implementação de story parecido com o do instagram para o app Concursos na Mão
   </p>
   <img src="./assets/result.jpg" alt="Resultado da Aplicação">
   <h3>🚀 Tecnologias Usadas</h3>
   <ul>
      <li>React Native</li>
      <li>typeScript</li>
      <li>Expo</li>
      <li>Axios</li>
      <li>AsyncStorage</li>
      <li>Image Picker</li>
      <li>Expo Camera</li>
   </ul>
   <h3>📓 Como usar no seu PC</h3>
   <ul>
      <li>Antes é preciso ter instalado o <a href="https://nodejs.org/en/">NodeJS</a></li>
      <li>Dá um git clone neste repositorio</li>
      <li>Dá um cd na pasta que colocou este repositorio</li>
      <li>code . para abrir no VSCode</li>
      <li>No terminal no VSCode usar expo install</li>
      <li>Antes de executar é preciso criar uma arquivo .env que terá a chave <code>REACT_APP_IMG=</code></li>
      <li>Você precisará criar a chave neste <a href="https://api.imgur.com/oauth2/addclient">link</a> pegue o do CLIENT_ID</li>
      <li>Depois da Instalação roda expo start</li>
      <li>Depois disso acesse http://localhost:19002</li>
      <li>Assim você pode escolher se vai rodar no emulador ou no celular</li>
      <li>Se for no seu propio celular é preciso baixo na loja de aplicativos o Expo Go e depois escanear o QRCode</li>
      <li>Se for no emulador <a href="https://www.youtube.com/watch?v=eSjFDWYkdxM">neste link</a> tem um tutorial de como configurar o emulador</li>
   </ul>
   <h3>Banco de Dados</h3>
      <table>
         <tr>
            <th>People</th>
            <th>Story</th>
         </tr>
         <tr>
            <td>id : Int</td>
            <td>idStory : Int</td>
         </tr>
         <tr>
            <td>name : varchar</td>
            <td>image : varchar</td>
         </tr>
         <tr>
            <td>avatar : varchar</td>
            <td>text : varchar</td>
         </tr>
         <tr>
            <td>qtdStory : int</td>
            <td>createdIn : varchar</td>
         </tr>
         <tr>
            <td></td>
            <td>idPeople : int</td>
         </tr>
      </table>
   <h3>💾 Rotas do Servidor</h3>
   <h5>GET peoples</h5>
   <p>Rota para pegar todos os usuarios do banco de dados e se tiver ?story=true vai retornar um join entre pessoas e story</p>
   <h5>POST peoples</h5>
   <p>Vai apenas salvar no banco de dados</p>
   <h5>POST story</h5>
   <p>Vai salvar story e incrementar qtdStory na tabela peoples</p>
   <h5>DELETE peoples</h5>
   <p>Vai apagar a pessoa e logo os story dela</p>
   <h5>DELETE story</h5>
   <p>Vai apagar story e decrementar qtdStory na tabela peoples</p>