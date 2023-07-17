package com.sms.ums.models.entities;

import com.sms.ums.models.entities.base.BasePersonEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teachers")
@EqualsAndHashCode(callSuper = true)
public class Teacher extends BasePersonEntity {
    @Column(name = "course_id")
    private String courseId;
    private String phoneNumber;
}
