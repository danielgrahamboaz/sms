package com.sms.ums.models;

import com.sms.api.model.entities.base.BasePersonEntity;
import com.sms.api.model.entities.enums.ParentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "parents")
@EqualsAndHashCode(callSuper = true)
public class Parent extends BasePersonEntity {
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private Set<Student> students;
    @Column
    private String phoneNumber;
    @Column(name = "parent_type")
    @Enumerated(EnumType.STRING)
    private ParentType parentType;

}
