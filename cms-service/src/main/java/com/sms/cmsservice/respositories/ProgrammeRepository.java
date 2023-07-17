package com.sms.cmsservice.respositories;

import com.sms.cmsservice.models.Programme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgrammeRepository extends MongoRepository<Programme, String> {
}
