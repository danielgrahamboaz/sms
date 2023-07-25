import { FormSwitch } from '../../../base-components/Form';
import { useTheme } from '../../../contexts/ThemeContext';

const Settings = () => {

    const { darkTheme, switchMode } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switchMode();
    }

    return (
        <div className="col-span-12 intro-y box 2xl:col-span-6">
            <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                <h2 className="mr-auto text-base font-medium">Settings</h2>
            </div>
            <div className="p-5 pb-8 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center">
                    <div className="border-primary dark:border-primary">
                        <a className="font-medium">
                            Change Theme
                        </a>
                        <div className="text-slate-500">This will change your theme to a light/dark theme</div>
                    </div>
                    <FormSwitch className="ml-auto" >
                        <FormSwitch.Input type="checkbox" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} checked={darkTheme} />
                    </FormSwitch>
                </div>
                <div className="flex items-center mt-5">
                    <div className="border-primary dark:border-primary">
                        <a className="font-medium">
                            Enable changing role text
                        </a>
                        <div className="text-slate-500">This will allow you to change the text for your profile role.</div>
                    </div>
                    <FormSwitch className="ml-auto">
                        <FormSwitch.Input type="checkbox" />
                    </FormSwitch>
                </div>
            </div>
        </div>
    )
}

export default Settings