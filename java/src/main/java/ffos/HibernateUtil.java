/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ffos;


import org.hibernate.Session;
import org.hibernate.cfg.Configuration;

/**
 *
 * @author Meeeyo
 */
public class HibernateUtil {
    
    private static Session session = null;
    
    private HibernateUtil(){
        try {
            session = new Configuration().configure().buildSessionFactory().openSession();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    
    public static Session getSession(){
        if (session == null){
            new HibernateUtil();
        }
        return session; 
    }
    
}
