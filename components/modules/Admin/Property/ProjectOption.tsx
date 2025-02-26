import React, { FC } from 'react';
import { Icon } from '@iconify/react';

type Props = {
    active: number;
    setActive: (active: number) => void;
}

const ProjectDescription: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
    ];
    return (
        <div>
            {options.map((option: any, index: number) => (
                <div key={index} className={`w-full flex py-5`}>
                    <div
                        className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                            } relative`}
                    >
                        <Icon icon="ion:checkmark" className="text-[25px]" />
                        {index !== options.length - 1 && (
                            <div
                                className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                                    } bottom-[-100%]`}
                            />
                        )}
                    </div>
                    <h5
                        className={`pl-3 ${active === index
                            ? "dark:text-white text-black"
                            : "dark:text-white text-black"
                            } text-[20px]`}
                    >
                        {option}
                    </h5>
                </div>
            ))}
        </div>
    )
}

export default ProjectDescription