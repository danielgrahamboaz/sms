package com.sms.cmsservice.dto;

import com.sms.cmsservice.models.Grade;
import com.sms.cmsservice.models.Programme;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {
    private String name;
    private String description;
    private String programmeId;
    private Set<String> gradeIds;

    public Set<Grade> getGrades() {
        Set<Grade> grades = new HashSet<>();

        for (String gradeId : gradeIds) {
            grades.add(Grade.builder().id(gradeId).build());
        }
        return grades;
    }
}
