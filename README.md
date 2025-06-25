# CompiLanche

O CompiLanche é um aplicativo mobile desenvolvido com **React Native** e **Expo SDK 53**, criado para simular um sistema de pedidos de hambúrgueres. Ele explora conceitos como navegação por abas com **Expo Router**, estilização com **TailwindCSS** via **NativeWind**, e controle de estado para gerenciar o carrinho de compras.

Este projeto foi desenvolvido com fins acadêmicos e didáticos, servindo como uma vitrine técnica e uma base para futuras evoluções.

---

## Funcionalidades

* **Autenticação**: Telas de Login e Cadastro.
* **Navegação por Abas**: Interface moderna com navegação intuitiva.
* **Carrinho de Compras**: Adição e remoção de itens.
* **Componentes Reutilizáveis**: Botões, cabeçalhos, inputs e layouts consistentes.

---

## Como Rodar o Projeto

### Pré-requisitos

* Node.js versão 18.x ou superior
* npm instalado
* Aplicativo Expo Go no seu smartphone ([App Store](https://apps.apple.com/us/app/expo-go/id1394474758) / [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Passo a passo

1.  Clone o repositório:
    ```bash
    git clone git@github.com:GutiCrespo/burguerApp.git
    cd burguerApp
    ```

2.  Instale as dependências:
    ```bash
    npm install --legacy-peer-deps
    ```
    Esse comando é necessário para evitar conflitos entre versões do React e bibliotecas de teste, como `react-test-renderer`.

3.  Inicie o servidor de desenvolvimento:
    ```bash
    npx expo start --clear
    ```
    Um QR Code será exibido no terminal. Escaneie com o app Expo Go no seu celular.

    **Dica**: Se o app não carregar, feche completamente o Expo Go e escaneie novamente.

---

## Observações de Compatibilidade

Este projeto foi configurado especificamente para o **Expo SDK 53**, com ajustes no ambiente para garantir estabilidade:

* As versões das dependências estão fixadas no `package.json` para evitar erros de compatibilidade.
* O plugin `react-native-reanimated/plugin` já está incluído no `babel.config.js`.
* Parâmetros instáveis foram removidos do `app.json`, como `newArchEnabled` e `experiments.typedRoutes`.

**Dica**: Caso enfrente erros de instalação, sempre utilize `npm install --legacy-peer-deps`.

---

## Tecnologias Utilizadas

* **React Native** – Desenvolvimento mobile com foco em performance
* **Expo SDK 53** – Build e debug simplificados para apps React Native
* **Expo Router (v5.1.0)** – Sistema de navegação baseado em arquivos
* **TypeScript** – Tipagem estática para maior segurança no código
* **TailwindCSS via NativeWind** – Estilização com classes utilitárias
* **Hermes** – Motor JavaScript leve, otimizado para Android
* `@react-native-async-storage/async-storage` – Persistência local de dados
* `react-native-dotenv` – Uso de variáveis ambiente no app
* `react-native-reanimated (v3.17.5)` – Animações fluidas e responsivas

---

## Melhorias Futuras

* Integração com uma API real para gerenciamento de pedidos
* Tela de histórico de pedidos
* Área administrativa para controle do cardápio