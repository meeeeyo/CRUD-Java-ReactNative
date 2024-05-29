/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ffos;

import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Meeeyo
 */
@Configuration
public class MyConfiguration {
    
    @Bean
    public OpenAPI myOpenAPI(){
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Razvoj (DEV)");
        
        Server prodServer = new Server();
        prodServer.setUrl("https://daytona.ffos.hr");
        prodServer.setDescription("Produkcija (PROD)");
        
        return new OpenAPI().servers(List.of(devServer, prodServer));
    }
    
}
