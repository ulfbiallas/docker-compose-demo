FROM java:8

RUN mkdir /app
ADD build/libs/backend.jar /app/
ADD build/libs/application.properties /app/

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/backend.jar"]