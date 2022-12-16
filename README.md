# Next Tube

[Site online - Next Tube](https://next-tubes.vercel.app/)

## Tecnologias que utilizei

- NextJS
- ReactJS
- Typescript
- TailwindCSS
- Formik
- Yup
- React Icons
- Supabase
- React Query
- Youtube Downloader
- Husky | Lint-staged | Commit-lint | Commitizen

## Features do projeto

- O usuário pode fazer login com Google
- Só poderá adicionar e deletar vídeos os usuários que estiverem logados
- O usuário pode adicionar vídeos e deletar apenas os seus vídeos em sua dashboard
- Qualquer usuário pode assistir aos vídeos adicionados pelo Youtube diretamente na plataforma
- É possível fazer o download dos vídeos mas com algumas restrições pela Vercel

### O download dos vídeos são todos servidos atráves da API do Next que é hospedada pela Vercel, e por isso existem algumas restrições por causa dos planos.
### Todos os downloads são apenas aúdios, se fosse feito download do vídeo com aúdio iria ficar impossível de ter essa feature na plataforma. 
### Infelizmente nem todos vão liberar o download por conta do limite máximo de tempo para uma requisição de API na Vercel. 
