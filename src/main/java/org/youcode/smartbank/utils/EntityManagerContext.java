package org.youcode.smartbank.utils;

import jakarta.persistence.EntityManager;

public class EntityManagerContext {
    private final static ThreadLocal<EntityManager> entityManagerThreadLocal = new ThreadLocal<>();

    public static void bind(EntityManager entityManager){
        entityManagerThreadLocal.set(entityManager);
    }

    public static EntityManager getEntityManager(){
        return entityManagerThreadLocal.get();
    }

    public static void unbind(){
        entityManagerThreadLocal.remove();
    }




}
