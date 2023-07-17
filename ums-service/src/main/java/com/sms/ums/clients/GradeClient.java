package com.sms.ums.clients;

import com.sms.ums.models.dtos.GradeDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange
public interface GradeClient {

    @GetExchange("/api/grades/{id}")
    public GradeDTO getGradeById(@PathVariable(value="id") String id);
}
