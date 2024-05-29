/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ffos.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

/**
 *
 * @author Meeeyo
 */
@Entity (name = "model")
@Data
public class Model {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int sifra;
    @Column (nullable = false)
    private String naziv;
    @Column (name = "bpk")
    private int brojPotrosenihKalorija;
    
}
