FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY .mvn/ .mvn 
COPY mvnw .

COPY pom.xml .
COPY src ./src

RUN ./mvnw package -DskipTests

COPY target/NVIDIA-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
