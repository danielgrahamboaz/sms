package com.sms.ums.models.dtos;

import com.sms.ums.models.entities.UserEntity;
import com.sms.ums.models.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDTO {
    private String username;
    private String password;
    private String email;
    private Set<Role> role;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .username(this.username)
                .password(this.password)
                .email(this.email)
                .role(this.role)
                .build();
    }
}
