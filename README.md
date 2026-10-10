# POO-ecommerce
Exercícios aplicando SOLID.
Exercicios para aplicar o SOLID

Na parte do  S  no exercicios,  vemos  algumas interferencia, como  o prisma que é chamado diretamente no codigo principal, no caso vamos mudar para que ele não acesse o banco de dados diretamente, e sim uma classe  que chame
Para isso criamos
orderRepository.ts= no caso esse arquivo  apenas pegas as  operações do banco e guarda separadamente, como: procurar um produto, gravar o pedido no banco e o proprio prisma.
OBS: o banco de dados do orderService continua junto do repositorio, separarmos depois.
 
continuando nessa parte vamos mudar a sequencia de instruções que também estão ligados diretamente no orderController, para isso criaremos um orderservice

orderservice.ts= no caso esse  arquivo so passara o repository que terá o cliente(prisma) e executa as mesmas sequencia de instruções só que chamando o repository.
Como as  instruções passaram para a orderservices no OrderController ele irá chamar a função na orderservice e passará as mensagem caso de certo ou errado

 Percebemos  também  no codigo original que temos a notificação fazendo parte do codigo direto, precisamos fazer a mesma coisa que os outros

notificationService.ts= nele vai ter uma classe que chama o gmaildocliente que devolve o email com a confirmação do pedido para o cliente.
Além disso chamamos no orderservice, pois lá executa os comandos e se acaso de tudo certo ele envia o email, chamando a função
No orderController somente no return chamo a variavel que recebeu a função no orderrepository.
