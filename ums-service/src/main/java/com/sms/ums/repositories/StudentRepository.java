package com.sms.ums.repositories;

import com.sms.ums.models.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByParentId(Long parentId);

//    Optional<Student> findByProgramme(Programme programme);

    Optional<Student> findByUsernameOrEmail(String username, String email);

    Optional<Student> findByUsername(String username);
}
