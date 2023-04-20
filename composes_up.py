import os
import time
import docker

caminhoAtual = os.getcwd()

# inicializa o cliente Docker
client = docker.from_env()

# criar á rede network
os.system('docker network create -d bridge pizzaria-network')
print("Network criada")

while True:

    opcao = int(input("escolha uma opção:\n\t1 - Inicializar container Backend.\n\t2 - Inicializar container Frontend.\n\t0 - Encerra o programa.\n: "))

    # Inicializar container Backend
    if opcao == 1:
        os.chdir(caminhoAtual)
        os.system(
            'docker-compose -f docker-compose.yml build db_postgres --no-cache')
        os.system('docker-compose -f docker-compose.yml build app_back --no-cache')
        os.system('docker-compose -f docker-compose.yml up db_postgres -d')
        os.system('docker-compose -f docker-compose.yml up app_back -d')
        time.sleep(3)
        # identifica o container pelo nome
        container_name = 'app_back'
        print('executando comando "npx prisma migrate dev && npx prisma generate"')
        # executa os comandos dentro do container
        command = '/bin/sh -c "npx prisma migrate dev && npx prisma generate"'
        exec_run = client.containers.get(container_name).exec_run(command)
        print(exec_run.output.decode())
        print('Restartando container')
        time.sleep(3)
        os.system('docker-compose -f docker-compose.yml restart app_back')

    # Inicializar container Frontend
    if opcao == 2:
        # os.chdir(f'{caminhoAtual}/frontend')
        os.chdir(caminhoAtual)
        os.system('docker-compose -f docker-compose.yml build app_front --no-cache')
        os.system('docker-compose -f docker-compose.yml up app_front -d')
        time.sleep(3)
        # identifica o container pelo nome
        container_name = 'app_front'

        # executa os comandos dentro do container
        print('executando comando "npm i sass"')
        command = '/bin/sh -c "npm i sass"'
        exec_run = client.containers.get(container_name).exec_run(command)
        print(exec_run.output.decode())
        print('Restartando container')
        time.sleep(3)
        os.system('docker-compose -f docker-compose.yml restart app_front')

    # Encerra o programa
    if opcao == 0:
        break