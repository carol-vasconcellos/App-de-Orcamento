# **App de Orçamento de Construção Civil**

Este projeto tem como objetivo desenvolver um aplicativo para a organização de orçamentos e controle de materiais utilizados por profissionais autônomos na área de construção civil, como pedreiros. O principal usuário do sistema é Ivan Fonseca de Vasconcellos, um pedreiro autônomo, que enfrenta dificuldades no gerenciamento manual de orçamentos e materiais.

### **Objetivos do App**

1. Cadastro e gerenciamento de orçamentos e materiais de obra.
2. Controle de prazos e custos de materiais.
3. Redução de erros nos orçamentos e no controle de materiais.
4. Aumento da organização e eficiência na execução de obras.

## **Tecnologias Usadas**

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React Native (com Expo)
- **Banco de Dados:** MongoDB (armazenamento de orçamentos e materiais)
- **Envio de Emails:** Utilizando Mailtrap (servidor de email gratuito)
- **Outras Ferramentas:** Expo (para testar o app em dispositivos reais), GitHub para versionamento do código.

---

## **Instruções para Rodar o Projeto**

### **Backend**

1. **Instalar Dependências**

   Navegue até a pasta do backend e instale as dependências:
   ```bash
   cd backend
   npm install
   ```

2. **Variáveis de Ambiente**

   Crie um arquivo `.env` dentro da pasta `backend` com as as variáveis de ambiente.

3. **Rodar o Servidor**

   Com as dependências instaladas e o arquivo `.env` configurado, inicie o servidor:
   ```bash
   npm start
   ```

   O servidor estará disponível em `http://localhost:5000`.

4. **Testar as Rotas**

   Você pode testar as rotas de criação e leitura de orçamentos e materiais no Postman ou outro cliente de API. As rotas estão definidas nos arquivos dentro da pasta `routes`.

### **Mobile App (Frontend)**

1. **Instalar o Expo**

   Se você ainda não tem o Expo instalado, instale com o seguinte comando:
   ```bash
   npm install -g expo-cli
   ```

2. **Instalar Dependências**

   Navegue até a pasta do app React Native e instale as dependências:
   ```bash
   cd mobile-app
   npm install
   ```

3. **Configurar Variáveis de Ambiente**

   Crie um arquivo `.env` dentro da pasta `mobile-app` com a URL do backend:
   
   ```bash
   API_URL=http://localhost:5000
   ```

4. **Rodar o App**

   Para iniciar o app no seu dispositivo ou no emulador, rode o comando:
   ```bash
   expo start
   ```

   Isso abrirá o Expo no seu navegador. Você pode escanear o QR code com o aplicativo Expo Go no seu dispositivo físico ou rodar o app no emulador.

---

## **Funcionalidades Implementadas**

1. **Cadastro de Orçamentos**
   - Criação de orçamentos para materiais de obra.
   - Definição de prazos para execução da obra.

2. **Cadastro de Materiais**
   - Adicionar materiais necessários para o orçamento.
   - Acompanhamento do status dos materiais (quantidade, custo, etc.).

3. **Envio de Emails**
   - Notificação por email para o responsável pela obra quando o orçamento for criado.
   - Configuração do servidor de email gratuito com Mailtrap.

---

## **Testes e Avaliação**

Durante o desenvolvimento, foram realizados testes para garantir o funcionamento correto do aplicativo, principalmente nas funcionalidades de cadastro de orçamentos e materiais, além do envio de emails. 

---

## **Conclusão**

Este projeto visa automatizar e melhorar a gestão de orçamentos e materiais de obras para pedreiros autônomos, como Ivan. O aplicativo desenvolvido com React Native e Node.js com Express atende à necessidade de eficiência e redução de erros, contribuindo para o aprendizado prático na disciplina de Programação para Dispositivos Móveis.
