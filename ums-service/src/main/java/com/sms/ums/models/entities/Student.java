package com.sms.ums.models.entities;

import com.sms.ums.models.entities.base.BasePersonEntity;
import com.sms.ums.models.entities.enums.Level;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")
@EqualsAndHashCode(callSuper = true)
public class Student extends BasePersonEntity {
    @ManyToOne
    private Parent parent;
    @Column(name = "enroll_date")
    private LocalDate enrollDate;
//    @OneToOne
//    private Programme programme;
    @Column(name = "programme_id")
    private String programmeId;
    @Column(name = "date_of_birth")
    private String dateOfBirth;
    @Enumerated(EnumType.STRING)
    private Level level;
    @Column(name = "grade_id")
    private String gradeId;
}
