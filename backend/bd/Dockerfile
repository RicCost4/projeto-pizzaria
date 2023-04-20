FROM postgres:15

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=App@1234
ENV POSTGRES_DB=pizzaria
RUN mkdir /backups
#COPY backups/pizzaria.sql /docker-entrypoint-initdb.d/ # habilitar quando ter feito o primeiro backup do banco

EXPOSE 5432