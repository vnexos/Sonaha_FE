// import React, { FC } from "react";
// //import ProjectPlayer from "@/app/utils/Project";
// import { styles } from "@/styles/admin/Styles";
// import { Icon } from "@iconify/react";

// type Props = {
//     active: number;
//     setActive: (active: number) => void;
//     ProjectData: any;
//     handleProjectCreate: any;
//     isEdit?: boolean;
// };

// const PreviewProject: FC<Props> = ({
//     ProjectData,
//     handleProjectCreate,
//     setActive,
//     active,
//     isEdit
// }) => {
//     const dicountPercentenge =
//         ((ProjectData?.estimatedPrice - ProjectData?.price) /
//             ProjectData?.estimatedPrice) *
//         100;

//     const discountPercentengePrice = dicountPercentenge.toFixed(0);

//     const prevButton = () => {
//         setActive(active - 1);
//     };

//     const createProject = () => {
//         handleProjectCreate();
//     };

//     return (
//         <div className="w-[90%] m-auto py-5 mb-5">
//             <div className="w-full relative">
//                 <div className="w-full mt-10">
//                     <ProjectPlayer
//                         videoUrl={ProjectData?.demoUrl}
//                         title={ProjectData?.title}
//                     />
//                 </div>
//                 <div className="flex items-center">
//                     <h1 className="pt-5 text-[25px]">
//                         {ProjectData?.price === 0 ? "Free" : ProjectData?.price + "VND"}
//                     </h1>
//                     <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
//                         {ProjectData?.estimatedPrice}VND
//                     </h5>

//                     <h4 className="pl-5 pt-4 text-[22px]">
//                         {discountPercentengePrice}% Off
//                     </h4>
//                 </div>

//                 <div className="flex items-center">
//                     <div
//                         className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
//                     >
//                         Buy Now {ProjectData?.price}VND
//                     </div>
//                 </div>

//                 <div className="flex items-center">
//                     <input
//                         type="text"
//                         name=""
//                         id=""
//                         placeholder="Discount code..."
//                         className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
//                     />
//                     <div
//                         className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
//                     >
//                         Apply
//                     </div>
//                 </div>
//                 <p className="pb-1">• Source code included</p>
//                 <p className="pb-1">• Full lifetime access</p>
//                 <p className="pb-1">• Certificate of completion</p>
//                 <p className="pb-3 800px:pb-1">• Premium Support</p>
//             </div>
//             <div className="w-full">
//                 <div className="w-full 800px:pr-5">
//                     <h1 className="text-[25px] font-Poppins font-[600]">
//                         {ProjectData?.name}
//                     </h1>
//                     <br />
//                     <h1 className="text-[25px] font-Poppins font-[600]">
//                         What you will learn from this Project?
//                     </h1>
//                 </div>
//                 {ProjectData?.benefits?.map((item: any, index: number) => (
//                     <div className="w-full flex 800px:items-center py-2" key={index}>
//                         <div className="w-[15px] mr-1">
//                             <Icon icon="ion:checkmark-done-outline" width={24} height={24} />
//                         </div>
//                         <p className="pl-2">{item.title}</p>
//                     </div>
//                 ))}
//                 <br />
//                 <br />
//                 <h1 className="text-[25px] font-Poppins font-[600]">
//                     What are the prerequisites for starting this Project?
//                 </h1>
//                 {ProjectData?.prerequisites?.map((item: any, index: number) => (
//                     <div className="w-full flex 800px:items-center py-2" key={index}>
//                         <div className="w-[15px] mr-1">
//                             <Icon icon="ion:checkmark-done-outline" width={20} height={20} />
//                         </div>
//                         <p className="pl-2">{item.title}</p>
//                     </div>
//                 ))}
//                 <br />
//                 <br />
//                 {/* Project description */}
//                 <div className="w-full">
//                     <h1 className="text-[25px] font-Poppins font-[600]">
//                         Project Details
//                     </h1>
//                     <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
//                         {ProjectData?.description}
//                     </p>
//                 </div>
//                 <br />
//                 <br />
//             </div>
//             <div className="w-full flex items-center justify-between">
//                 <div
//                     className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//                     onClick={() => prevButton()}
//                 >
//                     Prev
//                 </div>
//                 <div
//                     className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//                     onClick={() => createProject()}
//                 >
//                     {
//                         isEdit ? 'Update' : 'Create'
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PreviewProject;
