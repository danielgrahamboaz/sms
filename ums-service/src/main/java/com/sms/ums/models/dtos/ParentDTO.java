package com.sms.ums.models.dtos;

import com.sms.ums.models.entities.enums.Gender;
import com.sms.ums.models.entities.enums.ParentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParentDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;
    private Gender gender;
    private ParentType parentType;
}
