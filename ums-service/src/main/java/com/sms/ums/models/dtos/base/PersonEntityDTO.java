package com.sms.ums.models.dtos.base;

import com.sms.ums.models.entities.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonEntityDTO {
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private Gender gender;
    private String address;
    private String email;
}
