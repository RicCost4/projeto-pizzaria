import os
import docker
import time

# inicializa o cliente Docker
client = docker.from_env()

caminhoAtual = os.getcwd()

while True:

    opcao = int(input(
        "escolha uma opção:\n\t1 - Para os container.\n\t0 - Encerra o programa.\n: "))
    # para as maquinas

    # container Backend
    if opcao == 1:
        # Backup do BD
        # identifica o container pelo nome
        container_name = 'db_postgres'

        # executa os comandos dentro do container
        print(
            'executando comando "pg_dump -U postgres -d pizzaria -f /backups/pizzaria.sql"')
        command = f'/bin/sh -c "pg_dump -U postgres -d pizzaria -f /backups/pizzaria.sql"'
        exec_run = client.containers.get(container_name).exec_run(command)
        os.system(
            f'docker cp {container_name}:/backups/pizzaria.sql {caminhoAtual}/backend/bd/backups')
        print('Backup executado com sucesso!!')
        time.sleep(5)

        os.chdir(caminhoAtual)
        os.system('docker-compose down')
        # remover todas as imagens
        os.system('docker rmi -f projeto-pizzaria-db_postgres')
        os.system('docker rmi -f projeto-pizzaria-app_back')
        os.system('docker rmi -f projeto-pizzaria-app_front')

    # Encerrar o loop
    if opcao == 0:
        break

# remover a network
os.system('docker network rm -f pizzaria-network')

# Limpar o cache do Docker
os.system('docker system prune -a')