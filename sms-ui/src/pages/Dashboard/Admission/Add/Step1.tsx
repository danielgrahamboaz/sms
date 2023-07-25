import React, { useState, useEffect } from 'react'
import { FormLabel, FormInput, FormSelect } from '../../../../base-components/Form'
import Button from '../../../../base-components/Button'
import { Gender, ParentType } from "../../../../types/enums";
import { Parent } from '../../../../types/entities';

type PageProps = {
    nextPage: () => void,
    prevPage: () => void;
    setParent: (parent: any) => void;
    parent: Parent;
}

const Step1 = ({ nextPage, prevPage, setParent, parent }: PageProps) => {

    const [error, setError] = useState("");
    const [parentProfile, setParentProfile] = useState<Parent>(parent);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParentProfile({ ...parentProfile, [e.target.name]: e.target.value });
    };

    const handleSelectGender = (e: any) => {
        setParentProfile({ ...parentProfile, gender: e.target.value });
        console.log("selected gender: ", parent.gender!)
    }

    const handleSelectRole = (e: any) => {
        setParentProfile({ ...parentProfile, parentType: e.target.value });
        console.log("selected role: ", parent.parentType!)
    }

    const saveParentProfile = () => {
        setParent(parentProfile);
        nextPage();
        console.log("parent profile: ", parentProfile);
    }

    useEffect(() => {
        setParentProfile({ ...parentProfile, gender: Gender.Male, parentType: ParentType.Father });
        console.log("parent: ", parent);
        console.log("parent profile: ", parentProfile);
    }, [])

    return (
        <>
            <div className="text-base font-medium">Parent Profile</div>
            <div className="grid grid-cols-12 gap-4 mt-5 gap-y-5">
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-1">First Name</FormLabel>
                    <FormInput
                        id="input-wizard-1"
                        type="text"
                        placeholder="John"
                        name="firstName"
                        value={parentProfile?.firstName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-2">Last Name</FormLabel>
                    <FormInput
                        id="input-wizard-2"
                        type="text"
                        placeholder="Doe"
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                        value={parentProfile?.lastName}
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-3">E-mail</FormLabel>
                    <FormInput
                        id="input-wizard-3"
                        type="email"
                        placeholder="email@gmail.com"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        value={parentProfile?.email}

                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-4">Phone Number</FormLabel>
                    <FormInput
                        id="input-wizard-4"
                        type="text"
                        placeholder="+1234567890"
                        name="phoneNumber"
                        onChange={(e) => handleChange(e)}
                        value={parentProfile?.phoneNumber}
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-5">Address</FormLabel>
                    <FormInput
                        id="input-wizard-5"
                        type="text"
                        placeholder="123 Main Street, New York, NY 10030"
                        name="address"
                        onChange={(e) => handleChange(e)}
                        value={parentProfile?.address}
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-6">Gender</FormLabel>
                    <FormSelect id="input-wizard-6" onChange={(e) => handleSelectGender(e)} name='gender' value={parentProfile?.gender}>
                        <option value={Gender.Male}>Male</option>
                        <option value={Gender.Female}>Female</option>
                    </FormSelect>
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-6">Role</FormLabel>
                    <FormSelect id="input-wizard-6" name='parentType' value={parentProfile?.parentType} onChange={e => handleSelectRole(e)}>
                        <option value={ParentType.Father}>Father</option>
                        <option value={ParentType.Mother}>Mother</option>
                        <option value={ParentType.Guardian}>Guardian</option>
                    </FormSelect>
                </div>
                <div className="flex items-center justify-center col-span-12 mt-5 intro-y sm:justify-end">
                    <Button onClick={() => prevPage()} variant="secondary" className="w-24">
                        Previous
                    </Button>
                    <Button onClick={() => saveParentProfile()} variant="primary" className="w-24 ml-2">
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Step1