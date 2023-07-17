package com.sms.ums.models.dtos;

import com.sms.ums.models.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffLoginDTO {
    private String usernameOrEmail;
    private String password;
    private Role role;
}
