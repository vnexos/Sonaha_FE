import { styles } from "@/styles/admin/Styles";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";

type Props = {
    active: number;
    setActive: (active: number) => void;
    ProjectContentData: any;
    setProjectContentData: (ProjectContentData: any) => void;
    handleSubmit: any;
};

const ProjectMedia: FC<Props> = ({
    ProjectContentData,
    setProjectContentData,
    active,
    setActive,
    handleSubmit: handlleProjectSubmit,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(ProjectContentData.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const handleCollapseToggle = (index: number) => {
        const updatedCollasped = [...isCollapsed];
        updatedCollasped[index] = !updatedCollasped[index];
        setIsCollapsed(updatedCollasped);
    };

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...ProjectContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setProjectContentData(updatedData);
    };

    const handleChangeLinkTitle = (ProjectDataIndex: number, linkIndex: number, value: string) => {
        const updatedData = [...ProjectContentData];
        const updatedLinks = [...updatedData[ProjectDataIndex].links];
        updatedLinks[linkIndex] = {
            ...updatedLinks[linkIndex],
            title: value,
        };
        updatedData[ProjectDataIndex] = {
            ...updatedData[ProjectDataIndex],
            links: updatedLinks,
        };
        setProjectContentData(updatedData);
    };

    const handleChangeUrl = (ProjectDataIndex: number, linkIndex: number, value: string) => {
        const updatedData = [...ProjectContentData];
        const updatedLinks = [...updatedData[ProjectDataIndex].links];
        updatedLinks[linkIndex] = {
            ...updatedLinks[linkIndex],
            url: value,
        };
        updatedData[ProjectDataIndex] = {
            ...updatedData[ProjectDataIndex],
            links: updatedLinks,
        };
        setProjectContentData(updatedData);
    };



    const handleChangeTitle = (ProjectDataIndex: number, value: string) => {
        const updatedData = [...ProjectContentData];
        updatedData[ProjectDataIndex] = {
            ...updatedData[ProjectDataIndex],
            title: value,
        };
        setProjectContentData(updatedData);
    };

    const handleChangeDescription = (ProjectDataIndex: number, value: string) => {
        const updatedData = [...ProjectContentData];
        updatedData[ProjectDataIndex] = {
            ...updatedData[ProjectDataIndex],
            description: value,
        };
        setProjectContentData(updatedData);
    };

    const handleChangeVideoUrl = (ProjectDataIndex: number, value: string) => {
        const updatedData = [...ProjectContentData];
        updatedData[ProjectDataIndex] = {
            ...updatedData[ProjectDataIndex],
            videoUrl: value,
        };
        setProjectContentData(updatedData);
    };

    const handleChangeVideoLength = (ProjectDataIndex: number, value: number) => {
        const updatedData = [...ProjectContentData];
        updatedData[ProjectDataIndex] = {
            ...updatedData[ProjectDataIndex],
            videoLength: value,
        };
        setProjectContentData(updatedData);
    };

    const handleChangeVideoSection = (ProjectDataIndex: number, value: string) => {
        const updatedData = [...ProjectContentData];
        updatedData[ProjectDataIndex] = {
            ...updatedData[ProjectDataIndex],
            videoSection: value,
        };
        setProjectContentData(updatedData);
    };


    const handleAddLink = (index: number) => {
        const updatedData = [...ProjectContentData]; // Tạo bản sao của mảng ProjectContentData
        updatedData[index] = {
            ...updatedData[index],
            links: [...updatedData[index].links, { title: "", url: "" }], // Tạo bản sao của mảng links và thêm mới
        };
        setProjectContentData(updatedData); // Cập nhật state với mảng đã cập nhật
    };

    const newContentHandler = (item: any) => {
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === "" ||
            item.videoLength === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            let newVideoSection = "";

            if (ProjectContentData.length > 0) {
                const lastVideoSection =
                    ProjectContentData[ProjectContentData.length - 1].videoSection;

                // use the last videoSection if available, else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                videoLength: "",
                links: [{ title: "", url: "" }],
            };

            setProjectContentData([...ProjectContentData, newContent]);
        }
    };

    const addNewSection = () => {
        if (
            ProjectContentData[ProjectContentData.length - 1].title === "" ||
            ProjectContentData[ProjectContentData.length - 1].description === "" ||
            ProjectContentData[ProjectContentData.length - 1].videoUrl === "" ||
            ProjectContentData[ProjectContentData.length - 1].links[0].title === "" ||
            ProjectContentData[ProjectContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoLength: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{ title: "", url: "" }],
            };
            setProjectContentData([...ProjectContentData, newContent]);
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (
            ProjectContentData[ProjectContentData.length - 1].title === "" ||
            ProjectContentData[ProjectContentData.length - 1].description === "" ||
            ProjectContentData[ProjectContentData.length - 1].videoUrl === "" ||
            ProjectContentData[ProjectContentData.length - 1].links[0].title === "" ||
            ProjectContentData[ProjectContentData.length - 1].links[0].url === ""
        ) {
            toast.error("section can't be empty!");
        } else {
            setActive(active + 1);
            handlleProjectSubmit();
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24 p-3">
            <form onSubmit={handleSubmit}>
                {ProjectContentData?.map((item: any, index: number) => {
                    const showSectionInput =
                        index === 0 ||
                        item.videoSection !== ProjectContentData[index - 1].videoSection;

                    return (
                        <div
                            className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"
                                }`}
                            key={index}
                        >
                            {showSectionInput && (
                                <>
                                    <div className="flex w-full items-center">
                                        <input
                                            type="text"
                                            className={`text-[20px] ${item.videoSection === "Untitled Section"
                                                ? "w-[170px]"
                                                : "w-min"
                                                } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                            value={item.videoSection}
                                            onChange={(e) => {
                                                handleChangeVideoSection(index, e.target.value);
                                            }}
                                        />
                                        <Icon icon="bi:pencil" className="cursor-pointer dark:text-white text-black" />
                                    </div>
                                    <br />
                                </>
                            )}

                            <div className="flex w-full items-center justify-between my-0">
                                {isCollapsed[index] ? (
                                    <>
                                        {item.title ? (
                                            <p className="font-Poppins dark:text-white text-black">
                                                {index + 1}. {item.title}
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <div></div>
                                )}

                                {/* // arrow button for collasped video content */}
                                <div className="flex items-center">
                                    <Icon icon="ant-design:delete-outlined"
                                        className={`dark:text-white text-[20px] mr-2 text-black cursor-pointer`}
                                        onClick={() => {
                                            const updatedData = [...ProjectContentData];
                                            updatedData.splice(index, 1);
                                            setProjectContentData(updatedData);
                                        }}
                                    />
                                    <Icon icon="material-symbols:keyboard-arrow-down-rounded"
                                        fontSize="large"
                                        className="dark:text-white text-black"
                                        style={{
                                            transform: isCollapsed[index]
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                        }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>
                            {!isCollapsed[index] && (
                                <>
                                    <div className="my-3">
                                        <label className={styles.label}>Video Title</label>
                                        <input
                                            type="text"
                                            placeholder="Project Plan..."
                                            className={`${styles.input}`}
                                            value={item.title}
                                            onChange={(e) => {
                                                handleChangeTitle(index, e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className={styles.label}>Video Url</label>
                                        <input
                                            type="text"
                                            placeholder="sdder"
                                            className={`${styles.input}`}
                                            value={item.videoUrl}
                                            onChange={(e) => {
                                                handleChangeVideoUrl(index, e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className={styles.label}>
                                            Video Length (in minutes)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="20"
                                            className={`${styles.input}`}
                                            value={item.videoLength}
                                            onChange={(e) => {
                                                handleChangeVideoLength(index, e.target.valueAsNumber);
                                            }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className={styles.label}>Video Description</label>
                                        <textarea
                                            rows={8}
                                            cols={30}
                                            placeholder="sdder"
                                            className={`${styles.input} !h-min py-2`}
                                            value={item.description}
                                            onChange={(e) => {
                                                handleChangeDescription(index, e.target.value);
                                            }}
                                        />
                                        <br />
                                    </div>
                                    {item?.links.map((link: any, linkIndex: number) => (
                                        <div className="mb-3 block" key={linkIndex}>
                                            <div className="w-full flex items-center justify-between">
                                                <label className={styles.label}>
                                                    Link {linkIndex + 1}
                                                </label>
                                                <Icon icon="ant-design:delete-outlined"
                                                    className={`${"cursor-pointer"} text-black dark:text-white text-[20px]`}
                                                    onClick={() => handleRemoveLink(index, linkIndex)}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="(Link title)"
                                                className={`${styles.input}`}
                                                value={link.title}
                                                onChange={(e) => {
                                                    handleChangeLinkTitle(index, linkIndex, e.target.value);
                                                }}
                                            />
                                            <input
                                                type="url"
                                                placeholder="(Link URL)"
                                                className={`${styles.input} mt-6`}
                                                value={link.url}
                                                onChange={(e) => {
                                                    handleChangeUrl(index, linkIndex, e.target.value);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <br />
                                    {/* add link button */}
                                    <div className="inline-block mb-4">
                                        <p
                                            className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                            onClick={() => handleAddLink(index)}
                                        >
                                            <Icon icon="bi:link-45deg" className="mr-2" /> Add Link
                                        </p>
                                    </div>
                                </>
                            )}
                            <br />
                            {/* add new content */}
                            {index === ProjectContentData.length - 1 && (
                                <div>
                                    <p
                                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                        onClick={(e: any) => newContentHandler(item)}
                                    >
                                        <Icon icon="ant-design:plus-circle-outlined" className="mr-2" /> Add New Content
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
                <br />
                <div
                    className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
                    onClick={() => addNewSection()}
                >
                    <Icon icon="ant-design:plus-circle-outlined" className="mr-2" /> Add new Section
                </div>
            </form>
            <br />
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default ProjectMedia;
