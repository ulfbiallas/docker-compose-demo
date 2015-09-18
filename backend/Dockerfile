FROM java:8

RUN mkdir /app
ADD build/libs/backend.jar /app/
ADD build/libs/application.properties /app/

WORKDIR /app

ENTRYPOINT ["java","-jar","/app/backend.jar"]