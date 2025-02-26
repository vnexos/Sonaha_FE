"use client";
import React, { useEffect, useState } from "react";
import ProjectInfor from "./ProjectInfor";
import ProjectOption from "./ProjectOption";
import ProjectsData from "./ProjectData";
import ProjectMedia from "./ProjectMedia";
//import PreviewProject from "./PreviewProject";
// import { useCreateProjectMutation } from "@/redux/features/projects/ProjectApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};

const CreateProject = (props: Props) => {
    // const [createProject, { isLoading, isSuccess, error }] =
    //     useCreateProjectMutation();

    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success("Project created successfully");
    //         redirect("/proprities");
    //     }
    //     if (error) {
    //         if ("data" in error) {
    //             const errorMessage = error as any;
    //             toast.error(errorMessage.data.message);
    //         }
    //     }
    // }, [isSuccess, error]);

    const [active, setActive] = useState(0);
    const [ProjectInfo, setProjectInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [ProjectContentData, setProjectContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);


    const [ProjectData, setProjectData] = useState({});


    const handleSubmit = async () => {
        // Format benefits array
        const formattedBenefits = benefits.map((benefit) => ({
            title: benefit.title,
        }));
        // Format prerequisites array
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({
            title: prerequisite.title,
        }));

        // Format Project content array
        const formattedProjectContentData = ProjectContentData.map(
            (ProjectContent) => ({
                videoUrl: ProjectContent.videoUrl,
                title: ProjectContent.title,
                description: ProjectContent.description,
                videoLength: ProjectContent.videoLength,
                videoSection: ProjectContent.videoSection,
                links: ProjectContent.links.map((link) => ({
                    title: link.title,
                    url: link.url,
                })),
                suggestion: ProjectContent.suggestion,
            })
        );

        //   prepare our data object
        const data = {
            name: ProjectInfo.name,
            description: ProjectInfo.description,
            categories: ProjectInfo.categories,
            price: ProjectInfo.price,
            estimatedPrice: ProjectInfo.estimatedPrice,
            tags: ProjectInfo.tags,
            thumbnail: ProjectInfo.thumbnail,
            level: ProjectInfo.level,
            demoUrl: ProjectInfo.demoUrl,
            totalVideos: ProjectContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            ProjectData: formattedProjectContentData,
        };
        setProjectData(data);
    };

    // const handleProjectCreate = async (e: any) => {
    //     const data = ProjectData;
    //     if (!isLoading) {
    //         await createProject(data);
    //     }
    // };

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {active === 0 && (
                    <ProjectInfor
                        ProjectInfo={ProjectInfo}
                        setProjectInfo={setProjectInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}

                {active === 1 && (
                    <ProjectsData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                )}

                {active === 2 && (
                    <ProjectMedia
                        active={active}
                        setActive={setActive}
                        ProjectContentData={ProjectContentData}
                        setProjectContentData={setProjectContentData}
                        handleSubmit={handleSubmit}
                    />
                )}

                {/* {active === 3 && (
                    <PreviewProject
                        active={active}
                        setActive={setActive}
                        ProjectData={ProjectData}
                        handleProjectCreate={handleProjectCreate}
                    />
                )} */}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <ProjectOption active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default CreateProject;
