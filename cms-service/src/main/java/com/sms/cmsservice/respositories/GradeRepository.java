package com.sms.cmsservice.respositories;


import com.sms.cmsservice.models.Grade;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends MongoRepository<Grade, String> {
}
