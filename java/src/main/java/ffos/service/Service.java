/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ffos.service;

import ffos.HibernateUtil;
import ffos.model.Model;
import java.util.List;
import org.hibernate.Session;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Meeeyo
 */
@org.springframework.stereotype.Service
public class Service {
    
    protected Session session;
    
    public Service(){
        session = HibernateUtil.getSession();
    }
    
    public List<Model> getAll(){
        return session.createQuery("from model", Model.class).list();
    }
    
    public Model getBySifra (int sifra){
        return (Model) session.get(Model.class, sifra);
    }
    
    public Model post (Model m){
        session.beginTransaction();
        session.persist(m);
        session.getTransaction().commit();
        return m;
    }
    
    public void put (Model m){
        session.beginTransaction();
        Model baza = (Model) session.get(Model.class, m.getSifra());
        if (baza == null){
            session.getTransaction().rollback();
            throw new IllegalArgumentException("Model s ID-em" + m.getSifra() + "ne postoji");
        }
        baza.setNaziv(m.getNaziv());
        baza.setBrojPotrosenihKalorija(m.getBrojPotrosenihKalorija());
        session.persist(baza);
        session.getTransaction().commit();
    }
    
    public void delete (@RequestParam int sifra){
        session.beginTransaction();
        session.remove(session.get(Model.class, sifra));
        session.getTransaction().commit();
    }
    
}
