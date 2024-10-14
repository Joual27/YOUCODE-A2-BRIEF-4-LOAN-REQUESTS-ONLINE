package org.youcode.smartbank.utils;


import  jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class HibernateUtil {
    private static HibernateUtil instance;
    private EntityManagerFactory entityManagerFactory;

    private HibernateUtil() {
        entityManagerFactory = Persistence.createEntityManagerFactory("smartbank_db");
    }

    public static HibernateUtil getInstance() {
        if (instance == null) {
            synchronized (HibernateUtil.class) {
                if (instance == null) {
                    instance = new HibernateUtil();
                }
            }
        }
        return instance;
    }

    public  EntityManager getEntityManager(){
        return entityManagerFactory.createEntityManager();
    }


}