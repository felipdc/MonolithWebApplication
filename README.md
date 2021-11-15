# MonolithWebApplication

## Introdução e Motivação
O sistema Monolith é uma simulação de um sistema de controle de estoque e vendas de um comércio de produtos alimentícios.

O Monolith foi desenvolvido seguindo um padrão de arquitetura monolítico, onde todas as funções do sistema interagem entre si através de chamadas diretas.

O intuito do sistema é prover uma base de desenvolvimento para a realização de uma migração para a arquitetura de microserviços. Para isso, foi desenvolvido uma série de testes automatizados para verificar o funcionamento adequado de todas as operações desenvolvidas. Logo, espera-se que o sistema em uma arquitetura de microserviços passe em absolutamente todos os testes.

Para realizar a migração do sistema, é necessário considerar que a aplicação é utilizada por uma aplicação Front-End legado, onde não há mais um suporte de desenvolvimento. Portanto, as rotas definidas devem continuar retornando e alterando os resultados da mesma maneira, de forma com que não seja necessário uma restruturação do sistema legado.

## Autor

Felipe Tiago De Carli
felipetdecarli@gmail.com
felipedecarli@usp.br
