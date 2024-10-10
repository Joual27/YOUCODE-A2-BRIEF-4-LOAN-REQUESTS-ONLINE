package org.youcode.smartbank.shared;

import jakarta.persistence.EntityManager;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;

import org.youcode.smartbank.utils.EntityManagerContext;
import org.youcode.smartbank.utils.HibernateUtil;


import java.io.IOException;

@WebFilter("/*")
public class EntityManagerHandler implements Filter {

    @Override
    public void doFilter(ServletRequest request , ServletResponse response , FilterChain chain) throws ServletException , IOException{
        EntityManager entityManager = null ;
        try{
            entityManager = HibernateUtil.getInstance().getEntityManager();
            EntityManagerContext.bind(entityManager);
            System.out.println("EntityManager initialized: " + (entityManager != null));
            if (!entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().begin();
            }
            chain.doFilter(request , response);
            if (entityManager.getTransaction().isActive()){
                entityManager.getTransaction().commit();
            }

        } catch (Exception e) {
             if (entityManager != null && entityManager.getTransaction().isActive()){
                 entityManager.getTransaction().rollback();
             }
             throw new ServletException(e);
        } finally {
            if (entityManager != null){
                entityManager.close();
            }
        }
        EntityManagerContext.unbind();
    }
}
