package com.sms.cmsservice.dto;

import com.sms.cmsservice.models.Grade;
import com.sms.cmsservice.models.Programme;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private String id;
    private String name;
    private String description;
    private Programme programme;
    private Set<Grade> grades;

}
