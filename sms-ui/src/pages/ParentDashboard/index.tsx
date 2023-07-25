import clsx from "clsx";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";

function Main() {

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 2xl:col-span-9">
                <div className="grid grid-cols-12 gap-6">
                    {/* BEGIN: General Report */}
                    <div className="col-span-12 mt-8">
                        <div className="flex items-center h-10 intro-y">
                            <h2 className="mr-5 text-lg font-medium truncate">
                                General Report
                            </h2>
                            <a href="" className="flex items-center ml-auto text-primary">
                                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload
                            </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="Users"
                                                className="w-[28px] h-[28px] text-primary"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-primary py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="33% Higher than last month"
                                                >
                                                    33%
                                                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            4
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            Children
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="FileSpreadsheet"
                                                className="w-[28px] h-[28px] text-pending"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-warning py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="2% Lower than last month"
                                                >
                                                    2%
                                                    <Lucide
                                                        icon="ChevronDown"
                                                        className="w-4 h-4 ml-0.5"
                                                    />
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            10
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            XXXXXXX
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="UserCheck"
                                                className="w-[28px] h-[28px] text-info"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-info py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="12 teachers added recently"
                                                >
                                                    +12{" "}
                                                    <Lucide icon="Check" className="w-4 h-4 ml-0.5" />
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            12
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            XXXXXXX
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="User"
                                                className="w-[28px] h-[28px] text-success"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="2 Members joined lately"
                                                >
                                                    +02{" "}
                                                    <Lucide icon="Check" className="w-4 h-4 ml-0.5" />
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            152
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            XXXXXXX
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END: General Report */}
                </div>
            </div>
        </div>
    );
}

export default Main;
