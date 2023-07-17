package com.sms.ums.models.dtos;

import com.sms.ums.models.entities.enums.Gender;
import com.sms.ums.models.entities.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private Gender gender;
    private String address;
    private String email;
    private Long programme_id;
    private Long grade_id;
    private Level level;
    private String enrollDate;
}
