import React from 'react'
import { FormLabel, FormInput, FormSelect } from '../../../../base-components/Form'
import Button from '../../../../base-components/Button'

type PageProps = {
    nextPage: () => void,
    prevPage: () => void;
}

const Step5 = ({ nextPage, prevPage }: PageProps) => {

    return (
        <>
            <div className="text-base font-medium">Profile 2</div>
            <div className="grid grid-cols-12 gap-4 mt-5 gap-y-5">
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-1">From</FormLabel>
                    <FormInput
                        id="input-wizard-1"
                        type="text"
                        placeholder="example@gmail.com"
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-2">To</FormLabel>
                    <FormInput
                        id="input-wizard-2"
                        type="text"
                        placeholder="example@gmail.com"
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-3">Subject</FormLabel>
                    <FormInput
                        id="input-wizard-3"
                        type="text"
                        placeholder="Important Meeting"
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-4">Has the Words</FormLabel>
                    <FormInput
                        id="input-wizard-4"
                        type="text"
                        placeholder="Job, Work, Documentation"
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-5">Doesn't Have</FormLabel>
                    <FormInput
                        id="input-wizard-5"
                        type="text"
                        placeholder="Job, Work, Documentation"
                    />
                </div>
                <div className="col-span-12 intro-y sm:col-span-6">
                    <FormLabel htmlFor="input-wizard-6">Size</FormLabel>
                    <FormSelect id="input-wizard-6">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </FormSelect>
                </div>
                <div className="flex items-center justify-center col-span-12 mt-5 intro-y sm:justify-end">
                    <Button onClick={() => prevPage()} variant="secondary" className="w-24">
                        Previous
                    </Button>
                    <Button onClick={() => nextPage()} variant="primary" className="w-24 ml-2">
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Step5