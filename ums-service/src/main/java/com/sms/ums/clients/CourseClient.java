package com.sms.ums.clients;

import com.sms.ums.models.dtos.CourseDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange
public interface CourseClient {

    @GetExchange("/api/courses/{id}")
    public CourseDTO getCourseById(@PathVariable(value = "id") String id);
}
