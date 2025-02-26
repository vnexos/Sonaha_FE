import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/Ui/dialog";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import {
    useDeleteCourseMutation,
    useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../../Loader/Loader";
import { format } from "timeago.js";
import { toast } from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState("");
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

    const rows: any = [];

    data?.courses.forEach((item: any, i: number) => {
        rows.push({
            id: item._id,
            stt: i + 1,
            title: item.name,
            ratings: item.ratings,
            purchased: item.purchased,
            created_at: format(item.createdAt),
        });
    });

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            refetch();
            toast.success("Course Deleted Successfully");
        }
        if (error && "data" in error) {
            toast.error((error as any).data.message);
        }
    }, [isSuccess, error, refetch]);

    const handleDelete = async () => {
        await deleteCourse(courseId);
    };

    return (
        <div className="mt-[120px]">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>STT</TableHead>
                                <TableHead>Course Title</TableHead>
                                <TableHead>Ratings</TableHead>
                                <TableHead>Purchased</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Edit</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.stt}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.ratings}</TableCell>
                                    <TableCell>{row.purchased}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>
                                        <Link href={`/admin/edit-course/${row.id}`}>
                                            <Button variant="ghost">
                                                <Icon icon="mdi:pencil-outline" width={24} height={24} />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" onClick={() => {
                                            setOpen(true);
                                            setCourseId(row.id);
                                        }}>
                                            <Icon icon="mdi:delete-outline" width={24} height={24} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure you want to delete this course?</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default AllCourses;
