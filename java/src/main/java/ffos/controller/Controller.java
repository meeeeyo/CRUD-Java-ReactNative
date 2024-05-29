/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ffos.controller;


import ffos.model.Model;
import ffos.service.Service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author Meeeyo
 */
@RestController
@RequestMapping("/api/ffos/model")
public class Controller {
    
    @Autowired
    Service service;
    
    @GetMapping("/get")
    public ResponseEntity<List<Model>> get(){
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }
    
    @GetMapping("/getBySifra")
    public ResponseEntity<Model> getBySifra (int sifra){
        return new ResponseEntity<>(service.getBySifra(sifra), HttpStatus.OK);
    }
    
    @PostMapping("/post")
    public ResponseEntity post (@RequestBody Model m) {
        try {
            System.out.println(m);
            
            if (m.getNaziv() == null){
                return new ResponseEntity<>("Naziv je null", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(service.post(m), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/put")
    public ResponseEntity<String> put (@RequestBody Model m){
        System.out.println("Recieved model:" + m);
        try {
            service.put(m);
            String response = "{\"poruka\": \"Model uspješno promijenjen\"}";
            System.out.println("Response" + response);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String response = "{\"error\": \"" + e.getMessage() + "\"}";
            System.out.println("Response" + response);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } catch (Exception e){
            String response = "{\"error\": \"Greška servera\"}";
            System.out.println("Response" + response);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping ("/delete")
    public ResponseEntity<String> delete (int sifra){
        service.delete(sifra);
        return new ResponseEntity<>("Obrisano", HttpStatus.OK);
    }
    
}
