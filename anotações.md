docker run -p 3333:3333 

docker-compose up

docker ps

## Inicialização:
docker-compose up
http://localhost:5050/

## Git:
Para fazer upload para o git:
git add .
git comit -m 'comentário'
git push

Para verificar o que está no stage: git status


## =>o pg admin conectou, mas o app não buildou
-> olhar a aula e copiar o código da dani pra voltar no erro anterior. Depois, colocoar o pgadmin pra conectar 
O erro que estava tendo era: Postgres: FATAL: role "postgres" does not exist =>
*RESOLVIDO: ao tirar o username, ele cria o username postgres sozinho, já que essa variável é opcional. Por meio do site abaixo, cheguei na documentação do docker que diz que:

https://www.reddit.com/r/docker/comments/q87fag/postgres_fatal_role_postgres_does_not_exist/

"POSTGRES_USER
This optional environment variable is used in conjunction with POSTGRES_PASSWORD to set a user and its password. This variable will create the specified user with superuser power and a database with the same name. If it is not specified, then the default user of postgres will be used."

Tb não consegui conectar da minha máquina para o containter, então fiz um containter com o pgadmin como fizeram nos vídeos do youtube. 
## Para usar o pgadmin do container:
http://localhost:5050/
        - PGADMIN_DEFAULT_EMAIL=ain@ain.com
        - PGADMIN_DEFAULT_PASSWORD=123

## hostname -i
Na CLI do docker pra obter o ip

> Erro do migrations: Não quer reconhecer os parâmetros (-n ou -d)
## Próximos passos:
- [x] fazer o Getting started do TYPEORM: https://typeorm.io/
- [x] continuar lendo o que achou no google sobre o erro: https://www.google.com/search?q=typeorm+migration+missing+required+argument+n&ei=waFEYtT0ForZ1sQPo8KG2Ac&start=0&sa=N&ved=2ahUKEwiU2cPpu-72AhWKrJUCHSOhAXs4FBDy0wN6BAgBEDw&biw=1920&bih=969&dpr=1 
## Resposta: https://github.com/typeorm/typeorm/issues/8810
era um bug da nova versão do typeorm. Não vou usar argumentos por enquanto, apenas passar o caminho completo das migrations. Por exemplo, o que deveria ser 'yarn typeorm migration:create -n UserMigration' será 'yarn typeorm migration:create src/database/migrations/UserMigration'
## obs:
ao fazer o getting started do typeorm, descobri que a base de dados do postgres não estava conectado pois o serviço não estava iniciado em 'Serviços' do windows. Lembro que eu o tinha parado por algum motivo...

TESTES
1 - Testes Unitários: testes da regra de negócio (1 arquivo só)
2 - Testes de Integração: testar o fluxo da aplicação (vários arquivos)

Como fiz pra alterar a coluna que criei errado:
Duas maneiras => 1) alterei o script de criação e dei um migration:revert até o ponto antes de eu ter criado a tabela (cada revert reverte um passo), e rodei migration run novamente
2) criar um script para alterar o nome da coluna e dar um migration:run 

------
sudo adduser app
1234

----
## ec2 na aws: SSH Public Key - No supported authentication methods available (server sent public key)
Criamos o usário app e demos as permissões na pasta .ssh e arquivo autorized_keys. Criamos um par de chaves utilizando PuttyGen, que vem com a instalação do Putty, colocamos a chave pública e colocamos no arquivo authorized_keys, e informamos onde está a chave privada correspondente na hora de conectar (Connection > SSH > Auth)
Quando vamos conectar pelo putty, estava dando oerro acima. 
**solução** 
Ocorre que o arquivo gerado pelo putty tem quebras de linha que não fazem parte da chave. Ao colar a chave, demos tirar as quebras de linha.
como deve ser:
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCrqUHnJ9/oMxOqZiFOhIvmkVYtFmVTSX+QWbRJOfhkEpWdsllDMGwxTLnFSZOGTo8PBYRJy3UJmBbs8RmZqcCwIKDSdIvN6MvBY4TlcEcDq3p0hkIFwZxlm5CcVILqmzF+5fX5V//Ge4g9PHJJoGmUAAFamxpMtnvcSlk/3ihb0P6u/gTuPZcuWAlRpnoAzZ8XCy6Oq6Eh8Bc7Wm9eCenH/s6iBBmSujeacarKfIPuI7Z9rymDghCxUUV7uyjq1CfM3BiRrrH4YiimiZ+WbzGsrs2OTVkR2KQBOXGDZT7yGAO50M8REsUtxZvvwvaveMamgQIcjqZfD/JzG9Vl62In

como é gerado pelo putty:
---- BEGIN SSH2 PUBLIC KEY ----
Comment: "rsa-key-20220502"
AAAAB3NzaC1yc2EAAAADAQABAAABAQCrqUHnJ9/oMxOqZiFOhIvmkVYtFmVTSX+Q
WbRJOfhkEpWdsllDMGwxTLnFSZOGTo8PBYRJy3UJmBbs8RmZqcCwIKDSdIvN6MvB
Y4TlcEcDq3p0hkIFwZxlm5CcVILqmzF+5fX5V//Ge4g9PHJJoGmUAAFamxpMtnvc
Slk/3ihb0P6u/gTuPZcuWAlRpnoAzZ8XCy6Oq6Eh8Bc7Wm9eCenH/s6iBBmSujea
carKfIPuI7Z9rymDghCxUUV7uyjq1CfM3BiRrrH4YiimiZ+WbzGsrs2OTVkR2KQB
OXGDZT7yGAO50M8REsUtxZvvwvaveMamgQIcjqZfD/JzG9Vl62In
---- END SSH2 PUBLIC KEY ----

referência: https://askubuntu.com/questions/204400/ssh-public-key-no-supported-authentication-methods-available-server-sent-publ