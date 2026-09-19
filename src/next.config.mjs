/** @type {import('next').NextConfig} */

// Nome do repositório no GitHub — usado para montar o caminho correto
// quando o site é publicado em https://<usuario>.github.io/<repositorio>/
const repoName = "Projeto_Integrador_II"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Gera um site 100% estático (pasta /out) em vez de precisar de um servidor Node rodando
  output: "export",
  // Necessário em GitHub Pages, que serve cada rota como uma pasta com index.html
  trailingSlash: true,
  // Só aplica o prefixo de subpasta durante o build de produção (GitHub Actions),
  // para não atrapalhar o `pnpm dev` local
  basePath: process.env.GITHUB_ACTIONS ? `/${repoName}` : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? `/${repoName}/` : "",
}

export default nextConfig
