package org.youcode.smartbank.shared.interfaces;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public interface GenericDaoI<T>{
    void save(T entity);
    void update(T entity);
    List<T> findAll();
    Optional<T> findById(Long id);
    void delete(T entity);
    void deleteById(Long id);

}
