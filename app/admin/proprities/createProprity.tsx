'use client'
import React from 'react'
import AdminSidebar from "@/components/common/Admin/sidebar/AdminSidebar";
import Heading from '@/utils/Heading';
import CreateProject from "@/components/modules/Admin/Property/CreateProject";
import DashboardHeader from '@/components/common/Admin/DashboardHeader';

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading
                title="SONAHA - Admin"
                description=""
                keywords="Prograaming,MERN,Redux,Machine Learning"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader />
                    <CreateProject />
                </div>
            </div>
        </div>
    )
}

export default page