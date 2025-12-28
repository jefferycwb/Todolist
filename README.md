#  📝 Rizzo Flow

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=GREEN&style=for-the-badge)
![Badge License](http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge)

---

<img width="1920" height="1080" alt="Captura de tela 2025-12-28 004239" src="https://github.com/user-attachments/assets/fdbe53cb-ed2c-4f31-8bb0-a1c1dfae9d41" />

---

## 💻 Sobre o Projeto

**Rizzo Flow** é uma aplicação web de gerenciamento de produtividade (Task Manager) desenvolvida com foco em **persistência de dados**, **segurança** e **experiência do usuário (UX)**.

Diferente de listas "to-do" simples, este projeto simula o comportamento de um software nativo, mantendo o estado da aplicação entre sessões e permitindo a portabilidade de dados através de arquivos físicos. O design segue a estética "Aurora Dark", priorizando conforto visual e modernidade.

---

## ⚙️ Funcionalidades Avançadas

- **💾 Persistência de Estado (LocalStorage):** O sistema utiliza a API de armazenamento local do navegador para salvar, recuperar e atualizar o estado das tarefas em tempo real (JSON parsing/stringifying).
- **🛡️ Segurança Anti-XSS:** Implementação de sanitização rigorosa de inputs. Caracteres especiais (`<`, `>`, `&`, `"`) são escapados antes da renderização no DOM, prevenindo injeção de scripts maliciosos.
- **📦 Sistema de Backup e Restauração:**
  - **Exportação:** Gera dinamicamente um arquivo `.txt` contendo o objeto JSON das tarefas utilizando `Blob` e `URL.createObjectURL`.
  - **Importação:** Lê arquivos físicos via `FileReader API`, valida a estrutura do JSON e restaura o estado da aplicação.
- **📅 Lógica de Datas e Prazos:** Algoritmos de comparação de datas (`Date Object`) para identificar tarefas atrasadas automaticamente.
- **🏷️ Categorização Dinâmica:** Sistema de tags para classificar tarefas (Trabalho, Estudo, Pessoal, Lazer).
- **🎨 UI/UX Responsiva:** Layout flexível (Flexbox) que se adapta a dispositivos móveis e desktops, com feedback visual (gamificação) ao completar 100% das tarefas.

---

## 📂 Estrutura do Projeto

```bash
rizzo-flow/
├── index.html      # Estrutura semântica e importação de recursos
├── style.css       # Estilização Aurora Dark, Reset e Responsividade
├── script.js       # Lógica de negócio, manipulação de eventos e LocalStorage
└── README.md       # Documentação do projeto
