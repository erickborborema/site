# Instruções de Deploy no Netlify

## Configuração Automática

O projeto já está configurado para deploy no Netlify. Basta seguir os passos abaixo:

### 1. Conecte seu repositório ao Netlify

1. Acesse [Netlify](https://www.netlify.com/)
2. Faça login ou crie uma conta
3. Clique em "Add new site" > "Import an existing project"
4. Conecte seu repositório Git (GitHub, GitLab ou Bitbucket)

### 2. Configurações de Build

O Netlify detectará automaticamente as configurações do arquivo `netlify.toml`:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 20

### 3. Variáveis de Ambiente (se necessário)

Se precisar de variáveis de ambiente, adicione-as nas configurações do site no Netlify:
- Site settings > Build & deploy > Environment variables

### 4. Deploy

Após conectar o repositório, o Netlify fará o deploy automaticamente. Cada push na branch principal gerará um novo deploy.

## Arquivos de Configuração

- `netlify.toml` - Configurações de build e redirects
- `public/_redirects` - Redirects para SPA (Single Page Application)
- `.nvmrc` - Versão do Node.js (20)

## Verificação Pós-Deploy

Após o deploy, verifique:
- ✅ Site carrega corretamente
- ✅ Rotas funcionam (navegação entre páginas)
- ✅ Favicon aparece
- ✅ Assets carregam corretamente

## Troubleshooting

Se houver problemas:

1. Verifique os logs de build no Netlify
2. Teste localmente com `npm run build && npm run preview`
3. Verifique se todas as dependências estão no `package.json`

