package org.youcode.smartbank.shared;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.youcode.smartbank.shared.interfaces.GenericDaoI;
import org.youcode.smartbank.utils.EntityManagerContext;

import java.util.List;
import java.util.Optional;


@Transactional
public class GenericDao<T> implements GenericDaoI<T>{

    private final Class<T> entityClass;

    public GenericDao(Class<T> entityClass){
        this.entityClass = entityClass;
    }

    @Override
    public void save(T entity){
        EntityManager em = EntityManagerContext.getEntityManager();
        System.out.println("Using EntityManager in DAO: " + (em != null));
        em.persist(entity);
        em.flush();
    }

    public void update(T entity){
        EntityManager em = EntityManagerContext.getEntityManager();
        em.merge(entity);
        em.flush();
    }
    public List<T> findAll(){
        EntityManager em = EntityManagerContext.getEntityManager();
        return em.createQuery("SELECT e FROM " + entityClass.getName() + " e", entityClass).getResultList();
    }

    public Optional<T> findById(Long id){
        EntityManager em = EntityManagerContext.getEntityManager();
        return Optional.ofNullable(em.find(entityClass, id));
    }

    public void delete(T entity){
        EntityManager em = EntityManagerContext.getEntityManager();
        em.remove(em.contains(entity) ? entity : em.merge(entity));
        em.flush();
    }
    public void deleteById(Long id){
        Optional<T> entity = findById(id);
        if (entity.isPresent()){
            T entityToDelete = entity.get();
            delete(entityToDelete);
        }
    }
}
